"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api";
import ProductCard from "./ProductCard";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function ProductGrid() {
  const { data, isLoading } = useQuery({
    queryKey: ["featured_products"],
    queryFn: () => fetchProducts({ is_featured: true, page_size: 8 }),
  });

  const products = data?.results || data || [];

  const mappedProducts = products.map((p) => ({
    id: p.id,
    name: p.title,
    category: p.category?.name || p.category_name || "General",
    price: parseFloat(p.base_price).toFixed(0),
    image: p.primary_image || p.images?.[0]?.image_url || DEFAULT_PLACEHOLDER,
    badge: p.is_featured ? "Featured" : null,
    slug: p.slug
  }));

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center">
        <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">Featured Products</h2>
        <a className="inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="/shop">
          View all
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mappedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
