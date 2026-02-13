import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin } from '../../../lib/auth'

// GET /api/gallery - List all gallery images (public)
export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { createdAt: 'desc' }
    })

    const categories = ['All', ...new Set(images.map(img => img.category).filter(Boolean))]

    return NextResponse.json({
      images,
      categories,
      totalImages: images.length
    })
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST /api/gallery - Add image (admin only)
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
    const { url, title, category } = body

    if (!url || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: url, title, category' },
        { status: 400 }
      )
    }

    const image = await prisma.galleryImage.create({
      data: { url, title, category }
    })

    return NextResponse.json({ image })
  } catch (error) {
    console.error('Gallery create error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
