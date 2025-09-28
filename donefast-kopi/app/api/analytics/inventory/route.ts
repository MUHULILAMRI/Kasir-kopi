import { NextResponse } from "next/server"
import { getServerSupabase } from "@/lib/supabase/server"

function daysAgo(d: number) {
  const dt = new Date()
  dt.setDate(dt.getDate() - d)
  return dt.toISOString()
}

export async function GET(req: Request) {
  const url = new URL(req.url)
  const days = Number(url.searchParams.get("days") ?? 14)
  const since = daysAgo(days)

  const supabase = getServerSupabase()

  // KPI agregat
  const { data: prods, error: prodErr } = await supabase.from("products").select("id, price, stock")
  if (prodErr) return NextResponse.json({ error: prodErr.message }, { status: 500 })

  const totalSku = prods?.length ?? 0
  const totalUnits = prods?.reduce((a, p) => a + (p.stock ?? 0), 0) ?? 0
  const stockValue = prods?.reduce((a, p) => a + (p.price ?? 0) * (p.stock ?? 0), 0) ?? 0
  const lowStock = prods?.filter((p) => (p.stock ?? 0) < 10).length ?? 0

  // Tren movement
  const { data: movs, error: movErr } = await supabase
    .from("stock_movements")
    .select("delta, created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: true })
  if (movErr) return NextResponse.json({ error: movErr.message }, { status: 500 })

  // Agregasi per hari
  const byDay = new Map<string, number>()
  for (const m of movs ?? []) {
    const day = new Date(m.created_at).toISOString().slice(0, 10)
    byDay.set(day, (byDay.get(day) ?? 0) + (m.delta ?? 0))
  }
  const series = Array.from(byDay.entries())
    .sort((a, b) => (a[0] < b[0] ? -1 : 1))
    .map(([date, delta]) => ({ date, delta }))

  return NextResponse.json({
    kpi: { totalSku, totalUnits, stockValue, lowStock },
    series,
  })
}
