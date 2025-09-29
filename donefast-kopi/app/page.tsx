import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Coffee, UserCog } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-dvh bg-background text-foreground">
      <Image
        src="/cafe-latte.jpg"
        alt="Cafe Latte"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0 opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-0" />
      <main className="z-10 flex flex-col items-center justify-center text-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <Image
              src="/placeholder-logo.svg"
              alt="DoneFast Kopi Logo"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <CardTitle className="text-4xl font-bold">
              Selamat Datang di DoneFast Kopi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Pilih peran Anda untuk melanjutkan:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/pos">
                <Button size="lg" className="w-full">
                  <Coffee className="mr-2 h-5 w-5" />
                  Kasir (POS)
                </Button>
              </Link>
              <Link href="/admin">
                <Button size="lg" variant="outline" className="w-full">
                  <UserCog className="mr-2 h-5 w-5" />
                  Admin
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}