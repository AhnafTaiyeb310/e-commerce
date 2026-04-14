"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Mock data for favorites
const INITIAL_FAVORITES = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true,
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true,
  },
  {
    id: 3,
    name: "Leather Loafers",
    price: 120.0,
    image: "https://images.unsplash.com/photo-1620854497676-cb256ad85675?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: false,
  },
  {
    id: 4,
    name: "Khaki Chinos",
    price: 55.0,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    inStock: true,
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(INITIAL_FAVORITES);

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Breadcrumbs */}
        <ol className="flex items-center whitespace-nowrap mb-6 lg:mb-10" aria-label="Breadcrumb">
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/">Home</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Favorites</li>
        </ol>

        {/* Title & Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200 sm:text-3xl">Favorites</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} in your favorites list.
            </p>
          </div>
          {favorites.length > 0 && (
            <button
              onClick={() => setFavorites([])}
              className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 transition-colors"
            >
              Clear all favorites
            </button>
          )}
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 px-4 sm:px-6 lg:px-8 border border-dashed border-gray-200 rounded-xl dark:border-neutral-700">
            <svg className="mx-auto size-14 text-gray-400 dark:text-neutral-600 mb-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Your favorites list is empty</h2>
            <p className="mt-2 mb-6 text-sm text-gray-500 dark:text-neutral-500">Looks like you haven't added anything to your favorites yet.</p>
            <Link href="/shop" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors">
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="group relative flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 overflow-hidden hover:shadow-lg transition-all">
                {/* Remove button */}
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-3 right-3 z-10 size-8 flex justify-center items-center bg-white border border-gray-200 rounded-full text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 transition-colors"
                  aria-label="Remove from favorites"
                >
                  <svg className="shrink-0 size-4 text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                </button>
                
                {/* Image */}
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[250px] w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-neutral-200">
                    <Link href={`/product/${product.id}`} className="hover:text-blue-600 dark:hover:text-blue-500">
                      {product.name}
                    </Link>
                  </h3>
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      ${product.price.toFixed(2)}
                    </p>
                    {product.inStock ? (
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800/30 dark:text-teal-500">
                        In Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-x-1.5 py-1 px-2 rounded-md text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800/30 dark:text-red-500">
                        Out of Stock
                      </span>
                    )}
                  </div>
                  
                  {/* Add to Cart Action */}
                  <div className="mt-auto pt-4">
                    <button
                      disabled={!product.inStock}
                      className="w-full py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 11 4-7"/><path d="m19 11-4-7"/><path d="M2 11h20"/><path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8c.9 0 1.8-.7 2-1.6l1.7-7.4"/><path d="m9 11 1 9"/><path d="M4.5 15.5h15"/><path d="m15 11-1 9"/></svg>
                      {product.inStock ? "Add to cart" : "Sold out"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
