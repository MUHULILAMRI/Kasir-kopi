import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

let _supabase: ReturnType<typeof createServerClient> | null = null

export function getServerSupabase() {
  const cookieStore = cookies()

  // Catatan: gunakan env berikut di Project Settings v0/Vercel
  // SUPABASE_URL
  // SUPABASE_ANON_KEY
  // (opsional untuk proses admin yang sensitif) SUPABASE_SERVICE_ROLE_KEY
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !anon) {
      throw new Error("Supabase env vars missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Project Settings.")
    }

    _supabase = createServerClient(url, anon, {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: "", ...options })
        },
      },
    })
  }

  return _supabase
}
