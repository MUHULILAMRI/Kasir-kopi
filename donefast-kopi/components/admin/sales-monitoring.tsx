"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DollarSign, ShoppingCart, Package } from "lucide-react";

type SalesData = {
  totalRevenue: number;
  totalTransactions: number;
  recentSales: Array<{ id: string; total_amount: number; payment_method: string; customer_name?: string; created_at: string }>;
  topProducts: Array<{ name: string; quantity: number; revenue: number }>;
};

export function SalesMonitoring() {
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    const fetchSalesData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/analytics/sales?period=${period}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch sales data");
        }
        const data: SalesData = await response.json();
        setSalesData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [period]);

  if (loading) return <div className="text-center py-8">Memuat data penjualan...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!salesData) return <div className="text-center py-8">Tidak ada data penjualan.</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Pemantauan Penjualan</h2>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Periode" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 Hari Terakhir</SelectItem>
            <SelectItem value="30d">30 Hari Terakhir</SelectItem>
            <SelectItem value="all">Semua Waktu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {salesData.totalRevenue.toLocaleString("id-ID")}</div>
            <p className="text-xs text-muted-foreground">Berdasarkan periode yang dipilih</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transaksi</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{salesData.totalTransactions}</div>
            <p className="text-xs text-muted-foreground">Jumlah transaksi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produk Terlaris (Pendapatan)</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <ul className="text-sm">
              {salesData.topProducts.length > 0 ? (
                salesData.topProducts.map((product, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{product.name}</span>
                    <span>Rp {product.revenue.toLocaleString("id-ID")}</span>
                  </li>
                ))
              ) : (
                <li>Tidak ada produk terlaris.</li>
              )}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Penjualan Terbaru</CardTitle>
          <CardDescription>Daftar transaksi penjualan terbaru.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID Transaksi</TableHead>
                <TableHead>Pelanggan</TableHead>
                <TableHead>Metode</TableHead>
                <TableHead className="text-right">Jumlah</TableHead>
                <TableHead>Tanggal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.recentSales.length > 0 ? (
                salesData.recentSales.map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="font-medium">{sale.id.substring(0, 8)}...</TableCell>
                    <TableCell>{sale.customer_name || "Anonim"}</TableCell>
                    <TableCell>{sale.payment_method}</TableCell>
                    <TableCell className="text-right">Rp {sale.total_amount.toLocaleString("id-ID")}</TableCell>
                    <TableCell>{new Date(sale.created_at).toLocaleString()}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Tidak ada penjualan terbaru.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
