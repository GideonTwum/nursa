import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin } from '../../../lib/auth'

// GET /api/events - List all events (public)
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'asc' }
    })

    return NextResponse.json({
      events,
      totalEvents: events.length
    })
  } catch (error) {
    console.error('Events fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST /api/events - Create event (admin only)
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
    const { title, description, image, date, time, location } = body

    if (!title || !description || !image || !date || !time || !location) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, image, date, time, location' },
        { status: 400 }
      )
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        image,
        date: new Date(date),
        time,
        location
      }
    })

    return NextResponse.json({ event })
  } catch (error) {
    console.error('Event create error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
