"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";

export default function PersonalInfoPage() {
  const { user } = useAuth();

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
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">Personal Info</li>
        </ol>

        {/* Two column: sidebar + content */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          {/* Main Content */}
          <div className="space-y-12">
            {/* ── Section: Personal Details ── */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Personal Info</h2>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-6">Update your personal details here.</p>

              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="pi-first-name" className="block text-sm font-medium mb-2 dark:text-white">First name</label>
                  <input type="text" id="pi-first-name" defaultValue="James" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div>
                  <label htmlFor="pi-last-name" className="block text-sm font-medium mb-2 dark:text-white">Last name</label>
                  <input type="text" id="pi-last-name" defaultValue="Collins" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pi-email" className="block text-sm font-medium mb-2 dark:text-white">Email address</label>
                  <input type="email" id="pi-email" defaultValue={user?.email || "jamescollins@site.so"} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pi-phone" className="block text-sm font-medium mb-2 dark:text-white">Phone number</label>
                  <input type="tel" id="pi-phone" defaultValue="+44 7911 123456" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div>
                  <label htmlFor="pi-dob" className="block text-sm font-medium mb-2 dark:text-white">Date of birth</label>
                  <input type="date" id="pi-dob" defaultValue="1990-06-15" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div>
                  <label htmlFor="pi-gender" className="block text-sm font-medium mb-2 dark:text-white">Gender</label>
                  <select id="pi-gender" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="button" className="py-2.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all">
                  Save changes
                </button>
              </div>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700" />

            {/* ── Section: Change Password ── */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Change password</h2>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-6">Update your password associated with your account.</p>

              <div className="grid gap-4 max-w-lg">
                <div>
                  <label htmlFor="pi-current-pw" className="block text-sm font-medium mb-2 dark:text-white">Current password</label>
                  <input type="password" id="pi-current-pw" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div>
                  <label htmlFor="pi-new-pw" className="block text-sm font-medium mb-2 dark:text-white">New password</label>
                  <input type="password" id="pi-new-pw" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div>
                  <label htmlFor="pi-confirm-pw" className="block text-sm font-medium mb-2 dark:text-white">Confirm new password</label>
                  <input type="password" id="pi-confirm-pw" className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button type="button" className="py-2.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all">
                  Update password
                </button>
              </div>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700" />

            {/* ── Section: Two-Factor Authentication ── */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Two-Factor Authentication</h2>
                  <p className="text-sm text-gray-500 dark:text-neutral-500">Add an extra layer of security to your account.</p>
                </div>
                <span className="inline-flex items-center gap-x-1.5 py-1 px-2.5 text-xs font-semibold rounded-full bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300">
                  <span className="size-1.5 inline-block rounded-full bg-gray-400 dark:bg-neutral-500"></span>
                  Disabled
                </span>
              </div>

              <button type="button" className="py-2.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 transition-all">
                Enable 2FA
              </button>
            </section>

            <hr className="border-gray-200 dark:border-neutral-700" />

            {/* ── Section: Deactivate Account ── */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Deactivate account</h2>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-6">
                Permanently delete your account and all of your data. This action is irreversible.
              </p>

              <button type="button" className="py-2.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 transition-all">
                Deactivate account
              </button>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
