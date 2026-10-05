import React from "react";
import { PlacedOrder } from "@/types/checkout";
import { ORDER_STEPS } from "./constants";

interface OrderTrackerProps {
  order: PlacedOrder;
}

export default function OrderTracker({ order }: OrderTrackerProps) {
  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-[#2e2323] dark:bg-[#1e1616]">
      <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-[#2e2323]">
        <div>
          <h2 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">
            Estimated Delivery Time
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Expected around {order.estimatedDeliveryTime}
          </p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-500" />
          In Kitchen
        </span>
      </div>

      {/* Stepper */}
      <div className="mt-6 space-y-6">
        {ORDER_STEPS.map((step, idx) => (
          <div key={step.id} className="relative flex items-start gap-4">
            {/* Connecting Line */}
            {idx < ORDER_STEPS.length - 1 && (
              <div
                className={`absolute left-4 top-8 -bottom-6 w-0.5 ${
                  step.active ? "bg-brand" : "bg-neutral-200 dark:bg-neutral-800"
                }`}
              />
            )}

            {/* Step Icon */}
            <div
              className={`relative z-10 flex h-8 w-8 flex-none items-center justify-center rounded-full text-xs font-bold transition ${
                step.active
                  ? "bg-brand text-white shadow-md shadow-brand/30"
                  : "border border-neutral-300 bg-neutral-100 text-neutral-400 dark:border-neutral-700 dark:bg-neutral-800"
              }`}
            >
              {step.icon}
            </div>

            {/* Step Info */}
            <div className="flex-1">
              <p
                className={`text-sm font-bold ${
                  step.active
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-400 dark:text-neutral-500"
                }`}
              >
                {step.title}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
