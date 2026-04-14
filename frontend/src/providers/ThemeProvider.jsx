"use client";

import { useThemeStore } from "@/store/useThemeStore";
import { useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
  const { theme } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  // Sync theme with HTML tag
  useEffect(() => {
    const html = document.documentElement;
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="invisible">{children}</div>;
  }

  return <>{children}</>;
}
