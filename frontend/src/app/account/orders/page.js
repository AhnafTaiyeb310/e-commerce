"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AccountSidebar from "@/components/account/AccountSidebar";
import { fetchOrders } from "@/lib/api";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setOrders(data.results || data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'P': return 'text-amber-600 dark:text-amber-500';
      case 'C': return 'text-green-600 dark:text-green-500';
      case 'F': return 'text-red-600 dark:text-red-500';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'P': return 'Pending';
      case 'C': return 'Complete';
      case 'F': return 'Failed';
      default: return 'Unknown';
    }
  };

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
          <li className="text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">My Orders</li>
        </ol>

        <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12">
          <aside className="hidden lg:block">
            <AccountSidebar />
          </aside>

          <div className="space-y-8 lg:space-y-12">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-1">My Orders</h2>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-6">Check the status of recent orders and manage returns.</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-gray-200 rounded-xl dark:border-neutral-700">
                <p className="text-gray-500 dark:text-neutral-500">You haven't placed any orders yet.</p>
                <Link href="/shop" className="mt-4 inline-flex items-center gap-x-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400">
                  Start shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700 overflow-hidden">
                    <div className="p-4 sm:p-6 sm:pb-4 border-b border-gray-200 dark:border-neutral-700">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 flex-1">
                          <div>
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Status</p>
                            <p className={`text-sm font-semibold ${getStatusColor(order.payment_status)}`}>
                              {getStatusLabel(order.payment_status)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Order ID</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">#{order.id.slice(0, 8)}</p>
                          </div>
                          <div>
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Date</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">
                              {new Date(order.placed_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase text-gray-500 dark:text-neutral-500 mb-1">Items</p>
                            <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">{order.items?.length || 0}</p>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <Link href={`/account/orders/${order.id}`} className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800">
                            Order details
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 sm:p-6 flex flex-col gap-y-4">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex gap-x-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 dark:bg-neutral-800 overflow-hidden">
                             {/* Order items in serializers usually don't have images unless mapped */}
                             <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="size-6" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                             </div>
                          </div>
                          <div className="flex-1 flex flex-col sm:flex-row sm:justify-between gap-y-2">
                            <div>
                              <h4 className="font-medium text-gray-800 dark:text-neutral-200">{item.product.title}</h4>
                              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                                Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="font-medium text-gray-800 dark:text-neutral-200">${parseFloat(item.unit_price).toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
