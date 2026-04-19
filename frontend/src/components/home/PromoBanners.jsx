"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchCollections } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function PromoBanners() {

  const { data, isLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: () => fetchCollections(),
  });

  const collections = (data?.results || data || []).slice(0, 3);

  if (isLoading || collections.length === 0) return null;

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((banner) => (
          <Link key={banner.id} className="group relative block rounded-xl overflow-hidden" href={`/shop?collection=${banner.id}`}>
            <div className="aspect-w-16 aspect-h-9 sm:aspect-none sm:h-[300px]">
              <img 
                className="group-hover:scale-105 transition-transform duration-500 ease-in-out w-full h-full object-cover rounded-xl" 
                src={banner.image_url || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"} 
                alt={banner.title}
              />
            </div>
            <div className="absolute bottom-0 start-0 end-0 p-4 sm:p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-lg sm:text-xl font-semibold text-white">
                {banner.title}
              </h3>
              <p className="mt-1 text-white/80">
                {banner.products_count} Products Available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
