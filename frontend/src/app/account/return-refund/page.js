"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function ReturnsPage() {
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
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Returns & Refunds</li>
        </ol>

        {/* Two column: sidebar + content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          {/* Main Content */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Returns & Refunds</h2>
            <p className="text-sm text-gray-500 dark:text-neutral-500 mb-8">Track your returned items and refunds status.</p>

            {/* Returned Order */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
              <div className="p-4 sm:p-6 sm:pb-4 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Status</p>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-500">Returned & fully refunded</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Order number</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">#50238902</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Return Date</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">Jan 29, 2024</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Total</p>
                      <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">$229.00</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <Link href="#" className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                      View details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Returned Items */}
              <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-neutral-700">
                <div className="flex gap-x-4">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-lg flex-shrink-0 dark:bg-neutral-800"></div>
                  <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-y-2">
                    <div>
                      <h4 className="font-medium text-gray-800 dark:text-neutral-200">Nike Air Force 1 Shadow</h4>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Color: White • Size: US 7</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">Qty: 2</p>
                    </div>
                    <div className="font-medium text-gray-800 dark:text-neutral-200">Refunded: $229.00</div>
                  </div>
                </div>
              </div>

              {/* Return Info */}
              <div className="p-4 sm:p-6 bg-gray-50 rounded-b-xl dark:bg-neutral-800/50">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase dark:text-neutral-500 mb-2">Shipping address</h5>
                    <ul className="text-sm text-gray-800 dark:text-neutral-200 space-y-1">
                      <li>James Collins</li>
                      <li>280 Suzanne Throughway</li>
                      <li>New York, Breannabury, OR 45801, US</li>
                      <li>+44 000 000 0001</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase dark:text-neutral-500 mb-2">Contact details</h5>
                    <p className="text-sm text-gray-800 dark:text-neutral-200">jamescollins@site.so</p>
                  </div>
                  <div>
                    <h5 className="text-xs font-semibold text-gray-500 uppercase dark:text-neutral-500 mb-2">Payment method</h5>
                    <p className="text-sm text-gray-800 dark:text-neutral-200 flex items-center gap-x-2">
                      <svg className="w-6 h-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24"><path fill="#EB001B" d="M15 24V0h16v24z"/><path fill="#F79E1B" d="M36 24V0H20v24z"/><path fill="#FF5F00" d="M22.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"/><path fill="#F79E1B" d="M31.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0z"/><path fill="#FF5F00" d="M22.5 12a7.5 7.5 0 0 1-3.666 6.353 7.5 7.5 0 0 0 0-12.705A7.5 7.5 0 0 1 22.5 12z"/></svg>
                      MasterCard •••• 4242
                    </p>
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
