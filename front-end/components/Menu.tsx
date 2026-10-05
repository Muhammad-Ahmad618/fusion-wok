"use client";
import { useEffect, useState } from "react";
import ItemCard from "./ItemCard";
import ItemDetailModal from "./ItemDetailModal";
import { Category, MenuItem } from "@/types";

interface MenuProps {
  categories: Category[];
  items: MenuItem[];
}

export default function Menu({ categories, items }: MenuProps) {
  const tabs = [{ id: "hot", name: "🔥 Hot" }, ...categories.map((c) => ({ id: c.id, name: `${c.icon} ${c.name}` }))];
  const [active, setActive] = useState<string>("hot");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Highlight the tab of the section currently near the top of the screen
  useEffect(() => {
    const ids = ["hot", ...categories.map((c) => c.id)];
    const onScroll = () => {
      let cur = "hot";
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 180) cur = id;
      });
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  useEffect(() => {
    document.querySelector(`[data-tab="${active}"]`)?.scrollIntoView({ inline: "center", block: "nearest" });
  }, [active]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <nav className="sticky top-[60px] z-20 border-b border-red-100 bg-white dark:border-[#3a2b2b] dark:bg-[#171212]">
        <div className="no-scrollbar mx-auto flex max-w-6xl gap-2.5 overflow-x-auto px-5 py-3">
          {tabs.map((t) => (
            <button key={t.id} data-tab={t.id} onClick={() => go(t.id)}
              className={`flex-none rounded-full border-[1.5px] border-brand px-4 py-2 font-semibold ${active === t.id ? "bg-brand text-white" : "text-brand"}`}>
              {t.name}
            </button>
          ))}
        </div>
      </nav>

      <section id="hot" className="mt-10 scroll-mt-[124px] bg-brand-tint pb-9 pt-9 dark:bg-[#2e1c1c]">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="mb-5 text-2xl font-bold">🔥 Hot right now</h2>
          <div className="no-scrollbar grid auto-cols-[250px] grid-flow-col gap-5 overflow-x-auto pb-2.5">
            {items.filter((i) => i.hot).map((i) => (
              <ItemCard key={i.name} item={i} onSelectItem={(item) => setSelectedItem(item)} />
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5">
        {categories.map((c) => (
          <section key={c.id} id={c.id} className="scroll-mt-[124px] pt-10">
            <div className="mb-5 flex items-center gap-2.5">
              <h2 className="text-2xl font-bold">{c.icon} {c.name}</h2>
              <div className="h-0.5 flex-1 bg-red-100 dark:bg-[#3a2b2b]" />
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-5">
              {items.filter((i) => i.cat === c.id).map((i) => (
                <ItemCard key={i.name} item={i} onSelectItem={(item) => setSelectedItem(item)} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Item Detail Modal */}
      <ItemDetailModal
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}

