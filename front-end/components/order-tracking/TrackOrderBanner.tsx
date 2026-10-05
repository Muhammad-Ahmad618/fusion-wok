"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { loadLastOrder } from "./orderStorage";
import { PlacedOrder } from "@/types/checkout";

export default function TrackOrderBanner() {
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  // Order info lives in sessionStorage (client-only)
  useEffect(() => {
    setOrder(loadLastOrder());
    setLoaded(true);
  }, []);

  // Avoid hydration mismatch — render nothing until we know the order state
  if (!loaded) return null;

  // ── Active order: prominent live-tracking card ──
  if (order) {
    return (
      <section className="mx-auto max-w-6xl px-5 pt-8">
        <Link
          href="/order-tracking"
          className="group flex items-center justify-between gap-4 rounded-3xl border border-brand/20 bg-gradient-to-r from-brand-tint/80 to-white p-4 shadow-sm transition hover:shadow-md hover:shadow-brand/10 dark:border-[#2e2323] dark:from-[#2e1c1c] dark:to-[#1e1616] sm:p-5"
        >
          <div className="flex items-center gap-3.5">
            <span className="relative flex h-11 w-11 flex-none items-center justify-center rounded-2xl bg-brand text-xl text-white shadow-md shadow-brand/30">
              🛵
              <span className="absolute -right-1 -top-1 h-3 w-3 animate-pulse rounded-full border-2 border-white bg-amber-400 dark:border-[#1e1616]" />
            </span>
            <div>
              <p className="text-sm font-extrabold text-neutral-900 dark:text-neutral-100">
                Order <span className="font-mono text-brand">{order.orderId}</span> is being prepared
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Estimated delivery around {order.estimatedDeliveryTime}
              </p>
            </div>
          </div>

          <span className="flex-none rounded-2xl bg-brand px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-brand/25 transition group-hover:bg-brand-dark sm:text-sm">
            Track Live →
          </span>
        </Link>
      </section>
    );
  }

  // ── No active order: subtle entry point ──
  return (
    <section className="mx-auto max-w-6xl px-5 pt-8">
      <div className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/60 px-4 py-3.5 text-xs text-neutral-500 dark:border-[#2e2323] dark:bg-[#1e1616]/60 dark:text-neutral-400 sm:text-sm">
        <span>📦</span>
        <span>Already placed an order?</span>
        <Link
          href="/order-tracking"
          className="font-bold text-brand underline-offset-2 transition hover:underline"
        >
          Check order status →
        </Link>
      </div>
    </section>
  );
}
