import { CartItem } from "@/components/CartContext";

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  area: string;
  city: string;
  landmark: string;
  deliveryOption: "standard" | "priority";
  riderNote: string;
  paymentMethod: "cod";
  needCutlery: boolean;
  specialInstructions: string;
}

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  estimatedDeliveryTime: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  promoCode: string | null;
  total: number;
  customer: {
    fullName: string;
    phone: string;
    email?: string;
  };
  delivery: {
    streetAddress: string;
    area: string;
    city: string;
    landmark?: string;
    riderNote?: string;
    deliveryOption: "standard" | "priority";
  };
  paymentMethod: "cod";
  needCutlery: boolean;
  specialInstructions?: string;
}
