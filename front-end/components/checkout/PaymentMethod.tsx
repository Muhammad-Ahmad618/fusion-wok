"use client";
import React from "react";

interface PaymentMethodProps {
  selected: "cod";
  onChange: (method: "cod") => void;
}

export default function PaymentMethod({ selected, onChange }: PaymentMethodProps) {
  return (
    <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-[#2e2323] dark:bg-[#1e1616]">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-2.5 text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-tint text-base text-brand dark:bg-[#2e1c1c]">
            💳
          </span>
          Payment Method
        </h2>
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 dark:bg-[#0d2016] dark:text-green-400">
          ✓ Available
        </span>
      </div>

      <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
        We currently support Cash on Delivery. Online payment gateways are coming soon!
      </p>

      <div className="mt-5 space-y-3">
        {/* Cash On Delivery Option (Active) */}
        <label
          onClick={() => onChange("cod")}
          className="relative flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-brand bg-brand-tint/30 p-4 transition dark:bg-[#2a1717] dark:border-brand"
        >
          <input
            type="radio"
            name="payment"
            checked={selected === "cod"}
            onChange={() => onChange("cod")}
            className="mt-1 h-4 w-4 accent-brand"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl">💵</span>
              <span className="font-bold text-neutral-900 dark:text-neutral-100">
                Cash on Delivery (COD)
              </span>
              <span className="rounded-md bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                Primary
              </span>
            </div>
            <p className="mt-1 text-xs text-neutral-600 dark:text-neutral-300">
              Pay with cash directly to our delivery rider when your food arrives. Please keep exact change ready if possible.
            </p>
          </div>
        </label>

        {/* Card / Online (Disabled with Coming Soon Badge) */}
        <div className="relative flex items-center justify-between rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/70 p-4 opacity-60 dark:border-neutral-800 dark:bg-[#171212]">
          <div className="flex items-center gap-3">
            <span className="text-xl">💳</span>
            <div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Credit / Debit Card
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Visa, Mastercard, PayPak
              </p>
            </div>
          </div>
          <span className="rounded-lg bg-neutral-200 px-2.5 py-1 text-[11px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            Coming Soon
          </span>
        </div>

        {/* EasyPaisa / JazzCash (Disabled with Coming Soon Badge) */}
        <div className="relative flex items-center justify-between rounded-2xl border border-dashed border-neutral-200 bg-neutral-50/70 p-4 opacity-60 dark:border-neutral-800 dark:bg-[#171212]">
          <div className="flex items-center gap-3">
            <span className="text-xl">📱</span>
            <div>
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                Mobile Wallets (JazzCash / EasyPaisa)
              </p>
              <p className="text-xs text-neutral-400 dark:text-neutral-500">
                Direct QR & Wallet checkout
              </p>
            </div>
          </div>
          <span className="rounded-lg bg-neutral-200 px-2.5 py-1 text-[11px] font-bold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}

