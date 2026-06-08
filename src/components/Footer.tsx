"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[var(--foreground)] py-8 text-[var(--background)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-5 font-mono text-xs uppercase text-white/58 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
        <span>&copy; {currentYear} Harshal Vankudre</span>

        <div className="flex flex-wrap items-center gap-5">
          <Link href="/now" className="transition-colors hover:text-white">
            /now
          </Link>
          <a
            href="https://github.com/HarshalVankudre"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <motion.a
            href="#home"
            whileHover={{ y: -2 }}
            className="inline-flex items-center gap-1.5 transition-colors hover:text-white"
          >
            <span>{t("footer.backToTop")}</span>
            <ArrowUp size={13} />
          </motion.a>
        </div>
      </div>
    </footer>
  );
}
