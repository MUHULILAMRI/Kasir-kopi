import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { AdminHeader } from "@/components/admin/admin-header";
import { AnalyticsCards } from "@/components/admin/analytics-cards";
import { StockChart } from "@/components/admin/stock-chart";
import { InventoryTable } from "@/components/admin/inventory-table";
import { AddProductForm } from "@/components/admin/add-product-form";

export const metadata = {
  title: "DoneFast Kopi — Admin",
};

export default async function AdminPage() {
  const supabase = getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  if (user.user_metadata?.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <AdminHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-6">
        <AnalyticsCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <InventoryTable />
          </div>
          <div className="space-y-6">
            <AddProductForm />
            <StockChart />
          </div>
        </div>
      </main>
    </div>
  );
}
