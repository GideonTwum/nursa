import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { getUserFromRequest } from '../../../../lib/auth'

export async function GET(request) {
  try {
    const payload = getUserFromRequest(request)

    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (payload.type === 'admin') {
      const admin = await prisma.admin.findUnique({
        where: { id: payload.id }
      })

      if (!admin) {
        return NextResponse.json(
          { error: 'Admin not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        user: {
          id: admin.id,
          adminId: admin.adminId,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          isAdmin: true
        }
      })
    } else {
      const user = await prisma.user.findUnique({
        where: { id: payload.id }
      })

      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        )
      }

      return NextResponse.json({
        user: {
          id: user.id,
          studentId: user.studentId,
          firstName: user.firstName,
          lastName: user.lastName,
          program: user.program,
          isAdmin: false
        }
      })
    }
  } catch (error) {
    console.error('Me error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
