import { AdminHeader } from "@/components/admin/admin-header"
import { AnalyticsCards } from "@/components/admin/analytics-cards"
import { StockChart } from "@/components/admin/stock-chart"
import { InventoryTable } from "@/components/admin/inventory-table"
import { AddProductForm } from "@/components/admin/add-product-form"

export const metadata = {
  title: "DoneFast Kopi — Admin",
}

export default async function AdminPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <AdminHeader />
      <section className="px-4 py-4 space-y-6">
        <AnalyticsCards />
        <StockChart />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InventoryTable />
          </div>
          <div className="lg:col-span-1">
            <AddProductForm />
          </div>
        </div>
      </section>
    </main>
  )
}
