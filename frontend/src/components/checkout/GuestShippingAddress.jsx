import React from "react";

export default function GuestShippingAddress() {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-6 border-t border-gray-200 dark:border-neutral-700 pt-10">
        Shipping address
      </h2>
      
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="hs-checkout-first-name" className="block text-sm font-medium mb-2 dark:text-white">First name</label>
          <input type="text" id="hs-checkout-first-name" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
        </div>
        <div>
          <label htmlFor="hs-checkout-last-name" className="block text-sm font-medium mb-2 dark:text-white">Last name</label>
          <input type="text" id="hs-checkout-last-name" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="hs-checkout-address" className="block text-sm font-medium mb-2 dark:text-white">Address</label>
          <input type="text" id="hs-checkout-address" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
        </div>
        <div>
          <label htmlFor="hs-checkout-city" className="block text-sm font-medium mb-2 dark:text-white">City</label>
          <input type="text" id="hs-checkout-city" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
        </div>
        <div>
          <label htmlFor="hs-checkout-country" className="block text-sm font-medium mb-2 dark:text-white">Country / Region</label>
          <select id="hs-checkout-country" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
            <option value="UK">United Kingdom</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
          </select>
        </div>
        <div>
          <label htmlFor="hs-checkout-zip" className="block text-sm font-medium mb-2 dark:text-white">Zip / Postcode</label>
          <input type="text" id="hs-checkout-zip" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" />
        </div>
      </div>
    </div>
  );
}
