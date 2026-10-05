"use client";
import Link from "next/link";

export default function CartEmpty() {
  return (
    <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
      <div className="relative mb-8">
        {/* Glowing ring */}
        <div className="absolute inset-0 rounded-full bg-brand/20 blur-2xl" />
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-tint to-white text-6xl shadow-inner dark:from-[#2e1c1c] dark:to-[#171212]">
          🛒
        </div>
      </div>

      <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
        Nothing here yet!
      </h1>
      <p className="mb-8 max-w-xs text-neutral-500 dark:text-neutral-400">
        Your cart is empty. Browse the menu and add something delicious.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-8 py-4 font-bold text-white shadow-xl shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-95"
      >
        <span className="text-xl">🍔</span>
        Browse the Menu
      </Link>
    </main>
  );
}
