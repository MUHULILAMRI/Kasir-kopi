"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type KPI = {
  totalSku: number
  totalUnits: number
  stockValue: number
  lowStock: number
}

export function AnalyticsCards() {
  const { data } = useSWR<{ kpi: KPI }>("/api/analytics/inventory", fetcher, {
    refreshInterval: 15_000,
  })

  const k = data?.kpi
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Total SKU</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{k?.totalSku ?? "-"}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Total Unit</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{k?.totalUnits ?? "-"}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Nilai Stok</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {k ? `Rp ${k.stockValue.toLocaleString("id-ID")}` : "-"}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">Low Stock (&lt;10)</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">{k?.lowStock ?? "-"}</CardContent>
      </Card>
    </div>
  )
}
