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
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Navigation */}
      <Navbar />

      {/* Sections */}
      <Hero />
      <div className="neo-divider" aria-hidden />
      <About />
      <div className="neo-divider-bar" aria-hidden />
      <Skills />
      <div className="neo-divider" aria-hidden />
      <Experience />
      <div className="neo-divider-bar" aria-hidden />
      <Education />
      <div className="neo-divider" aria-hidden />
      <Projects />
      <div className="neo-divider-bar" aria-hidden />
      <GitHubStats />
      <div className="neo-divider" aria-hidden />
      <Contact />
      <Footer />

      {/* Easter Egg Terminal */}
      <Terminal />

      {/* AI Chatbot */}
      <ChatBot />
    </main>
  );
}
