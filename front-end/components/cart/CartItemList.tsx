"use client";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import CartItemRow from "./CartItemRow";

interface CartItemListProps {
  onClear: () => void;
}

export default function CartItemList({ onClear }: CartItemListProps) {
  const { items } = useCart();

  return (
    <div>
      {/* Section header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-lg font-extrabold text-neutral-800 dark:text-neutral-200">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-tint text-sm dark:bg-[#2e1c1c]">
            🍽️
          </span>
          Your Selection
          <span className="text-sm font-semibold text-neutral-400 dark:text-neutral-500">
            ({items.length} {items.length === 1 ? "item" : "items"})
          </span>
        </h2>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-500 transition hover:border-brand hover:bg-brand-tint hover:text-brand dark:border-[#3a2b2b] dark:text-neutral-400 dark:hover:bg-[#2e1c1c]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
          </svg>
          Clear all
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <CartItemRow key={item.id} item={item} />
        ))}
      </ul>

      {/* Add more items */}
      <Link
        href="/"
        className="mt-6 flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-200 py-4 text-sm font-bold text-neutral-400 transition hover:border-brand hover:bg-brand-tint/40 hover:text-brand dark:border-[#3a2b2b] dark:text-neutral-500 dark:hover:bg-[#2e1c1c]/40"
      >
        <span className="text-lg">＋</span>
        Add more items from the menu
      </Link>
    </div>
  );
}
