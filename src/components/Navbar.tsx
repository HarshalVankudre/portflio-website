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
    { name: t("nav.projects"), href: "#projects" },
    { name: t("nav.education"), href: "#education" },
    { name: t("nav.contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map((item) => item.href.slice(1));
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems]);

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
          ? "bg-[var(--background)] border-b-4 border-black shadow-[0_4px_0_black]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl font-black bg-[var(--primary)] px-3 py-1 border-3 border-black shadow-[3px_3px_0_black] group-hover:shadow-[1px_1px_0_black] group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all inline-block">
              HV
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-bold uppercase transition-all ${
                    activeSection === item.href.slice(1)
                      ? "bg-[var(--primary)] border-2 border-black"
                      : "hover:bg-[var(--primary)] border-2 border-transparent hover:border-black"
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side - Language Toggle & CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Toggle */}
            <motion.button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 border-3 border-black bg-white hover:bg-[var(--primary)] transition-all font-bold text-sm uppercase shadow-[2px_2px_0_black] hover:shadow-[1px_1px_0_black] hover:translate-x-[1px] hover:translate-y-[1px]"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              <Globe size={16} />
              {language === "en" ? "DE" : "EN"}
            </motion.button>

            {/* CTA Button */}
            <motion.a
              href="#contact"
              className="neo-btn neo-btn-cyan text-sm py-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("nav.letsTalk")}
            </motion.a>
          </div>

          {/* Mobile - Language + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={toggleLanguage}
              className="p-2 border-3 border-black bg-white hover:bg-[var(--primary)] transition-colors font-bold text-sm"
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              {language === "en" ? "DE" : "EN"}
            </motion.button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 border-3 border-black bg-white hover:bg-[var(--primary)] transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="md:hidden bg-[var(--background)] border-b-4 border-black"
          >
            <ul className="px-4 py-4 space-y-2">
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
                    className={`block px-4 py-3 font-bold uppercase border-3 border-black transition-all ${
                      activeSection === item.href.slice(1)
                        ? "bg-[var(--primary)]"
                        : "bg-white hover:bg-[var(--primary)]"
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
                  className="block px-4 py-3 bg-[var(--accent-cyan)] border-3 border-black font-bold uppercase text-center mt-4 shadow-[4px_4px_0_black]"
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
