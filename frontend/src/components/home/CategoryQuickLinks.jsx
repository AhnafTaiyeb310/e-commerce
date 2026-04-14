import { QUICK_LINKS } from "@/constants/mockData";
import Link from "next/link";

export default function CategoryQuickLinks() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 lg:gap-8">
        {QUICK_LINKS.map((item) => (
          <Link key={item.id} className="group block text-center" href={`/shop/${item.name.toLowerCase()}`}>
            <div className="relative w-24 h-24 mx-auto mb-3">
              <img 
                className="w-full h-full object-cover rounded-full" 
                src={item.image} 
                alt={item.name}
              />
            </div>
            <h3 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 dark:text-neutral-200">
              {item.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
