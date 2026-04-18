"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchOrderDetail } from "@/lib/api";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { user } = useAuth();

  const { data: order, isLoading, error } = useQuery({
    queryKey: ["order_detail", orderId],
    queryFn: () => fetchOrderDetail(orderId),
    enabled: !!orderId,
  });

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-900 min-h-screen flex items-center justify-center">
        <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading"></div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="bg-white dark:bg-neutral-900 min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200 mb-2">Order Not Found</h1>
        <p className="text-gray-600 dark:text-neutral-400 mb-6">We couldn't find the order details you're looking for.</p>
        <Link href="/" className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Go Back Home</Link>
      </div>
    );
  }

  const items = order.items || [];
  const subtotal = items.reduce((acc, item) => acc + (parseFloat(item.unit_price) * item.quantity), 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08); 
  const total = subtotal + shipping + tax;
  
  const addr = order.shipping_address || {};

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* ── Left column ── */}
          <div>
            <div className="mb-12">
              <div className="flex items-center justify-center size-14 bg-green-100 rounded-full mb-6 dark:bg-green-900/30">
                <svg className="shrink-0 size-7 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 dark:text-neutral-200 mb-2">
                🎉 Order confirmed
              </h1>
              <h2 className="text-lg text-gray-600 dark:text-neutral-400 mb-1">
                Thank you for your order!
              </h2>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-2">
                Your order number is <span className="font-semibold text-gray-800 dark:text-neutral-200">#{order.id.slice(0, 8)}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-8">
                An order confirmation has been sent to{" "}
                <span className="font-medium text-gray-700 dark:text-neutral-300">{user?.email || "your email"}</span>
              </p>
              <Link
                href="/"
                className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all"
              >
                Continue shopping
              </Link>
            </div>

            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-6">What's next?</h2>

              <ol className="relative ms-3.5 mb-4 border-s border-gray-200 dark:border-neutral-700">
                <li className="mb-8 ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-blue-600 rounded-full -start-3 ring-4 ring-white dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <h3 className="flex gap-x-2 items-center text-sm font-semibold text-gray-800 dark:text-white">
                    Order placed
                  </h3>
                  <time className="block mb-2 text-xs font-normal text-gray-400 dark:text-neutral-500">
                    {new Date(order.placed_at).toLocaleDateString()} at {new Date(order.placed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </time>
                </li>

                <li className="mb-8 ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-gray-200 rounded-full -start-3 ring-4 ring-white dark:bg-neutral-700 dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </span>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Shipped</h3>
                </li>

                <li className="mb-8 ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-gray-200 rounded-full -start-3 ring-4 ring-white dark:bg-neutral-700 dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </span>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Out for delivery</h3>
                </li>

                <li className="ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-gray-200 rounded-full -start-3 ring-4 ring-white dark:bg-neutral-700 dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </span>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Delivered</h3>
                </li>
              </ol>
            </div>

            <div className="p-5 border border-gray-200 rounded-xl dark:border-neutral-700">
              <h3 className="text-sm font-bold text-gray-800 dark:text-neutral-200 mb-1">Need assistance?</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4">
                Ask our customer service — Mon to Sun, 5 am to 8 pm PT
              </p>
              <Link
                href="/support"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div>
            <div className="bg-gray-50 rounded-xl p-5 dark:bg-neutral-800">
              <h2 className="text-lg font-bold text-gray-800 dark:text-neutral-200 mb-6">Your order</h2>

              <div className="space-y-5 mb-6">
                {items.map((item) => {
                  const product = item.product || {};
                  const image = product.images?.find(i => i.is_primary)?.image_url || product.images?.[0]?.image_url || DEFAULT_PLACEHOLDER;
                  return (
                    <div key={item.id} className="flex gap-x-4">
                      <div className="size-16 flex-shrink-0">
                        <img className="size-full rounded-lg object-cover" src={image} alt={product.title} />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-200">{product.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-neutral-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-end">
                        <p className="text-sm font-bold text-gray-800 dark:text-neutral-200">${(parseFloat(item.unit_price) * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <hr className="border-gray-200 dark:border-neutral-700 mb-5" />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-neutral-400">Subtotal</span>
                  <span className="font-medium text-gray-800 dark:text-neutral-200">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-neutral-400">Shipping</span>
                  <span className="font-medium text-gray-800 dark:text-neutral-200">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-neutral-400">Tax</span>
                  <span className="font-medium text-gray-800 dark:text-neutral-200">${tax.toFixed(2)}</span>
                </div>
                <hr className="border-gray-200 dark:border-neutral-700" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-gray-800 dark:text-neutral-200">Total</span>
                  <span className="text-gray-800 dark:text-neutral-200">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
                <h3 className="text-xs font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide mb-3">Shipping to</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  {addr.first_name} {addr.last_name}<br />
                  {addr.street}<br />
                  {addr.city}, {addr.state} {addr.postal_code}<br />
                  {addr.country}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

