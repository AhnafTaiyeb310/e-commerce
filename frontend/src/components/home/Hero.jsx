"use client";

import { HERO_SLIDES } from "@/constants/mockData";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div data-hs-carousel='{
          "loadingClasses": "opacity-0",
          "isAutoPlay": true
        }' className="relative">
        <div className="hs-carousel relative overflow-hidden w-full min-h-[400px] md:min-h-[500px] bg-transparent rounded-2xl dark:bg-neutral-800">
          <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
            {HERO_SLIDES.map((slide) => (
              <div key={slide.id} className="hs-carousel-slide">
                <div 
                  className="flex flex-col h-full bg-cover bg-center bg-no-repeat w-full"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                >
                  <div className="mt-auto w-2/3 md:max-w-lg ps-5 pb-5 md:ps-10 md:pb-10 bg-gradient-to-t from-black/20 to-transparent">
                    <span className="block text-sm font-semibold text-white uppercase mb-2">
                      {slide.tag}
                    </span>
                    <h2 className="text-xl md:text-3xl font-bold text-white mb-5 leading-tight">
                      {slide.title}
                    </h2>
                    <div className="mt-5">
                      <Link
                        className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 shadow-sm"
                        href={slide.link}
                      >
                        {slide.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button type="button" className="hs-carousel-prev hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-[46px] h-full text-white hover:bg-white/10 rounded-s-2xl focus:outline-none focus:bg-white/10 transition-colors">
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <button type="button" className="hs-carousel-next hs-carousel:disabled:opacity-50 disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-[46px] h-full text-white hover:bg-white/10 rounded-e-2xl focus:outline-none focus:bg-white/10 transition-colors">
          <svg className="size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
        </button>

        {/* Pagination */}
        <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
          {HERO_SLIDES.map((_, index) => (
            <span key={index} className="hs-carousel-active:bg-white hs-carousel-active:border-white size-3 border border-white/50 rounded-full cursor-pointer transition-all"></span>
          ))}
        </div>
      </div>
    </div>
  );
}
