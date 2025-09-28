"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Trash2 } from "lucide-react"

export function CheckoutSummary() {
  const { items, total, clear } = useCart()
  const { toast } = useToast()

  const handlePay = () => {
    if (items.length === 0) return
    toast({
      title: "Pembayaran Berhasil",
      description: "Terima kasih. Pesanan sedang diproses.",
    })
    clear()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pembayaran</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total</span>
          <span className="text-xl font-bold">Rp {total().toLocaleString("id-ID")}</span>
        </div>
        <Button className="w-full" size="lg" disabled={items.length === 0} onClick={handlePay}>
          <CreditCard className="mr-2 h-4 w-4" />
          Bayar Sekarang
        </Button>
        <Button variant="secondary" className="w-full" disabled={items.length === 0} onClick={clear}>
          <Trash2 className="mr-2 h-4 w-4" />
          Kosongkan Keranjang
        </Button>
      </CardContent>
    </Card>
  )
}
