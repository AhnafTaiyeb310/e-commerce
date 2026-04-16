"use client";

import React, { use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductReviews from "@/components/product/ProductReviews";
import { useQuery } from "@tanstack/react-query";
import { fetchProductDetail } from "@/lib/api";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function ProductDetailPage({ params }) {
  // In Next.js 15, dynamic route params must be unwrapped
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetchProductDetail(productId),
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
             <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !data) {
     return (
      <div className="bg-white dark:bg-neutral-900 min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex justify-center items-center">
             <p className="text-gray-500">Product not found.</p>
        </main>
        <Footer />
      </div>
    );
  }

  // Map backend DRF data (ProductSerializer) to frontend representation
  const primaryImage = data.images?.find(img => img.is_primary)?.image_url 
                       || data.images?.[0]?.image_url 
                       || DEFAULT_PLACEHOLDER;

  const product = {
    id: data.id,
    name: data.title,
    price: data.base_price,
    category: data.category?.name || "General",
    image: primaryImage,
    images: data.images?.map(img => img.image_url) || [],
    description: data.description,
    badge: data.is_featured ? "Featured" : null,
    slug: data.slug,
  };

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[85rem] mt-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto w-full">
        {/* Main Product Layout: 2 Columns on md+ */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          {/* Left Column: Image Gallery */}
          <div>
            <ProductGallery product={product} />
          </div>

          {/* Right Column: Buying Controls & Info */}
          <div>
            <ProductInfo product={product} />
          </div>
          
        </div>

        {/* Reviews Section at the bottom */}
        <ProductReviews />
        
      </main>

      <Footer />
    </div>
  );
}
