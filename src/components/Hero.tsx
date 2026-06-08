"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import {
  ArrowRight,
  MapPin,
  ChevronDown,
  Download,
  Sparkles,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

function ScrambleText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState(text);
  const prefersReducedMotion = useReducedMotion();

  const scramble = useCallback(
    (registerInterval: (id: ReturnType<typeof setInterval>) => void) => {
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
        }
      }, 40);
      registerInterval(interval);
    },
    [text]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      scramble((id) => {
        interval = id;
      });
    }, 500);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [scramble, prefersReducedMotion]);

  return (
    <span className="inline-block">
      {prefersReducedMotion ? text : displayText}
    </span>
  );
}

function FloatingBlob({
  color,
  className,
  delay = 0,
}: {
  color: string;
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{
        opacity: 0.7,
        x: [0, 18, -12, 0],
        y: [0, -20, 10, 0],
        rotate: [0, 6, -4, 0],
      }}
      transition={{
        opacity: { duration: 1.2, delay },
        x: { duration: 16, repeat: Infinity, ease: "easeInOut", delay },
        y: { duration: 14, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 18, repeat: Infinity, ease: "easeInOut", delay },
      }}
      className={`absolute pointer-events-none border-4 border-[var(--border)] ${className}`}
      style={{ background: color }}
    />
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = useMemo(
    () => [t("hero.role1"), t("hero.role2"), t("hero.role3"), t("hero.role4")],
    [t]
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
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
  }, [displayText, isDeleting, currentRole, roles, prefersReducedMotion]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center neo-grid-bg pt-28 pb-16 overflow-hidden"
    >
      {/* Floating background shapes — three accents, kept sparse */}
      <FloatingBlob
        color="var(--primary)"
        className="w-40 h-40 sm:w-56 sm:h-56 top-20 -left-10 sm:left-10 rotate-12"
      />
      <FloatingBlob
        color="var(--accent-cyan)"
        className="w-28 h-28 sm:w-40 sm:h-40 top-1/3 right-4 sm:right-20 rounded-full"
        delay={1}
      />
      <FloatingBlob
        color="var(--accent-red)"
        className="hidden sm:block w-20 h-20 sm:w-32 sm:h-32 bottom-32 left-1/4 -rotate-12"
        delay={2}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN — Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex items-center gap-2 text-gray-600 text-sm font-bold mb-4 uppercase tracking-wider"
            >
              <MapPin size={16} />
              <span>{t("hero.location")}</span>
            </motion.div>

            {/* Name — Big, stacked, with dramatic treatment */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="font-black uppercase leading-[0.9] tracking-tighter mb-6"
              style={{ fontSize: "clamp(2.5rem, 8vw, 6.5rem)" }}
            >
              <span className="block">Harshal</span>
              <span
                className="inline-block mt-1 sm:mt-2 px-2 sm:px-4 bg-[var(--primary)] border-4 border-[var(--border)]"
                style={{
                  boxShadow: "8px 8px 0 var(--shadow)",
                }}
              >
                <ScrambleText text="VANKUDRE" />
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-lg sm:text-2xl md:text-3xl font-bold mb-3 h-9 sm:h-10"
            >
              <span className="text-gray-700">
                {prefersReducedMotion ? roles[currentRole] : displayText}
              </span>
              <span className="cursor-blink text-[var(--accent-red)] ml-0.5">|</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-gray-700 text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
            >
              Building enterprise <span className="font-bold bg-[var(--accent-cyan)] px-1">AI chatbots</span>,{" "}
              <span className="font-bold bg-[var(--accent-red)] px-1">RAG systems</span>, and full-stack apps that ship.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-3 sm:gap-4 mb-8"
            >
              <a href="#projects" className="neo-btn neo-btn-primary text-sm sm:text-base">
                {t("hero.viewProjects")}
                <ArrowRight size={18} />
              </a>
              <a
                href="/cv.pdf"
                download="Harshal-Vankudre-CV.pdf"
                className="neo-btn neo-btn-cyan text-sm sm:text-base"
              >
                <Download size={18} />
                {t("hero.downloadCV")}
              </a>
              <a href="#contact" className="neo-btn neo-btn-white text-sm sm:text-base">
                <Mail size={18} />
                {t("hero.contact")}
              </a>
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center gap-3"
            >
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-gray-500">
                Find me
              </span>
              <div className="h-px w-8 bg-gray-300" />
              <a
                href="https://github.com/HarshalVankudre"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-3 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--primary)] hover:-translate-y-0.5 transition-all neo-shadow"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/harshal-vankudre/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-3 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--accent-cyan)] hover:-translate-y-0.5 transition-all neo-shadow"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:harshalvankudre@gmail.com"
                className="p-2 border-3 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--accent-red)] hover:-translate-y-0.5 transition-all neo-shadow"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — Visual identity card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring", damping: 20 }}
            className="lg:col-span-5 order-1 lg:order-2 relative"
          >
            {/* Floating sticker badges around the main card */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 z-20 px-3 py-1.5 bg-[var(--accent-cyan)] border-3 border-[var(--border)] neo-shadow font-black uppercase text-xs sm:text-sm font-display"
            >
              <Sparkles size={14} className="inline -mt-0.5 mr-1" />
              AI Developer
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 8 }}
              transition={{ delay: 1.15, type: "spring" }}
              className="absolute -top-3 right-4 sm:-top-5 sm:right-6 z-20 px-3 py-1.5 bg-[var(--accent-red)] border-3 border-[var(--border)] neo-shadow font-black uppercase text-xs sm:text-sm font-display"
            >
              EN · DE
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: -6 }}
              transition={{ delay: 1.3, type: "spring" }}
              className="absolute -bottom-3 -right-3 sm:-bottom-5 sm:-right-5 z-20 px-3 py-1.5 bg-[var(--primary)] border-3 border-[var(--border)] neo-shadow font-black uppercase text-xs sm:text-sm font-display"
            >
              @ RÜKO GmbH
            </motion.div>

            {/* Main monogram card */}
            <div
              className="relative bg-[var(--surface)] border-4 border-[var(--border)] overflow-hidden"
              style={{ boxShadow: "12px 12px 0 var(--shadow)" }}
            >
              {/* Top stripe with stripes pattern */}
              <div className="h-3 bg-[var(--primary)] border-b-4 border-[var(--border)] neo-stripes" />

              {/* Big monogram */}
              <div className="p-6 sm:p-8 bg-[var(--background)] flex items-center justify-center relative neo-grid-bg">
                <motion.div
                  animate={{
                    y: [0, -8, 0],
                    rotate: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="font-display font-black text-[8rem] sm:text-[10rem] lg:text-[12rem] leading-none bg-[var(--primary)] px-4 sm:px-6 border-4 border-[var(--border)]"
                  style={{ boxShadow: "8px 8px 0 var(--shadow)" }}
                >
                  HV
                </motion.div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 border-t-4 border-[var(--border)]">
                <div className="p-3 sm:p-4 text-center border-r-4 border-[var(--border)]">
                  <div className="font-display text-xl sm:text-3xl font-black">2+</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-600 mt-0.5">
                    Years
                  </div>
                </div>
                <div className="p-3 sm:p-4 text-center border-r-4 border-[var(--border)] bg-[var(--accent-cyan)]/20">
                  <div className="font-display text-xl sm:text-3xl font-black">10+</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-700 mt-0.5">
                    Projects
                  </div>
                </div>
                <div className="p-3 sm:p-4 text-center bg-[var(--primary)]/30">
                  <div className="font-display text-xl sm:text-3xl font-black">15+</div>
                  <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-700 mt-0.5">
                    Tech
                  </div>
                </div>
              </div>

              {/* Currently building */}
              <div className="p-4 border-t-4 border-[var(--border)] bg-black text-white">
                <div className="text-[10px] font-bold uppercase tracking-widest text-[var(--primary)] mb-1">
                  Currently building
                </div>
                <div className="font-bold text-sm sm:text-base">
                  Rüko GPT — Internal AI for 50+ employees
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 hover:text-[var(--foreground)] transition-colors z-10"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest">
          Scroll
        </span>
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
