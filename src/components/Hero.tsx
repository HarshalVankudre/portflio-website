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
import ParticleField from "@/components/effects/ParticleField";
import Magnetic from "@/components/effects/Magnetic";

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

/** Soft, blurred drifting gradient glow — the aurora backdrop. */
function AuroraBlob({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.6, delay }}
      className={`absolute rounded-full blur-3xl pointer-events-none animate-aurora ${className}`}
      style={{ animationDelay: `${delay}s` }}
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

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.2, 0.7, 0.2, 1] as const },
    }),
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-32 pb-20"
    >
      {/* Interactive constellation */}
      <ParticleField className="opacity-80" />

      {/* Aurora backdrop */}
      <AuroraBlob className="w-[34rem] h-[34rem] -top-32 -right-24 bg-[radial-gradient(circle,rgba(124,92,255,0.5),transparent_60%)]" />
      <AuroraBlob
        className="w-[30rem] h-[30rem] top-1/3 -left-32 bg-[radial-gradient(circle,rgba(34,211,238,0.35),transparent_60%)]"
        delay={1.2}
      />
      <AuroraBlob
        className="hidden sm:block w-[24rem] h-[24rem] bottom-0 left-1/3 bg-[radial-gradient(circle,rgba(251,113,133,0.28),transparent_60%)]"
        delay={2.2}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT — Content */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            {/* Status pill */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-1.5 mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="font-mono text-xs text-muted">
                Open to opportunities
              </span>
            </motion.div>

            {/* Location */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-2 text-muted text-sm font-mono mb-5"
            >
              <MapPin size={15} className="text-primary" />
              <span>{t("hero.location")}</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="font-black leading-[0.92] tracking-[-0.04em] mb-6"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6.25rem)" }}
            >
              <span className="block text-[var(--foreground)]">Harshal</span>
              <span className="block text-shimmer">
                <ScrambleText text="Vankudre" />
              </span>
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-xl sm:text-2xl md:text-3xl font-semibold mb-5 h-9 sm:h-10 text-[var(--foreground)]/90"
            >
              <span>{prefersReducedMotion ? roles[currentRole] : displayText}</span>
              <span className="cursor-blink text-primary ml-0.5">|</span>
            </motion.div>

            {/* Tagline */}
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-muted text-base sm:text-lg max-w-xl mb-9 leading-relaxed"
            >
              Building enterprise{" "}
              <span className="text-[var(--foreground)] font-medium">AI chatbots</span>,{" "}
              <span className="text-[var(--foreground)] font-medium">RAG systems</span>, and
              full-stack apps that ship.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-3 sm:gap-4 mb-10"
            >
              <Magnetic>
                <a href="#projects" className="neo-btn neo-btn-primary">
                  {t("hero.viewProjects")}
                  <ArrowRight size={18} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="/cv.pdf"
                  download="Harshal-Vankudre-CV.pdf"
                  className="neo-btn neo-btn-white"
                >
                  <Download size={18} />
                  {t("hero.downloadCV")}
                </a>
              </Magnetic>
            </motion.div>

            {/* Social row */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-3"
            >
              <span className="font-mono text-xs uppercase tracking-widest text-muted-2">
                Find me
              </span>
              <div className="h-px w-8 bg-[var(--border-strong)]" />
              {[
                { href: "https://github.com/HarshalVankudre", icon: Github, label: "GitHub" },
                { href: "https://www.linkedin.com/in/harshal-vankudre/", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:harshalvankudre@gmail.com", icon: Mail, label: "Email" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid place-items-center w-10 h-10 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] text-muted hover:text-[var(--foreground)] hover:border-[var(--border-strong)] hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Identity card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:col-span-5 order-1 lg:order-2 relative"
          >
            {/* Floating accent labels */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200, damping: 18 }}
              className="absolute -top-4 -left-3 sm:-left-5 z-20 glass rounded-xl px-3 py-2 text-xs font-mono text-primary shadow-lg"
            >
              <Sparkles size={13} className="inline -mt-0.5 mr-1.5" />
              AI Developer
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
              className="absolute -bottom-4 -right-3 sm:-right-5 z-20 glass rounded-xl px-3 py-2 text-xs font-mono text-[var(--accent-cyan)] shadow-lg"
            >
              @ RÜKO GmbH
            </motion.div>

            {/* Card */}
            <div className="gradient-ring neo-card overflow-hidden rounded-[22px]">
              {/* Monogram */}
              <div className="relative p-8 sm:p-10 flex items-center justify-center neo-grid-bg overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(124,92,255,0.18),transparent_60%)]" />
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative font-display font-black leading-none gradient-text"
                  style={{ fontSize: "clamp(7rem, 16vw, 11rem)" }}
                >
                  HV
                </motion.div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 border-t border-[var(--border)]">
                {[
                  { value: "2+", label: "Years" },
                  { value: "10+", label: "Projects" },
                  { value: "15+", label: "Tech" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    className={`p-4 text-center ${i < 2 ? "border-r border-[var(--border)]" : ""}`}
                  >
                    <div className="font-display text-2xl sm:text-3xl font-black gradient-text">
                      {s.value}
                    </div>
                    <div className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-muted-2 mt-1">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Currently building */}
              <div className="p-5 border-t border-[var(--border)] bg-[var(--surface-2)]">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-primary mb-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-70" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                  </span>
                  Currently building
                </div>
                <div className="font-medium text-sm text-[var(--foreground)]/90">
                  Rüko GPT — Internal AI for 50+ employees
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-2 hover:text-[var(--foreground)] transition-colors z-10"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={22} />
        </motion.div>
      </motion.a>
    </section>
  );
}
