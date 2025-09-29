import { createBrowserClient } from '@supabase/ssr'

export function getBrowserSupabase() {
  // Note: use the same env vars as the server client
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !anon) {
    // This should be caught by the build process, but just in case
    throw new Error('Supabase client-side env vars missing.')
  }

  return createBrowserClient(url, anon)
}
