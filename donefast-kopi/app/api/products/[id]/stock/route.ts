import { NextResponse } from "next/server"
import { getServerSupabase } from "@/lib/supabase/server"

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = getServerSupabase()
  const id = params.id
  const body = await req.json().catch(() => ({}))
  const delta = Number(body?.delta ?? 0)
  const reason = (body?.reason as string) || (delta >= 0 ? "restock" : "adjustment")

  if (!Number.isFinite(delta) || delta === 0) {
    return NextResponse.json({ error: "delta harus angka non-zero" }, { status: 400 })
  }

  // Gunakan RPC (opsional) atau transaksikan secara berurutan
  // 1) Update stok
  const { data: prod, error: updErr } = await supabase
    .from("products")
    .update({ updated_at: new Date().toISOString(), stock: undefined })
    .eq("id", id)
    .select("id,stock,price")
    .single()

  if (updErr && updErr.code !== "PGRST116") {
    // fallback: ambil produk dulu
  }

  const { data: current, error: getErr } = await supabase
    .from("products")
    .select("id,stock,price")
    .eq("id", id)
    .single()

  if (getErr || !current) {
    return NextResponse.json({ error: getErr?.message || "Produk tidak ditemukan" }, { status: 404 })
  }

  const newStock = Math.max(0, (current.stock ?? 0) + delta)

  const { error: setErr } = await supabase
    .from("products")
    .update({ stock: newStock, updated_at: new Date().toISOString() })
    .eq("id", id)

  if (setErr) return NextResponse.json({ error: setErr.message }, { status: 500 })

  // 2) Catat movement
  const { error: movErr } = await supabase.from("stock_movements").insert([{ product_id: id, delta, reason }])
  if (movErr) {
    // Tidak memblokir, tapi laporkan
    return NextResponse.json(
      { ok: true, warning: `Movement not recorded: ${movErr.message}`, newStock },
      { status: 200 },
    )
  }

  return NextResponse.json({ ok: true, newStock })
}
