"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import OrderTrackingView from "@/components/order-tracking/OrderTrackingView";
import { loadLastOrder } from "@/components/order-tracking/orderStorage";
import { PlacedOrder } from "@/types/checkout";

export default function OrderTrackingPage() {
  const [order, setOrder] = useState<PlacedOrder | null>(null);
  const [loaded, setLoaded] = useState(false);

  // The placed order is handed over via sessionStorage (client-only)
  useEffect(() => {
    setOrder(loadLastOrder());
    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <div className="p-8 text-center text-neutral-500">Loading order...</div>
    );
  }

  // No order in this session — nothing to track
  if (!order) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-brand/20 blur-2xl" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-tint to-white text-6xl shadow-inner dark:from-[#2e1c1c] dark:to-[#171212]">
            📦
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          No active order to track
        </h1>
        <p className="mb-8 max-w-xs text-neutral-500 dark:text-neutral-400">
          Place an order from our menu and its live tracking details will show up here.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-8 py-4 font-bold text-white shadow-xl shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-95"
        >
          <span className="text-xl">🍔</span>
          Explore Menu
        </Link>
      </main>
    );
  }

  return <OrderTrackingView order={order} />;
}
