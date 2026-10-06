"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { loadLastOrder } from "./order-tracking/orderStorage";
import { PlacedOrder } from "@/types/checkout";

export default function Header() {
  const { count, openCart } = useCart();
  const [dark, setDark] = useState<boolean>(false);
  const [activeOrder, setActiveOrder] = useState<PlacedOrder | null>(null);
  const pathname = usePathname();

  useEffect(
    () => setDark(document.documentElement.classList.contains("dark")),
    [],
  );

  // Re-check for an active order on every navigation — this layout component
  // persists across route changes, so a mount-only effect would go stale
  // after an order is placed.
  useEffect(() => {
    setActiveOrder(loadLastOrder());
  }, [pathname]);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  };

  return (
    <header className="sticky top-0 z-30 bg-brand text-white">
      <div className="mx-auto flex h-[60px] max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center hover:opacity-90">
          <img
            src="/images/fusion-wok-logo.svg"
            alt="Fusion Wok logo"
            className="h-20 w-20 rounded-lg object-cover"
          />
        </Link>
        <div className="flex items-center gap-2.5">
          {activeOrder && pathname !== "/order-tracking" && (
            <Link
              href="/order-tracking"
              aria-label="Track your order"
              className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-2 text-sm font-bold text-white transition hover:bg-white/30 sm:px-4"
            >
              <span className="relative text-base leading-none">
                📦
                <span className="absolute -right-1 -top-1 h-2 w-2 animate-pulse rounded-full bg-amber-300" />
              </span>
              <span className="hidden sm:inline">Track Order</span>
            </Link>
          )}
          <button
            onClick={toggle}
            aria-label="Switch theme"
            className="h-[38px] w-[38px] rounded-full bg-white/20 text-lg hover:bg-white/30 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>
          <button
            onClick={openCart}
            className="rounded-full bg-white px-4 py-2 font-bold text-brand hover:bg-red-50 transition"
          >
            🛒 Cart ({count})
          </button>
        </div>
      </div>
    </header>
  );
}
