import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { TRENDING_PRODUCTS } from "@/constants/mockData";

const ORDER_NUMBER = "72813820";
const ORDER_DATE = "5 Feb, 9:03";

export default function OrderConfirmationPage() {
  const items = TRENDING_PRODUCTS.slice(0, 3);
  const subtotal = 299;
  const shipping = 0;
  const tax = Math.round(299 * 0.08);
  const total = subtotal + shipping + tax;

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
          {/* ── Left column ── */}
          <div>
            {/* Hero confirmation block */}
            <div className="mb-12">
              {/* Checkmark circle */}
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
                Your order number is <span className="font-semibold text-gray-800 dark:text-neutral-200">#{ORDER_NUMBER}</span>
              </p>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-8">
                An order confirmation has been sent to{" "}
                <span className="font-medium text-gray-700 dark:text-neutral-300">jamescollins@site.so</span>
              </p>
              <Link
                href="/"
                className="py-3 px-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 transition-all"
              >
                Continue shopping
              </Link>
            </div>

            {/* ── Delivery tracker ── */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-800 dark:text-neutral-200 mb-6">What's next?</h2>

              <ol className="relative ms-3.5 mb-4 mb-0 border-s border-gray-200 dark:border-neutral-700">
                {/* Step 1 — done */}
                <li className="mb-8 ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-blue-600 rounded-full -start-3 ring-4 ring-white dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-white" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <h3 className="flex gap-x-2 items-center text-sm font-semibold text-gray-800 dark:text-white">
                    Order placed
                  </h3>
                  <time className="block mb-2 text-xs font-normal text-gray-400 dark:text-neutral-500">{ORDER_DATE}</time>
                </li>

                {/* Step 2 — pending */}
                <li className="mb-8 ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-gray-200 rounded-full -start-3 ring-4 ring-white dark:bg-neutral-700 dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </span>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Shipped</h3>
                </li>

                {/* Step 3 — pending */}
                <li className="mb-8 ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-gray-200 rounded-full -start-3 ring-4 ring-white dark:bg-neutral-700 dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </span>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Out for delivery</h3>
                </li>

                {/* Step 4 — pending */}
                <li className="ms-7">
                  <span className="absolute flex items-center justify-center size-6 bg-gray-200 rounded-full -start-3 ring-4 ring-white dark:bg-neutral-700 dark:ring-neutral-900">
                    <svg className="shrink-0 size-3 text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                  </span>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-neutral-500">Delivered</h3>
                </li>
              </ol>
            </div>

            {/* ── Need Assistance ── */}
            <div className="p-5 border border-gray-200 rounded-xl dark:border-neutral-700">
              <h3 className="text-sm font-bold text-gray-800 dark:text-neutral-200 mb-1">Need assistance?</h3>
              <p className="text-sm text-gray-500 dark:text-neutral-500 mb-4">
                Ask our customer service — Mon to Sun, 5 am to 8 pm PT
              </p>
              <Link
                href="#"
                className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              >
                Contact us
              </Link>
            </div>
          </div>

          {/* ── Right column: order summary ── */}
          <div>
            <div className="bg-gray-50 rounded-xl p-5 dark:bg-neutral-800">
              <h2 className="text-lg font-bold text-gray-800 dark:text-neutral-200 mb-6">Your order</h2>

              {/* Items */}
              <div className="space-y-5 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-x-4">
                    <div className="size-16 flex-shrink-0">
                      <img className="size-full rounded-lg object-cover" src={item.image} alt={item.name} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-800 dark:text-neutral-200">{item.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-neutral-500">Color: Light Grey | Size: M | Qty: 1</p>
                    </div>
                    <div className="text-end">
                      <p className="text-sm font-bold text-gray-800 dark:text-neutral-200">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <hr className="border-gray-200 dark:border-neutral-700 mb-5" />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-neutral-400">Subtotal</span>
                  <span className="font-medium text-gray-800 dark:text-neutral-200">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-neutral-400">Shipping</span>
                  <span className="font-medium text-gray-800 dark:text-neutral-200">{shipping === 0 ? "Free" : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-neutral-400">Tax</span>
                  <span className="font-medium text-gray-800 dark:text-neutral-200">${tax}</span>
                </div>
                <hr className="border-gray-200 dark:border-neutral-700" />
                <div className="flex justify-between font-bold text-base">
                  <span className="text-gray-800 dark:text-neutral-200">Total</span>
                  <span className="text-gray-800 dark:text-neutral-200">${total}</span>
                </div>
              </div>

              {/* Shipping address */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700">
                <h3 className="text-xs font-bold text-gray-800 dark:text-neutral-200 uppercase tracking-wide mb-3">Shipping to</h3>
                <p className="text-sm text-gray-600 dark:text-neutral-400">
                  James Collins<br />
                  280 Suzanne Throughway<br />
                  New York, OR 45801, US
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
