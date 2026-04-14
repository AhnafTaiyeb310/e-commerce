import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8 lg:py-16 text-center">
      {/* Icon */}
      <svg className="mx-auto size-16 text-gray-400 dark:text-neutral-600 mb-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
        <path d="M3 6h18"/>
        <path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
      
      {/* Messages */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-2">
        Your cart is empty
      </h2>
      <p className="text-gray-600 dark:text-neutral-400 mb-8 max-w-sm mx-auto">
        Looks like you haven't added anything to your cart yet.
      </p>
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
        <Link href="/" className="w-full sm:w-auto py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Continue shopping
        </Link>
        <Link href="#" className="w-full sm:w-auto py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
          Log in
        </Link>
      </div>
    </div>
  );
}
