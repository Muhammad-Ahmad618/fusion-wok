"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "@/components/CartContext";
import DeliveryBar from "@/components/cart/DeliveryBar";
import PromoInput from "@/components/cart/PromoInput";
import { DELIVERY_FEE, FREE_DELIVERY_OVER, PROMO_CODES } from "@/components/cart/constants";

interface CheckoutSummaryProps {
  discount: number;
  promoCode: string | null;
  onApplyPromo: (code: string) => void;
  onRemovePromo: () => void;
  isSubmitting?: boolean;
}

export default function CheckoutSummary({
  discount,
  promoCode,
  onApplyPromo,
  onRemovePromo,
  isSubmitting,
}: CheckoutSummaryProps) {
  const { items, subtotal } = useCart();

  const handlePromoApply = (_sentinel: number, promoKey: string) => {
    onApplyPromo(promoKey);
  };

  const deliveryFee = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <aside className="sticky top-24 space-y-6">
      <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-xl dark:border-[#2e2323] dark:bg-[#1e1616]">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-[#2e2323]">
          <h2 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
            Order Summary
          </h2>
          <span className="rounded-full bg-brand-tint px-3 py-1 text-xs font-bold text-brand dark:bg-[#2e1c1c]">
            {items.reduce((acc, i) => acc + i.qty, 0)} items
          </span>
        </div>

        {/* Free Delivery Bar */}
        <div className="mt-4">
          <DeliveryBar subtotal={subtotal} />
        </div>

        {/* Items List */}
        <div className="mt-5 max-h-64 space-y-3 overflow-y-auto pr-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/50 p-2.5 dark:border-[#2e2323] dark:bg-[#171212]"
            >
              <div className="relative flex h-12 w-12 flex-none items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-brand-tint to-white text-2xl dark:from-[#2e1c1c] dark:to-[#221a1a]">
                {item.img ? (
                  <Image
                    src={item.img}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                ) : (
                  item.emoji
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-neutral-900 dark:text-neutral-100">
                  {item.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  Qty: <span className="font-semibold text-neutral-800 dark:text-neutral-200">{item.qty}</span> × Rs. {item.price.toLocaleString()}
                </p>
              </div>
              <span className="text-sm font-extrabold text-brand">
                Rs. {(item.price * item.qty).toLocaleString()}
              </span>
            </div>
          ))}
        </div>

        {/* Promo Code Component */}
        <div className="mt-5 border-t border-neutral-100 pt-4 dark:border-[#2e2323]">
          <PromoInput
            onApply={handlePromoApply}
            onReset={onRemovePromo}
            applied={!!promoCode}
          />
        </div>

        {/* Price Calculations */}
        <div className="mt-5 space-y-2 border-t border-neutral-100 pt-4 text-sm dark:border-[#2e2323]">
          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span>Subtotal</span>
            <span className="font-semibold text-neutral-900 dark:text-neutral-100">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>

          {discount > 0 && (
            <div className="flex items-center justify-between text-green-600 dark:text-green-400">
              <span>Promo Discount ({promoCode})</span>
              <span className="font-bold">
                −Rs. {discount.toLocaleString()}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span>Delivery Fee</span>
            <span
              className={`font-semibold ${
                deliveryFee === 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-neutral-900 dark:text-neutral-100"
              }`}
            >
              {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee.toLocaleString()}`}
            </span>
          </div>

          <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400">
            <span>Payment Method</span>
            <span className="font-bold text-neutral-800 dark:text-neutral-200">
              💵 Cash on Delivery
            </span>
          </div>
        </div>

        {/* Total Price Block */}
        <div className="mt-4 flex items-baseline justify-between rounded-2xl bg-neutral-50 px-4 py-3.5 dark:bg-[#171212]">
          <div>
            <span className="block text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider">
              Total to Pay (Cash)
            </span>
            <span className="text-xs text-neutral-500 dark:text-neutral-400">
              Including all taxes & fees
            </span>
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-brand">
            Rs. {total.toLocaleString()}
          </span>
        </div>

        {/* Form Submit Trigger button for desktop or mobile */}
        <button
          type="submit"
          form="checkout-form"
          disabled={isSubmitting || items.length === 0}
          className="mt-5 w-full rounded-2xl bg-brand py-4 text-center font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Placing Order...
            </span>
          ) : (
            `Place Order (Rs. ${total.toLocaleString()}) →`
          )}
        </button>

        {/* Trust Badges */}
        <div className="mt-5 grid grid-cols-2 gap-2 border-t border-neutral-100 pt-4 text-[11px] text-neutral-500 dark:border-[#2e2323] dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="text-base">⚡</span>
            <span>30-40 min delivery</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base">🥩</span>
            <span>100% Halal Fresh</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
