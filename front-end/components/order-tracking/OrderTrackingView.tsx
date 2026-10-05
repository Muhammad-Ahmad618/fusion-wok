import React from "react";
import { PlacedOrder } from "@/types/checkout";
import OrderSuccessHeader from "./OrderSuccessHeader";
import OrderTracker from "./OrderTracker";
import DeliveryDetails from "./DeliveryDetails";
import OrderReceipt from "./OrderReceipt";

interface OrderTrackingViewProps {
  order: PlacedOrder;
}

export default function OrderTrackingView({ order }: OrderTrackingViewProps) {
  return (
    <main className="mx-auto max-w-4xl px-5 py-8 md:py-12">
      {/* ── Celebration Header ── */}
      <OrderSuccessHeader order={order} />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* ── Left Column: Live Status & Delivery Info ── */}
        <div className="space-y-6 lg:col-span-7">
          <OrderTracker order={order} />
          <DeliveryDetails order={order} />
        </div>

        {/* ── Right Column: Order Invoice & Payment Summary ── */}
        <div className="space-y-6 lg:col-span-5">
          <OrderReceipt order={order} />
        </div>
      </div>
    </main>
  );
}
