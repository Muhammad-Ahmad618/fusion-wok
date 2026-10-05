"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import CheckoutSummary from "@/components/checkout/CheckoutSummary";
import { saveLastOrder } from "@/components/order-tracking/orderStorage";
import { DELIVERY_FEE, FREE_DELIVERY_OVER, PROMO_CODES } from "@/components/cart/constants";
import { CheckoutFormData, PlacedOrder } from "@/types/checkout";

import OrderConfirmModal from "@/components/checkout/OrderConfirmModal";

function CheckoutContent() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialPromo = searchParams.get("promo");

  const [discount, setDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // True once the order is placed — keeps the confirm modal up while
  // navigating so the empty-cart state never flashes underneath.
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  // Modal state
  const [pendingFormData, setPendingFormData] = useState<CheckoutFormData | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Auto-apply promo from query param if present
  useEffect(() => {
    if (initialPromo && subtotal > 0) {
      const promoKey = initialPromo.toUpperCase();
      const promo = PROMO_CODES[promoKey];
      if (promo) {
        setDiscount(promo.discount(subtotal));
        setPromoCode(promoKey);
      }
    }
  }, [initialPromo, subtotal]);

  // Apply promo code handler
  const handleApplyPromo = (code: string) => {
    const promo = PROMO_CODES[code];
    if (promo) {
      setDiscount(promo.discount(subtotal));
      setPromoCode(code);
    }
  };

  const handleRemovePromo = () => {
    setDiscount(0);
    setPromoCode(null);
  };

  // Called when CheckoutForm validation succeeds
  const handleFormSubmit = (formData: CheckoutFormData) => {
    setPendingFormData(formData);
    setShowConfirmModal(true);
  };

  // Called when user clicks "Confirm & Place Order" inside OrderConfirmModal
  const executePlaceOrder = () => {
    if (!pendingFormData) return;
    setIsSubmitting(true);

    const deliveryFee = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
    const total = Math.max(0, subtotal - discount + deliveryFee);
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const orderId = `#RF-${randomNum}`;

    // Estimated delivery time
    const now = new Date();
    const deliveryMinutes = pendingFormData.deliveryOption === "priority" ? 25 : 35;
    const etaDate = new Date(now.getTime() + deliveryMinutes * 60000);
    const etaFormatted = etaDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setTimeout(() => {
      const order: PlacedOrder = {
        orderId,
        createdAt: new Date().toLocaleString(),
        estimatedDeliveryTime: etaFormatted,
        items: [...items],
        subtotal,
        deliveryFee,
        discount,
        promoCode,
        total,
        customer: {
          fullName: pendingFormData.fullName,
          phone: pendingFormData.phone,
          email: pendingFormData.email,
        },
        delivery: {
          streetAddress: pendingFormData.streetAddress,
          area: pendingFormData.area,
          city: pendingFormData.city,
          landmark: pendingFormData.landmark,
          riderNote: pendingFormData.riderNote,
          deliveryOption: pendingFormData.deliveryOption,
        },
        paymentMethod: "cod",
        needCutlery: pendingFormData.needCutlery,
        specialInstructions: pendingFormData.specialInstructions,
      };

      saveLastOrder(order);
      setOrderPlaced(true);
      clear(); // Reset cart state
      // Keep the modal open with its "Placing..." state as a transition
      // screen until the tracking page replaces this one.
      router.push("/order-tracking");
    }, 800);
  };

  // If cart is empty and no order is placed, show empty state
  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center px-5 py-16 text-center">
        <div className="relative mb-8">
          <div className="absolute inset-0 rounded-full bg-brand/20 blur-2xl" />
          <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-brand-tint to-white text-6xl shadow-inner dark:from-[#2e1c1c] dark:to-[#171212]">
            🛍️
          </div>
        </div>

        <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
          Your cart is currently empty
        </h1>
        <p className="mb-8 max-w-xs text-neutral-500 dark:text-neutral-400">
          Please add some delicious items from our menu before proceeding to checkout.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2.5 rounded-2xl bg-brand px-8 py-4 font-bold text-white shadow-xl shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-95"
        >
          <span className="text-xl">🍔</span>
          Explore Menu
        </Link>
      </main>
    );
  }

  const deliveryFee = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FEE;
  const currentTotal = Math.max(0, subtotal - discount + deliveryFee);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 md:py-12">
      {/* ── Breadcrumb Navigation ── */}
      <nav className="mb-6 text-sm text-neutral-400 dark:text-neutral-500">
        <Link href="/" className="transition hover:text-brand">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/cart" className="transition hover:text-brand">
          Cart
        </Link>
        <span className="mx-2">/</span>
        <span className="font-semibold text-neutral-800 dark:text-neutral-200">
          Checkout
        </span>
      </nav>

      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 md:text-4xl">
            Checkout & Delivery 🛵
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Please fill in your delivery details below to complete your order.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-brand-tint/70 px-4 py-2 text-xs font-bold text-brand dark:bg-[#2e1c1c]">
          <span>💵 Cash on Delivery Only</span>
        </div>
      </div>

      {/* ── Main Grid: Form + Sticky Order Summary ── */}
      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 xl:col-span-8">
          <CheckoutForm
            onSubmit={handleFormSubmit}
            isSubmitting={isSubmitting}
          />
        </div>

        <div className="lg:col-span-5 xl:col-span-4">
          <CheckoutSummary
            discount={discount}
            promoCode={promoCode}
            onApplyPromo={handleApplyPromo}
            onRemovePromo={handleRemovePromo}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>

      {/* ── Order Confirmation Modal ── */}
      {pendingFormData && (
        <OrderConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={executePlaceOrder}
          formData={pendingFormData}
          items={items}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          discount={discount}
          promoCode={promoCode}
          total={currentTotal}
          isSubmitting={isSubmitting}
        />
      )}
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-neutral-500">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}

