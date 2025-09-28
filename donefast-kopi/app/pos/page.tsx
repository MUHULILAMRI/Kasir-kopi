import { Suspense } from "react"
import { BrandHeader } from "@/components/pos/brand-header"
import { ProductGrid } from "@/components/pos/product-grid"
import { Cart } from "@/components/pos/cart"
import { CheckoutSummary } from "@/components/pos/checkout-summary"

export type Product = {
  id: string
  name: string
  price: number
  category: "Kopi" | "Non-Kopi" | "Snack"
  imageAlt: string
  imageUrl: string
}

const products: Product[] = [
  {
    id: "esp",
    name: "Espresso",
    price: 18000,
    category: "Kopi",
    imageAlt: "Segelas espresso",
    imageUrl: "/espresso-shot.jpg",
  },
  {
    id: "amr",
    name: "Americano",
    price: 22000,
    category: "Kopi",
    imageAlt: "Americano panas",
    imageUrl: "/americano-coffee.png",
  },
  {
    id: "ltt",
    name: "Cafe Latte",
    price: 28000,
    category: "Kopi",
    imageAlt: "Cafe latte art",
    imageUrl: "/cafe-latte.jpg",
  },
  {
    id: "cpc",
    name: "Cappuccino",
    price: 28000,
    category: "Kopi",
    imageAlt: "Cappuccino dengan foam",
    imageUrl: "/frothy-cappuccino.png",
  },
  {
    id: "moc",
    name: "Mocha",
    price: 30000,
    category: "Kopi",
    imageAlt: "Mocha cokelat",
    imageUrl: "/mocha-coffee.png",
  },
  {
    id: "mch",
    name: "Matcha Latte",
    price: 32000,
    category: "Non-Kopi",
    imageAlt: "Matcha latte hijau",
    imageUrl: "/matcha-latte.png",
  },
  {
    id: "tea",
    name: "Lemon Tea",
    price: 22000,
    category: "Non-Kopi",
    imageAlt: "Teh lemon segar",
    imageUrl: "/lemon-tea.jpg",
  },
  {
    id: "crs",
    name: "Croissant",
    price: 18000,
    category: "Snack",
    imageAlt: "Croissant butter",
    imageUrl: "/golden-croissant.png",
  },
  {
    id: "brw",
    name: "Brownies",
    price: 20000,
    category: "Snack",
    imageAlt: "Brownies cokelat",
    imageUrl: "/chocolate-brownies.jpg",
  },
]

export default function POSPage() {
  return (
    <main className="min-h-dvh">
      <BrandHeader />
      <section className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <div className="grid gap-6 md:grid-cols-[1fr_360px]">
          <div className="min-w-0">
            <ProductGrid products={products} />
          </div>
          <aside className="space-y-4">
            <Suspense>
              <Cart />
            </Suspense>
            <CheckoutSummary />
          </aside>
        </div>
      </section>
    </main>
  )
}
