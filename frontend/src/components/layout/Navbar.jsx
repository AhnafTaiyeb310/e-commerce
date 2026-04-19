"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCart } from "@/features/cart/hooks/useCart";
import LogoutButton from "@/components/auth/LogoutButton";
import ThemeToggle from "./ThemeToggle";
import UserDropdown from "./UserDropdown";
import { fetchCategories } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function Navbar() {
  const { user, isAuthenticated } = useAuth();
  const { totalItems } = useCart();

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });

  const categories = (data?.results || data || [])
    .filter(cat => cat.product_count > 0)
    .slice(0, 5);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-x-5 py-2">
            <div className="flex items-center gap-x-5">
              <p className="text-xs text-gray-600 dark:text-neutral-400">
                Free shipping on orders over $50
              </p>
            </div>
            <div className="flex items-center justify-end gap-x-5">
              <button type="button" className="inline-flex items-center gap-x-2 text-xs text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200">
                United Kingdom (GBP £)
              </button>
              <div className="flex items-center gap-x-3">
                {isAuthenticated ? (
                  <span className="text-xs text-gray-600 dark:text-neutral-400">Welcome, {user?.name || user?.email}</span>
                ) : (
                  <>
                    <Link className="text-xs text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200" href="/signin">Log In</Link>
                    <span className="text-gray-300 dark:text-neutral-700">|</span>
                    <Link className="text-xs text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200" href="/signup">Register</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white  dark:bg-neutral-900 shadow-sm">
        <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex-none">
              <Link className="flex-none text-xl font-bold dark:text-white uppercase tracking-wider" href="/" aria-label="Brand">
                E-COMMERCE
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-x-8">
              <Link className="font-medium text-gray-800 hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-500" href="/shop">
                Shop
              </Link>
              {categories.map((cat) => (
                <Link 
                  key={cat.id} 
                  className="font-medium text-gray-800 hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-500" 
                  href={`/shop?category=${cat.id}`}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-x-2">
              <button type="button" className="size-9 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full dark:text-neutral-200 dark:hover:bg-neutral-800">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <Link href="/favorites" className="size-9 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full dark:text-neutral-200 dark:hover:bg-neutral-800">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </Link>
              
              <UserDropdown />

              <ThemeToggle />

              <Link href="/cart" className="relative size-9 flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full dark:text-neutral-200 dark:hover:bg-neutral-800">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                {totalItems > 0 && (
                  <span className="absolute top-1 end-1 size-4 bg-red-500 text-white text-[10px] font-medium flex justify-center items-center rounded-full">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
