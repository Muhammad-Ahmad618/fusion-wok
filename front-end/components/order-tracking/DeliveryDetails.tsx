import React from "react";
import { PlacedOrder } from "@/types/checkout";

interface DeliveryDetailsProps {
  order: PlacedOrder;
}

export default function DeliveryDetails({ order }: DeliveryDetailsProps) {
  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-[#2e2323] dark:bg-[#1e1616]">
      <h2 className="mb-4 text-base font-extrabold text-neutral-900 dark:text-neutral-100">
        Delivery Details
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 text-sm">
        <div className="rounded-2xl bg-neutral-50 p-3.5 dark:bg-[#171212]">
          <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500">
            Recipient
          </span>
          <p className="font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
            {order.customer.fullName}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-0.5">
            📞 {order.customer.phone}
          </p>
          {order.customer.email && (
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              ✉️ {order.customer.email}
            </p>
          )}
        </div>

        <div className="rounded-2xl bg-neutral-50 p-3.5 dark:bg-[#171212]">
          <span className="block text-xs font-semibold text-neutral-400 dark:text-neutral-500">
            Destination Address
          </span>
          <p className="font-bold text-neutral-900 dark:text-neutral-100 mt-0.5">
            {order.delivery.streetAddress}
          </p>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {order.delivery.area}, {order.delivery.city}
          </p>
          {order.delivery.landmark && (
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Near {order.delivery.landmark}
            </p>
          )}
        </div>
      </div>

      {/* Rider or Kitchen Notes */}
      {(order.delivery.riderNote || order.specialInstructions || order.needCutlery) && (
        <div className="mt-4 rounded-2xl border border-neutral-100 bg-neutral-50/50 p-3.5 text-xs text-neutral-600 dark:border-[#2e2323] dark:bg-[#171212] dark:text-neutral-300">
          {order.delivery.riderNote && (
            <p className="mb-1">
              <span className="font-bold">🛵 Rider Note:</span> {order.delivery.riderNote}
            </p>
          )}
          {order.specialInstructions && (
            <p className="mb-1">
              <span className="font-bold">🍳 Kitchen Note:</span> {order.specialInstructions}
            </p>
          )}
          <p>
            <span className="font-bold">🍴 Cutlery:</span>{" "}
            {order.needCutlery ? "Included" : "None requested (Eco friendly)"}
          </p>
        </div>
      )}
    </div>
  );
}
