"use client";
import { FREE_DELIVERY_OVER } from "./constants";

interface DeliveryBarProps {
  subtotal: number;
}

export default function DeliveryBar({ subtotal }: DeliveryBarProps) {
  const progress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_OVER) * 100));
  const qualified = subtotal >= FREE_DELIVERY_OVER;

  return (
    <div className="rounded-2xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:border-[#1c3a2b] dark:from-[#0d2016] dark:to-[#0d1f19]">
      <div className="flex items-center justify-between gap-2 text-xs font-semibold">
        <span className={`flex items-center gap-1.5 ${qualified ? "text-green-700 dark:text-green-400" : "text-neutral-600 dark:text-neutral-400"}`}>
          <span className="text-sm">{qualified ? "🎉" : "🛵"}</span>
          {qualified
            ? "You unlocked FREE Delivery!"
            : `Add Rs. ${(FREE_DELIVERY_OVER - subtotal).toLocaleString()} more for free delivery`}
        </span>
        <span className={`flex-none font-extrabold ${qualified ? "text-green-700 dark:text-green-400" : "text-brand"}`}>
          {progress}%
        </span>
      </div>
      <div className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-white/70 dark:bg-white/10">
        <div
          className={`h-full rounded-full transition-all duration-700 ${
            qualified
              ? "bg-gradient-to-r from-green-500 to-emerald-400"
              : "bg-gradient-to-r from-brand to-brand-dark"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
