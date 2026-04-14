"use client";

import React, { useState } from "react";

export default function LoggedInShippingAddress() {
  const addresses = [
    {
      id: 1,
      name: "James Collins",
      address: "15-17 Christopher St",
      city: "London",
      country: "United Kingdom",
      zip: "EC2A 2BS",
      isDefault: true
    },
    {
      id: 2,
      name: "James Collins",
      address: "24-26 Worship St",
      city: "London",
      country: "United Kingdom",
      zip: "EC2A 2DX",
      isDefault: false
    }
  ];

  const [selected, setSelected] = useState(addresses[0].id);

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6 border-t border-gray-200 dark:border-neutral-700 pt-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
          Shipping address
        </h2>
        <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline dark:text-blue-500 dark:hover:text-blue-400">
          Add new
        </button>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <div key={addr.id} className="relative">
            <input 
              type="radio" 
              name="hs-shipping-address" 
              id={`address-${addr.id}`} 
              className="peer absolute top-0 start-0 w-full h-full opacity-0 cursor-pointer" 
              checked={selected === addr.id}
              onChange={() => setSelected(addr.id)}
            />
            <label htmlFor={`address-${addr.id}`} className="block h-full p-4 bg-white border border-gray-200 rounded-xl peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 dark:bg-neutral-900 dark:border-neutral-700 dark:peer-checked:border-blue-500 dark:peer-checked:ring-blue-500 transition-all cursor-pointer">
              <span className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">{addr.name}</span>
                {addr.isDefault && (
                  <span className="text-[10px] font-bold uppercase text-gray-500 dark:text-neutral-500">Default</span>
                )}
              </span>
              <span className="block text-sm text-gray-600 dark:text-neutral-400">
                {addr.address}<br/>
                {addr.city}, {addr.zip}<br/>
                {addr.country}
              </span>
            </label>
            <div className="absolute top-4 end-4 hidden peer-checked:block">
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
