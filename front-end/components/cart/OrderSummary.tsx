"use client";
import Link from "next/link";
import { useState } from "react";
import DeliveryBar from "./DeliveryBar";
import PromoInput from "./PromoInput";
import { DELIVERY_FEE, FREE_DELIVERY_OVER, PROMO_CODES } from "./constants";

interface OrderSummaryProps {
  subtotal: number;
}

const TRUST_BADGES: Array<[string, string]> = [
  ["💵", "Cash on Delivery"],
  ["🛵", "30-Min Delivery"],
  ["🔒", "Secure Checkout"],
];

export default function OrderSummary({ subtotal }: OrderSummaryProps) {
  const [discount, setDiscount] = useState(0);
  const [promoCode, setPromoCode] = useState<string | null>(null);

  const handlePromoApply = (_sentinel: number, promoKey: string) => {
    const promo = PROMO_CODES[promoKey];
    if (promo) {
      setDiscount(promo.discount(subtotal));
      setPromoCode(promoKey);
    }
  };

  const handlePromoReset = () => {
    setDiscount(0);
    setPromoCode(null);
  };

  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const total = Math.max(0, subtotal - discount + delivery);

  const Row = ({ label, value, green }: { label: string; value: string; green?: boolean }) => (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-neutral-500 dark:text-neutral-400">{label}</span>
      <span className={`font-semibold ${green ? "text-green-600 dark:text-green-400" : "text-neutral-900 dark:text-neutral-100"}`}>
        {value}
      </span>
    </div>
  );

  const checkoutUrl = promoCode ? `/checkout?promo=${encodeURIComponent(promoCode)}` : "/checkout";

  return (
    <aside className="sticky top-24">
      <div className="overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-xl dark:border-[#2e2323] dark:bg-[#1e1616]">
        {/* Card header strip */}
        <div className="flex items-center justify-between bg-gradient-to-r from-brand-tint/80 to-transparent px-6 py-4 dark:from-[#2e1c1c] dark:to-transparent">
          <h2 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
            Order Summary
          </h2>
          <span className="text-2xl">🧾</span>
        </div>

        <div className="p-6 pt-2">
          {/* Free Delivery Bar */}
          <div className="mb-5">
            <DeliveryBar subtotal={subtotal} />
          </div>

          {/* Promo Code */}
          <div className="mb-5">
            <PromoInput
              onApply={handlePromoApply}
              onReset={handlePromoReset}
              applied={!!promoCode}
            />
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-dashed border-neutral-200 pt-4 dark:border-[#2e2323]">
            <Row label="Subtotal" value={`Rs. ${subtotal.toLocaleString()}`} />
            {discount > 0 && (
              <Row label={`Promo Discount (${promoCode})`} value={`−Rs. ${discount.toLocaleString()}`} green />
            )}
            <Row
              label="Delivery"
              value={delivery === 0 ? "FREE" : `Rs. ${delivery.toLocaleString()}`}
              green={delivery === 0}
            />
          </div>

          {/* Total */}
          <div className="mt-4 rounded-2xl bg-brand-tint/60 p-4 dark:bg-[#2e1c1c]">
            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-brand">
                  Total to Pay
                </span>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-300">
                  Incl. delivery & discounts
                </span>
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-brand">
                Rs. {total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* CTA */}
          <Link
            href={checkoutUrl}
            className="mt-5 block w-full rounded-2xl bg-brand py-4 text-center font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-[0.98]"
          >
            Proceed to Checkout →
          </Link>

          {/* Trust badges */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            {TRUST_BADGES.map(([icon, label]) => (
              <div
                key={label}
                className="rounded-xl bg-neutral-50 px-2 py-2.5 text-center dark:bg-[#171212]"
              >
                <span className="block text-base leading-none">{icon}</span>
                <span className="mt-1 block text-[10px] font-bold leading-tight text-neutral-500 dark:text-neutral-400">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
