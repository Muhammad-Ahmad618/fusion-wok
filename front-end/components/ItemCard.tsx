"use client";
import Image from "next/image";
import { MenuItem } from "@/types";

interface ItemCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
}

export default function ItemCard({ item, onSelectItem }: ItemCardProps) {
  return (
    <div
      onClick={() => onSelectItem(item)}
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-red-100 bg-white transition hover:-translate-y-1 hover:shadow-xl hover:shadow-brand/20 dark:border-[#3a2b2b] dark:bg-[#221a1a]"
    >
      <div className="relative flex h-36 items-center justify-center bg-gradient-to-b from-brand-tint to-white text-7xl dark:from-[#2e1c1c] dark:to-[#221a1a]">
        {item.img ? <Image src={item.img} alt={item.name} fill sizes="250px" className="object-cover" /> : item.emoji}
        {item.hot && <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-brand px-2.5 py-0.5 text-[11px] font-bold text-white">🔥 HOT</span>}
        <span className="absolute right-2.5 top-2.5 z-10 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-neutral-800 backdrop-blur-sm">⭐ {item.rate}</span>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-[17px] font-semibold group-hover:text-brand transition">{item.name}</h3>
        <p className="mb-3.5 mt-1 flex-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">{item.desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-extrabold text-brand">Rs. {item.price.toLocaleString()}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectItem(item);
            }}
            aria-label={`Customize ${item.name}`}
            className="flex h-9 items-center gap-1 rounded-full bg-brand px-3 text-xs font-bold text-white transition hover:bg-brand-dark active:scale-95 shadow-md shadow-brand/20"
          >
            <span>+ Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}

