"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import type { Product } from "@/app/pos/page"
import { Plus } from "lucide-react"

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <Card className="h-full overflow-hidden transition-all hover:shadow-lg focus-within:shadow-lg">
      <CardHeader className="p-0">
        {/* Gambar produk */}
        <div className="relative aspect-square w-full bg-muted">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.imageUrl || "/placeholder.svg?height=600&width=600&query=coffee%20product%20image"}
            alt={product.imageAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-1 p-3">
        <h3 className="line-clamp-1 font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">Rp {product.price.toLocaleString("id-ID")}</p>
        {/* kategori sebagai teks halus agar konsisten */}
        {product.category ? <p className="text-xs text-muted-foreground/80">{product.category}</p> : null}
      </CardContent>
      <CardFooter className="p-3 pt-0">
        <Button className="w-full" onClick={() => add(product)} aria-label={`Tambah ${product.name} ke keranjang`}>
          <Plus className="mr-2 h-4 w-4" />
          Tambah
        </Button>
      </CardFooter>
    </Card>
  )
}
