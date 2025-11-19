import { useEffect, useState } from "react";
import { Github, Globe, Linkedin } from "lucide-react";

export function Navbar({ scrollToSection, navItems, personalInfo, language, onLanguageChange, supportedLanguages }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const languageEntries = Object.entries(supportedLanguages || {});

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4" : "py-6"}`}>
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
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {languageEntries.length > 1 && (
              <label className="flex items-center gap-2 text-xs font-medium text-white/70">
                <Globe size={16} className="text-blue-300" />
                <select
                  value={language}
                  onChange={(event) => onLanguageChange?.(event.target.value)}
                  className="bg-transparent text-white/80 focus:outline-none cursor-pointer"
                >
                  {languageEntries.map(([code, meta]) => (
                    <option key={code} value={code} className="text-black">
                      {meta.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Github size={20} />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-white transition-colors"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
