"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PlacedOrder } from "@/types/checkout";

interface OrderReceiptProps {
  order: PlacedOrder;
}

export default function OrderReceipt({ order }: OrderReceiptProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-xl dark:border-[#2e2323] dark:bg-[#1e1616]">
      <h2 className="mb-4 text-base font-extrabold text-neutral-900 dark:text-neutral-100">
        Receipt Summary
      </h2>

      {/* Items */}
      <div className="divide-y divide-neutral-100 dark:divide-[#2e2323]">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2.5 text-sm">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-lg dark:bg-[#221a1a]">
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.name}
                    width={32}
                    height={32}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  item.emoji
                )}
              </span>
              <div>
                <p className="font-bold text-neutral-900 dark:text-neutral-100">{item.name}</p>
                <p className="text-xs text-neutral-500">Qty: {item.qty} × Rs. {item.price.toLocaleString()}</p>
              </div>
            </div>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Rs. {(item.price * item.qty).toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      {/* Price Calculations */}
      <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-4 text-xs dark:border-[#2e2323]">
        <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
          <span>Subtotal</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            Rs. {order.subtotal.toLocaleString()}
          </span>
        </div>
        {order.discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Promo Discount ({order.promoCode})</span>
            <span className="font-bold">−Rs. {order.discount.toLocaleString()}</span>
          </div>
        )}
        <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
          <span>Delivery Fee</span>
          <span className={order.deliveryFee === 0 ? "font-bold text-green-600 dark:text-green-400" : "font-medium text-neutral-900 dark:text-neutral-100"}>
            {order.deliveryFee === 0 ? "FREE" : `Rs. ${order.deliveryFee.toLocaleString()}`}
          </span>
        </div>
      </div>

      {/* Total to Pay Cash */}
      <div className="mt-4 rounded-2xl bg-brand-tint/60 p-4 dark:bg-[#2e1c1c]">
        <div className="flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold text-brand uppercase tracking-wider">
              Cash to Pay on Arrival
            </span>
            <span className="text-[11px] text-neutral-600 dark:text-neutral-300">
              💵 Keep exact amount ready
            </span>
          </div>
          <span className="text-2xl font-extrabold text-brand">
            Rs. {order.total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-col gap-2.5">
        <button
          onClick={handlePrint}
          className="w-full rounded-2xl border border-neutral-200 py-3 text-center text-sm font-bold text-neutral-700 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-[#221a1a]"
        >
          🖨️ Print Receipt
        </button>
        <Link
          href="/"
          className="w-full rounded-2xl bg-brand py-3.5 text-center text-sm font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark active:scale-[0.98]"
        >
          ← Back to Menu
        </Link>
      </div>
    </div>
  );
}
