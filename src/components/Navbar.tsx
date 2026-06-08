"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe } from "lucide-react";
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
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "glass border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="relative group flex items-center"
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-serif text-xl sm:text-2xl tracking-tight text-[var(--foreground)]">
              Harshal Vankudre<span className="text-[var(--primary)]">.</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1 rounded-full border border-[var(--border)] bg-[var(--surface)]/60 px-1.5 py-1 backdrop-blur">
            {navItems.map((item) => {
              const active = activeSection === item.href.slice(1);
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`relative px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] rounded-full transition-colors ${
                      active
                        ? "text-[var(--foreground)]"
                        : "text-muted hover:text-[var(--foreground)]"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[var(--surface-3)] border border-[var(--border)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side - Language Toggle & CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-muted hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all font-mono text-xs"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              <Globe size={15} />
              {language === "en" ? "DE" : "EN"}
            </motion.button>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="neo-btn neo-btn-primary text-sm py-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {t("nav.letsTalk")}
            </motion.a>
          </div>

          {/* Mobile - Language + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={toggleLanguage}
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-muted font-mono text-xs"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              {language === "en" ? "DE" : "EN"}
            </motion.button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-[var(--foreground)]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
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
            className="md:hidden glass border-b border-[var(--border)] overflow-hidden"
          >
            <ul className="px-4 py-4 space-y-1.5">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                      activeSection === item.href.slice(1)
                        ? "bg-[var(--surface-3)] border border-[var(--border)] text-[var(--foreground)]"
                        : "text-muted hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {item.name}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="neo-btn neo-btn-primary w-full mt-3"
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
