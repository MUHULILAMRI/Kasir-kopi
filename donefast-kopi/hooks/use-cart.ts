"use client"

import useSWR from "swr"
import type { Product } from "@/app/pos/page"

type CartItem = { product: Product; qty: number }
type CartState = { items: CartItem[] }

const STORAGE_KEY = "donefast:cart"

function readStorage(): CartState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as CartState) : null
  } catch {
    return null
  }
}

function writeStorage(state: CartState) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

export function useCart() {
  const { data, mutate } = useSWR<CartState>("cart", {
    fallbackData: { items: [] },
  })

  // Helper untuk update sekaligus persist
  const setCart = (next: CartState) => {
    writeStorage(next)
    mutate(next, { revalidate: false })
  }

  // Init dari localStorage (sekali saat mount)
  if (typeof window !== "undefined" && data?.items.length === 0) {
    const stored = readStorage()
    if (stored && stored.items.length > 0) {
      mutate(stored, { revalidate: false })
    }
  }

  const add = (product: Product) => {
    const items = [...(data?.items ?? [])]
    const i = items.findIndex((it) => it.product.id === product.id)
    if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + 1 }
    else items.push({ product, qty: 1 })
    setCart({ items })
  }

  const inc = (id: string) => {
    const items = (data?.items ?? []).map((it) => (it.product.id === id ? { ...it, qty: it.qty + 1 } : it))
    setCart({ items })
  }

  const dec = (id: string) => {
    let items = (data?.items ?? []).map((it) => (it.product.id === id ? { ...it, qty: it.qty - 1 } : it))
    items = items.filter((it) => it.qty > 0)
    setCart({ items })
  }

  const remove = (id: string) => {
    const items = (data?.items ?? []).filter((it) => it.product.id !== id)
    setCart({ items })
  }

  const clear = () => setCart({ items: [] })

  const total = () => (data?.items ?? []).reduce((sum, it) => sum + it.product.price * it.qty, 0)

  return {
    items: data?.items ?? [],
    add,
    inc,
    dec,
    remove,
    clear,
    total,
  }
}
