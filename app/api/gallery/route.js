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

    const payload = {
      images: images.map((img) => ({
        id: img.id,
        url: img.url,
        driveUrl: img.driveUrl,
        title: img.title,
        category: img.category,
        createdAt: img.createdAt
      })),
      categories,
      totalImages: images.length
    }

    return NextResponse.json(payload, {
      headers: { 'Cache-Control': 'no-store, must-revalidate' }
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
    const { url, title, category, driveUrl } = body

    if (!url || !title || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: url, title, category' },
        { status: 400 }
      )
    }

    const drive =
      driveUrl != null && String(driveUrl).trim() !== ''
        ? String(driveUrl).trim()
        : null

    const image = await prisma.galleryImage.create({
      data: { url, title, category, driveUrl: drive }
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
