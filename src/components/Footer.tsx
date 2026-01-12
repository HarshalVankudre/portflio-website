"use client";

import { motion } from "framer-motion";
import { ArrowUp, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-6 sm:py-8 bg-black text-white border-t-4 border-[var(--primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 sm:gap-6 md:flex-row md:justify-between">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-2xl sm:text-3xl font-black bg-[var(--primary)] text-black px-2 sm:px-3 py-1">
              HV
            </span>
            <div className="h-6 sm:h-8 w-0.5 sm:w-1 bg-white/20" />
            <p className="text-gray-400 text-xs sm:text-sm">
              © {currentYear} Harshal Vankudre
            </p>
          </div>

          {/* Terminal Hint - Center (hidden on very small screens) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="hidden sm:flex items-center gap-2 text-xs sm:text-sm font-mono"
          >
            <Terminal size={14} className="text-[var(--primary)] sm:w-4 sm:h-4" />
            <span className="text-gray-400">
              Press{" "}
              <kbd className="bg-[var(--primary)] text-black px-1.5 sm:px-2 py-0.5 font-bold text-[10px] sm:text-xs rounded">
                `
              </kbd>{" "}
              for a surprise
            </span>
          </motion.div>

          {/* Back to Top */}
          <motion.a
            href="#home"
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white transition-colors group"
          >
            <span>{t("footer.backToTop")}</span>
            <ArrowUp size={14} className="group-hover:text-[var(--primary)] sm:w-4 sm:h-4" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
