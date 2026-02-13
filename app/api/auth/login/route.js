import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { verifyPassword, generateToken } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()

    const { studentId, adminId, password, isAdmin } = body

    const identifier = isAdmin ? adminId : studentId

    // Validate required fields
    if (!identifier || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (isAdmin) {
      // Admin login
      const admin = await prisma.admin.findUnique({
        where: { adminId: identifier }
      })

      if (!admin || !(await verifyPassword(password, admin.password))) {
        return NextResponse.json(
          { error: 'Invalid Admin ID or password' },
          { status: 401 }
        )
      }

      const token = generateToken({
        id: admin.id,
        adminId: admin.adminId,
        type: 'admin'
      })

      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: admin.id,
          adminId: admin.adminId,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          isAdmin: true
        },
        token
      })
    } else {
      // Student login
      const user = await prisma.user.findUnique({
        where: { studentId: identifier }
      })

      if (!user || !(await verifyPassword(password, user.password))) {
        return NextResponse.json(
          { error: 'Invalid Student ID or password' },
          { status: 401 }
        )
      }

      const token = generateToken({
        id: user.id,
        studentId: user.studentId,
        type: 'user'
      })

      return NextResponse.json({
        message: 'Login successful',
        user: {
          id: user.id,
          studentId: user.studentId,
          firstName: user.firstName,
          lastName: user.lastName,
          program: user.program,
          isAdmin: false
        },
        token
      })
    }
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}
