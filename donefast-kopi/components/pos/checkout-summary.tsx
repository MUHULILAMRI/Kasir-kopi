"use client"

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { useToast } from "@/hooks/use-toast"
import { CreditCard, Trash2 } from "lucide-react"
import { PaymentMethodDialog } from "./payment-method-dialog";
import { ReceiptDialog, ReceiptDetails } from "./receipt-dialog";

// Add customerName to props
export function CheckoutSummary({ customerName }: { customerName: string }) {
  const { items, total, clear } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentMethodDialog, setShowPaymentMethodDialog] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [receiptDetails, setReceiptDetails] = useState<ReceiptDetails | null>(null);

  const handlePayClick = () => {
    console.log("handlePayClick triggered.");
    if (items.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Harap tambahkan item ke keranjang sebelum membayar.",
        variant: "destructive",
      });
      return;
    }
    setShowPaymentMethodDialog(true);
  };

  const processPayment = async (paymentMethod: 'Tunai' | 'QRIS') => {
    setShowPaymentMethodDialog(false); // Close payment method dialog
    setIsProcessing(true);
    console.log("Processing payment with method:", paymentMethod, "for customer:", customerName);

    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include customerName in the request body
        body: JSON.stringify({ cartItems: items, paymentMethod, customerName }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Gagal memproses transaksi');
      }

      const result = await res.json();
      
      // Assuming the API returns transactionId and date
      const newReceiptDetails: ReceiptDetails = {
        transactionId: result.transactionId || `TRX-${Date.now()}`,
        date: new Date().toLocaleString(),
        paymentMethod,
        items: items,
        total: total(),
        customerName: customerName, // Include customerName in receipt details
      };
      setReceiptDetails(newReceiptDetails);
      setShowReceiptDialog(true); // Open receipt dialog

      toast({
        title: "Pembayaran Berhasil",
        description: "Terima kasih. Pesanan sedang diproses.",
        duration: 5000, // Make toast visible longer
      });
      clear();
    } catch (error: any) {
      console.error("Payment processing error:", error);
      toast({
        title: "Pembayaran Gagal",
        description: error.message || "Terjadi kesalahan saat memproses pembayaran.",
        variant: "destructive",
        duration: 7000, // Make toast visible longer
      });
    } finally {
      setIsProcessing(false);
    }
  };

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
        <Button className="w-full" size="lg" disabled={items.length === 0 || isProcessing} onClick={handlePayClick}>
          <CreditCard className="mr-2 h-4 w-4" />
          {isProcessing ? "Memproses..." : "Bayar Sekarang"}
        </Button>
        <Button variant="secondary" className="w-full" disabled={items.length === 0} onClick={clear}>
          <Trash2 className="mr-2 h-4 w-4" />
          Kosongkan Keranjang
        </Button>
      </CardContent>

      <PaymentMethodDialog
        isOpen={showPaymentMethodDialog}
        onClose={() => setShowPaymentMethodDialog(false)}
        onSelectPaymentMethod={processPayment}
        totalAmount={total()}
      />

      <ReceiptDialog
        isOpen={showReceiptDialog}
        onClose={() => setShowReceiptDialog(false)}
        receipt={receiptDetails}
      />
    </Card>
  );
}

