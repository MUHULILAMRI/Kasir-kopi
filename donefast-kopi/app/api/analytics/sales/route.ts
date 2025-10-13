import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = getServerSupabase();
  const { searchParams } = new URL(request.url);
  const period = searchParams.get("period") || "7d"; // e.g., 7d, 30d, all

  let dateFilter = new Date();
  dateFilter.setHours(0, 0, 0, 0);

  switch (period) {
    case "7d":
      dateFilter.setDate(dateFilter.getDate() - 7);
      break;
    case "30d":
      dateFilter.setDate(dateFilter.getDate() - 30);
      break;
    case "all":
      dateFilter = new Date(0); // Epoch time for 'all time'
      break;
    default:
      dateFilter.setDate(dateFilter.getDate() - 7);
      break;
  }

  try {
    // Fetch sales data
    const { data: sales, error: salesError } = await supabase
      .from("sales")
      .select("id, total_amount, payment_method, customer_name, created_at")
      .gte("created_at", dateFilter.toISOString())
      .order("created_at", { ascending: false });

    if (salesError) {
      console.error("Error fetching sales:", salesError);
      return NextResponse.json({ error: salesError.message }, { status: 500 });
    }

    // Fetch sales items to get product-level data
    const salesIds = sales.map(s => s.id);
    const { data: salesItems, error: salesItemsError } = await supabase
      .from("sales_items")
      .select("sale_id, quantity, price_at_sale, product_id, products(name)")
      .in("sale_id", salesIds);

    if (salesItemsError) {
      console.error("Error fetching sales items:", salesItemsError);
      return NextResponse.json({ error: salesItemsError.message }, { status: 500 });
    }

    // Aggregate data for monitoring
    const totalRevenue = sales.reduce((sum, sale) => sum + sale.total_amount, 0);
    const totalTransactions = sales.length;

    // Basic product sales aggregation
    const productSalesMap = new Map<string, { name: string, quantity: number, revenue: number }>();
    salesItems.forEach(item => {
      const productName = item.products?.name || `Product ${item.product_id}`;
      const current = productSalesMap.get(item.product_id) || { name: productName, quantity: 0, revenue: 0 };
      current.quantity += item.quantity;
      current.revenue += item.quantity * item.price_at_sale;
      productSalesMap.set(item.product_id, current);
    });
    const topProducts = Array.from(productSalesMap.values()).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

    return NextResponse.json({
      totalRevenue,
      totalTransactions,
      recentSales: sales,
      topProducts,
    });
  } catch (error: any) {
    console.error("Unhandled error in sales analytics API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
