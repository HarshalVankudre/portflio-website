"use client";

import { useEffect } from "react";

/** Registers the PWA service worker — headless, mounted once in layout. */
export default function SwRegistrar() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Registration failed — site works fine without it.
      });
    }
  }, []);

  return null;
}
