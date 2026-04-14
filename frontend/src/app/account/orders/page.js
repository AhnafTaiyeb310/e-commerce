"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function MyOrdersPage() {
  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Breadcrumbs */}
        <ol className="flex items-center whitespace-nowrap mb-6" aria-label="Breadcrumb">
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/">Home</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="inline-flex items-center">
            <Link className="text-sm text-gray-500 hover:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500" href="/account">Account</Link>
            <svg className="flex-shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </li>
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">My Orders</li>
        </ol>

        {/* Two column: sidebar + content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          {/* Main Content */}
          <div className="space-y-8 lg:space-y-12">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">My Orders</h2>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-6">Check the status of recent orders, manage returns, and discover similar products.</p>
            </div>

            {/* In Progress Order */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
              <div className="p-4 sm:p-6 sm:pb-4 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Status</p>
                      <p className="text-sm font-semibold text-amber-600 dark:text-amber-500">Order in progress</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Order number</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">#72813820</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Date</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">Aug 4, 2024</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Total</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">$229.00</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href="#" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                      Order details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Stepper */}
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex items-center w-full">
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
                      <svg className="size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <p className="text-xs font-medium text-gray-800 mt-2 dark:text-neutral-200">Order placed</p>
                  </div>
                  <div className="flex-1 h-1 bg-blue-600 mb-5 relative top-[-10px]"></div>
                  
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 h-6 border-2 border-blue-600 bg-white dark:bg-neutral-900 rounded-full flex items-center justify-center shrink-0">
                      <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-xs font-semibold text-blue-600 mt-2 dark:text-blue-500">Preparing</p>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-neutral-700 mb-5 relative top-[-10px]"></div>
                  
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-6 h-6 border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-full shrink-0"></div>
                    <p className="text-xs font-medium text-gray-500 mt-2 dark:text-neutral-500">Shipped</p>
                  </div>
                  <div className="flex-1 h-1 bg-gray-200 dark:bg-neutral-700 mb-5 relative top-[-10px]"></div>
                  
                  <div className="flex flex-col items-center flex-shrink-0 min-w-[60px]">
                    <div className="w-6 h-6 border-2 border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-full shrink-0"></div>
                    <p className="text-xs font-medium text-gray-500 mt-2 dark:text-neutral-500">Delivered</p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6 flex flex-col gap-y-4">
                {/* Item 1 */}
                <div className="flex gap-x-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex-shrink-0 dark:bg-neutral-800"></div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-y-2">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-neutral-200">Nike SB Zoom Blazer Mid Electric</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Color: White • Size: US 10</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Qty: 1</p>
                    </div>
                    <div className="font-medium text-gray-800 dark:text-neutral-200">$150.00</div>
                  </div>
                </div>
                {/* Item 2 */}
                <div className="flex gap-x-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex-shrink-0 dark:bg-neutral-800"></div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-y-2">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-neutral-200">Windrunner</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Color: Gray • Size: M</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Qty: 1</p>
                    </div>
                    <div className="font-medium text-gray-800 dark:text-neutral-200">$40.00</div>
                  </div>
                </div>
                {/* Item 3 */}
                <div className="flex gap-x-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex-shrink-0 dark:bg-neutral-800"></div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-y-2">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-neutral-200">White Jeans</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Color: White • Size: M</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Qty: 1</p>
                    </div>
                    <div className="font-medium text-gray-800 dark:text-neutral-200">$39.00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivered Order */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
              <div className="p-4 sm:p-6 sm:pb-4 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Status</p>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-500">Delivered</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Order number</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">#90114853</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Date</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">Aug 4, 2024</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Total</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">$69.00</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex gap-x-2">
                    <Link href="#" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700">
                      Write a review
                    </Link>
                    <Link href="#" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                      Order details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 sm:p-6">
                <div className="flex gap-x-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex-shrink-0 dark:bg-neutral-800"></div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-y-2">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-neutral-200">Embroidered Hoodie</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Color: Brown/Red • Size: US 7</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Qty: 1</p>
                    </div>
                    <div className="font-medium text-gray-800 dark:text-neutral-200">$69.00</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
