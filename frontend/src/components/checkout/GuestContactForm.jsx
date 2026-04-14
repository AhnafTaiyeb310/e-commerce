import Link from "next/link";
import React from "react";

export default function GuestContactForm() {
  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
          Checkout as Guest
        </h2>
        <Link href="/signin" className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline dark:text-blue-500 dark:hover:text-blue-400">
          Log in for faster checkout
        </Link>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="hs-checkout-email" className="block text-sm font-medium mb-2 dark:text-white">Email address</label>
          <input type="email" id="hs-checkout-email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="you@site.so" />
        </div>
      </div>
    </div>
  );
}
