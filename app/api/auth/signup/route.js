import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { hashPassword, generateToken } from '../../../../lib/auth'

const ADMIN_SECRET_CODE = 'NURSA2026'

export async function POST(request) {
  try {
    const body = await request.json()

    const { studentId, adminId, firstName, lastName, program, role, adminCode, password, isAdmin } = body

    if (isAdmin) {
      // Admin signup
      if (!adminId || !firstName || !lastName || !role || !adminCode || !password) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        )
      }

      if (adminCode !== ADMIN_SECRET_CODE) {
        return NextResponse.json(
          { error: 'Invalid admin registration code' },
          { status: 403 }
        )
      }

      if (password.length < 6) {
        return NextResponse.json(
          { error: 'Password must be at least 6 characters' },
          { status: 400 }
        )
      }

      const existingAdmin = await prisma.admin.findUnique({
        where: { adminId }
      })

      if (existingAdmin) {
        return NextResponse.json(
          { error: 'An admin with this ID already exists' },
          { status: 409 }
        )
      }

      const hashedPassword = await hashPassword(password)

      const admin = await prisma.admin.create({
        data: {
          adminId,
          firstName,
          lastName,
          role,
          password: hashedPassword
        }
      })

      const token = generateToken({
        id: admin.id,
        adminId: admin.adminId,
        type: 'admin'
      })

      return NextResponse.json({
        message: 'Admin account created successfully',
        user: {
          id: admin.id,
          adminId: admin.adminId,
          firstName: admin.firstName,
          lastName: admin.lastName,
          role: admin.role,
          isAdmin: true
        },
        token
      }, { status: 201 })
    }

    // Student signup
    if (!studentId || !firstName || !lastName || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    const existing = await prisma.user.findUnique({
      where: { studentId }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'User with this Student ID already exists' },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        studentId,
        firstName,
        lastName,
        program: program || '',
        password: hashedPassword
      }
    })

    const token = generateToken({
      id: user.id,
      studentId: user.studentId,
      type: 'user'
    })

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        studentId: user.studentId,
        firstName: user.firstName,
        lastName: user.lastName,
        program: user.program,
        isAdmin: false
      },
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    )
  }
}