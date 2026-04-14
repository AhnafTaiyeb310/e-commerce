"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function OrderSummary({ subtotal, shipping, tax }) {
  const total = subtotal + shipping + tax;
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout/logged-in");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 dark:bg-neutral-800">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-neutral-200 mb-4">
        Order summary
      </h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-neutral-400">Subtotal</span>
          <span className="font-medium text-gray-800 dark:text-neutral-200">${subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-neutral-400">Shipping</span>
          <span className="font-medium text-gray-800 dark:text-neutral-200">
            {shipping === 0 ? "Free" : `$${shipping}`}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-neutral-400">Tax</span>
          <span className="font-medium text-gray-800 dark:text-neutral-200">${tax}</span>
        </div>

        <hr className="border-gray-200 dark:border-neutral-700 my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span className="text-gray-800 dark:text-neutral-200">Total</span>
          <span className="text-gray-800 dark:text-neutral-200">${total}</span>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-all"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
              Loading...
            </>
          ) : (
            "Checkout"
          )}
        </button>
        {!isAuthenticated && !isLoading && (
          <p className="mt-3 text-center text-xs text-gray-500 dark:text-neutral-500">
            <a href="/signin" className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500">Log in</a> for faster checkout
          </p>
        )}
      </div>

      {/* Promo Code */}
      <div className="mt-6">
        <div className="relative">
          <input type="text" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Promo code" />
          <div className="absolute inset-y-0 end-0 flex items-center pe-3">
            <button type="button" className="text-sm font-semibold text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400 focus:outline-none">
              Apply
            </button>
          </div>
        </div>
      </div>

      {/* Badges */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center gap-x-3">
          <div className="flex-shrink-0 size-8 flex justify-center items-center bg-white border border-gray-200 rounded-full text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-gray-800 dark:text-white uppercase">Secure checkout</h4>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="flex-shrink-0 size-8 flex justify-center items-center bg-white border border-gray-200 rounded-full text-gray-800 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200">
            <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/><line x1="7" x2="7" y1="15" y2="15"/><line x1="11" x2="11" y1="15" y2="15"/></svg>
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold text-gray-800 dark:text-white uppercase">Guaranteed safe checkout</h4>
          </div>
        </div>
      </div>
    </div>
  );
}
