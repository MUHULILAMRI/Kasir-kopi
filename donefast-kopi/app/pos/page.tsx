import { Suspense } from "react";
import POSClientPage from "@/components/pos/pos-client-page"; // Import the new client component

export default function POSPage() {
  return (
    <Suspense fallback={<div>Memuat halaman POS...</div>}>
      <POSClientPage />
    </Suspense>
  );
}
