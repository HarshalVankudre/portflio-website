"use client";

import { motion } from "framer-motion";
import { ArrowUp, Terminal } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-8 bg-black text-white border-t-4 border-[var(--primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-black bg-[var(--primary)] text-black px-3 py-1">
              HV
            </span>
            <div className="h-8 w-1 bg-white/20" />
            <p className="text-gray-400 text-sm">
              © {currentYear} Harshal Vankudre
            </p>
          </div>

          {/* Terminal Hint - Center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex items-center gap-2 text-sm font-mono"
          >
            <Terminal size={16} className="text-[var(--primary)]" />
            <span className="text-gray-400">
              Press{" "}
              <kbd className="bg-[var(--primary)] text-black px-2 py-0.5 font-bold text-xs rounded">
                `
              </kbd>{" "}
              for a surprise
            </span>
          </motion.div>

          {/* Back to Top */}
          <motion.a
            href="#home"
            whileHover={{ y: -3 }}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
          >
            <span>{t("footer.backToTop")}</span>
            <ArrowUp size={16} className="group-hover:text-[var(--primary)]" />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
