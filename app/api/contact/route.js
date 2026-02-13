import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin } from '../../../lib/auth'

// POST /api/contact - Submit contact form (public)
export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, subject, message' },
        { status: 400 }
      )
    }

    const contactMessage = await prisma.contactMessage.create({
      data: { name, email, subject, message }
    })

    return NextResponse.json({ message: 'Thank you! Your message has been sent.', id: contactMessage.id })
  } catch (error) {
    console.error('Contact submit error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// GET /api/contact - List contact messages (admin only)
export async function GET(request) {
  try {
    const payload = requireAdmin(request)

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      messages,
      totalMessages: messages.length,
      unreadCount: messages.filter(m => !m.read).length
    })
  } catch (error) {
    console.error('Contact fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
