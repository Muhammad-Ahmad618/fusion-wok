"use client";
import React, { useState } from "react";
import { PlacedOrder } from "@/types/checkout";

interface OrderSuccessHeaderProps {
  order: PlacedOrder;
}

export default function OrderSuccessHeader({ order }: OrderSuccessHeaderProps) {
  const [copied, setCopied] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(order.orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand-dark to-neutral-900 p-8 text-center text-white shadow-2xl">
      <div className="relative z-10 mx-auto max-w-lg">
        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-4xl shadow-inner backdrop-blur-md">
          🎉
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
          Order Placed Successfully!
        </h1>
        <p className="mt-2 text-sm text-white/80">
          Thank you, <span className="font-bold text-white">{order.customer.fullName}</span>! Your meal is being prepared hot & fresh.
        </p>

        <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-black/20 p-2 text-xs backdrop-blur-sm">
          <span className="text-white/70">Order Number:</span>
          <span className="font-mono text-sm font-extrabold text-amber-300">
            {order.orderId}
          </span>
          <button
            onClick={copyOrderId}
            className="rounded-lg bg-white/20 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-white/30"
          >
            {copied ? "Copied! ✓" : "Copy ID"}
          </button>
        </div>
      </div>

      {/* Decorative background glow */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-red-500/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
    </div>
  );
}
