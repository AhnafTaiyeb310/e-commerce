import Link from "next/link";

const mainCategories = [
  {
    id: 1,
    title: "Men's Clothing",
    subtitle: "Starting from $39",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/shop/men"
  },
  {
    id: 2,
    title: "Women's Clothing",
    subtitle: "Starting from $49",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/shop/women"
  },
  {
    id: 3,
    title: "Kid's Collection",
    subtitle: "Starting from $29",
    image: "https://images.unsplash.com/photo-1514090458221-65bb69af63e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    link: "/shop/kids"
  }
];

export default function ShopByCategories() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mainCategories.map((cat) => (
          <div key={cat.id} className="group flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700">
            <div className="p-4 md:p-5">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">{cat.title}</h3>
                  <p className="mt-1 text-gray-500 dark:text-neutral-400 text-sm">{cat.subtitle}</p>
                </div>
              </div>
              <div className="relative overflow-hidden rounded-xl h-48">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out" 
                  src={cat.image} 
                  alt={cat.title}
                />
              </div>
              <div className="mt-4">
                <Link className="inline-flex items-center gap-x-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-500 dark:hover:text-blue-400" href={cat.link}>
                  View all
                  <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
