import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { requireAdmin } from '../../../../lib/auth'

// GET /api/products/[id] - Single product (public)
export async function GET(request, { params }) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Product fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Update product (admin only)
export async function PUT(request, { params }) {
  try {
    const payload = requireAdmin(request)

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params
    const body = await request.json()
    const { name, description, price, image, category, level, inStock, stock } = body

    const updateData = {}
    if (name != null) updateData.name = name
    if (description != null) updateData.description = description
    if (price != null) updateData.price = parseFloat(price)
    if (image != null) updateData.image = image
    if (category != null) updateData.category = category
    if (level != null) updateData.level = level
    if (inStock != null) updateData.inStock = inStock
    if (stock != null) updateData.stock = parseInt(stock, 10)

    const product = await prisma.product.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ product })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    console.error('Product update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete product (admin only)
export async function DELETE(request, { params }) {
  try {
    const payload = requireAdmin(request)

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }
    if (error.code === 'P2003') {
      return NextResponse.json(
        { error: 'Cannot delete product: it has been ordered' },
        { status: 400 }
      )
    }
    console.error('Product delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
