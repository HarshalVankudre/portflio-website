'use client';

import { useCallback, useEffect, useState } from "react";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, localizedContent } from "@/lib/localizedContent";
import { LANGUAGE_COOKIE, LANGUAGE_STORAGE_KEY } from "@/lib/i18n";
import { SKILLS } from "@/lib/skills";
import { AIChatWidget } from "./home/AIChatWidget";
import { Experience } from "./home/Experience";
import { Footer } from "./home/Footer";
import { Hero } from "./home/Hero";
import { Navbar } from "./home/Navbar";
import { Projects } from "./home/Projects";
import { Skills } from "./home/Skills";

export default function Home({ initialLanguage = DEFAULT_LANGUAGE }) {
  const resolvedInitialLanguage = localizedContent[initialLanguage] ? initialLanguage : DEFAULT_LANGUAGE;
  const [language, setLanguage] = useState(resolvedInitialLanguage);

  useEffect(() => {
    setLanguage(resolvedInitialLanguage);
  }, [resolvedInitialLanguage]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (storedLanguage && localizedContent[storedLanguage]) {
      setLanguage(storedLanguage);
      return;
    }

    const cookieLanguage =
      document.cookie
        ?.split(";")
        .map((entry) => entry.trim())
        .find((entry) => entry.startsWith(`${LANGUAGE_COOKIE}=`))
        ?.split("=")[1] || null;

    if (cookieLanguage && localizedContent[cookieLanguage]) {
      setLanguage(cookieLanguage);
      return;
    }

    const browserLanguages = window.navigator.languages?.length ? window.navigator.languages : [window.navigator.language];
    const matchedBrowserLanguage = browserLanguages
      .map((lang) => (lang || "").split("-")[0]?.toLowerCase())
      .find((lang) => lang && localizedContent[lang]);

    if (matchedBrowserLanguage && matchedBrowserLanguage !== resolvedInitialLanguage) {
      setLanguage(matchedBrowserLanguage);
    }
  }, [resolvedInitialLanguage]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
    if (typeof window !== "undefined") {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      document.cookie = `${LANGUAGE_COOKIE}=${language}; path=/; max-age=31536000`;
    }
  }, [language]);

  const handleLanguageChange = useCallback((nextLanguage) => {
    if (localizedContent[nextLanguage]) {
      setLanguage(nextLanguage);
    }
  }, []);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const content = localizedContent[language] || localizedContent[DEFAULT_LANGUAGE];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[128px] opacity-50 animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] opacity-50 animate-pulse-slow delay-700" />
      </div>

      <div className="relative z-10">
        <Navbar
          scrollToSection={scrollToSection}
          navItems={content.nav}
          personalInfo={content.personalInfo}
          language={language}
          onLanguageChange={handleLanguageChange}
          supportedLanguages={SUPPORTED_LANGUAGES}
        />
        <Hero
          scrollToSection={scrollToSection}
          personalInfo={content.personalInfo}
          heroContent={content.hero}
          aiAssistantStrings={content.aiAssistant}
        />
        <Experience title={content.sections.experience} experiences={content.experiences} />
        <Projects title={content.sections.projects} projects={content.projects} />
        <Skills
          title={content.sections.about}
          aboutText={content.personalInfo.about}
          skillsHeading={content.sections.skillsHeading}
          skills={SKILLS}
        />
        <Footer personalInfo={content.personalInfo} footerContent={content.footer} />
        <AIChatWidget
          personalInfo={content.personalInfo}
          aiAssistantStrings={content.aiAssistant}
          experiences={content.experiences}
          projects={content.projects}
          skills={SKILLS}
        />
      </div>
    </div>
  );
}
