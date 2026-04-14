"use client";

import React, { useState } from "react";
import Link from "next/link";
import ProductAccordion from "./ProductAccordion";

export default function ProductInfo({ product }) {
  const [selectedColor, setSelectedColor] = useState("Light Grey");
  const [selectedSize, setSelectedSize] = useState("10");
  
  if (!product) return null;

  return (
    <div className="flex flex-col">
      {/* Breadcrumbs */}
      <ol className="flex items-center whitespace-nowrap mb-6" aria-label="Breadcrumb">
        <li className="inline-flex items-center">
          <Link className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500" href="/">
            Home
          </Link>
          <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </li>
        <li className="inline-flex items-center">
          <span className="flex items-center text-sm text-gray-500 dark:text-neutral-500">
            {product.category || "Shop"}
          </span>
          <svg className="flex-shrink-0 mx-2 overflow-visible size-4 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </li>
        <li className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200" aria-current="page">
          {product.name}
        </li>
      </ol>

      {/* Title & Reviews */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-neutral-200 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-x-2">
          <p className="text-2xl font-bold text-gray-800 dark:text-neutral-200">${product.price}</p>
          <div className="border-s border-gray-300 mx-2 h-5 dark:border-neutral-700"></div>
          <div className="flex items-center gap-x-1">
            <div className="flex text-yellow-400">
              {/* Star SVGs */}
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                </svg>
              ))}
            </div>
            <a href="#reviews" className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline dark:text-blue-500 dark:hover:text-blue-400">(99 reviews)</a>
          </div>
        </div>
        <p className="text-sm text-gray-500 dark:text-neutral-500 mt-2">Includes reviewers who received this item for free</p>
      </div>

      {/* Colors */}
      <div className="mb-6">
        <h2 className="text-sm font-medium text-gray-800 dark:text-neutral-200 mb-3">
          Color: <span className="font-semibold">{selectedColor}</span>
        </h2>
        <div className="flex items-center gap-x-3">
          {/* Light Grey */}
          <div className="relative">
            <input type="radio" name="color-picker" id="color-picker-1" className="peer absolute top-0 start-0 w-full h-full opacity-0 cursor-pointer" checked={selectedColor === "Light Grey"} onChange={() => setSelectedColor("Light Grey")} />
            <label htmlFor="color-picker-1" className="block size-8 rounded-full bg-gray-200 ring-2 ring-transparent ring-offset-2 peer-checked:ring-gray-800 hover:ring-gray-300 dark:peer-checked:ring-white dark:hover:ring-neutral-600 transition-all"></label>
          </div>
          {/* Dark Grey/Black */}
          <div className="relative">
            <input type="radio" name="color-picker" id="color-picker-2" className="peer absolute top-0 start-0 w-full h-full opacity-0 cursor-pointer" checked={selectedColor === "Dark Grey"} onChange={() => setSelectedColor("Dark Grey")} />
            <label htmlFor="color-picker-2" className="block size-8 rounded-full bg-gray-800 ring-2 ring-transparent ring-offset-2 peer-checked:ring-gray-800 hover:ring-gray-300 dark:peer-checked:ring-white dark:hover:ring-neutral-600 transition-all"></label>
          </div>
          {/* Navy */}
          <div className="relative">
            <input type="radio" name="color-picker" id="color-picker-3" className="peer absolute top-0 start-0 w-full h-full opacity-0 cursor-pointer" checked={selectedColor === "Navy"} onChange={() => setSelectedColor("Navy")} />
            <label htmlFor="color-picker-3" className="block size-8 rounded-full bg-blue-900 ring-2 ring-transparent ring-offset-2 peer-checked:ring-gray-800 hover:ring-gray-300 dark:peer-checked:ring-white dark:hover:ring-neutral-600 transition-all"></label>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <p className="text-sm text-gray-500 dark:text-neutral-500 flex items-center gap-x-1.5">
            <span className="text-lg">🔥</span> Trending item - 71 sold in the last day
          </p>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            Popular - 25 people are looking at this now
          </p>
          <p className="text-sm text-gray-500 dark:text-neutral-500">
            Model is 6' 0" tall and is wearing size 10.
          </p>
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-medium text-gray-800 dark:text-neutral-200">
            Size
          </h2>
          <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none focus:underline dark:text-blue-500 dark:hover:text-blue-400">
            Size guide
          </button>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {["7", "8", "9", "10", "11", "12"].map((size) => (
            <div key={size} className="relative">
              <input type="radio" name="size-picker" id={`size-picker-${size}`} className="peer absolute top-0 start-0 w-full h-full opacity-0 cursor-pointer" checked={selectedSize === size} onChange={() => setSelectedSize(size)} />
              <label htmlFor={`size-picker-${size}`} className="flex justify-center items-center h-12 w-full bg-white border border-gray-200 text-sm font-medium rounded-lg text-gray-800 peer-checked:border-gray-800 peer-checked:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-200 dark:peer-checked:border-white dark:peer-checked:text-white dark:hover:bg-neutral-800 transition-all flex-col">
                {size}
              </label>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-gray-500 dark:text-neutral-500">
          4 interest-free payments of $10 with Klarna. <Link href="#" className="underline text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400">Learn more</Link>
        </p>
      </div>

      {/* Add To Cart */}
      <div className="mb-8 flex gap-x-3">
        <button type="button" className="w-full py-3 px-4 inline-flex justify-center flex-1 items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
          Add to cart
        </button>
        <button type="button" className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800 border-none relative group">
          <div className="absolute inset-0 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-neutral-800 border border-gray-200 dark:border-neutral-700 pointer-events-none"></div>
          <svg className="shrink-0 size-4 relative z-10" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </button>
      </div>

      {/* Shipping details */}
      <div className="mb-8 border border-gray-200 rounded-xl p-4 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800/10">
        <ul className="space-y-2">
          <li className="flex gap-x-2.5 text-sm text-gray-800 dark:text-neutral-200">
            <svg className="shrink-0 size-5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 7v10"/><path d="M16 7v10"/><path d="M3 12h18"/><path d="M4 17h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2Z"/></svg>
            You'll see our shipping options at checkout.
          </li>
          <li className="flex gap-x-2.5 text-sm text-gray-800 dark:text-neutral-200">
            <svg className="shrink-0 size-5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Secure checkout
          </li>
          <li className="flex gap-x-2.5 text-sm text-gray-800 dark:text-neutral-200">
            <svg className="shrink-0 size-5 text-gray-500 dark:text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 14 20 9 15 4"/><path d="M4 20v-7a4 4 0 0 1 4-4h12"/></svg>
            30 days return
          </li>
        </ul>
      </div>

      {/* Description Snippet */}
      <div className="mb-8">
        <p className="text-gray-600 dark:text-neutral-400 mb-4">
          Sink into pure, simple comfort the moment you step in the door. The {product.name} has a pared-back design for those who love the beautiful yet understated things in life.
        </p>
        <ul className="space-y-3 ms-5 list-disc text-gray-600 dark:text-neutral-400 marker:text-gray-400">
          <li>Iconic, understated design.</li>
          <li>Premium breathable upper.</li>
          <li>Contoured footbed for extra support.</li>
          <li>Eco-friendly packaging.</li>
        </ul>
      </div>

      {/* Accordion Details */}
      <ProductAccordion />
      
    </div>
  );
}
