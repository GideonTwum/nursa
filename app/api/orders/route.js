import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin, requireUser } from '../../../lib/auth'

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

    const total = items.reduce((sum, i) => sum + (i.price * i.quantity), 0)

    const order = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          userId: user.id,
          total,
          status: 'PENDING'
        }
      })

      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.productId }
        })
        if (!product) throw new Error(`Product ${item.productId} not found`)
        if (!product.inStock || product.stock < item.quantity) {
          throw new Error(`${product.name} is out of stock or insufficient quantity`)
        }

        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price
          }
        })

        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: product.stock - item.quantity,
            inStock: product.stock - item.quantity > 0
          }
        })
      }

      return tx.order.findUnique({
        where: { id: order.id },
        include: { items: { include: { product: { select: { name: true } } } } }
      })
    })

    return NextResponse.json({ order, message: 'Order placed successfully' })
  } catch (error) {
    if (error.message?.includes('out of stock') || error.message?.includes('not found')) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }
    console.error('Order create error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
