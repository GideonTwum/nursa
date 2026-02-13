import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { requireAdmin } from '../../../../lib/auth'

// GET /api/contact/[id] - Single message (admin only)
export async function GET(request, { params }) {
  try {
    const payload = requireAdmin(request)

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { id } = await params

    const message = await prisma.contactMessage.findUnique({
      where: { id }
    })

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message })
  } catch (error) {
    console.error('Contact fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// PATCH /api/contact/[id] - Mark as read (admin only)
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

    const message = await prisma.contactMessage.update({
      where: { id },
      data: { read: true }
    })

    return NextResponse.json({ message })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }
    console.error('Contact update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/contact/[id] - Delete message (admin only)
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

    await prisma.contactMessage.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Message deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      )
    }
    console.error('Contact delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
