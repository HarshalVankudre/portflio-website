"use client";

import { motion } from "framer-motion";
import { ArrowUp, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-raised">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between">
          {/* Wordmark & Copyright */}
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-bold uppercase leading-none">
              HV<span className="text-accent">.</span>
            </span>
            <span aria-hidden className="h-5 w-px bg-line-strong" />
            <p className="font-mono text-xs text-dim">
              © {currentYear} Harshal Vankudre
            </p>
          </div>

          {/* Terminal Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden items-center gap-2 font-mono text-xs text-faint sm:flex"
          >
            <Terminal size={13} className="text-accent" aria-hidden />
            <span>
              Press{" "}
              <kbd className="border border-line-strong bg-night px-1.5 py-0.5 font-semibold text-accent">
                `
              </kbd>{" "}
              for a surprise
            </span>
          </motion.div>

          {/* Back to Top */}
          <a
            href="#home"
            className="link-draw inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-dim"
          >
            {t("footer.backToTop")}
            <ArrowUp size={13} aria-hidden />
          </a>
        </div>

        {/* Spec microline */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 border-t border-line pt-5 md:justify-between">
          <span className="tech-label">
            BUILT WITH NEXT.JS · DESIGNED AS AN INSTRUMENT
          </span>
          <span className="tech-label">49.0069° N — 8.4037° E · KARLSRUHE</span>
        </div>
      </div>
    </footer>
  );
}
