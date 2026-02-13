import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { requireAdmin } from '../../../../lib/auth'

// GET /api/events/[id] - Single event (public)
export async function GET(request, { params }) {
  try {
    const { id } = await params

    const event = await prisma.event.findUnique({
      where: { id }
    })

    if (!event) {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Event fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/events/[id] - Update event (admin only)
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
    const { title, description, image, date, time, location } = body

    const updateData = {}
    if (title != null) updateData.title = title
    if (description != null) updateData.description = description
    if (image != null) updateData.image = image
    if (date != null) updateData.date = new Date(date)
    if (time != null) updateData.time = time
    if (location != null) updateData.location = location

    const event = await prisma.event.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ event })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    console.error('Event update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/events/[id] - Delete event (admin only)
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

    await prisma.event.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Event not found' },
        { status: 404 }
      )
    }
    console.error('Event delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
