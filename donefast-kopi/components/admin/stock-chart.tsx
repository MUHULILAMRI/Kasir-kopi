"use client"

import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts"

type SeriesPoint = { date: string; delta: number }

export function StockChart() {
  const { data } = useSWR<{ series: SeriesPoint[] }>("/api/analytics/inventory?days=14", fetcher, {
    refreshInterval: 15_000,
  })
  const series = data?.series ?? []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Tren Pergerakan Stok (14 hari)</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={series}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="delta" stroke="hsl(var(--primary))" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
