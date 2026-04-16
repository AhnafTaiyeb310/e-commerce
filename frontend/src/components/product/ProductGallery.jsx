"use client";

import React, { useState, useEffect } from "react";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function ProductGallery({ product }) {
  const [activeImage, setActiveImage] = useState(product?.image);

  // Use real images from backend if available, otherwise just use the primary one
  const galleryImages = (product?.images && product.images.length > 0) 
                         ? product.images 
                         : [product?.image || DEFAULT_PLACEHOLDER];

  // Sync active image when product changes
  useEffect(() => {
     setActiveImage(product?.image);
  }, [product]);

  if (!product) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-neutral-800">
        <div className="aspect-w-1 aspect-h-1 sm:aspect-none sm:h-[600px] w-full relative">
           <img
             className="w-full h-full object-cover sm:object-cover"
             src={activeImage || product.image || DEFAULT_PLACEHOLDER}
             alt={product.name}
           />
           {/* Wishlist Floating Button */}
           <div className="absolute top-4 end-4 z-10">
             <button type="button" className="size-10 flex justify-center items-center bg-white text-gray-800 rounded-full shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800">
               <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
             </button>
           </div>
        </div>
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <button 
              key={idx} 
              className={`cursor-pointer overflow-hidden rounded-lg bg-gray-100 dark:bg-neutral-800 aspect-square ${activeImage === img ? 'ring-2 ring-blue-600 dark:ring-blue-500' : 'hover:opacity-75 transition-opacity'}`}
              onClick={() => setActiveImage(img)}
            >
              <img className="w-full h-full object-cover" src={img} alt={`Thumbnail ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
