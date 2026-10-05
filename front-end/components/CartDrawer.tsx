"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CartItem, useCart } from "./CartContext";

const FREE_DELIVERY_OVER = 1500;

// ─── Mini item row inside the drawer ────────────────────────────────────────
function DrawerItem({ item }: { item: CartItem }) {
  const { setQty, remove } = useCart();
  return (
    <div className="flex items-center gap-3 rounded-xl border border-neutral-100 bg-white p-3 transition dark:border-[#2e2323] dark:bg-[#1e1616]">
      <div className="relative flex h-14 w-14 flex-none items-center justify-center overflow-hidden rounded-lg bg-gradient-to-b from-brand-tint to-white text-3xl dark:from-[#2e1c1c] dark:to-[#221a1a]">
        {item.img ? (
          <Image src={item.img} alt={item.name} fill sizes="56px" className="object-cover" />
        ) : item.emoji}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-neutral-900 dark:text-neutral-100">{item.name}</p>
        <p className="text-xs text-neutral-500">Rs. {item.price.toLocaleString()}</p>
        <div className="mt-1.5 flex items-center gap-2">
          <button
            onClick={() => setQty(item.id, item.qty - 1)}
            aria-label={`Decrease ${item.name}`}
            className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-xs font-bold transition hover:border-brand hover:text-brand dark:border-neutral-700"
          >−</button>
          <span className="text-xs font-bold tabular-nums">{item.qty}</span>
          <button
            onClick={() => setQty(item.id, item.qty + 1)}
            aria-label={`Increase ${item.name}`}
            className="flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 text-xs font-bold transition hover:border-brand hover:text-brand dark:border-neutral-700"
          >+</button>
        </div>
      </div>

      <div className="flex flex-col items-end gap-1.5">
        <button
          onClick={() => remove(item.id)}
          aria-label={`Remove ${item.name}`}
          className="text-neutral-300 transition hover:text-brand dark:text-neutral-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        </button>
        <span className="text-sm font-extrabold text-brand">Rs. {(item.price * item.qty).toLocaleString()}</span>
      </div>
    </div>
  );
}

// ─── Main Drawer ─────────────────────────────────────────────────────────────
export default function CartDrawer() {
  const { items, count, subtotal, isOpen, closeCart, clear } = useCart();

  // Animate-in flag — follows isOpen with a tiny delay so the panel slides in from right
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (isOpen) {
      // Mount first, then trigger CSS transition on next frame
      requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Esc key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  // Keep mounted (for exit animation), but hide visually when fully closed
  if (!isOpen && !visible) return null;

  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : 150;

  return (
    <div className="fixed inset-0 z-50">
      {/* ── Backdrop ── */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* ── Panel ── */}
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl dark:bg-[#171212] transition-transform duration-300 ease-in-out"
        style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4 dark:border-[#2e2323]">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <div>
              <h2 className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">Your Cart</h2>
              <p className="text-xs text-neutral-400">{count} {count === 1 ? "item" : "items"}</p>
            </div>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="rounded-full p-2 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-800 dark:hover:bg-[#2e2323] dark:hover:text-neutral-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="text-6xl">🛒</span>
              <p className="font-bold text-neutral-700 dark:text-neutral-300">Your cart is empty</p>
              <p className="text-sm text-neutral-400 dark:text-neutral-500">Add something delicious from the menu.</p>
              <button onClick={closeCart} className="mt-2 rounded-xl bg-brand px-5 py-2 text-sm font-bold text-white hover:bg-brand-dark">
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => <DrawerItem key={item.id} item={item} />)}
              <button
                onClick={clear}
                className="pt-1 text-right text-xs font-medium text-neutral-400 transition hover:text-brand dark:text-neutral-600"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-neutral-100 bg-neutral-50/80 px-5 py-5 dark:border-[#2e2323] dark:bg-[#1a1212]">
            {/* Mini delivery nudge */}
            {subtotal < FREE_DELIVERY_OVER ? (
              <p className="mb-3 rounded-xl bg-brand-tint/80 px-3.5 py-2 text-xs font-semibold text-brand dark:bg-[#2e1c1c]">
                🛵 Add Rs. {(FREE_DELIVERY_OVER - subtotal).toLocaleString()} more for free delivery!
              </p>
            ) : (
              <p className="mb-3 rounded-xl bg-green-50 px-3.5 py-2 text-xs font-semibold text-green-600 dark:bg-[#0d2016] dark:text-green-400">
                🎉 You qualify for FREE delivery!
              </p>
            )}

            <div className="mb-1 flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
              <span>Subtotal</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <div className="mb-4 flex justify-between text-sm text-neutral-500 dark:text-neutral-400">
              <span>Delivery</span>
              <span className={`font-semibold ${delivery === 0 ? "text-green-600 dark:text-green-400" : "text-neutral-900 dark:text-neutral-100"}`}>
                {delivery === 0 ? "FREE" : `Rs. ${delivery}`}
              </span>
            </div>

            <Link
              href="/cart"
              onClick={closeCart}
              className="block w-full rounded-2xl bg-brand py-3.5 text-center font-bold text-white shadow-lg shadow-brand/20 transition hover:bg-brand-dark active:scale-[0.98]"
            >
              View Cart & Checkout →
            </Link>
            <button
              onClick={closeCart}
              className="mt-2 w-full py-2 text-center text-xs text-neutral-400 transition hover:text-neutral-700 dark:hover:text-neutral-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
