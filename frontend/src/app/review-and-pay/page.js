"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card" },
  { id: "paypal", label: "PayPal" },
];

export default function ReviewAndPayPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const router = useRouter();

  const subtotal = 299;
  const shipping = 0;
  const tax = Math.round(299 * 0.08);

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Back link */}
        <div className="mb-8">
          <Link href="/checkout" className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to checkout
          </Link>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={2} />

        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">
          {/* Left column */}
          <div>
            {/* ── Contact details review ── */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide">Contact details</h2>
                <Link href="/checkout" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</Link>
              </div>
              <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1">
                <li>jamescollins@site.so</li>
              </ul>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700 mb-10" />

            {/* ── Shipping address review ── */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide">Shipping address</h2>
                <Link href="/checkout" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</Link>
              </div>
              <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1">
                <li>James Collins</li>
                <li>280 Suzanne Throughway</li>
                <li>New York, Breannabury, OR 45801, US</li>
              </ul>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700 mb-10" />

            {/* ── Shipping method review ── */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide">Shipping method</h2>
                <Link href="/checkout" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</Link>
              </div>
              <p className="text-sm text-gray-600 dark:text-neutral-400">Free, 2–4 working days</p>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700 mb-10" />

            {/* ── Payment method ── */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-6">Payment methods</h2>

              {/* Payment toggles */}
              <div className="flex gap-3 mb-6">
                {MOCK_PAYMENT_METHODS.map((m) => (
                  <div key={m.id} className="relative">
                    <input
                      type="radio"
                      name="payment-method"
                      id={`pm-${m.id}`}
                      checked={paymentMethod === m.id}
                      onChange={() => setPaymentMethod(m.id)}
                      className="peer absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <label
                      htmlFor={`pm-${m.id}`}
                      className="block px-5 py-2.5 text-sm font-medium border rounded-lg cursor-pointer border-gray-200 text-gray-700 peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 peer-checked:text-blue-600 dark:border-neutral-700 dark:text-neutral-300 dark:peer-checked:border-blue-500 dark:peer-checked:text-blue-500 transition-all"
                    >
                      {m.label}
                    </label>
                  </div>
                ))}
              </div>

              {/* Card form */}
              {paymentMethod === "card" && (
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Cardholder name</label>
                    <input type="text" placeholder="James Collins" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-white">Card number</label>
                    <input type="text" placeholder="•••• •••• •••• ••••" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">Expiry</label>
                      <input type="text" placeholder="MM / YY" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-white">CVV</label>
                      <input type="text" placeholder="•••" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500" />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl dark:bg-blue-900/20 dark:border-blue-800">
                  <p className="text-sm text-blue-700 dark:text-blue-400">You'll be redirected to PayPal to complete payment securely.</p>
                </div>
              )}

              {/* Billing address */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide mb-3">Billing address</h3>
                <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1">
                  <li>New York, 280 Suzanne Throughway</li>
                  <li>Breannabury, OR 45801, US</li>
                </ul>
              </div>
            </section>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              <Link href="/checkout" className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                Back
              </Link>
              <button
                type="button"
                onClick={() => router.push("/order-confirmation")}
                className="flex-1 py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
              >
                Place order
              </button>
            </div>
          </div>

          {/* Right: Order summary sidebar */}
          <div>
            <CheckoutOrderSummary subtotal={subtotal} shipping={shipping} tax={tax} buttonLabel="Place order" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
