import React from 'react';

export default function TrustBadges() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto border-t border-gray-200 dark:border-neutral-800">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 items-center gap-12">
        {/* Secure Checkout */}
        <div className="text-center">
          <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
            <svg className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Secure checkout</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">Shop with confidence using our encrypted payment system that protects your sensitive information.</p>
          </div>
        </div>
        {/* Free shipping */}
        <div className="text-center">
          <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
            <svg className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Free shipping</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">Enjoy complimentary delivery on all orders, with no minimum purchase required.</p>
          </div>
        </div>
        {/* 30 days return */}
        <div className="text-center">
          <div className="flex justify-center items-center size-12 bg-gray-50 border border-gray-200 rounded-full mx-auto dark:bg-neutral-800 dark:border-neutral-700">
            <svg className="shrink-0 size-5 text-gray-600 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">30 days return</h3>
            <p className="mt-1 text-gray-600 dark:text-neutral-400">Not satisfied? Return any item within 30 days of purchase for a full refund or exchange.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
