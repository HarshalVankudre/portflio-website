"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy, client-only wrapper so the chat widget (and its streaming logic)
// stays out of the initial bundle while every page keeps this import path.
const ChatWidget = dynamic(() => import("./chat/ChatWidget"), { ssr: false });

/**
 * Mounting is additionally deferred until the browser is idle (with a
 * timeout failsafe) so the chat chunk never competes with hydration,
 * fonts, or the entrance choreography on first paint. Visitors see the
 * launcher appear within a couple of seconds — long before they need it.
 */
export default function ChatBot() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const arm = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(arm, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(arm, 2000);
    return () => window.clearTimeout(id);
  }, []);

  return ready ? <ChatWidget /> : null;
}
