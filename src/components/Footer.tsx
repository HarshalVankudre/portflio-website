"use client";

import { motion } from "framer-motion";
import { ArrowUp, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-10 sm:py-12 bg-[var(--foreground)] text-[var(--background)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Wordmark */}
          <span className="font-serif text-2xl sm:text-3xl tracking-tight">
            Harshal Vankudre
          </span>

          {/* Terminal Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/55"
          >
            <Terminal size={14} className="text-[var(--primary)]" />
            <span>
              Press{" "}
              <kbd className="bg-white/10 text-white px-1.5 py-0.5 rounded text-[10px]">
                `
              </kbd>{" "}
              for a surprise
            </span>
          </motion.div>

          {/* Copyright + back to top */}
          <div className="flex items-center gap-6 font-mono text-xs text-white/55">
            <span>© {currentYear}</span>
            <motion.a
              href="#home"
              whileHover={{ y: -2 }}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span className="uppercase tracking-[0.12em]">{t("footer.backToTop")}</span>
              <ArrowUp size={13} />
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
}
