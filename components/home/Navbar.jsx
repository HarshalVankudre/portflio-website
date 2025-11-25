import { useEffect, useState } from "react";
import { Github, Linkedin, Menu, X, Globe } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "@/lib/localizedContent";

export function Navbar({ scrollToSection, navItems, personalInfo, language, onLanguageChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  const handleLanguageSelect = (lang) => {
    onLanguageChange(lang);
    setLangMenuOpen(false);
  };

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
        Skip to content
      </a>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-6"}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-5xl px-6 transition-all duration-500">
          <div
            className={`flex items-center justify-between rounded-full border border-white/10 bg-black/30 px-6 py-3 backdrop-blur-xl shadow-2xl ${
              scrolled ? "shadow-black/50" : ""
            }`}
          >
            <div className="text-lg font-semibold tracking-tight text-white/90">HV</div>

            <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-white transition-colors relative group"
                  aria-label={`Navigate to ${item.label}`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/10"
                  aria-label="Change language"
                  aria-expanded={langMenuOpen}
                >
                  <Globe size={18} />
                  <span className="text-xs font-medium uppercase">{language}</span>
                </button>
                {langMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setLangMenuOpen(false)}
                      aria-hidden="true"
                    />
                    <div className="absolute right-0 mt-2 py-2 w-32 bg-black/90 border border-white/10 rounded-xl backdrop-blur-xl shadow-xl z-50">
                      {Object.entries(SUPPORTED_LANGUAGES).map(([code, { label }]) => (
                        <button
                          key={code}
                          onClick={() => handleLanguageSelect(code)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                            language === code
                              ? "text-blue-400 bg-white/10"
                              : "text-white/70 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="hidden md:flex items-center gap-3">
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="GitHub Profile"
                >
                  <Github size={20} />
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={20} />
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white/70 hover:text-white transition-colors p-1"
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-3xl font-semibold text-white/80 hover:text-white transition-all hover:scale-105"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: mobileMenuOpen ? "fadeInUp 0.3s ease forwards" : "none"
              }}
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-6 mt-8">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="GitHub Profile"
            >
              <Github size={28} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={28} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
