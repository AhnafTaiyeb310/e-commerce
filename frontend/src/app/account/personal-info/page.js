"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { api } from "@/lib/api";

export default function PersonalInfoPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        birth_date: user.birth_date || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    try {
      // In this specific backend, names are on the user model, phone/dob on customer
      // We'll assume a single 'me' endpoint or update accordingly
      await api.patch("/api/store/customers/me/", {
        phone: formData.phone,
        birth_date: formData.birth_date || null,
      });
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile." });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
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

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          <div className="space-y-12">
            <section>
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">Personal Info</h2>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-6">Your account details.</p>

              {message && (
                <div className={`mb-4 p-4 rounded-lg text-sm ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {message.text}
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium mb-2 dark:text-white">First name</label>
                  <input type="text" id="first_name" value={formData.first_name} disabled className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium mb-2 dark:text-white">Last name</label>
                  <input type="text" id="last_name" value={formData.last_name} disabled className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-sm font-medium mb-2 dark:text-white">Email address</label>
                  <input type="email" id="email" value={formData.email} disabled className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm bg-gray-50 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 dark:text-white">Phone number</label>
                  <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>
                <div>
                  <label htmlFor="birth_date" className="block text-sm font-medium mb-2 dark:text-white">Date of birth</label>
                  <input type="date" id="birth_date" value={formData.birth_date} onChange={handleChange} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" />
                </div>

                <div className="sm:col-span-2 mt-4 flex justify-end">
                  <button type="submit" disabled={loading} className="py-2.5 px-5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50 transition-all">
                    {loading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
