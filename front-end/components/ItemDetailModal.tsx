"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { MenuItem } from "@/types";
import { useCart } from "./CartContext";

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
}

interface PortionOption {
  label: string;
  price: number;
}

interface AddOnOption {
  id: string;
  name: string;
  price: number;
}

const CATEGORY_PORTIONS: Record<string, PortionOption[]> = {
  wok: [
    { label: "Standard Serving", price: 0 },
    { label: "Large Serving", price: 250 },
  ],
  noodles: [
    { label: "Regular Bowl", price: 0 },
    { label: "Large Bowl", price: 200 },
  ],
  rice: [
    { label: "Regular Plate", price: 0 },
    { label: "Large Plate", price: 180 },
  ],
  dimsum: [
    { label: "6 Pieces", price: 0 },
    { label: "12 Pieces", price: 550 },
  ],
  drinks: [
    { label: "Regular 350ml", price: 0 },
    { label: "Jumbo 500ml", price: 70 },
  ],
  desserts: [
    { label: "Single Portion", price: 0 },
    { label: "Double Delight", price: 150 },
  ],
};

const CATEGORY_ADDONS: Record<string, AddOnOption[]> = {
  wok: [
    { id: "extra_chillies", name: "Extra Chillies", price: 40 },
    { id: "extra_rice", name: "Side of Steamed Rice", price: 150 },
    { id: "peanuts", name: "Extra Crushed Peanuts", price: 50 },
    { id: "sauce", name: "House Chilli Sauce", price: 50 },
  ],
  noodles: [
    { id: "extra_noodles", name: "Extra Noodles", price: 150 },
    { id: "egg", name: "Fried Egg", price: 80 },
    { id: "chicken", name: "Grilled Chicken Chunks", price: 150 },
  ],
  rice: [
    { id: "egg", name: "Extra Fried Egg", price: 80 },
    { id: "prawns", name: "Extra Shrimp", price: 180 },
    { id: "veg", name: "Extra Vegetables", price: 100 },
  ],
  dimsum: [
    { id: "sauce", name: "Soy Dipping Sauce", price: 40 },
    { id: "chilli_oil", name: "Chilli Oil", price: 50 },
    { id: "extra_pieces", name: "2 Extra Pieces", price: 180 },
  ],
  drinks: [
    { id: "extra_ice", name: "Extra Ice", price: 0 },
    { id: "boba", name: "Tapioca Pearls (Boba)", price: 60 },
    { id: "syrup", name: "Flavored Syrup Shot", price: 50 },
  ],
  desserts: [
    { id: "ice_cream", name: "Vanilla Ice Cream Scoop", price: 100 },
    { id: "honey", name: "Honey Drizzle", price: 50 },
    { id: "nuts", name: "Crushed Roasted Nuts", price: 50 },
  ],
};

