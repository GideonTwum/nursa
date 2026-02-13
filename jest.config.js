/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^next/image$': '<rootDir>/__mocks__/next/image.js',
  },
  testMatch: ['**/__tests__/**/*.test.{js,jsx}'],
}
