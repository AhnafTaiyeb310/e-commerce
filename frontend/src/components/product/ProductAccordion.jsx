"use client";

import React, { useEffect } from "react";

export default function ProductAccordion() {
  useEffect(() => {
    // Re-init preline after mount so accordion works
    setTimeout(() => {
      if (typeof window !== "undefined" && window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    }, 100);
  }, []);

  return (
    <div className="hs-accordion-group" data-hs-accordion-always-open>
      {/* Item 1: Shipping */}
      <div className="hs-accordion active bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-900 border-gray-200 dark:border-neutral-700" id="hs-basic-with-title-and-arrow-stretched-heading-one">
        <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-4 px-5 inline-flex items-center justify-between w-full font-semibold text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
          Shipping & Returns
          <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
          <div className="pb-4 px-5">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Free standard shipping on orders over $50 and free 30-day returns.
            </p>
            <p className="text-sm mt-2 text-gray-600 dark:text-neutral-400">
              Returns must be received within 30 days of shipping confirmation. In order to process your return, items must be unworn and tags must be attached.
            </p>
          </div>
        </div>
      </div>

      {/* Item 2: Materials & Care */}
      <div className="hs-accordion bg-white border -mt-px first:rounded-t-lg last:rounded-b-lg dark:bg-neutral-900 border-gray-200 dark:border-neutral-700" id="hs-basic-with-title-and-arrow-stretched-heading-two">
        <button className="hs-accordion-toggle hs-accordion-active:text-blue-600 py-4 px-5 inline-flex items-center justify-between w-full font-semibold text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-blue-500 dark:text-neutral-200" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
          Materials & Care
          <svg className="hs-accordion-active:hidden block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          <svg className="hs-accordion-active:block hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
        </button>
        <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
          <div className="pb-4 px-5">
            <p className="text-sm text-gray-600 dark:text-neutral-400">
              Machine washable at 30°, remove insoles and wash on a wool/delicates cycle. Do not tumble dry, bleach, or iron.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
