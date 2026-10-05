"use client";
import React from "react";
import Image from "next/image";
import { CheckoutFormData } from "@/types/checkout";
import { CartItem } from "@/components/CartContext";

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: CheckoutFormData;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode: string | null;
  total: number;
  isSubmitting?: boolean;
}

export default function OrderConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  formData,
  items,
  subtotal,
  deliveryFee,
  discount,
  promoCode,
  total,
  isSubmitting,
}: OrderConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#1a1212] dark:border dark:border-[#2e2323] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4 dark:border-[#2e2323]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-tint text-xl text-brand dark:bg-[#2e1c1c]">
              🛵
            </span>
            <div>
              <h3 className="text-xl font-extrabold text-neutral-900 dark:text-neutral-100">
                Confirm Your Order
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Please double check your delivery & payment summary
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-[#2e2323] dark:hover:text-neutral-200"
          >
            ✕
          </button>
        </div>

        {/* Customer & Address Details */}
        <div className="mt-5 space-y-3">
          <div className="rounded-2xl bg-neutral-50 p-4 text-xs text-neutral-700 dark:bg-[#171212] dark:text-neutral-300">
            <div className="flex justify-between font-bold text-neutral-900 dark:text-neutral-100 text-sm mb-1">
              <span>{formData.fullName}</span>
              <span className="text-brand">📞 {formData.phone}</span>
            </div>
            <p className="mt-0.5">
              <span className="font-semibold text-neutral-900 dark:text-neutral-200">Address:</span>{" "}
              {formData.streetAddress}, {formData.area}, {formData.city}
            </p>
            {formData.landmark && (
              <p className="mt-0.5 text-neutral-500">
                <span className="font-semibold text-neutral-700 dark:text-neutral-400">Landmark:</span> {formData.landmark}
              </p>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-lg bg-amber-100 px-2 py-0.5 font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                ⚡ {formData.deliveryOption === "priority" ? "Direct Priority (20-30 min)" : "Standard Delivery (30-40 min)"}
              </span>
              <span className="rounded-lg bg-green-100 px-2 py-0.5 font-bold text-green-800 dark:bg-green-950 dark:text-green-300">
                💵 Cash on Delivery
              </span>
            </div>
          </div>

          {/* Rider / Special Notes if any */}
          {(formData.riderNote || formData.specialInstructions || formData.needCutlery) && (
            <div className="rounded-xl border border-neutral-100 bg-neutral-50/60 p-3 text-xs text-neutral-600 dark:border-[#2e2323] dark:bg-[#171212] dark:text-neutral-400 space-y-1">
              {formData.riderNote && (
                <p><span className="font-bold text-neutral-800 dark:text-neutral-200">🛵 Rider Note:</span> {formData.riderNote}</p>
              )}
              {formData.specialInstructions && (
                <p><span className="font-bold text-neutral-800 dark:text-neutral-200">🍳 Kitchen Note:</span> {formData.specialInstructions}</p>
              )}
              {formData.needCutlery && (
                <p><span className="font-bold text-neutral-800 dark:text-neutral-200">🍴 Cutlery:</span> Included</p>
              )}
            </div>
          )}

          {/* Items Preview */}
          <div className="mt-4">
            <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              Items in Order ({items.reduce((acc, i) => acc + i.qty, 0)})
            </h4>
            <div className="max-h-40 space-y-2 overflow-y-auto no-scrollbar pr-1">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between text-xs py-1.5 border-b border-neutral-100 dark:border-[#2e2323] last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{item.emoji}</span>
                    <div>
                      <p className="font-bold text-neutral-900 dark:text-neutral-100">{item.name}</p>
                      <p className="text-[11px] text-neutral-500">Qty: {item.qty} × Rs. {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-neutral-900 dark:text-neutral-100">
                    Rs. {(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="mt-4 space-y-1 border-t border-neutral-100 pt-3 text-xs dark:border-[#2e2323]">
            <div className="flex justify-between text-neutral-500">
              <span>Subtotal</span>
              <span className="font-medium text-neutral-900 dark:text-neutral-100">Rs. {subtotal.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 dark:text-green-400 font-medium">
                <span>Discount ({promoCode})</span>
                <span>−Rs. {discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-neutral-500">
              <span>Delivery Fee</span>
              <span className={deliveryFee === 0 ? "font-bold text-green-600 dark:text-green-400" : "font-medium text-neutral-900 dark:text-neutral-100"}>
                {deliveryFee === 0 ? "FREE" : `Rs. ${deliveryFee.toLocaleString()}`}
              </span>
            </div>
          </div>

          {/* Total Pay Banner */}
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-brand-tint/70 p-4 dark:bg-[#2e1c1c]">
            <div>
              <span className="block text-xs font-bold text-brand uppercase tracking-wider">
                Total Cash to Pay
              </span>
              <span className="text-[11px] text-neutral-600 dark:text-neutral-400">
                Pay rider on arrival
              </span>
            </div>
            <span className="text-2xl font-extrabold text-brand">
              Rs. {total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-2xl border border-neutral-200 py-3.5 text-center text-xs font-bold text-neutral-700 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-[#221a1a]"
          >
            ← Modify Details
          </button>

          <button
            onClick={onConfirm}
            disabled={isSubmitting}
            className="rounded-2xl bg-brand py-3.5 text-center text-xs font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-[0.98] disabled:opacity-60"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <svg className="h-4 w-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Placing...
              </span>
            ) : (
              "Confirm & Place Order →"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
