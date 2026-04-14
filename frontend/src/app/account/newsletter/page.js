"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function NewsletterPage() {
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
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Email Newsletter</li>
        </ol>

        {/* Two column: sidebar + content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          {/* Main Content */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Email Newsletter</h2>
            <p className="text-sm text-gray-500 dark:text-neutral-500 mb-8">Manage your email preferences and subscriptions.</p>

            {/* Form */}
            <form>
              <div className="space-y-6">
                
                {/* Checkbox Group */}
                <div className="flex gap-x-4">
                  <div className="flex items-center h-5">
                    <input id="hs-newsletter-1" name="hs-newsletter-1" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" defaultChecked />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="hs-newsletter-1" className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      Men's Fashion
                    </label>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Stay updated with the latest in men's fashion, from casual wear to sharp, tailored looks.
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-4">
                  <div className="flex items-center h-5">
                    <input id="hs-newsletter-2" name="hs-newsletter-2" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" defaultChecked />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="hs-newsletter-2" className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      Women's Fashion
                    </label>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Discover the newest trends in women's fashion, including chic outfits and elegant accessories.
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-4">
                  <div className="flex items-center h-5">
                    <input id="hs-newsletter-3" name="hs-newsletter-3" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="hs-newsletter-3" className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      Kids' Fashion
                    </label>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Find adorable and stylish clothing for kids, with updates on the latest arrivals and collections.
                    </p>
                  </div>
                </div>

                <div className="flex gap-x-4">
                  <div className="flex items-center h-5">
                    <input id="hs-newsletter-4" name="hs-newsletter-4" type="checkbox" className="border-gray-200 rounded text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" />
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="hs-newsletter-4" className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                      Weekly Picks
                    </label>
                    <p className="text-sm text-gray-500 dark:text-neutral-500">
                      Elevate your wardrobe with our curated picks of must-have pieces each week.
                    </p>
                  </div>
                </div>
                
              </div>

              <div className="mt-8 flex justify-end gap-x-2">
                <button type="button" className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                  Cancel
                </button>
                <button type="button" className="py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                  Save preferences
                </button>
              </div>
            </form>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
