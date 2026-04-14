"use client";

import React, { useState } from "react";
import Link from "next/link";

const SIDEBAR_CATEGORIES = [
  { name: "Jeans", count: 21 },
  { name: "Jackets", count: 15 },
  { name: "Polos", count: 35 },
  { name: "Shirts", count: 47 },
  { name: "Trousers", count: 30 },
];

const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];
const COLORS = [
  { name: "Black", hex: "#1f2937" },
  { name: "White", hex: "#f9fafb" },
  { name: "Blue", hex: "#1e40af" },
  { name: "Red", hex: "#dc2626" },
  { name: "Green", hex: "#16a34a" },
];

export default function ListingSidebar() {
  const [activeCategory, setActiveCategory] = useState("Shirts");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 300]);

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  return (
    <div className="w-full">
      {/* Categories */}
      <nav className="mb-8">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-4 dark:text-neutral-200">Categories</h3>
        <ul className="space-y-2">
          {SIDEBAR_CATEGORIES.map((cat) => (
            <li key={cat.name}>
              <button
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`w-full text-start flex justify-between items-center py-1.5 text-sm rounded-lg ${
                  activeCategory === cat.name
                    ? "font-semibold text-blue-600 dark:text-blue-500"
                    : "text-gray-600 hover:text-gray-800 dark:text-neutral-400 dark:hover:text-neutral-200"
                } focus:outline-none transition-colors`}
              >
                <span>{cat.name}</span>
                <span className="text-xs text-gray-400 dark:text-neutral-600">({cat.count})</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sizes Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-4 dark:text-neutral-200">Size</h3>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              type="button"
              onClick={() => toggleSize(size)}
              className={`py-1.5 px-3 text-xs font-medium rounded-lg border transition-all ${
                selectedSizes.includes(size)
                  ? "border-blue-600 bg-blue-600 text-white dark:border-blue-500 dark:bg-blue-500"
                  : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-4 dark:text-neutral-200">Color</h3>
        <div className="flex flex-wrap gap-2">
          {COLORS.map((color) => (
            <button
              key={color.name}
              type="button"
              onClick={() => toggleColor(color.name)}
              className={`size-7 rounded-full ring-offset-2 transition-all ${
                selectedColors.includes(color.name)
                  ? "ring-2 ring-gray-800 dark:ring-white"
                  : "ring-1 ring-transparent hover:ring-gray-300 dark:hover:ring-neutral-600"
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-4 dark:text-neutral-200">Price</h3>
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:bg-neutral-700"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-neutral-400">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Promo Card */}
      <div className="relative overflow-hidden rounded-xl bg-gray-800 dark:bg-neutral-700 p-6 text-white mt-8">
        <p className="text-sm font-semibold text-blue-300 mb-1">$99</p>
        <h4 className="text-lg font-bold mb-2">Mahabis Classic</h4>
        <Link href="#" className="inline-flex items-center gap-x-1 text-sm font-medium text-white hover:text-blue-300 transition-colors">
          Shop now
          <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </Link>
      </div>
    </div>
  );
}
