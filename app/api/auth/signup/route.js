import { NextResponse } from 'next/server'
import prisma from '../../../../lib/db'
import { hashPassword, generateToken } from '../../../../lib/auth'

export async function POST(request) {
  try {
    const body = await request.json()
    const { studentId, firstName, lastName, program, password, isAdmin } = body

    // Administrator accounts must be provisioned through a trusted, private process.
    if (isAdmin) {
      return NextResponse.json({ error: 'Administrator self-registration is disabled' }, { status: 403 })
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