"use client";

import React, { useState } from "react";

export default function ShippingMethodSelection() {
  const methods = [
    {
      id: "standard",
      name: "Standard Shipping",
      desc: "Delivered in 4-10 business days",
      price: 0
    },
    {
      id: "express",
      name: "Express Shipping",
      desc: "Delivered in 2-3 business days",
      price: 15
    }
  ];

  const [selected, setSelected] = useState("standard");

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-6 border-t border-gray-200 dark:border-neutral-700 pt-10">
        Shipping method
      </h2>
      
      <div className="grid gap-4">
        {methods.map((method) => (
          <div key={method.id} className="relative">
            <input 
              type="radio" 
              name="hs-shipping-method" 
              id={`method-${method.id}`} 
              className="peer absolute top-0 start-0 w-full h-full opacity-0 cursor-pointer" 
              checked={selected === method.id}
              onChange={() => setSelected(method.id)}
            />
            <label htmlFor={`method-${method.id}`} className="block p-4 bg-white border border-gray-200 rounded-xl peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 dark:bg-neutral-900 dark:border-neutral-700 dark:peer-checked:border-blue-500 dark:peer-checked:ring-blue-500 transition-all cursor-pointer">
              <span className="flex justify-between items-center">
                <span className="flex items-center gap-x-3">
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">{method.name}</span>
                  <span className="text-xs text-gray-500 dark:text-neutral-500">{method.desc}</span>
                </span>
                <span className="text-sm font-bold text-gray-800 dark:text-neutral-200">
                  {method.price === 0 ? "Free" : `$${method.price}`}
                </span>
              </span>
            </label>
            <div className="absolute top-1/2 -translate-y-1/2 end-4 hidden peer-checked:block">
              <div className="size-5 flex justify-center items-center bg-blue-600 rounded-full dark:bg-blue-500">
                <svg className="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
