"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PrelineScript() {
  const pathname = usePathname();

  useEffect(() => {
    const loadPreline = async () => {
      // For modern Next.js/Webpack, importing from dist/preline is safer
      await import("preline/dist/preline");
      
      if (typeof window !== "undefined" && window.HSStaticMethods) {
        window.HSStaticMethods.autoInit();
      }
    };

    loadPreline();
  }, [pathname]);

  return null;
}
