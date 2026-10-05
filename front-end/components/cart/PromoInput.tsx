"use client";
import { useState } from "react";
import { PROMO_CODES } from "./constants";

interface PromoInputProps {
  onApply: (discount: number, label: string) => void;
  onReset: () => void;
  applied: boolean;
}

export default function PromoInput({ onApply, onReset, applied }: PromoInputProps) {
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const handleApply = () => {
    const upper = code.trim().toUpperCase();
    if (!upper) return;
    const promo = PROMO_CODES[upper];
    if (promo) {
      // We need subtotal from outside to compute absolute discount — parent passes onApply(absoluteDiscount)
      // We pass -1 as a sentinel and let parent call back with the real subtotal
      onApply(-1, upper); // parent resolves exact amount
      setMsg({ text: "Code accepted! Discount applied 🎉", ok: true });
    } else {
      onReset();
      setMsg({ text: "Invalid promo code. Try FEAST30 or BOGO.", ok: false });
    }
  };

  const handleRemove = () => {
    setCode("");
    setMsg(null);
    onReset();
  };

  return (
    <div>
      <label htmlFor="cart-promo" className="mb-2 block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
        Promo Code
      </label>

      {applied ? (
        <div className="flex items-center justify-between rounded-2xl border border-green-200 bg-green-50 px-4 py-3 dark:border-[#1c3a2b] dark:bg-[#0d2016]">
          <span className="flex items-center gap-2 text-sm font-semibold text-green-700 dark:text-green-400">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/15 text-xs">✓</span>
            {msg?.text ?? "Promo applied!"}
          </span>
          <button onClick={handleRemove} className="ml-3 text-xs font-bold text-neutral-500 transition hover:text-brand dark:text-neutral-400">
            Remove
          </button>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              id="cart-promo"
              type="text"
              placeholder="e.g. FEAST30"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleApply()}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-medium uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-[#171212] dark:text-neutral-100"
            />
            <button
              onClick={handleApply}
              className="flex-none rounded-2xl bg-brand px-5 py-2.5 text-xs font-bold text-white shadow-sm shadow-brand/25 transition hover:bg-brand-dark active:scale-95"
            >
              Apply
            </button>
          </div>
          {msg && !msg.ok && (
            <p className="mt-1.5 text-xs font-medium text-brand">{msg.text}</p>
          )}
        </>
      )}
    </div>
  );
}
