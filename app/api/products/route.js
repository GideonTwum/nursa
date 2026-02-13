import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin } from '../../../lib/auth'

// GET /api/products - List all products (public)
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      products,
      totalProducts: products.length
    })
  } catch (error) {
    console.error('Products fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST /api/products - Create product (admin only)
export async function POST(request) {
  try {
    const payload = requireAdmin(request)

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { name, description, price, image, category, level, inStock, stock } = body

    if (!name || !description || price == null || !image || !category || !level) {
      return NextResponse.json(
        { error: 'Missing required fields: name, description, price, image, category, level' },
        { status: 400 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        image,
        category,
        level,
        inStock: inStock ?? true,
        stock: stock ?? 0
      }
    })

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Product create error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
