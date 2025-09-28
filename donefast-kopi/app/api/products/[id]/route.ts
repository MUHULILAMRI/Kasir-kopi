import { NextResponse } from "next/server"
import { getServerSupabase } from "@/lib/supabase/server"

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const supabase = getServerSupabase()
  const id = params.id

  // Hapus product
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
