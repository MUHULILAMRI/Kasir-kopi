"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { getBrowserSupabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function AdminHeader() {
  const router = useRouter();
  const supabase = getBrowserSupabase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3">
      <div className="flex items-center gap-3">
        <Image
          src="/placeholder-logo.png"
          alt="DoneFast Kopi Logo"
          width={32}
          height={32}
          className="rounded"
        />
        <div>
          <h1 className="text-lg font-semibold text-foreground text-balance">
            DoneFast Kopi — Admin
          </h1>
          <p className="text-xs text-muted-foreground">"Ngopi Aja Dulu"</p>
        </div>
      </div>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <LogOut className="mr-2 h-4 w-4" />
        Logout
      </Button>
    </header>
  );
}
