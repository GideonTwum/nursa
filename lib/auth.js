import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET

export async function hashPassword(password) {
  return await bcrypt.hash(password, 12)
}

export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
  }
  
  export function verifyToken(token) {
    try {
      return jwt.verify(token, JWT_SECRET)
    } catch (error) {
      return null
    }
  }
  
  export function getUserFromRequest(request) {
    const authHeader = request.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return null
    }
    const token = authHeader.split(' ')[1]
    return verifyToken(token)
  }

export function requireAdmin(request) {
  const payload = getUserFromRequest(request)
  if (!payload || payload.type !== 'admin') {
    return null
  }
  return payload
}

export function requireUser(request) {
  const payload = getUserFromRequest(request)
  if (!payload || payload.type !== 'user') {
    return null
  }
  return payload
}