export default function ItemDetailModal({ item, isOpen, onClose }: ItemDetailModalProps) {
  const { add } = useCart();
  const [selectedPortion, setSelectedPortion] = useState<PortionOption>({ label: "Standard", price: 0 });
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [note, setNote] = useState<string>("");

  // Reset state when item changes or modal opens
  useEffect(() => {
    if (item) {
      const portions = CATEGORY_PORTIONS[item.cat] || [{ label: "Standard", price: 0 }];
      setSelectedPortion(portions[0]);
      setSelectedAddOns([]);
      setQuantity(1);
      setNote("");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const availablePortions = CATEGORY_PORTIONS[item.cat] || [{ label: "Standard", price: 0 }];
  const availableAddOns = CATEGORY_ADDONS[item.cat] || [
    { id: "sauce", name: "Extra Sauce", price: 50 },
    { id: "cheese", name: "Extra Cheese", price: 70 },
  ];

  const portionExtra = selectedPortion.price;
  const addOnsExtra = selectedAddOns.reduce((acc, addon) => acc + addon.price, 0);
  const unitPrice = item.price + portionExtra + addOnsExtra;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (addon: AddOnOption) => {
    setSelectedAddOns((prev) =>
      prev.some((a) => a.id === addon.id)
        ? prev.filter((a) => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleAddToCart = () => {
    // Build descriptive name
    let nameParts = [item.name];
    if (selectedPortion.price > 0) {
      nameParts.push(`(${selectedPortion.label})`);
    }
    if (selectedAddOns.length > 0) {
      nameParts.push(`+ ${selectedAddOns.map((a) => a.name).join(", ")}`);
    }

    const customizedName = nameParts.join(" ");
    const uniqueId = `${item.name}-${selectedPortion.label}-${selectedAddOns.map((a) => a.id).sort().join("-")}`;

    // Add items for the selected quantity
    for (let i = 0; i < quantity; i++) {
      add({
        id: uniqueId,
        name: customizedName,
        price: unitPrice,
        emoji: item.emoji,
        img: item.img,
      });
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Modal Dialog */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar rounded-3xl bg-white shadow-2xl dark:bg-[#1a1212] dark:border dark:border-[#2e2323] animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition hover:bg-black/60"
        >
          ✕
        </button>

        {/* Hero Visual Banner */}
        <div className="relative flex h-52 items-center justify-center bg-gradient-to-b from-brand-tint via-white to-neutral-50 text-8xl dark:from-[#2e1c1c] dark:via-[#1a1212] dark:to-[#171212]">
          {item.img ? (
            <Image src={item.img} alt={item.name} fill sizes="500px" className="object-cover" />
          ) : (
            item.emoji
          )}
          {item.hot && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-white shadow-md">
              🔥 HOT RIGHT NOW
            </span>
          )}
          <span className="absolute right-16 top-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-neutral-800 backdrop-blur-sm dark:bg-neutral-900/90 dark:text-neutral-100">
            ⭐ {item.rate}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-neutral-900 dark:text-neutral-100">
                {item.name}
              </h2>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                {item.desc}
              </p>
            </div>
            <span className="text-xl font-extrabold text-brand flex-none">
              Rs. {item.price.toLocaleString()}
            </span>
          </div>

          {/* Portion / Size Selection */}
          {availablePortions.length > 1 && (
            <div className="mt-6 border-t border-neutral-100 pt-5 dark:border-[#2e2323]">
              <label className="mb-2.5 block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Choose Size / Portion
              </label>
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {availablePortions.map((portion) => {
                  const isSelected = selectedPortion.label === portion.label;
                  return (
                    <button
                      type="button"
                      key={portion.label}
                      onClick={() => setSelectedPortion(portion)}
                      className={`flex flex-col items-center justify-center rounded-2xl border p-3 text-center transition ${
                        isSelected
                          ? "border-brand bg-brand-tint/40 text-brand dark:bg-[#2e1c1c]"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300 dark:border-neutral-800 dark:bg-[#171212] dark:text-neutral-300"
                      }`}
                    >
                      <span className="text-xs font-bold">{portion.label}</span>
                      <span className="mt-0.5 text-[11px] font-medium opacity-80">
                        {portion.price === 0 ? "Standard" : `+Rs. ${portion.price}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-Ons Options */}
          {availableAddOns.length > 0 && (
            <div className="mt-6 border-t border-neutral-100 pt-5 dark:border-[#2e2323]">
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                  Optional Extra Add-Ons
                </label>
                <span className="text-[11px] text-neutral-400">Select any</span>
              </div>
              <div className="space-y-2">
                {availableAddOns.map((addon) => {
                  const isChecked = selectedAddOns.some((a) => a.id === addon.id);
                  return (
                    <label
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`flex cursor-pointer items-center justify-between rounded-2xl border p-3.5 transition ${
                        isChecked
                          ? "border-brand bg-brand-tint/30 text-neutral-900 dark:bg-[#2e1c1c] dark:text-neutral-100"
                          : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#171212] dark:text-neutral-300 dark:hover:bg-[#221a1a]"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // handled by parent onClick
                          className="h-4 w-4 accent-brand rounded"
                        />
                        <span className="text-sm font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-brand">
                        +Rs. {addon.price}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="mt-6 border-t border-neutral-100 pt-5 dark:border-[#2e2323]">
            <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Special Request (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra sauce, no mayo, well done..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-neutral-800 dark:bg-[#171212] dark:text-neutral-100"
            />
          </div>

          {/* Footer: Quantity + Add Button */}
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-neutral-100 pt-5 dark:border-[#2e2323]">
            {/* Quantity Stepper */}
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-3 py-2 dark:border-neutral-800 dark:bg-[#171212]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-base font-bold shadow-sm transition hover:bg-neutral-200 dark:bg-[#2e2323] dark:hover:bg-[#3a2b2b]"
              >
                −
              </button>
              <span className="w-6 text-center text-sm font-extrabold tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-base font-bold shadow-sm transition hover:bg-neutral-200 dark:bg-[#2e2323] dark:hover:bg-[#3a2b2b]"
              >
                +
              </button>
            </div>

            {/* Add to Cart Submit Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 rounded-2xl bg-brand py-3.5 px-6 font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-[0.98] text-sm flex items-center justify-between"
            >
              <span>Add to Order</span>
              <span className="font-extrabold text-white/90">
                Rs. {totalPrice.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
