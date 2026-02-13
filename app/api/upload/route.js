import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { requireAdmin } from '../../../lib/auth'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads')
const MAX_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9.-]/g, '_').slice(0, 100)
}

export async function POST(request) {
  try {
    const payload = requireAdmin(request)
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file')

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Max 5MB.' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Use JPEG, PNG, GIF, or WebP.' },
        { status: 400 }
      )
    }

    const ext = path.extname(file.name) || '.jpg'
    const baseName = sanitizeFilename(path.basename(file.name, ext))
    const filename = `${Date.now()}-${baseName}${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)

    await mkdir(UPLOAD_DIR, { recursive: true })
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes))

    const url = `/uploads/${filename}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    )
  }
}
