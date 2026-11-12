import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin, requireUser } from '../../../lib/auth'

class CheckoutError extends Error {}

// GET /api/orders - List orders (student: own only, admin: all)
export async function GET(request) {
  try {
    const admin = requireAdmin(request)
    const user = requireUser(request)

    if (admin) {
      const orders = await prisma.order.findMany({
        include: {
          user: { select: { id: true, studentId: true, firstName: true, lastName: true } },
          items: { include: { product: { select: { name: true } } } }
        },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json({ orders, totalOrders: orders.length })
    }

    if (user) {
      const orders = await prisma.order.findMany({
        where: { userId: user.id },
        include: { items: { include: { product: { select: { name: true, image: true } } } } },
        orderBy: { createdAt: 'desc' }
      })
      return NextResponse.json({ orders, totalOrders: orders.length })
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  } catch (error) {
    console.error('Orders fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST /api/orders - Create order (checkout) - student only
export async function POST(request) {
  try {
    const user = requireUser(request)

    if (!user) {
      return NextResponse.json(
        { error: 'Please log in to place an order' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { items } = body

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      )
    }

    // Never trust client-supplied prices or quantities.
    const quantities = new Map()
    for (const item of items) {
      if (!item || typeof item.productId !== 'string' || !item.productId ||
          !Number.isSafeInteger(item.quantity) || item.quantity <= 0) {
        return NextResponse.json({ error: 'Invalid cart item' }, { status: 400 })
      }
      const next = (quantities.get(item.productId) || 0) + item.quantity
      if (!Number.isSafeInteger(next) || next > 10000) {
        return NextResponse.json({ error: 'Invalid item quantity' }, { status: 400 })
      }
      quantities.set(item.productId, next)
    }

    const order = await prisma.$transaction(async (tx) => {
      const purchased = []
      let total = 0
      // Conditional atomic updates prevent overselling under concurrent checkouts.
      for (const [productId, quantity] of [...quantities].sort(([a], [b]) => a.localeCompare(b))) {
        const product = await tx.product.findUnique({ where: { id: productId } })
        if (!product) throw new CheckoutError('Product not found')
        if (!Number.isFinite(product.price) || product.price < 0) throw new CheckoutError('Product unavailable')
        const updated = await tx.product.updateMany({
          where: { id: productId, inStock: true, stock: { gte: quantity } },
          data: { stock: { decrement: quantity } }
        })
        if (updated.count !== 1) throw new CheckoutError(`${product.name} is out of stock or insufficient quantity`)
        await tx.product.updateMany({ where: { id: productId, stock: 0 }, data: { inStock: false } })
        total += product.price * quantity
        purchased.push({ productId, quantity, price: product.price })
      }
      const created = await tx.order.create({
        data: { userId: user.id, total: Math.round((total + Number.EPSILON) * 100) / 100, status: 'PENDING',
          items: { create: purchased } },
        include: { items: { include: { product: { select: { name: true } } } } }
      })
      return created
    })

    return NextResponse.json({ order, message: 'Order placed successfully' })
  } catch (error) {
    if (error instanceof CheckoutError) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Order create error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
