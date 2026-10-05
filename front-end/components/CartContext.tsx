"use client";
import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import CartDrawer from "./CartDrawer";

export interface CartItem {
  id: string;       // using the item name as id for now — swap for a real id once items come from Supabase
  name: string;
  price: number;
  emoji: string;
  img?: string;
  qty: number;
}

interface CartContextValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  add: (item: Omit<CartItem, "qty">) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
}

const CartCtx = createContext<CartContextValue>({
  items: [],
  count: 0,
  subtotal: 0,
  isOpen: false,
  openCart: () => {},
  closeCart: () => {},
  toggleCart: () => {},
  add: () => {},
  remove: () => {},
  setQty: () => {},
  clear: () => {},
});

export const useCart = () => useContext(CartCtx);

// Demo cart: state only lives in memory, so it resets on refresh.
// Swap for persisted/server cart state when checkout is wired up.
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const add: CartContextValue["add"] = (item) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
    setToast(`Added: ${item.name}`);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(""), 1600);
  };

  const remove: CartContextValue["remove"] = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty: CartContextValue["setQty"] = (id, qty) => {
    if (qty < 1) return remove(id);
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((n, i) => n + i.qty * i.price, 0), [items]);

  return (
    <CartCtx.Provider value={{ items, count, subtotal, isOpen, openCart, closeCart, toggleCart, add, remove, setQty, clear }}>
      {children}
      <CartDrawer />
      <div
        className={`fixed left-1/2 bottom-6 z-50 -translate-x-1/2 rounded-full bg-brand px-5 py-2.5 font-semibold text-white transition-transform duration-300 ${
          toast ? "translate-y-0" : "translate-y-28"
        }`}
      >
        {toast}
      </div>
    </CartCtx.Provider>
  );
}
