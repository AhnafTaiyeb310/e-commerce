"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ListingSidebar from "@/components/listing/ListingSidebar";
import ProductCard from "@/components/home/ProductCard";
import { fetchProducts } from "@/lib/api";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

function ListingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortBy, setSortBy] = useState("-created_at");
  const [currentPage, setCurrentPage] = useState(1);

  // Filters synced with URL
  const activeCategory = searchParams.get("category") || null;
  const maxPrice = searchParams.get("max_price") || 1000;

  const ITEMS_PER_PAGE = 12;

  const params = {
    ordering: sortBy,
    page: currentPage,
    page_size: ITEMS_PER_PAGE,
    is_active: true,
    ...(activeCategory && { category: activeCategory }),
    ...(maxPrice < 1000 && { max_price: maxPrice }),
  };

  // Use React Query so results are cached and shared with other components.
  // staleTime inherited from ProvidersWrapper (5 min) avoids refetching on
  // every filter change when the same params were recently fetched.
  const { data, isLoading } = useQuery({
    queryKey: ["products", "shop", params],
    queryFn: () => fetchProducts(params),
  });

  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Map from ProductListSerializer shape (primary_image, category_name)
  const products = (data?.results || []).map((p) => ({
    id: p.id,
    name: p.title,
    category: p.category_name || p.category?.name || "General",
    price: parseFloat(p.base_price).toFixed(0),
    image: p.primary_image || p.images?.[0]?.image_url || DEFAULT_PLACEHOLDER,
    badge: p.is_featured ? "Featured" : null,
    slug: p.slug,
  }));

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (catId) => {
    const params = new URLSearchParams(searchParams);
    if (catId) {
      params.set("category", catId);
    } else {
      params.delete("category");
    }
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
    setCurrentPage(1);
  };

  const handlePriceChange = (min, max) => {
    const params = new URLSearchParams(searchParams);
    params.set("max_price", max);
    params.set("page", "1");
    router.push(`/shop?${params.toString()}`);
    setCurrentPage(1);
  };

  return (
    <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto overflow-hidden">
      {/* Page Header */}
      <div className="mb-8">
        <ol className="flex items-center whitespace-nowrap mb-4" aria-label="Breadcrumb">
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/">Home</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Shop</li>
        </ol>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-neutral-200">
            {activeCategory ? "Category Browse" : "All Products"}
          </h1>
          <div className="flex items-center gap-x-3">
            <span className="text-sm text-gray-500 dark:text-neutral-500">{totalCount} results</span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
              className="py-2 px-3 pe-9 block border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
        <aside className="hidden lg:block">
          <ListingSidebar
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
            onPriceChange={handlePriceChange}
          />
        </aside>

        {/* Product Grid Area */}
        <div className="min-w-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4">
                Showing {totalCount > 0 ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0}–{Math.min(currentPage * ITEMS_PER_PAGE, totalCount)} of {totalCount} products
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {products.length === 0 && (
                 <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-neutral-500">No products found for this filter.</p>
                 </div>
              )}

              {totalPages > 1 && (
                <nav className="mt-10 flex justify-center items-center gap-x-1" aria-label="Pagination">
                  <button
                    type="button"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
                  >
                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                    <span className="sr-only">Previous</span>
                  </button>

                  <div className="flex items-center gap-x-1">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((page) => (
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
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

const SORT_OPTIONS = [
  { value: "-created_at", label: "Newest" },
  { value: "base_price", label: "Price: Low to High" },
  { value: "-base_price", label: "Price: High to Low" },
];

export default function ListingPage() {
  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />
      <Suspense fallback={<div>Loading shop...</div>}>
        <ListingContent />
      </Suspense>
      <Footer />
    </div>
  );
}


