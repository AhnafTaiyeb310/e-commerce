"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function PaymentPage() {
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
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Payment</li>
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
                <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Payment</h2>
                <p className="text-sm text-gray-500 dark:text-neutral-500">Manage your payment methods.</p>
              </div>
            </div>

            <div className="p-8 text-center border border-dashed border-gray-200 rounded-xl dark:border-neutral-700">
              <div className="size-16 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 dark:bg-blue-900/20 dark:border-blue-800">
                <svg className="size-8 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10"/></svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-neutral-200 mb-1">Online Payment Coming Soon</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500 max-w-sm mx-auto mb-6">
                We are currently refining our online payment systems to provide you with the most secure experience. For now, you can use <b>Cash on Delivery</b> for all your orders.
              </p>
              <div className="inline-flex items-center gap-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
                <span className="relative flex size-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-blue-500"></span>
                </span>
                Launching Shortly
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
