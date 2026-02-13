import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { requireAdmin, requireUser } from '../../../../lib/auth'

// GET /api/orders/[id] - Single order (owner or admin)
export async function GET(request, { params }) {
  try {
    const { id } = await params
    const admin = requireAdmin(request)
    const user = requireUser(request)

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, studentId: true, firstName: true, lastName: true, email: true } },
        items: { include: { product: { select: { id: true, name: true, image: true } } } }
      }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    if (admin) {
      return NextResponse.json({ order })
    }

    if (user && order.userId === user.id) {
      return NextResponse.json({ order })
    }

    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  } catch (error) {
    console.error('Order fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// PATCH /api/orders/[id] - Update status (admin only)
export async function PATCH(request, { params }) {
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
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      )
    }

    const validStatuses = ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      )
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: { select: { firstName: true, lastName: true } },
        items: { include: { product: { select: { name: true } } } }
      }
    })

    return NextResponse.json({ order })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }
    console.error('Order update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
