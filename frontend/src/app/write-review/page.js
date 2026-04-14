"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function WriteReviewPage() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen border-t border-gray-200 dark:border-neutral-700">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Breadcrumbs */}
        <ol className="flex items-center whitespace-nowrap mb-6 lg:mb-10" aria-label="Breadcrumb">
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/">Home</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/account/orders">My Orders</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Write a Review</li>
        </ol>

        <div className="max-w-3xl">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200 sm:text-3xl mb-2">Write a Review</h1>
            <p className="text-sm text-gray-500 dark:text-neutral-500">Please share your experience with this product.</p>
          </div>

          <form>
            {/* Product Summary */}
            <div className="mb-8 flex items-center gap-x-4 p-4 border border-gray-200 rounded-xl dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50">
              <div className="w-16 h-16 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                  alt="Product Thumbnail" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-neutral-200 text-sm">Classic White T-Shirt</h3>
                <p className="text-sm text-gray-500 dark:text-neutral-500">Color: White, Size: M</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-neutral-200">Overall Rating</label>
                <div className="flex items-center gap-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="focus:outline-none"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                    >
                      <svg
                        className={`size-8 shrink-0 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'text-yellow-400 dark:text-yellow-500'
                            : 'text-gray-300 dark:text-neutral-600'
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </button>
                  ))}
                  <span className="ms-3 text-sm text-gray-500 dark:text-neutral-500">
                    {rating > 0 ? `${rating} of 5 stars` : 'Select a rating'}
                  </span>
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label htmlFor="hs-review-title" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-neutral-200">Review Title</label>
                <input 
                  type="text" 
                  id="hs-review-title" 
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                  placeholder="Summarize your review" 
                />
              </div>

              {/* Review Body */}
              <div>
                <label htmlFor="hs-review-body" className="block text-sm font-semibold mb-2 text-gray-800 dark:text-neutral-200">Review</label>
                <textarea 
                  id="hs-review-body" 
                  rows="5" 
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" 
                  placeholder="What did you like or dislike? What should other shoppers know before buying?"
                ></textarea>
              </div>

              {/* Add Photo/Video */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-800 dark:text-neutral-200">Add a photo or video</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/50 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-neutral-500" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 dark:text-neutral-400 justify-center">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500 dark:text-blue-500 dark:hover:text-blue-400">
                        <span>Upload a file</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-neutral-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="mt-8 flex justify-end gap-x-3">
                <Link href="/account/orders" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 transition-colors">
                  Cancel
                </Link>
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-colors">
                  Submit Review
                </button>
              </div>

            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
