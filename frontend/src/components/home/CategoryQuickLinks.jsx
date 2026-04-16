"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/lib/api";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function CategoryQuickLinks() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const categories = (data?.results || data || [])
    .filter((cat) => cat.product_count > 0)
    .slice(0, 6);

  if (isLoading || categories.length === 0) return null;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 lg:gap-8">
        {categories.map((item) => (
          <div key={item.id} className="text-center">
            <Link className="group block" href={`/shop?category=${item.id}`}>
              <div className="relative w-24 h-24 mx-auto mb-3">
                <img 
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300" 
                  src={item.image_url || DEFAULT_PLACEHOLDER} 
                  alt={item.name}
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 dark:text-neutral-200">
                {item.name}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
