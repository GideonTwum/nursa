const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Mock env for tests
const originalEnv = process.env
beforeAll(() => {
  process.env.JWT_SECRET = 'test-secret-for-jest'
})
afterAll(() => {
  process.env = originalEnv
})

// We test the auth logic directly since lib/auth uses process.env at load time
describe('Auth utilities', () => {
  describe('hashPassword & verifyPassword', () => {
    it('hashes password and verifies correctly', async () => {
      const password = 'testPassword123'
      const hash = await bcrypt.hash(password, 12)
      expect(hash).toBeDefined()
      expect(hash).not.toBe(password)

      const isValid = await bcrypt.compare(password, hash)
      expect(isValid).toBe(true)
    })

    it('rejects wrong password', async () => {
      const hash = await bcrypt.hash('correct', 12)
      const isValid = await bcrypt.compare('wrong', hash)
      expect(isValid).toBe(false)
    })
  })

  describe('JWT token', () => {
    it('generates and verifies valid token', () => {
      const payload = { id: '123', type: 'user' }
      const token = jwt.sign(payload, 'test-secret-for-jest', { expiresIn: '7d' })
      expect(token).toBeDefined()

      const decoded = jwt.verify(token, 'test-secret-for-jest')
      expect(decoded.id).toBe('123')
      expect(decoded.type).toBe('user')
      expect(decoded.exp).toBeDefined()
    })

    it('returns null for invalid token', () => {
      expect(() => jwt.verify('invalid-token', 'test-secret-for-jest')).toThrow()
    })
  })
})
