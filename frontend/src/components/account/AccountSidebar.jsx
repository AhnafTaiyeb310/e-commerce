"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Personal Info", href: "/account/personal-info", icon: "user" },
  { label: "My Orders", href: "/account/orders", icon: "package" },
  { label: "Addresses", href: "/account/addresses", icon: "map-pin" },
  { label: "Payment", href: "/account/payment", icon: "credit-card" },
  { label: "Email Newsletter", href: "/account/newsletter", icon: "mail" },
];

const SECONDARY_ITEMS = [
  { label: "Gift Cards", href: "/account/gift-cards", icon: "gift" },
  { label: "Returns & Refunds", href: "/account/return-refund", icon: "rotate-ccw" },
];

const iconMap = {
  user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>,
  package: <><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></>,
  "map-pin": <><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></>,
  "credit-card": <><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></>,
  mail: <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
  gift: <><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></>,
  "rotate-ccw": <><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></>,
};

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      {/* Primary Nav */}
      <ul className="space-y-1 mb-6">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-x-3 py-2.5 px-3 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-800 font-semibold dark:bg-neutral-800 dark:text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                }`}
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {iconMap[item.icon]}
                </svg>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <hr className="border-gray-200 dark:border-neutral-700 mb-6" />

      {/* Secondary Nav */}
      <ul className="space-y-1 mb-6">
        {SECONDARY_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-x-3 py-2.5 px-3 text-sm rounded-lg transition-colors ${
                  isActive
                    ? "bg-gray-100 text-gray-800 font-semibold dark:bg-neutral-800 dark:text-white"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
                }`}
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {iconMap[item.icon]}
                </svg>
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <hr className="border-gray-200 dark:border-neutral-700 mb-6" />

      {/* Logout */}
      <button
        type="button"
        className="w-full flex items-center gap-x-3 py-2.5 px-3 text-sm text-red-600 rounded-lg hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20 transition-colors"
      >
        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
        Logout
      </button>
    </nav>
  );
}
