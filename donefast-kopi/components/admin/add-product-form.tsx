"use client";

import { useState } from "react";
import { mutate } from "swr";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from 'uuid';

export function AddProductForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = getBrowserSupabase();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const imageUrl = String(formData.get("imageUrl") || "");

    try {

      const payload = {
        name: String(formData.get("name") || ""),
        price: Number(formData.get("price") || 0),
        stock: Number(formData.get("stock") || 0),
        category: String(formData.get("category") || ""),
        image_url: imageUrl,
      };

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      await mutate("/api/products");
      event.currentTarget.reset();

    } catch (e: any) {
      console.error("[v0] add product error:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Tambah Produk Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="imageUrl">URL Gambar Produk</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="text"
              placeholder="https://example.com/image.jpg"
            />
          </div>
          {error && (
            <div className="md:col-span-2 text-sm text-red-500">
              <strong>Error:</strong> {error}
            </div>
          )}
          <div className="md:col-span-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan Produk"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
