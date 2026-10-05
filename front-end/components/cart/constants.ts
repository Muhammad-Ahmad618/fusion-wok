export const DELIVERY_FEE = 150;
export const FREE_DELIVERY_OVER = 1500;

export const PROMO_CODES: Record<string, { discount: (subtotal: number) => number; label: string }> = {
  FEAST30: { discount: (s) => Math.round(s * 0.3), label: "30% discount applied! 🎉" },
  RED30:   { discount: (s) => Math.round(s * 0.3), label: "30% discount applied! 🎉" },
  BOGO:    { discount: () => 200,                  label: "Rs. 200 BOGO discount applied! 🎉" },
};
