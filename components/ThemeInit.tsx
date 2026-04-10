"use client";

import { useEffect } from "react";

export function ThemeInit() {
  useEffect(() => {
    queueMicrotask(() => {
      document.documentElement.style.opacity = "1";
      document.documentElement.classList.remove("app-loading");
    });
  }, []);

  return null;
}
