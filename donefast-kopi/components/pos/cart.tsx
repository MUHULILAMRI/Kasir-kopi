"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Minus, Plus, Trash2 } from "lucide-react"

export function Cart() {
  const { items, inc, dec, remove, total } = useCart()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keranjang</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Belum ada item.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((it) => (
              <li key={it.product.id} className="flex items-center justify-between gap-3">
                {/* Info produk */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{it.product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Rp {it.product.price.toLocaleString("id-ID")} • Qty {it.qty}
                  </p>
                </div>

                {/* Line total */}
                <div className="hidden w-24 text-right text-sm font-semibold sm:block">
                  Rp {(it.product.price * it.qty).toLocaleString("id-ID")}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => dec(it.product.id)}
                    aria-label={`Kurangi ${it.product.name}`}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center text-sm" aria-live="polite">
                    {it.qty}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => inc(it.product.id)}
                    aria-label={`Tambah ${it.product.name}`}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(it.product.id)}
                    aria-label={`Hapus ${it.product.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between border-t pt-3">
          <span className="text-sm text-muted-foreground">Subtotal</span>
          <span className="font-semibold">Rp {total().toLocaleString("id-ID")}</span>
        </div>
      </CardContent>
    </Card>
  )
}
