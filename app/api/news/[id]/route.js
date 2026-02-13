import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { requireAdmin } from '../../../../lib/auth'

// GET /api/news/[id] - Single article (public if published; admin can get any)
export async function GET(request, { params }) {
  try {
    const { id } = await params
    const payload = requireAdmin(request)

    const article = await prisma.newsArticle.findUnique({
      where: { id }
    })

    if (!article) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    if (!article.published && !payload) {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ article })
  } catch (error) {
    console.error('News fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// PUT /api/news/[id] - Update article (admin only)
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
    const { title, content, excerpt, image, category, published } = body

    const updateData = {}
    if (title != null) updateData.title = title
    if (content != null) updateData.content = content
    if (excerpt != null) updateData.excerpt = excerpt
    if (image != null) updateData.image = image
    if (category != null) updateData.category = category
    if (published != null) updateData.published = published

    const article = await prisma.newsArticle.update({
      where: { id },
      data: updateData
    })

    return NextResponse.json({ article })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    console.error('News update error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// DELETE /api/news/[id] - Delete article (admin only)
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

    await prisma.newsArticle.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (error) {
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Article not found' },
        { status: 404 }
      )
    }
    console.error('News delete error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
