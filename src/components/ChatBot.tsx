"use client";

import dynamic from "next/dynamic";

// Lazy, client-only wrapper so the chat widget (and its streaming logic)
// stays out of the initial bundle while every page keeps this import path.
const ChatWidget = dynamic(() => import("./chat/ChatWidget"), { ssr: false });

export default function ChatBot() {
  return <ChatWidget />;
}
