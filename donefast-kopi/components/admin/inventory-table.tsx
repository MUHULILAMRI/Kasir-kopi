"use client"

import useSWR, { mutate } from "swr"
import { fetcher } from "@/lib/fetcher"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useState } from "react"

type Product = {
  id: string
  name: string
  price: number
  stock: number
  category: string | null
  image_url: string | null
}

export function InventoryTable() {
  const { data, isLoading } = useSWR<{ products: Product[] }>("/api/products", fetcher, {
    refreshInterval: 10_000,
  })
  const products = data?.products ?? []

  async function adjustStock(id: string, delta: number, reason?: string) {
    const res = await fetch(`/api/products/${id}/stock`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delta, reason }),
    })
    if (!res.ok) throw new Error(await res.text())
    await Promise.all([mutate("/api/products"), mutate("/api/analytics/inventory")])
  }

  async function deleteProduct(id: string) {
    if (!confirm("Hapus produk ini?")) return
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" })
    if (!res.ok) throw new Error(await res.text())
    await Promise.all([mutate("/api/products"), mutate("/api/analytics/inventory")])
  }

  if (isLoading) return <div className="text-sm text-muted-foreground">Memuat inventori...</div>

  return (
    <div className="rounded-md border border-border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produk</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead className="text-right">Harga</TableHead>
            <TableHead className="text-right">Stok</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <Row key={p.id} p={p} onAdjust={adjustStock} onDelete={deleteProduct} />
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Row({
  p,
  onAdjust,
  onDelete,
}: {
  p: Product
  onAdjust: (id: string, delta: number, reason?: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}) {
  const [qty, setQty] = useState<number>(1)

  return (
    <TableRow>
      <TableCell className="font-medium">{p.name}</TableCell>
      <TableCell>{p.category ?? "-"}</TableCell>
      <TableCell className="text-right">Rp {p.price.toLocaleString("id-ID")}</TableCell>
      <TableCell className="text-right">{p.stock ?? 0}</TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <Input
            type="number"
            min="1"
            step="1"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value || 1))}
            className="w-20"
            aria-label="Jumlah"
          />
          <Button variant="secondary" onClick={() => onAdjust(p.id, qty, "restock")}>
            + Stok
          </Button>
          <Button variant="outline" onClick={() => onAdjust(p.id, -qty, "shrinkage")}>
            - Stok
          </Button>
          <Button variant="destructive" onClick={() => onDelete(p.id)}>
            Hapus
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
