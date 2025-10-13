import { NextResponse } from "next/server"
import { getServerSupabase } from "@/lib/supabase/server"

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const supabase = getServerSupabase()
  const id = params.id

  console.log(`Attempting to delete product with ID: ${id}`);
  // Hapus product
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) {
    console.error(`Error deleting product ${id}:`, error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  console.log(`Product ${id} deleted successfully.`);

  return NextResponse.json({ ok: true })
}
