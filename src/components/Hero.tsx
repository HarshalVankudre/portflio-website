"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight, MapPin, Download, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const [isScrambling, setIsScrambling] = useState(true);

  const scramble = useCallback(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 3;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsScrambling(false);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(scramble, 500);
    return () => clearTimeout(timeout);
  }, [scramble]);

  useEffect(() => {
    if (isScrambling) return;
    const interval = setInterval(() => {
      setIsScrambling(true);
      scramble();
    }, 8000);
    return () => clearInterval(interval);
  }, [isScrambling, scramble]);

  return <span className="bg-[var(--primary)] px-1 sm:px-2">{displayText}</span>;
}

export default function Hero() {
  const { t } = useLanguage();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = [
    t("hero.role1"),
    t("hero.role2"),
    t("hero.role3"),
    t("hero.role4"),
  ];

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole, roles]);

  return (
    <section id="home" className="relative min-h-screen flex items-center neo-grid-bg pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-gray-500 text-sm font-medium mb-6"
          >
            <MapPin size={16} />
            <span>{t("hero.location")}</span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="neo-title mb-4"
          >
            Harshal <ScrambleText text="VANKUDRE" />
          </motion.h1>

          {/* Typewriter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-xl md:text-2xl font-bold mb-8 h-8"
          >
            <span className="text-gray-600">{displayText}</span>
            <span className="cursor-blink text-[var(--accent-red)]">|</span>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4"
          >
            <a href="#projects" className="neo-btn neo-btn-primary text-sm sm:text-base justify-center">
              {t("hero.viewProjects")}
              <ArrowRight size={18} />
            </a>
            <a href="/cv.pdf" download className="neo-btn neo-btn-white text-sm sm:text-base justify-center">
              <Download size={18} />
              {t("hero.downloadCV")}
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-black transition-colors"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={28} strokeWidth={3} />
        </motion.div>
      </motion.a>
    </section>
  );
}
