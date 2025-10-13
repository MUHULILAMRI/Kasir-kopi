import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Coffee, Settings } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-700 text-white">
      <div className="relative mb-8 flex flex-col items-center">
        {/* Coffee Animation Placeholder */}
        <div className="coffee-cup-animation relative w-24 h-24 mb-4">
          <Coffee className="w-full h-full text-amber-400 drop-shadow-lg" />
          <div className="steam-animation absolute -top-4 left-1/2 -translate-x-1/2 w-1 h-10 rounded-full bg-gray-400 opacity-0" style={{ animationDelay: '0s' }}></div>
          <div className="steam-animation absolute -top-4 left-[45%] -translate-x-1/2 w-1 h-8 rounded-full bg-gray-400 opacity-0" style={{ animationDelay: '1s' }}></div>
          <div className="steam-animation absolute -top-4 left-[55%] -translate-x-1/2 w-1 h-12 rounded-full bg-gray-400 opacity-0" style={{ animationDelay: '2s' }}></div>
        </div>
        <h1 className="text-5xl font-bold tracking-tight mb-2 text-amber-200 drop-shadow-md">Kasir Kopi</h1>
        <p className="text-lg text-gray-300">Pilih peran Anda untuk memulai</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-4xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <Link href="/pos" passHref>
            <Button variant="outline" size="lg" className="w-64 h-24 text-xl">
              <Coffee className="w-8 h-8 mr-4" />
              Point of Sale
            </Button>
          </Link>
          <p className="text-gray-400 text-center">Kelola transaksi penjualan harian.</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Link href="/admin" passHref>
            <Button variant="outline" size="lg" className="w-64 h-24 text-xl">
              <Settings className="w-8 h-8 mr-4" />
              Admin Dashboard
            </Button>
          </Link>
          <p className="text-gray-400 text-center">Kelola produk, inventaris, dan laporan.</p>
        </div>
      </div>
    </main>
  );
}