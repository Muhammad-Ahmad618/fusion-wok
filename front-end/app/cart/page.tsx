"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import CartEmpty from "@/components/cart/CartEmpty";
import CartItemList from "@/components/cart/CartItemList";
import OrderSummary from "@/components/cart/OrderSummary";

export default function CartPage() {
  const { items, subtotal, clear, count } = useCart();

  if (items.length === 0) return <CartEmpty />;

  return (
    <main className="relative mx-auto max-w-6xl px-5 py-8 md:py-12">
      {/* Soft decorative glow */}
      <div className="pointer-events-none absolute -top-6 right-0 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />

      {/* Breadcrumb */}
      <nav className="relative mb-6 text-sm text-neutral-400 dark:text-neutral-500">
        <Link href="/" className="transition hover:text-brand">Home</Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-neutral-800 dark:text-neutral-200">Cart</span>
      </nav>

      {/* Page Header */}
      <div className="relative mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-4xl">
            Your Cart 🛒
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Review your items and head to checkout when you&apos;re ready.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-2xl bg-brand-tint/70 px-4 py-2 text-xs font-bold text-brand dark:bg-[#2e1c1c]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-extrabold text-white">
            {count}
          </span>
          {count === 1 ? "Item" : "Items"} in cart
        </span>
      </div>

      <div className="relative grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <CartItemList onClear={clear} />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <OrderSummary subtotal={subtotal} />
        </div>
      </div>
    </main>
  );
}
