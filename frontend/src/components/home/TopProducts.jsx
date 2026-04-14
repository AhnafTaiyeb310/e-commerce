import React from 'react';

export default function TopProducts() {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-semibold md:text-3xl md:leading-tight text-gray-800 dark:text-neutral-200 tracking-tight">
          The better way to shop with Preline top-<br className="hidden sm:block" />products
        </h2>
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 */}
        <div className="group flex flex-col focus:outline-none border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4">
            <div className="flex h-[250px] gap-2">
              <div className="w-2/3 h-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Shoes hero" />
              </div>
              <div className="w-1/3 h-full flex flex-col gap-2">
                <div className="h-1/2 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                   <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Shoe 1" />
                </div>
                <div className="h-1/2 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                   <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Shoe 2" />
                </div>
              </div>
            </div>
            <div className="mt-5 mb-2 text-center flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Nike Shoes
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                Starting from $99
              </p>
              <a className="mt-4 text-sm font-medium text-gray-800 underline decoration-2 decoration-gray-300 underline-offset-4 hover:decoration-gray-800 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:decoration-neutral-200 transition-colors" href="#">
                View all
              </a>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="group flex flex-col focus:outline-none border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4">
            <div className="flex h-[250px] gap-2">
              <div className="w-2/3 h-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1520975954732-57dd22299614?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Men's clothing hero" />
              </div>
              <div className="w-1/3 h-full flex flex-col gap-2">
                <div className="h-1/2 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                   <img className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Men 1" />
                </div>
                <div className="h-1/2 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                   <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Men 2" />
                </div>
              </div>
            </div>
            <div className="mt-5 mb-2 text-center flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Men's Clothing
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                Starting from $39
              </p>
              <a className="mt-4 text-sm font-medium text-gray-800 underline decoration-2 decoration-gray-300 underline-offset-4 hover:decoration-gray-800 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:decoration-neutral-200 transition-colors" href="#">
                View all
              </a>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="group flex flex-col focus:outline-none border border-gray-200 bg-white rounded-xl shadow-sm overflow-hidden dark:bg-neutral-900 dark:border-neutral-800">
          <div className="p-4">
            <div className="flex h-[250px] gap-2">
              <div className="w-2/3 h-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Women's clothing hero" />
              </div>
              <div className="w-1/3 h-full flex flex-col gap-2">
                <div className="h-1/2 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                   <img className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1434389673559-ebd8bdc34516?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Women 1" />
                </div>
                <div className="h-1/2 w-full rounded-lg bg-gray-100 dark:bg-neutral-800 overflow-hidden relative">
                   <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out" src="https://images.unsplash.com/photo-1550614000-4b95dd245eb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" alt="Women 2" />
                </div>
              </div>
            </div>
            <div className="mt-5 mb-2 text-center flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">
                Women's Clothing
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-neutral-500">
                Starting from $59
              </p>
              <a className="mt-4 text-sm font-medium text-gray-800 underline decoration-2 decoration-gray-300 underline-offset-4 hover:decoration-gray-800 dark:text-neutral-200 dark:decoration-neutral-600 dark:hover:decoration-neutral-200 transition-colors" href="#">
                View all
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
