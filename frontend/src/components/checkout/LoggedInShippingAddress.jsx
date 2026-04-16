"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAddresses } from "@/lib/api";

export default function LoggedInShippingAddress({ onSelect, selectedId }) {
  const { data, isLoading } = useQuery({
    queryKey: ["user_addresses"],
    queryFn: () => fetchAddresses(),
  });

  const addresses = data?.results || data || [];

  // Automatically select default address if none is selected
  React.useEffect(() => {
    if (addresses.length > 0 && !selectedId) {
      const defaultAddr = addresses.find(a => a.is_default) || addresses[0];
      onSelect(defaultAddr.id);
    }
  }, [addresses, selectedId, onSelect]);

  if (isLoading) {
    return (
      <div className="mb-10 animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6 mt-10 dark:bg-neutral-700"></div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-32 bg-gray-100 rounded-xl dark:bg-neutral-800"></div>
          <div className="h-32 bg-gray-100 rounded-xl dark:bg-neutral-800"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <div className="flex justify-between items-center mb-6 border-t border-gray-200 dark:border-neutral-700 pt-10">
        <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
          Shipping address
        </h2>
        <Link href="/account/addresses" className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline dark:text-blue-500 dark:hover:text-blue-400">
          Manage addresses
        </Link>
      </div>
      
      {addresses.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-gray-200 rounded-xl dark:border-neutral-700">
          <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4">You don't have any saved addresses yet.</p>
          <Link href="/account/addresses" className="inline-flex items-center gap-x-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400">
            Add a new address
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div key={addr.id} className="relative">
              <input 
                type="radio" 
                name="hs-shipping-address" 
                id={`address-${addr.id}`} 
                className="peer absolute top-0 start-0 w-full h-full opacity-0 cursor-pointer" 
                checked={selectedId === addr.id}
                onChange={() => onSelect(addr.id)}
              />
              <label htmlFor={`address-${addr.id}`} className="block h-full p-4 bg-white border border-gray-200 rounded-xl peer-checked:border-blue-600 peer-checked:ring-1 peer-checked:ring-blue-600 dark:bg-neutral-900 dark:border-neutral-700 dark:peer-checked:border-blue-500 dark:peer-checked:ring-blue-500 transition-all cursor-pointer">
                <span className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    {addr.first_name} {addr.last_name}
                  </span>
                  {addr.is_default && (
                    <span className="text-[10px] font-bold uppercase text-gray-500 dark:text-neutral-500">Default</span>
                  )}
                </span>
                <span className="block text-sm text-gray-600 dark:text-neutral-400">
                  {addr.street}<br/>
                  {addr.city}, {addr.state} {addr.postal_code}<br/>
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
      )}
    </div>
  );
}

import Link from "next/link";

