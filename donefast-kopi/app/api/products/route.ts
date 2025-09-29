import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = getServerSupabase();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = supabase
    .from("products")
    .select("id,name,price,stock,category,image_url,created_at,updated_at");

  if (category && category !== "all") {
    query = query.eq("category", category);
  }

  const { data, error } = await query.order("name", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data ?? [] });
}

export async function POST(req: Request) {
  const supabase = getServerSupabase();
  
  // --- Start Debugging ---
  const { data: { user } } = await supabase.auth.getUser();
  console.log("User metadata:", user?.user_metadata);
  // --- End Debugging ---

  const body = await req.json().catch(() => ({}));
  const { name, price, stock = 0, category, image_url } = body || {};

  if (!name || typeof price !== "number") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, price, stock, category, image_url }])
    .select("id,name,price,stock,category,image_url,created_at,updated_at")
    .single();

  if (error) {
    // Log the error to the console for more details
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ product: data }, { status: 201 });
}
