import Link from "next/link";
import React from "react";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function ProductCard({ product }) {
  const defaultImage = DEFAULT_PLACEHOLDER;

  return (
    <div className="group flex flex-col focus:outline-none">
      <div className="relative overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
        <Link href={`/product/${product.id}`} className="block">
          <img
            className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-[300px] sm:h-[400px] object-cover"
            src={product.image || defaultImage}
            alt={product.name}
            onError={(e) => { e.target.src = defaultImage; }}
          />
        </Link>
        
        {/* Badges/Actions */}
        {product.badge && (
          <div className="absolute top-3 start-3">
            <span className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-white text-gray-800 shadow-sm dark:bg-neutral-900 dark:text-neutral-200">
              {product.badge}
            </span>
          </div>
        )}
        
        {/* Top Right Floating Action */}
        <div className="absolute top-3 end-3 z-10">
          <button type="button" className="size-8 flex justify-center items-center bg-white text-gray-800 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
        </div>
        
        {/* Quick View Button at bottom of image overlay */}
        <div className="absolute bottom-0 inset-x-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <Link href={`/product/${product.id}`} className="w-full py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-white/90 text-gray-800 shadow-sm hover:bg-white focus:outline-none focus:bg-white dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:bg-neutral-900">
            Quick view
          </Link>
        </div>
      </div>

      {/* Product Info below image */}
      <div className="pt-3 px-1 flex flex-col gap-y-1">
        <h3 className="text-[15px] text-gray-800 dark:text-neutral-200">
          <Link className="relative focus:outline-none hover:text-blue-600 dark:hover:text-blue-500 cursor-pointer" href={`/product/${product.id}`}>
            {product.name}
          </Link>
        </h3>
        {product.category && (
           <p className="text-[13px] text-gray-500 dark:text-neutral-500">{product.category}</p>
        )}
        <div className="mt-0.5 flex items-center gap-x-2">
          {product.originalPrice ? (
            <>
               <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
               <span className="text-sm font-bold text-gray-800 dark:text-neutral-200">${product.price}</span>
            </>
          ) : (
            <span className="text-sm font-bold text-gray-800 dark:text-neutral-200">${product.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}
