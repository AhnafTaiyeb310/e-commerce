import { FEATURED_PRODUCTS } from "@/constants/mockData";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">Featured Products</h2>
        <a className="inline-flex items-center gap-x-1 text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-500" href="/shop">
          View all
          <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
