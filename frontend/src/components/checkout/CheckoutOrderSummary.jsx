"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/features/cart/hooks/useCart";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function CheckoutOrderSummary({ subtotal, shipping, tax, buttonLabel = "Continue" }) {
  const total = subtotal + shipping + tax;
  const router = useRouter();
  
  const { cart } = useCart();
  const items = cart?.items || [];

  return (
    <div className="bg-gray-50 rounded-xl p-4 sm:p-6 dark:bg-neutral-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
          Order summary
        </h2>
        <Link href="/cart" className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline dark:text-blue-500 dark:hover:text-blue-400">
          Edit cart
        </Link>
      </div>

      {/* Items List */}
      <div className="space-y-4 mb-6">
        {items.slice(0, 3).map((item) => {
           const product = item.product || {};
           const image = product.images?.find(i => i.is_primary)?.image_url || product.images?.[0]?.image_url || DEFAULT_PLACEHOLDER;
           return (
            <div key={item.id} className="flex gap-x-4">
              <div className="size-16 flex-shrink-0">
                <img className="size-full rounded-lg object-cover" src={image} alt={product.title} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-200">{product.title}</h4>
                <p className="text-xs text-gray-500 dark:text-neutral-500">Qty: {item.quantity}</p>
              </div>
              <div className="text-end">
                <p className="text-sm font-bold text-gray-800 dark:text-neutral-200">${item.total_price || product.base_price}</p>
              </div>
            </div>
          )
        })}
      </div>

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

      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => router.push("/review-and-pay")}
          className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none transition-all"
        >
          {buttonLabel}
        </button>
        <Link href="/cart" className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
          Back to Cart
        </Link>
      </div>
      
      <p className="mt-4 text-[11px] text-center text-gray-500 dark:text-neutral-500">
        By continuing, you agree to our Terms and Conditions.
      </p>
    </div>
  );
}
