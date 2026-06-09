"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import GitHubStats from "@/components/GitHubStats";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Terminal from "@/components/Terminal";
import ChatBot from "@/components/ChatBot";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Skip Link */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-accent focus:text-night focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:font-semibold focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>

      {/* Loading Screen */}
      <LoadingScreen />

      {/* Navigation */}
      <Navbar />

      {/* Sections — separated by ruler tick strips */}
      <Hero />
      <div className="tick-divider" aria-hidden />
      <About />
      <div className="tick-divider" aria-hidden />
      <Skills />
      <div className="tick-divider" aria-hidden />
      <Experience />
      <div className="tick-divider" aria-hidden />
      <Education />
      <div className="tick-divider" aria-hidden />
      <Projects />
      <div className="tick-divider" aria-hidden />
      <GitHubStats />
      <div className="tick-divider" aria-hidden />
      <Contact />
      <Footer />

      {/* Easter Egg Terminal */}
      <Terminal />

      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
}
