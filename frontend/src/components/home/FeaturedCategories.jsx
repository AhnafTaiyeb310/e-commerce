import { CATEGORIES } from "@/constants/mockData";
import Link from "next/link";

export default function FeaturedCategories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-neutral-200">Shop by Category</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8">
        {CATEGORIES.map((category) => (
          <Link 
            key={category.id} 
            href={category.link}
            className="group flex flex-col items-center"
          >
            <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-colors dark:bg-neutral-800 dark:group-hover:bg-neutral-700">
              {category.icon}
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-neutral-300 group-hover:text-blue-600 transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
