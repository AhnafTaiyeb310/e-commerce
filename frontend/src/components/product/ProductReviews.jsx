import React from "react";

export default function ProductReviews() {
  return (
    <div id="reviews" className="mt-16 lg:mt-24 w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-6">
        Reviews
      </h2>
      
      <div className="flex items-center gap-x-4 mb-8">
        <h3 className="text-4xl font-bold text-gray-800 dark:text-white">4.7</h3>
        <div>
          <div className="flex items-center gap-x-1 text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`flex-shrink-0 size-5 ${i === 4 ? 'text-gray-300 dark:text-neutral-600' : ''}`} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
              </svg>
            ))}
          </div>
          <p className="text-sm text-gray-800 mt-1 dark:text-neutral-200">12 reviews</p>
        </div>
      </div>
      
      <p className="text-sm text-gray-600 mb-8 dark:text-neutral-400">
        10 out of 12 (92%) reviewers recommend this product
      </p>

      {/* Review List */}
      <div className="space-y-8">
        {/* Review 1 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800 dark:text-white">Comfortable relaxed fit</h4>
            <span className="text-sm text-gray-500 dark:text-neutral-500">13 hours ago</span>
          </div>
          <p className="text-gray-600 dark:text-neutral-400 mb-4">
            The most stylish and funky slippers I've ever owned! Much admired by friends and family.
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">runMiles</span>
            <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Verified customer
            </span>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-neutral-700" />

        {/* Review 2 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold text-gray-800 dark:text-white">Top Choice Shoes!</h4>
            <span className="text-sm text-gray-500 dark:text-neutral-500">5 days ago</span>
          </div>
          <p className="text-gray-600 dark:text-neutral-400 mb-4">
            I've done a review but I don't mind gloating about your product. The pair I have now are my 3rd and love the comfort, design and now the new white sole.
          </p>
          <div className="flex items-center gap-x-2">
            <span className="text-sm font-semibold text-gray-800 dark:text-neutral-200">Sam</span>
            <span className="inline-flex items-center gap-1.5 py-1 px-2 rounded-md text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <svg className="size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Verified customer
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
