"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import GuestContactForm from "@/components/checkout/GuestContactForm";
import GuestShippingAddress from "@/components/checkout/GuestShippingAddress";
import LoggedInContactInfo from "@/components/checkout/LoggedInContactInfo";
import LoggedInShippingAddress from "@/components/checkout/LoggedInShippingAddress";
import ShippingMethodSelection from "@/components/checkout/ShippingMethodSelection";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth();
  const { totalPrice } = useCart();
  const router = useRouter();
  
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const subtotal = parseFloat(totalPrice) || 0;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08);

  const handleContinue = () => {
    if (!isAuthenticated) {
      router.push("/signin?redirect=/checkout");
      return;
    }
    
    if (!selectedAddressId) {
      alert("Please select a shipping address.");
      return;
    }
    
    router.push(`/review-and-pay?addressId=${selectedAddressId}`);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-x-2 text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to cart
          </Link>
        </div>

        {/* Stepper */}
        <CheckoutStepper currentStep={1} />

        {/* Two-column grid */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-16 items-start">
          {/* Left: Form */}
          <div>
            {isAuthenticated ? (
              <>
                <LoggedInContactInfo user={user} />
                <LoggedInShippingAddress 
                  onSelect={setSelectedAddressId} 
                  selectedId={selectedAddressId} 
                />
              </>
            ) : (
              <>
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg dark:bg-blue-900/20 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-400">
                    Already have an account? <Link href="/signin?redirect=/checkout" className="font-bold underline">Sign in</Link> for a faster checkout.
                  </p>
                </div>
                <GuestContactForm />
                <GuestShippingAddress />
              </>
            )}
            <ShippingMethodSelection />
          </div>

          {/* Right: Order Summary */}
          <div>
             <div className="bg-gray-50 rounded-xl p-4 sm:p-6 dark:bg-neutral-800">
                <CheckoutOrderSummary 
                  subtotal={subtotal} 
                  shipping={shipping} 
                  tax={tax} 
                  buttonLabel="Continue to Review" 
                />
                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full mt-4 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-all"
                >
                  Continue to Review
                </button>
             </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

