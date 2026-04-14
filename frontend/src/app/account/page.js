"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";

const ACCOUNT_CARDS = [
  {
    title: "Personal Info",
    desc: "Update your details, email preferences or password",
    href: "/account/personal-info",
    icon: (
      <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    ),
  },
  {
    title: "My Orders",
    desc: "Check the status of your orders or see past orders",
    href: "/account/orders",
    icon: (
      <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>
    ),
  },
  {
    title: "Addresses",
    desc: "Manage your billing & shipping addresses",
    href: "/account/addresses",
    icon: (
      <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
  },
  {
    title: "Payment",
    desc: "Manage credit cards",
    href: "/account/payment",
    badge: "Attention needed",
    icon: (
      <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
    ),
  },
  {
    title: "Email Newsletter",
    desc: "Select which emails you want to receive from us",
    href: "/account/newsletter",
    icon: (
      <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
    ),
  },
  {
    title: "Gift Cards",
    desc: "View balance or redeem a card, and purchase a new Gift Card",
    href: "/account/gift-cards",
    icon: (
      <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
    ),
  },
  {
    title: "Returns & Refunds",
    desc: "Manage your returns and refunds",
    href: "/account/return-refund",
    icon: (
      <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
    ),
  },
];

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* User Header */}
        <div className="mb-10">
          <div className="flex items-center gap-x-4">
            <div className="flex-shrink-0 size-14 flex justify-center items-center bg-gray-100 rounded-full dark:bg-neutral-800">
              <svg className="shrink-0 size-6 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 dark:text-neutral-200">
                {user?.name || "James Collins"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {user?.email || "jamescollins@site.so"}
              </p>
            </div>
          </div>
        </div>

        {/* Account Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12">
          {ACCOUNT_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group flex flex-col p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-gray-300 transition-all dark:border-neutral-700 dark:hover:border-neutral-600 dark:hover:shadow-neutral-700/30"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-shrink-0 size-10 flex justify-center items-center bg-gray-100 rounded-lg text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors dark:bg-neutral-800 dark:text-neutral-400 dark:group-hover:bg-blue-900/20 dark:group-hover:text-blue-400">
                  {card.icon}
                </div>
                {card.badge && (
                  <span className="inline-flex items-center gap-x-1 py-1 px-2 rounded-full text-[10px] font-bold uppercase bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-500">
                    <svg className="shrink-0 size-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
                    {card.badge}
                  </span>
                )}
              </div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-1">
                {card.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                {card.desc}
              </p>
              <div className="mt-auto pt-4">
                <span className="inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 group-hover:text-blue-800 dark:text-blue-500 dark:group-hover:text-blue-400">
                  Manage
                  <svg className="shrink-0 size-4 transition-transform group-hover:translate-x-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Need Help Section */}
        <div className="p-6 border border-gray-200 rounded-xl dark:border-neutral-700">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-base font-semibold text-gray-800 dark:text-neutral-200 mb-1">Need assistance?</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500">
                Ask our customer service — Mon to Sun, 5 am to 8 pm PT
              </p>
            </div>
            <Link
              href="#"
              className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 flex-shrink-0"
            >
              Contact us
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
