"use client";
import React, { useState } from "react";
import PaymentMethod from "./PaymentMethod";
import { CheckoutFormData } from "@/types/checkout";

interface CheckoutFormProps {
  onSubmit: (data: CheckoutFormData) => void;
  isSubmitting?: boolean;
}

const POPULAR_AREAS = [
  "DHA Phase 1-6",
  "Gulberg",
  "Johar Town",
  "Bahria Town",
  "Model Town",
  "F-7 / Blue Area",
  "Clifton",
  "Cantt",
  "Wapda Town",
];

const QUICK_RIDER_NOTES = [
  "Ring the doorbell 🔔",
  "Call when arrived 📞",
  "Leave at door 🚪",
  "Baby sleeping, please don't ring 👶",
];

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: "",
    phone: "",
    email: "",
    streetAddress: "",
    area: "",
    city: "Lahore",
    landmark: "",
    deliveryOption: "standard",
    riderNote: "",
    paymentMethod: "cod",
    needCutlery: false,
    specialInstructions: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof CheckoutFormData, boolean>>>({});

  const validateField = (name: keyof CheckoutFormData, value: any): string => {
    switch (name) {
      case "fullName":
        if (!value || value.trim().length < 2) return "Please enter your full name";
        return "";
      case "phone":
        if (!value || !/^[0-9+\s-]{9,15}$/.test(value.trim())) {
          return "Please enter a valid phone number (e.g. 0300 1234567)";
        }
        return "";
      case "email":
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      case "streetAddress":
        if (!value || value.trim().length < 5) return "Please provide your complete house/street address";
        return "";
      case "area":
        if (!value || value.trim().length < 2) return "Please select or type your delivery area/sector";
        return "";
      case "city":
        if (!value || value.trim().length < 2) return "Please select or enter your city";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (name: keyof CheckoutFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const errorMsg = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  const handleBlur = (name: keyof CheckoutFormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errorMsg = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Mark required fields as touched
    const requiredFields: (keyof CheckoutFormData)[] = ["fullName", "phone", "streetAddress", "area", "city"];
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};
    const newTouched: Partial<Record<keyof CheckoutFormData, boolean>> = {};

    let hasError = false;
    requiredFields.forEach((field) => {
      newTouched[field] = true;
      const err = validateField(field, formData[field]);
      if (err) {
        newErrors[field] = err;
        hasError = true;
      }
    });

    if (formData.email) {
      const emailErr = validateField("email", formData.email);
      if (emailErr) {
        newErrors.email = emailErr;
        hasError = true;
      }
    }

    setTouched((prev) => ({ ...prev, ...newTouched }));
    setErrors(newErrors);

    if (!hasError) {
      onSubmit(formData);
    } else {
      // Scroll to first error
      const firstErrorEl = document.querySelector("[data-has-error='true']");
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  return (
    <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
      {/* ── Section 1: Customer Contact Details ── */}
      <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-[#2e2323] dark:bg-[#1e1616]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-tint text-base text-brand dark:bg-[#2e1c1c]">
            👤
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
              Contact Information
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              We need this to confirm your order and send rider status
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <div data-has-error={!!errors.fullName}>
            <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Full Name <span className="text-brand">*</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. Sarah Khan"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              onBlur={() => handleBlur("fullName")}
              className={`w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 dark:bg-[#171212] dark:text-neutral-100 ${
                errors.fullName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-neutral-200 focus:border-brand focus:ring-brand/20 dark:border-neutral-700"
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs font-medium text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Phone Number */}
          <div data-has-error={!!errors.phone}>
            <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Phone Number <span className="text-brand">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                placeholder="e.g. 0300 1234567"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                className={`w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 dark:bg-[#171212] dark:text-neutral-100 ${
                  errors.phone
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-neutral-200 focus:border-brand focus:ring-brand/20 dark:border-neutral-700"
                }`}
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs font-medium text-red-500">{errors.phone}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="sm:col-span-2" data-has-error={!!errors.email}>
            <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Email Address <span className="font-normal text-neutral-400">(Optional - for digital receipt)</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="e.g. sarah@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={`w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 dark:bg-[#171212] dark:text-neutral-100 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-neutral-200 focus:border-brand focus:ring-brand/20 dark:border-neutral-700"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs font-medium text-red-500">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      {/* ── Section 2: Delivery Address ── */}
      <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-[#2e2323] dark:bg-[#1e1616]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-tint text-base text-brand dark:bg-[#2e1c1c]">
            📍
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
              Delivery Address
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Where should we deliver your hot meal?
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {/* Street Address */}
          <div data-has-error={!!errors.streetAddress}>
            <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              House / Apartment / Street Address <span className="text-brand">*</span>
            </label>
            <input
              type="text"
              name="streetAddress"
              placeholder="e.g. House 42-B, Street 7, Block G"
              value={formData.streetAddress}
              onChange={(e) => handleChange("streetAddress", e.target.value)}
              onBlur={() => handleBlur("streetAddress")}
              className={`w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 dark:bg-[#171212] dark:text-neutral-100 ${
                errors.streetAddress
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                  : "border-neutral-200 focus:border-brand focus:ring-brand/20 dark:border-neutral-700"
              }`}
            />
            {errors.streetAddress && (
              <p className="mt-1 text-xs font-medium text-red-500">{errors.streetAddress}</p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Area / Sector */}
            <div data-has-error={!!errors.area}>
              <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
                Area / Sector / Society <span className="text-brand">*</span>
              </label>
              <input
                type="text"
                name="area"
                placeholder="e.g. Gulberg III or DHA Phase 5"
                value={formData.area}
                onChange={(e) => handleChange("area", e.target.value)}
                onBlur={() => handleBlur("area")}
                className={`w-full rounded-2xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 dark:bg-[#171212] dark:text-neutral-100 ${
                  errors.area
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                    : "border-neutral-200 focus:border-brand focus:ring-brand/20 dark:border-neutral-700"
                }`}
              />
              {errors.area && (
                <p className="mt-1 text-xs font-medium text-red-500">{errors.area}</p>
              )}
            </div>

            {/* City */}
            <div data-has-error={!!errors.city}>
              <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
                City <span className="text-brand">*</span>
              </label>
              <select
                name="city"
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-[#171212] dark:text-neutral-100"
              >
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
              </select>
            </div>
          </div>

          {/* Quick area suggestions */}
          <div>
            <span className="text-[11px] font-semibold text-neutral-400 dark:text-neutral-500">
              Popular areas:
            </span>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {POPULAR_AREAS.map((area) => (
                <button
                  type="button"
                  key={area}
                  onClick={() => {
                    handleChange("area", area);
                    setErrors((prev) => ({ ...prev, area: "" }));
                  }}
                  className={`rounded-full px-2.5 py-1 text-xs font-medium transition ${
                    formData.area === area
                      ? "bg-brand text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-[#2e2323] dark:text-neutral-300 dark:hover:bg-[#3a2b2b]"
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Nearby Landmark */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Nearby Landmark <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <input
              type="text"
              name="landmark"
              placeholder="e.g. Near Main Market / Next to Shell Petrol Pump"
              value={formData.landmark}
              onChange={(e) => handleChange("landmark", e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-[#171212] dark:text-neutral-100"
            />
          </div>

          {/* Rider Instructions */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Rider Instructions <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <input
              type="text"
              name="riderNote"
              placeholder="e.g. Please call before reaching the gate"
              value={formData.riderNote}
              onChange={(e) => handleChange("riderNote", e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-[#171212] dark:text-neutral-100"
            />
            {/* Quick Chips */}
            <div className="mt-2 flex flex-wrap gap-1.5">
              {QUICK_RIDER_NOTES.map((note) => (
                <button
                  type="button"
                  key={note}
                  onClick={() => handleChange("riderNote", note)}
                  className={`rounded-full px-2.5 py-1 text-xs transition ${
                    formData.riderNote === note
                      ? "bg-brand text-white font-medium"
                      : "bg-neutral-50 text-neutral-500 hover:bg-neutral-100 dark:bg-[#251a1a] dark:text-neutral-400 dark:hover:bg-[#2e2323]"
                  }`}
                >
                  {note}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Delivery Speed & Preferences ── */}
      <div className="rounded-3xl border border-neutral-100 bg-white p-6 shadow-sm dark:border-[#2e2323] dark:bg-[#1e1616]">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-tint text-base text-brand dark:bg-[#2e1c1c]">
            🛵
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-neutral-900 dark:text-neutral-100">
              Delivery Speed & Kitchen Notes
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Tailor your delivery and food preparation preferences
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {/* Standard Delivery */}
          <label
            onClick={() => handleChange("deliveryOption", "standard")}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
              formData.deliveryOption === "standard"
                ? "border-brand bg-brand-tint/20 dark:bg-[#2e1c1c]/50"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700"
            }`}
          >
            <input
              type="radio"
              name="deliveryOption"
              value="standard"
              checked={formData.deliveryOption === "standard"}
              onChange={() => handleChange("deliveryOption", "standard")}
              className="mt-1 h-4 w-4 accent-brand"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100">
                <span>Standard Delivery</span>
                <span className="text-xs font-semibold text-neutral-500">⚡ 30-40 min</span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Freshly prepared and dispatched via our standard fleet.
              </p>
            </div>
          </label>

          {/* Priority Express */}
          <label
            onClick={() => handleChange("deliveryOption", "priority")}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition ${
              formData.deliveryOption === "priority"
                ? "border-brand bg-brand-tint/20 dark:bg-[#2e1c1c]/50"
                : "border-neutral-200 hover:border-neutral-300 dark:border-neutral-700"
            }`}
          >
            <input
              type="radio"
              name="deliveryOption"
              value="priority"
              checked={formData.deliveryOption === "priority"}
              onChange={() => handleChange("deliveryOption", "priority")}
              className="mt-1 h-4 w-4 accent-brand"
            />
            <div>
              <div className="flex items-center gap-1.5 font-bold text-neutral-900 dark:text-neutral-100">
                <span>Direct Priority</span>
                <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  ⚡ 20-30 min
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Direct route with dedicated rider assigned immediately.
              </p>
            </div>
          </label>
        </div>

        {/* Special Instructions & Cutlery */}
        <div className="mt-5 space-y-4 border-t border-neutral-100 pt-4 dark:border-[#2e2323]">
          {/* Cutlery Toggle */}
          <label className="flex cursor-pointer items-center justify-between rounded-2xl bg-neutral-50 p-3.5 dark:bg-[#171212]">
            <div className="flex items-center gap-3">
              <span className="text-xl">🍴</span>
              <div>
                <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                  Include Disposable Cutlery & Napkins
                </p>
                <p className="text-xs text-neutral-400">
                  Help reduce plastic waste if you're eating at home!
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              name="needCutlery"
              checked={formData.needCutlery}
              onChange={(e) => handleChange("needCutlery", e.target.checked)}
              className="h-5 w-5 accent-brand"
            />
          </label>

          {/* Kitchen instructions */}
          <div>
            <label className="mb-1.5 block text-xs font-bold text-neutral-700 dark:text-neutral-300">
              Kitchen Instructions <span className="font-normal text-neutral-400">(Optional)</span>
            </label>
            <textarea
              name="specialInstructions"
              rows={2}
              placeholder="e.g. Extra spicy, sauce on the side, no onions in the wok..."
              value={formData.specialInstructions}
              onChange={(e) => handleChange("specialInstructions", e.target.value)}
              className="w-full rounded-2xl border border-neutral-200 bg-white p-3.5 text-sm transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 dark:border-neutral-700 dark:bg-[#171212] dark:text-neutral-100"
            />
          </div>
        </div>
      </div>

      {/* ── Section 4: Payment Method (Cash on Delivery) ── */}
      <PaymentMethod
        selected={formData.paymentMethod}
        onChange={(m) => handleChange("paymentMethod", m)}
      />

      {/* ── Mobile/Tablet Direct Submit Button ── */}
      <div className="block lg:hidden">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-brand py-4 text-center font-bold text-white shadow-lg shadow-brand/25 transition hover:bg-brand-dark hover:shadow-brand/40 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center gap-2">
              <svg className="h-5 w-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Placing Order...
            </span>
          ) : (
            "Complete Order →"
          )}
        </button>
      </div>
    </form>
  );
}
