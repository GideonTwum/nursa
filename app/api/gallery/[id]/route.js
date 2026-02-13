import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { requireAdmin } from '../../../../lib/auth'

// GET /api/gallery/[id] - Single image (public)
export async function GET(request, { params }) {
  try {
    const { id } = await params

    const image = await prisma.galleryImage.findUnique({
      where: { id }
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ image })
  } catch (error) {
    console.error('Gallery fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/gallery/[id] - Update image (admin only)
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
    const { url, title, category } = body

    const updateData = {}
    if (url != null) updateData.url = url
    if (title != null) updateData.title = title
    if (category != null) updateData.category = category

    const image = await prisma.galleryImage.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ image })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }
    console.error('Gallery update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/gallery/[id] - Delete image (admin only)
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

    await prisma.galleryImage.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Image deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }
    console.error('Gallery delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
