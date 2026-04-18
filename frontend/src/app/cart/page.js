"use client";

import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartItem from "@/components/cart/CartItem";
import OrderSummary from "@/components/cart/OrderSummary";
import EmptyCart from "@/components/cart/EmptyCart";
import { useCart } from "@/features/cart/hooks/useCart";
import { DEFAULT_PLACEHOLDER } from "@/lib/constants";

export default function CartPage() {
  const { cart, isLoading, totalItems, totalPrice } = useCart();

  const items = cart?.items || [];
  const subtotal = parseFloat(totalPrice) || 0;
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const tax = Math.round(subtotal * 0.08); // 8% tax mock

  const isEmpty = items.length === 0;

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-neutral-900 min-h-screen transition-colors duration-300">
        <Navbar />
        <main className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto min-h-[50vh] flex justify-center items-center">
            <div className="animate-spin inline-block size-8 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>
        </main>
        <Footer />
      </div>
    );
  }

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
                {items.map((cartItem) => {
                  const product = cartItem.product || {};
                  
                  // Defensive extracting of nested fields based on common DRF output 
                  const mappedItem = {
                    id: cartItem.id, // The CartItem ID! Crucial for update/remove
                    productId: product.id,
                    name: product.title || "Unknown Product",
                    color: cartItem.variant?.attribute_values?.find(v => v.attribute_type?.name === "Color")?.value || "Default",
                    size: cartItem.variant?.attribute_values?.find(v => v.attribute_type?.name === "Size")?.value || "OS",
                    price: cartItem.total_price || product.base_price || 0,
                    quantity: cartItem.quantity,
                    image: product.images?.find(i => i.is_primary)?.image_url || product.images?.[0]?.image_url || DEFAULT_PLACEHOLDER
                  };

                  return <CartItem key={cartItem.id} item={mappedItem} />
                })}
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
