"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingSidebar from "@/components/listing/ListingSidebar";
import ProductCard from "@/components/home/ProductCard";

const ALL_PRODUCTS = [
  { id: 10, name: "Slim Lyocell Trousers", category: "Men's Trousers", price: 50, image: "https://images.unsplash.com/photo-1624371414361-e6e9ef358573?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 11, name: "Camo Blend Jacket", category: "Men's Jackets", price: 40, originalPrice: 60, badge: "🔥 Trending", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 12, name: "Cotton T-Shirt", category: "Men's T-Shirts", price: 35, badge: "🔥 Trending", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 13, name: "Embroidered Hoodie", category: "Men's Sweaters", price: 69, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 14, name: "Everyday Solid White T-Shirt", category: "Men's T-Shirts", price: 30, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 15, name: "Relaxed Fit Polo", category: "Men's T-Shirts", price: 40, originalPrice: 60, badge: "🔥 Trending", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 16, name: "Striped Oxford Shirt", category: "Men's T-Shirts", price: 39, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 17, name: "Classic Denim Jacket", category: "Men's T-Shirts", price: 89, badge: "🔥 Trending", image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 18, name: "Premium Linen Shirt", category: "Men's Shirts", price: 125, badge: "🔥 Trending", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 19, name: "Merino Wool Sweater", category: "Men's Sweaters", price: 190, image: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a78?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 20, name: "Lightweight Puffer Jacket", category: "Men's Jackets", price: 110, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 21, name: "Cargo Jogger Pants", category: "Men's Trousers", price: 55, badge: "🔥 Trending", image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 22, name: "Oversized Graphic Tee", category: "Men's T-Shirts", price: 29, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 23, name: "Corduroy Overshirt", category: "Men's Shirts", price: 79, image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 24, name: "Wool Blend Coat", category: "Men's Jackets", price: 220, image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 25, name: "Tech Fleece Hoodie", category: "Men's Sweaters", price: 85, badge: "🔥 Trending", image: "https://images.unsplash.com/photo-1578768079470-c6c8d1017d59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
];

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

const ITEMS_PER_PAGE = 6;

export default function ListingPage() {
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ALL_PRODUCTS.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = ALL_PRODUCTS.slice(startIdx, startIdx + ITEMS_PER_PAGE);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          {/* Breadcrumbs */}
          <ol className="flex items-center whitespace-nowrap mb-4" aria-label="Breadcrumb">
            <li className="inline-flex items-center">
              <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/">Home</Link>
              <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </li>
            <li className="inline-flex items-center">
              <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="#">Men</Link>
              <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </li>
            <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Clothing</li>
          </ol>

          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-neutral-200">
              Men's Clothing
            </h1>
            <div className="flex items-center gap-x-3">
              <span className="text-sm text-gray-500 dark:text-neutral-500">{ALL_PRODUCTS.length} results</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Products */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar (hidden on mobile, collapsible could be added) */}
          <aside className="hidden lg:block">
            <ListingSidebar />
          </aside>

          {/* Mobile filter toggle */}
          <div className="lg:hidden mb-4">
            <button
              type="button"
              className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="1" y2="7"/><line x1="8" x2="8" y1="9" y2="15"/><line x1="16" x2="16" y1="17" y2="23"/></svg>
              Filters
            </button>
          </div>

          {/* Product Grid */}
          <div>
            {/* Results info */}
            <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4">
              Showing {startIdx + 1}–{Math.min(startIdx + ITEMS_PER_PAGE, ALL_PRODUCTS.length)} of {ALL_PRODUCTS.length} products
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Bottom Promo Banner */}
            <div className="mt-8 relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 p-8 text-white">
              <p className="text-sm font-semibold text-blue-200 mb-1">From $60</p>
              <h3 className="text-xl font-bold mb-3">Denims for Days</h3>
              <Link href="#" className="inline-flex items-center gap-x-1 text-sm font-medium text-white hover:text-blue-200 transition-colors">
                Shop now
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </Link>
            </div>

            {/* Pagination */}
            <nav className="mt-10 flex justify-center items-center gap-x-1" aria-label="Pagination">
              {/* Previous */}
              <button
                type="button"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                <span className="sr-only">Previous</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => goToPage(page)}
                    className={`min-h-[38px] min-w-[38px] flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-none transition-colors ${
                      currentPage === page
                        ? "bg-blue-600 text-white focus:bg-blue-700"
                        : "text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700"
                    }`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
              >
                <span className="sr-only">Next</span>
                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            </nav>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
