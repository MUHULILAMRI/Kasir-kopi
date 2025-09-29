"use client";

import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type PaymentMethodDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectPaymentMethod: (method: 'Tunai' | 'QRIS') => void;
  totalAmount: number;
};

export function PaymentMethodDialog({
  isOpen,
  onClose,
  onSelectPaymentMethod,
  totalAmount,
}: PaymentMethodDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Pilih Metode Pembayaran</AlertDialogTitle>
          <AlertDialogDescription>
            Total yang harus dibayar: <span className="font-bold">Rp {totalAmount.toLocaleString("id-ID")}</span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid gap-4 py-4">
          <Button onClick={() => onSelectPaymentMethod('Tunai')} className="w-full">
            Tunai
          </Button>
          <Button onClick={() => onSelectPaymentMethod('QRIS')} className="w-full">
            QRIS
          </Button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" onClick={onClose}>Batal</Button>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
