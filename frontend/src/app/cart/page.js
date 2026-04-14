"use client";

import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";

// Mock cart data
const MOCK_CART_ITEMS = [
  {
    id: 1,
    name: "Slim Lyocell Trousers",
    color: "Light Grey",
    size: "10",
    price: 50,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1624371414361-e6e9ef358573?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    name: "Wireless Noise-Cancelling Headphones",
    color: "Black",
    size: "OS",
    price: 249,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);

  // Simple subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08); // 8% tax mock

  const isEmpty = items.length === 0;

  return (
    <div className="bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300">
      <Navbar />

      <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="flex flex-col gap-y-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">
            Shopping Cart ({items.length})
          </h1>

          {isEmpty ? (
            <EmptyCart />
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Cart Items List */}
              <div className="lg:col-span-2 space-y-2">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
                
                {/* Clear Cart Mock button for testing */}
                <div className="pt-4">
                  <button 
                    onClick={() => setItems([])}
                    className="text-sm text-gray-500 hover:text-red-600 dark:text-neutral-500 dark:hover:text-red-500 flex items-center gap-1 transition-colors"
                  >
                    Clear shopping cart
                  </button>
                </div>
              </div>

              {/* Sidebar: Order Summary */}
              <div className="lg:col-span-1 border-t lg:border-t-0 lg:border-s border-gray-200 dark:border-neutral-700 lg:ps-12 pt-8 lg:pt-0">
                <OrderSummary 
                  subtotal={subtotal} 
                  shipping={shipping} 
                  tax={tax} 
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
