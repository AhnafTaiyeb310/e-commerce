"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function TopProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const categories = (data?.results || data || [])
    .filter((cat) => cat.product_count > 0)
    .slice(0, 3);

  if (isLoading || categories.length === 0) return null;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-semibold md:text-3xl md:leading-tight text-gray-800 dark:text-neutral-200 tracking-tight">
          Explore our top categories
        </h2>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="group flex flex-col focus:outline-none border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
            <div className="p-4">
              <div className="flex h-[250px] gap-2">
                <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                  <img 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" 
                    src={cat.image_url || DEFAULT_PLACEHOLDER} 
                    alt={cat.name} 
                  />
                </div>
              </div>
              <div className="mt-5 mb-2 text-center flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                  {cat.product_count} Products
                </p>
                <Link className="mt-4 text-sm font-medium text-gray-800 underline decoration-2 decoration-gray-300 underline-offset-4 hover:decoration-gray-800 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:decoration-neutral-200 transition-colors" href={`/shop?category=${cat.id}`}>
                  View all
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
