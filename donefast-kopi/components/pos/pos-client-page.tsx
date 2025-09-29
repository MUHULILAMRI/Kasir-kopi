"use client";
import { Suspense, useState, useEffect } from "react";
import { BrandHeader } from "@/components/pos/brand-header";
import { ProductGrid } from "@/components/pos/product-grid";
import { Cart } from "@/components/pos/cart";
import { CheckoutSummary } from "@/components/pos/checkout-summary";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input"; // Import Input
import { Label } from "@/components/ui/label"; // Import Label for the input field
import { useRouter, useSearchParams } from "next/navigation";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  imageAlt: string;
  imageUrl: string;
};

export default function POSClientPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState<string>(""); // State for customer name

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/products?category=${currentCategory}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        const fetchedProducts: Product[] = data.products.map((p: any) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          category: p.category ?? "Uncategorized",
          imageAlt: p.name,
          imageUrl: p.image_url ?? "/placeholder.svg",
        }));
        setProducts(fetchedProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentCategory]);

  const handleCategoryChange = (category: string) => {
    router.push(`/pos?category=${category}`);
  };

  if (error) {
    return <div>Error loading products: {error}</div>;
  }

  return (
    <main className="min-h-dvh">
      <BrandHeader />
      <section className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <Tabs value={currentCategory} onValueChange={handleCategoryChange} className="mb-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="Coffee">Kopi</TabsTrigger>
                <TabsTrigger value="Non Coffee">Non Kopi</TabsTrigger>
                <TabsTrigger value="Snack">Snack</TabsTrigger>
              </TabsList>
              <TabsContent value={currentCategory}>
                {loading ? (
                  <div>Memuat produk...</div>
                ) : (
                  <ProductGrid products={products} />
                )}
              </TabsContent>
            </Tabs>
          </div>
          <aside className="space-y-4">
            {/* Customer Name Input */}
            <div className="space-y-2">
              <Label htmlFor="customerName">Nama Pelanggan</Label>
              <Input
                id="customerName"
                placeholder="Masukkan nama pelanggan"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <Suspense>
              <Cart />
            </Suspense>
            <CheckoutSummary customerName={customerName} /> {/* Pass customerName */}
          </aside>
        </div>
      </section>
    </main>
  );
}
