"use client";

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { Product } from "@/app/pos/page";

type CartItem = { product: Product; qty: number };

export type ReceiptDetails = {
  transactionId: string;
  date: string;
  paymentMethod: 'Tunai' | 'QRIS';
  customerName: string; // Added customerName
  items: CartItem[];
  total: number;
};

type ReceiptDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  receipt: ReceiptDetails | null;
};

export function ReceiptDialog({
  isOpen,
  onClose,
  receipt,
}: ReceiptDialogProps) {
  if (!receipt) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Struk Pembayaran</DialogTitle>
          <DialogDescription>
            Terima kasih atas pesanan Anda!
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span>ID Transaksi:</span>
            <span className="font-medium">{receipt.transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span>Tanggal:</span>
            <span className="font-medium">{receipt.date}</span>
          </div>
          <div className="flex justify-between">
            <span>Metode Pembayaran:</span>
            <span className="font-medium">{receipt.paymentMethod}</span>
          </div>
          {receipt.customerName && ( // Conditionally render customer name
            <div className="flex justify-between">
              <span>Nama Pelanggan:</span>
              <span className="font-medium">{receipt.customerName}</span>
            </div>
          )}
          <Separator className="my-2" />
          <ScrollArea className="h-[200px] pr-4">
            {receipt.items.map((item) => (
              <div key={item.product.id} className="flex justify-between py-1">
                <span>
                  {item.product.name} x {item.qty}
                </span>
                <span>
                  Rp {(item.product.price * item.qty).toLocaleString("id-ID")}
                </span>
              </div>
            ))}
          </ScrollArea>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>Rp {receipt.total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={onClose}>Tutup</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
