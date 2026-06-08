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
import ScrollProgressBar from "@/components/effects/ScrollProgressBar";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* Slim reading-progress rule */}
      <ScrollProgressBar />

      {/* Skip Link */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-primary focus:text-[var(--foreground)] focus:border focus:border-[var(--border)] focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to content
      </a>

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <Projects />
      <Skills />
      <Experience />
      <Education />
      <About />
      <GitHubStats />
      <Contact />
      <Footer />

      {/* Easter Egg Terminal */}
      <Terminal />

      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
}
