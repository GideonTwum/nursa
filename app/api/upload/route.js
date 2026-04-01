import { NextResponse } from 'next/server'
import path from 'path'
import { requireAdmin } from '../../../lib/auth'
import { getSupabaseStorageClient, getStorageBucket } from '../../../lib/supabaseStorage'

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

    const supabase = getSupabaseStorageClient()
    if (!supabase) {
      return NextResponse.json(
        {
          error:
            'Storage not configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment.',
        },
        { status: 503 }
      )
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
    const objectPath = `${Date.now()}-${baseName}${ext}`
    const bucket = getStorageBucket()

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(objectPath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Supabase upload error:', uploadError)
      return NextResponse.json(
        { error: 'Upload failed', details: uploadError.message },
        { status: 500 }
      )
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from(bucket).getPublicUrl(objectPath)

    return NextResponse.json({ url: publicUrl })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Upload failed', details: error.message },
      { status: 500 }
    )
  }
}
