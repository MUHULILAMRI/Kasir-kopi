"use client"

import { cn } from "@/lib/utils"

export function BrandHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-start gap-3">
          {/* Ikon brand */}
          <div
            aria-hidden="true"
            className="mt-1 hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary md:flex"
          >
            {/* gunakan ikon sederhana berbasis CSS (tanpa SVG custom) */}
            <span className="text-lg">☕</span>
          </div>

          <div>
            <h1
              className={cn(
                "text-balance font-sans text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl",
                "text-primary",
              )}
            >
              DoneFast Kopi
            </h1>
            <p className="text-pretty text-sm text-muted-foreground md:text-base">{"Ngopi Aja Dulu"}</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">POS Mode</span>
        </div>
      </div>
    </header>
  )
}
