"use client"

import type React from "react"

import { useMemo, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Product } from "@/app/pos/page"
import { ProductCard } from "./product-card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Coffee, CupSoda, Cookie, Grid2X2 } from "lucide-react"

type Props = {
  products: Product[]
}

const categories: Array<Product["category"] | "Semua"> = ["Semua", "Kopi", "Non-Kopi", "Snack"]

type Category = (typeof categories)[number]
const categoryIcon: Record<Category, React.ComponentType<{ className?: string }>> = {
  Semua: Grid2X2,
  Kopi: Coffee,
  "Non-Kopi": CupSoda,
  Snack: Cookie,
}

export function ProductGrid({ products }: Props) {
  const [tab, setTab] = useState<(typeof categories)[number]>("Semua")
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const base = tab === "Semua" ? products : products.filter((p) => p.category === tab)
    if (!q.trim()) return base
    const s = q.toLowerCase()
    return base.filter((p) => p.name.toLowerCase().includes(s))
  }, [tab, products, q])

  const counts = useMemo(
    () => ({
      Semua: products.length,
      Kopi: products.filter((p) => p.category === "Kopi").length,
      "Non-Kopi": products.filter((p) => p.category === "Non-Kopi").length,
      Snack: products.filter((p) => p.category === "Snack").length,
    }),
    [products],
  )

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative rounded-xl border bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Cari menu..."
          className="pl-9 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          aria-label="Cari produk"
        />
      </div>

      <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="w-full">
        <div className="rounded-xl border bg-muted/40 p-1 backdrop-blur supports-[backdrop-filter]:bg-muted/50">
          <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transparent p-0">
            {categories.map((c) => {
              const Icon = categoryIcon[c]
              const active = tab === c
              return (
                <TabsTrigger
                  key={c}
                  value={c}
                  className="
                    h-auto justify-start rounded-lg px-3 py-2
                    data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                    hover:bg-muted/70 transition
                    flex items-center gap-2
                  "
                  aria-label={`Kategori ${c}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{c}</span>
                  <Badge variant={active ? "secondary" : "outline"} className="ml-auto">
                    {counts[c]}
                  </Badge>
                </TabsTrigger>
              )
            })}
          </TabsList>
        </div>

        {/* Konten grid produk dengan empty state */}
        <TabsContent value={tab} className="m-0">
          {filtered.length === 0 ? (
            <div className="rounded-xl border bg-muted/30 p-8 text-center text-muted-foreground">
              <Search className="mx-auto mb-2 h-5 w-5" aria-hidden="true" />
              <p className="text-sm">Tidak ada menu yang cocok. Coba kata kunci lain atau pilih kategori berbeda.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
