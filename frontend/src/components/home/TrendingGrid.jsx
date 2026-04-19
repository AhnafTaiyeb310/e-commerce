"use client";

import React, { useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import Link from "next/link";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function TrendingGrid() {
  const carouselRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ["products", "trending"],
    queryFn: () => fetchProducts({ is_featured: true, page_size: 8 }),
  });

  const products = (data?.results || []).map((p) => ({
    id: p.id,
    name: p.title,
    // ProductListSerializer returns category_name (flat) and primary_image
    // instead of the nested category object and full images array.
    category: p.category_name || p.category?.name || "General",
    price: parseFloat(p.base_price).toFixed(0),
    image: p.primary_image || p.images?.[0]?.image_url || DEFAULT_PLACEHOLDER,
    badge: "🔥 Trending",
    slug: p.slug,
  }));

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      // Re-init Preline carousel after products are loaded
      setTimeout(() => {
        if (typeof window !== "undefined" && window.HSStaticMethods) {
          window.HSStaticMethods.autoInit();
        }
      }, 100);
    }
  }, [isLoading, products.length]);

  if (isLoading) return null;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Section Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl dark:text-neutral-200">
          Trending now
        </h2>
      </div>

      {/* Carousel */}
      <div ref={carouselRef} data-hs-carousel='{
          "isAutoPlay": false,
          "slidesQty": {
            "xs": 1,
            "sm": 2,
            "md": 3,
            "lg": 4
          }
        }' className="relative">
        <div className="hs-carousel relative overflow-hidden w-full min-h-[450px] sm:min-h-[550px] bg-white rounded-lg dark:bg-neutral-900">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 cursor-grab active:cursor-grabbing -mx-1.5 md:-mx-2">
            {products.map((product) => (
              <div key={product.id} className="hs-carousel-slide shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-1.5 md:px-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls */}
        <button type="button" className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute top-1/2 -translate-y-1/2 start-3 size-[46px] inline-flex justify-center items-center text-gray-800 bg-white/90 shadow-sm rounded-full hover:bg-white focus:outline-none dark:bg-neutral-900/90 dark:text-white dark:hover:bg-neutral-900">
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </span>
          <span className="sr-only">Previous</span>
        </button>
        <button type="button" className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute top-1/2 -translate-y-1/2 end-3 size-[46px] inline-flex justify-center items-center text-gray-800 bg-white/90 shadow-sm rounded-full hover:bg-white focus:outline-none dark:bg-neutral-900/90 dark:text-white dark:hover:bg-neutral-900">
          <span className="sr-only">Next</span>
          <span className="text-2xl" aria-hidden="true">
            <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </span>
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link className="inline-flex items-center gap-x-1 text-sm font-medium text-gray-800 decoration-2 hover:underline focus:outline-none focus:underline dark:text-neutral-200" href="/shop">
          Shop all products
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </div>

    </div>
  );
}
