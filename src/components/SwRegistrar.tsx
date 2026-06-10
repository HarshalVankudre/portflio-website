"use client";

import { useEffect } from "react";

/** Registers the PWA service worker — headless, mounted once in layout. */
export default function SwRegistrar() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    // Skip dev/localhost entirely and drop stale workers to avoid cache confusion.
    if (process.env.NODE_ENV !== "production" || location.hostname === "localhost") {
      navigator.serviceWorker
        .getRegistrations()
        .then((rs) => rs.forEach((r) => r.unregister()))
        .catch(() => {});
      return;
    }

    const register = () => {
      const doRegister = () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {
          // Registration failed — site works fine without it.
        });
      };
      // Defer past load so registration never competes with hydration.
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(doRegister);
      } else {
        setTimeout(doRegister, 1);
      }
    };

    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
