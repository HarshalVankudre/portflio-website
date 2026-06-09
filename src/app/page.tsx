"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import WorkList from "@/components/home/WorkList";
import AboutTeaser from "@/components/home/AboutTeaser";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Skip Link */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest focus:text-accent-ink"
      >
        Skip to content
      </a>

      <Navbar />

      <Hero />
      <WorkList />
      <AboutTeaser />
      <ContactSection />
      <Footer />

      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
}
