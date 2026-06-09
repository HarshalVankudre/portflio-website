"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { name: t("nav.home"), href: "#home" },
    { name: t("nav.about"), href: "#about" },
    { name: t("nav.skills"), href: "#skills" },
    { name: t("nav.experience"), href: "#experience" },
    { name: t("nav.education"), href: "#education" },
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "experience", "education", "projects", "contact"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(sectionIds[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "de" : "en");
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isScrolled ? "border-line-strong bg-night/90" : "border-line bg-night/70"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Wordmark */}
          <a href="#home" className="group flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold uppercase leading-none">
              HV<span className="text-accent">.</span>
            </span>
            <span className="tech-label hidden transition-colors group-hover:text-accent md:inline">
              Portfolio
            </span>
          </a>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                      isActive ? "text-accent" : "text-dim hover:text-fg"
                    }`}
                  >
                    <span className={`mr-1 ${isActive ? "text-accent" : "text-faint"}`} aria-hidden>
                      0{index + 1}
                    </span>
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side — Language Toggle & CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              onClick={toggleLanguage}
              className="chip h-9 cursor-pointer px-3 leading-7"
              aria-label="Toggle language"
            >
              {language === "en" ? "DE" : "EN"}
            </button>
            <a href="#contact" className="btn btn-solid h-9 px-4 text-[11px]">
              {t("nav.letsTalk")}
            </a>
          </div>

          {/* Mobile — Language + Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="chip h-9 cursor-pointer px-3 leading-7"
              aria-label="Toggle language"
            >
              {language === "en" ? "DE" : "EN"}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="border border-line-strong p-2 text-fg transition-colors hover:border-accent hover:text-accent"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-night/95 backdrop-blur-md lg:hidden"
          >
            <ul className="space-y-1 px-4 py-5 sm:px-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-baseline gap-3 border-l px-3 py-2.5 transition-colors ${
                        isActive
                          ? "border-accent text-accent"
                          : "border-line text-dim hover:border-line-strong hover:text-fg"
                      }`}
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em]" aria-hidden>
                        0{index + 1}
                      </span>
                      <span className="font-display text-2xl font-semibold uppercase leading-none">
                        {item.name}
                      </span>
                    </a>
                  </motion.li>
                );
              })}
              <motion.li
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.04 }}
                className="pt-4"
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn btn-solid w-full"
                >
                  {t("nav.letsTalk")}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
