"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchAddresses, createOrder } from "@/lib/api";
import { toast } from "sonner";

const MOCK_PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", active: true },
  { id: "online", label: "Online Payment", active: false, note: "Coming Soon" },
];

export default function ReviewAndPayPage() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const addressId = searchParams.get("addressId");

  const { cart, cartId, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  // Fetch addresses to show the preview of the selected one
  const { data: addressesData } = useQuery({
    queryKey: ["user_addresses"],
    queryFn: () => fetchAddresses(),
    enabled: !!user,
  });

  const addresses = addressesData?.results || addressesData || [];
  const selectedAddress = addresses.find(a => a.id.toString() === addressId);

  const subtotal = parseFloat(totalPrice) || 0;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08);

  const placeOrderMutation = useMutation({
    mutationFn: (data) => createOrder(data),
    onSuccess: (data) => {
      toast.success("Order placed successfully!");
      clearCart();
      router.push(`/order-confirmation?orderId=${data.id}`);
    },
    onError: (error) => {
      console.error("Failed to place order:", error);
      toast.error(error.response?.data?.detail || "Failed to place order. Please try again.");
      setIsProcessing(false);
    }
  });

  const handlePlaceOrder = () => {
    if (!cartId || (cart?.items?.length || 0) === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!addressId) {
      toast.error("Shipping address missing. Please go back and select one.");
      return;
    }

    setIsProcessing(true);
    placeOrderMutation.mutate({
      cart_id: cartId,
      shipping_address_id: parseInt(addressId)
    });
  };

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
                <li>{user?.email}</li>
              </ul>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700 mb-10" />

            {/* ── Shipping address review ── */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide">Shipping address</h2>
                <Link href="/checkout" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</Link>
              </div>
              {selectedAddress ? (
                <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1">
                  <li>{selectedAddress.first_name} {selectedAddress.last_name}</li>
                  <li>{selectedAddress.street}</li>
                  <li>{selectedAddress.city}, {selectedAddress.state} {selectedAddress.postal_code}, {selectedAddress.country}</li>
                </ul>
              ) : (
                <p className="text-sm text-red-500">No address selected.</p>
              )}
            </section>

            <hr className="border-gray-200 dark:border-neutral-700 mb-10" />

            {/* ── Shipping method review ── */}
            <section className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide">Shipping method</h2>
                <Link href="/checkout" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Edit</Link>
              </div>
              <p className="text-sm text-gray-600 dark:text-neutral-400">
                {shipping === 0 ? "Standard Shipping (Free)" : "Standard Shipping ($15)"}
              </p>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700 mb-10" />

            {/* ── Payment method ── */}
            <section className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-6">Payment methods</h2>

              {/* Payment toggles */}
              <div className="flex flex-wrap gap-3 mb-6">
                {MOCK_PAYMENT_METHODS.map((m) => (
                  <div key={m.id} className="relative">
                    <input
                      type="radio"
                      name="payment-method"
                      id={`pm-${m.id}`}
                      disabled={!m.active}
                      checked={paymentMethod === m.id}
                      onChange={() => m.active && setPaymentMethod(m.id)}
                      className="peer absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <label
                      htmlFor={`pm-${m.id}`}
                      className={`block px-5 py-2.5 text-sm font-medium border rounded-lg cursor-pointer transition-all ${
                        m.active 
                        ? "border-gray-200 text-gray-700 peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 peer-checked:text-blue-600 dark:border-neutral-700 dark:text-neutral-300 dark:peer-checked:border-blue-500 dark:peer-checked:text-blue-500" 
                        : "border-gray-100 text-gray-400 bg-gray-50 dark:border-neutral-800 dark:text-neutral-600 dark:bg-neutral-900/50 cursor-not-allowed"
                      }`}
                    >
                      <span className="flex items-center gap-x-2">
                        {m.label}
                        {!m.active && (
                          <span className="bg-blue-100 text-blue-700 text-[10px] px-1.5 py-0.5 rounded dark:bg-blue-900/30 dark:text-blue-400">
                            {m.note}
                          </span>
                        )}
                      </span>
                    </label>
                  </div>
                ))}
              </div>

              {paymentMethod === "cod" && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  <p className="text-sm text-gray-600 dark:text-neutral-400">
                    You will pay the total amount in cash to our courier partner at the time of delivery.
                  </p>
                </div>
              )}

              {/* Billing address */}
              <div className="mt-8">
                <h3 className="text-sm font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide mb-3">Billing address</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">Same as shipping address</p>
              </div>
            </section>

            {/* Navigation buttons */}
            <div className="flex gap-3">
              <Link href="/checkout" className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                Back
              </Link>
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="flex-1 py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full"></span>
                    Processing...
                  </>
                ) : (
                  "Place order"
                )}
              </button>
            </div>
          </div>

          {/* Right: Order summary sidebar */}
          <div>
            <div className="bg-gray-50 rounded-xl p-4 sm:p-6 dark:bg-neutral-800">
              <CheckoutOrderSummary 
                subtotal={subtotal} 
                shipping={shipping} 
                tax={tax} 
              />
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50"
              >
                {isProcessing ? "Processing..." : "Place order"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

