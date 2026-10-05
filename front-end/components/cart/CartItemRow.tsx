"use client";
import Image from "next/image";
import { CartItem } from "@/components/CartContext";
import { useCart } from "@/components/CartContext";

interface CartItemRowProps {
  item: CartItem;
}

function QtyButton({ onClick, label, children }: { onClick: () => void; label: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-extrabold text-brand shadow-sm transition hover:bg-brand hover:text-white active:scale-90 dark:bg-[#1e1616] dark:hover:bg-brand dark:hover:text-white"
    >
      {children}
    </button>
  );
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { setQty, remove } = useCart();

  return (
    <li className="group flex flex-wrap items-center gap-x-4 gap-y-3 rounded-3xl border border-neutral-100 bg-white p-4 shadow-sm transition hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 dark:border-[#2e2323] dark:bg-[#1e1616] sm:p-5">
      {/* Thumbnail */}
      <div className="relative order-1 flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-brand-tint to-white text-4xl ring-1 ring-black/5 dark:from-[#2e1c1c] dark:to-[#221a1a] dark:ring-white/5 sm:h-24 sm:w-24">
        {item.img ? (
          <Image src={item.img} alt={item.name} fill sizes="96px" className="object-cover" />
        ) : (
          item.emoji
        )}
      </div>

      {/* Name & unit price */}
      <div className="order-2 min-w-0 flex-1">
        <h3 className="truncate font-extrabold text-neutral-900 dark:text-neutral-100 sm:text-lg">
          {item.name}
        </h3>
        <p className="mt-1 inline-block rounded-full bg-neutral-100 px-2.5 py-0.5 text-[11px] font-semibold text-neutral-500 dark:bg-[#2e2323] dark:text-neutral-400">
          Rs. {item.price.toLocaleString()} each
        </p>
      </div>

      {/* Remove — top right on mobile, end of row on desktop */}
      <button
        onClick={() => remove(item.id)}
        aria-label={`Remove ${item.name}`}
        className="order-3 flex-none rounded-full p-2 text-neutral-300 transition hover:bg-brand-tint hover:text-brand dark:text-neutral-600 dark:hover:bg-[#2e1c1c] dark:hover:text-brand sm:order-5"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-[18px] w-[18px]">
          <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Controls — own row on mobile, inline on desktop */}
      <div className="order-4 flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end sm:gap-6">
        {/* Qty stepper */}
        <div className="flex items-center gap-1 rounded-full bg-brand-tint/70 p-1 dark:bg-[#2e1c1c]">
          <QtyButton onClick={() => setQty(item.id, item.qty - 1)} label={`Decrease ${item.name}`}>−</QtyButton>
          <span className="w-7 text-center text-sm font-extrabold text-neutral-900 tabular-nums dark:text-neutral-100">
            {item.qty}
          </span>
          <QtyButton onClick={() => setQty(item.id, item.qty + 1)} label={`Increase ${item.name}`}>+</QtyButton>
        </div>

        {/* Line total */}
        <div className="text-right sm:w-24">
          <span className="block text-base font-extrabold text-neutral-900 dark:text-neutral-100 sm:text-lg">
            Rs. {(item.price * item.qty).toLocaleString()}
          </span>
          {item.qty > 1 && (
            <span className="block text-[11px] font-medium text-neutral-400 dark:text-neutral-500">
              {item.qty} × Rs. {item.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}
