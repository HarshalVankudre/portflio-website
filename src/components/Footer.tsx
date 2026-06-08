"use client";

import { motion } from "framer-motion";
import { ArrowUp, Terminal } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import Signature from "@/components/ui/Signature";

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-14 pb-10 bg-[var(--foreground)] text-[var(--background)] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        {/* Top: signoff + signature */}
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between border-b border-white/10 pb-10">
          <div>
            <span className="font-hand text-2xl text-[#E8B7A2] -rotate-2 inline-block leading-none">
              thanks for scrolling — let&rsquo;s build something.
            </span>
            <div className="mt-5 text-[#E8B7A2]">
              <Signature />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden sm:flex items-center gap-2 font-mono text-xs text-white/55"
          >
            <Terminal size={14} className="text-[#E8B7A2]" />
            <span>
              Press{" "}
              <kbd className="bg-white/10 text-white px-1.5 py-0.5 rounded text-[10px]">`</kbd>{" "}
              for a surprise
            </span>
          </motion.div>
        </div>

        {/* Bottom: meta */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6 font-mono text-xs text-white/55">
          <span className="tracking-[0.08em]">© {currentYear} Harshal Vankudre</span>
          <div className="flex items-center gap-6">
            <Link href="/now" className="uppercase tracking-[0.12em] hover:text-white transition-colors">
              /now
            </Link>
            <a
              href="https://github.com/HarshalVankudre"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-[0.12em] hover:text-white transition-colors"
            >
              GitHub
            </a>
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
