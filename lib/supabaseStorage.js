import { createClient } from '@supabase/supabase-js'

function getStorageClient() {
  const url = process.env.SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceRoleKey) {
    return null
  }
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getStorageBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET || 'nursa-images'
}

export function getSupabaseStorageClient() {
  return getStorageClient()
}
