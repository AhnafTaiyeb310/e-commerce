"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function GiftCardsPage() {
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
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Gift Cards</li>
        </ol>

        {/* Two column: sidebar + content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          {/* Main Content */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Gift Cards</h2>
            <p className="text-sm text-gray-500 dark:text-neutral-500 mb-8">Treat someone with a Gift. Shopping for someone else but not sure what to give them? Give them the gift of choice with a Unify gift card.</p>

            <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 p-4 sm:p-7">
              <form>
                {/* Section 1 */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-4">1. Choose a design</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="h-24 bg-gray-100 rounded-lg border-2 border-blue-600 dark:bg-neutral-800 flex items-center justify-center font-medium text-gray-800 dark:text-neutral-200 cursor-pointer">
                      Design 1
                    </div>
                    <div className="h-24 bg-gray-100 rounded-lg border-2 border-transparent hover:border-gray-200 dark:bg-neutral-800 dark:hover:border-neutral-700 flex items-center justify-center font-medium text-gray-500 cursor-pointer transition">
                      Design 2
                    </div>
                    <div className="h-24 bg-gray-100 rounded-lg border-2 border-transparent hover:border-gray-200 dark:bg-neutral-800 dark:hover:border-neutral-700 flex items-center justify-center font-medium text-gray-500 cursor-pointer transition">
                      Design 3
                    </div>
                    <div className="h-24 bg-gray-100 rounded-lg border-2 border-transparent hover:border-gray-200 dark:bg-neutral-800 dark:hover:border-neutral-700 flex items-center justify-center font-medium text-gray-500 cursor-pointer transition">
                      Design 4
                    </div>
                  </div>
                </div>

                {/* Section 2 */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-4">2. Choose an amount</h3>
                  <div className="flex flex-wrap gap-3">
                    {['$25', '$50', '$100', '$200', 'Custom'].map((val, idx) => (
                      <label key={idx} className="flex p-3 w-full sm:w-auto bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 cursor-pointer hover:bg-gray-50 transition">
                        <input type="radio" name="hs-gift-card-amount" className="shrink-0 mt-0.5 border-gray-200 rounded-full text-blue-600 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800" defaultChecked={idx === 1} />
                        <span className="text-sm text-gray-800 ms-3 dark:text-neutral-200 font-medium">{val}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Section 3 */}
                <div className="mb-8">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-4">3. Add recipient delivery details</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="hs-recipient-name" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Recipient Name</label>
                      <input type="text" id="hs-recipient-name" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Jane Doe" />
                    </div>
                    <div>
                      <label htmlFor="hs-recipient-email" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Recipient Email</label>
                      <input type="email" id="hs-recipient-email" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="jane@example.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <label htmlFor="hs-gift-msg" className="block mb-2 text-sm text-gray-700 font-medium dark:text-white">Gift Message (Optional)</label>
                      <textarea id="hs-gift-msg" rows="4" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Happy Birthday!"></textarea>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-x-2">
                  <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                    Add to Cart ($50.00)
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
