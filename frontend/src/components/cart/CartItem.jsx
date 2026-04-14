"use client";

import Link from "next/link";
import React, { useState } from "react";

export default function CartItem({ item }) {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const increment = () => setQuantity(q => q + 1);
  const decrement = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div>
      <div className="flex gap-x-4 sm:gap-x-6">
        {/* Image */}
        <div className="w-24 sm:w-32 flex-shrink-0">
          <img 
            className="w-full h-auto rounded-xl object-cover" 
            src={item.image} 
            alt={item.name} 
          />
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          {/* Header row */}
          <div className="flex justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-neutral-200">
                <Link href={`/product/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-500">
                  {item.name}
                </Link>
              </h3>
              <div className="mt-1 flex flex-wrap gap-2 text-sm text-gray-500 dark:text-neutral-500">
                <span>Color: {item.color}</span>
                <span className="hidden sm:inline">|</span>
                <span>Size: {item.size}</span>
              </div>
            </div>
            {/* Price */}
            <div className="text-end ps-2 flex-shrink-0">
              <span className="text-base font-semibold text-gray-800 dark:text-neutral-200">
                ${item.price}
              </span>
            </div>
          </div>

          {/* Controls row */}
          <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-y-2">
            {/* Quantity */}
            <div className="flex items-center gap-x-1.5" data-hs-input-number>
              <button 
                type="button" 
                onClick={decrement}
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
              </button>
              <input 
                className="p-0 w-8 bg-transparent border-0 text-center text-sm font-medium text-gray-800 focus:ring-0 dark:text-white" 
                type="text" 
                value={quantity} 
                readOnly
              />
              <button 
                type="button" 
                onClick={increment}
                className="size-8 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              >
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>

            {/* Remove Action */}
            <button type="button" className="inline-flex items-center gap-x-1.5 text-sm font-medium text-gray-500 hover:text-red-500 focus:outline-none focus:text-red-500 dark:text-neutral-500 dark:hover:text-red-500 dark:focus:text-red-500 transition-colors">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
              <span className="hidden sm:inline">Remove</span>
            </button>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 dark:border-neutral-700" />
    </div>
  );
}
