import { PlacedOrder } from "@/types/checkout";

const LAST_ORDER_KEY = "fusion-wok:last-order";

// The placed order is handed to the /order-tracking page via sessionStorage,
// so it survives client-side navigation and refreshes (but not a new tab).
export function saveLastOrder(order: PlacedOrder) {
  try {
    sessionStorage.setItem(LAST_ORDER_KEY, JSON.stringify(order));
  } catch {}
}

export function loadLastOrder(): PlacedOrder | null {
  try {
    const raw = sessionStorage.getItem(LAST_ORDER_KEY);
    return raw ? (JSON.parse(raw) as PlacedOrder) : null;
  } catch {
    return null;
  }
}
