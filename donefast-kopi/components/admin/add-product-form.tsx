"use client"

import { useState } from "react"
import { mutate } from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddProductForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    try {
      const payload = {
        name: String(formData.get("name") || ""),
        price: Number(formData.get("price") || 0),
        stock: Number(formData.get("stock") || 0),
        category: String(formData.get("category") || ""),
        image_url: String(formData.get("image_url") || ""),
      }
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(await res.text())
      await mutate("/api/products")
    } catch (e) {
      console.error("[v0] add product error:", e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Tambah Produk Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input id="name" name="name" placeholder="Espresso" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Harga (Rp)</Label>
            <Input id="price" name="price" type="number" min="0" step="1000" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stok Awal</Label>
            <Input id="stock" name="stock" type="number" min="0" step="1" defaultValue={0} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Kategori</Label>
            <Input id="category" name="category" placeholder="Coffee" />
          </div>
          <div className="md:col-span-2 grid gap-2">
            <Label htmlFor="image_url">Gambar (URL opsional)</Label>
            <Input id="image_url" name="image_url" placeholder="/images/espresso.jpg" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
