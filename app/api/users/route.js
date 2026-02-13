import { NextResponse } from 'next/server'
import prisma from '../../../lib/db'
import { requireAdmin } from '../../../lib/auth'

export async function GET(request) {
  try {
    const payload = requireAdmin(request)

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        studentId: true,
        firstName: true,
        lastName: true,
        program: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    const totalAdmins = await prisma.admin.count()

    return NextResponse.json({
      users,
      totalUsers: users.length,
      totalAdmins
    })
  } catch (error) {
    console.error('Users fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
