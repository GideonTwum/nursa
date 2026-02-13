import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin } from '../../../lib/auth'

// GET /api/news - List articles (public: published only; admin: all)
export async function GET(request) {
  try {
    const payload = requireAdmin(request)
    const isAdmin = !!payload

    const articles = await prisma.newsArticle.findMany({
      where: isAdmin ? {} : { published: true },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      articles,
      totalArticles: articles.length
    })
  } catch (error) {
    console.error('News fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}

// POST /api/news - Create article (admin only)
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
    const { title, content, excerpt, image, category, published } = body

    if (!title || !content || !excerpt || !category) {
      return NextResponse.json(
        { error: 'Missing required fields: title, content, excerpt, category' },
        { status: 400 }
      )
    }

    const article = await prisma.newsArticle.create({
      data: {
        title,
        content,
        excerpt,
        image: image || null,
        category,
        published: published ?? false
      }
    })

    return NextResponse.json({ article })
  } catch (error) {
    console.error('News create error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
