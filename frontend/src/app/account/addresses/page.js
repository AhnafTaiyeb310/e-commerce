"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AddressesPage() {
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
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Addresses</li>
        </ol>

        {/* Two column: sidebar + content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          {/* Main Content */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Addresses</h2>
                <p className="text-sm text-gray-500 dark:text-neutral-500">Manage your billing & shipping addresses.</p>
              </div>
              <button type="button" className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all">
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                Add address
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Address 1 */}
              <div className="flex flex-col border border-gray-200 rounded-xl p-5 dark:border-neutral-700 relative">
                <span className="absolute top-0 right-0 rounded-bl-xl rounded-tr-xl bg-blue-600 px-3 py-1 text-xs font-semibold text-white">Default</span>
                
                <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-2">Breannabury</h3>
                
                <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1 mb-6">
                  <li>James Collins</li>
                  <li>280 Suzanne Throughway</li>
                  <li>New York, Breannabury, OR 45801, US</li>
                  <li>+44 000 000 0001</li>
                </ul>
                
                <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
                  <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">Edit</button>
                  <span className="text-gray-300 dark:text-neutral-700">|</span>
                  <button type="button" className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">Remove</button>
                </div>
              </div>

              {/* Address 2 */}
              <div className="flex flex-col border border-gray-200 rounded-xl p-5 dark:border-neutral-700">
                <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-2">Portland</h3>
                
                <ul className="text-sm text-gray-600 dark:text-neutral-400 space-y-1 mb-6">
                  <li>James Collins</li>
                  <li>9455 Ne Alderwood Rd</li>
                  <li>Portland, Or 97252-1777, US</li>
                  <li>+(01) 503 914 6317</li>
                </ul>
                
                <div className="mt-auto flex flex-wrap gap-x-3 gap-y-2 pt-4 border-t border-gray-100 dark:border-neutral-800">
                  <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">Edit</button>
                  <span className="text-gray-300 dark:text-neutral-700">|</span>
                  <button type="button" className="text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400">Remove</button>
                  <span className="text-gray-300 dark:text-neutral-700">|</span>
                  <button type="button" className="text-sm font-medium text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">Set as default</button>
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
