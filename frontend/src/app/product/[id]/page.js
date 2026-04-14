import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import ProductReviews from "@/components/product/ProductReviews";
import { TRENDING_PRODUCTS } from "@/constants/mockData";

export default async function ProductDetailPage({ params }) {
  // Await the params before using them, as Next.js 15+ may expect `params` to be a promise in dynamic routes.
  const resolvedParams = await params;
  
  // Find the mocked product by ID or fallback to the first one
  const product = TRENDING_PRODUCTS.find(p => p.id.toString() === resolvedParams.id) || TRENDING_PRODUCTS[0];

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300">
      <Navbar />
      
      <main className="max-w-[85rem] mt-10 px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
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
