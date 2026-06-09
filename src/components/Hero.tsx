"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowRight, ArrowUpRight, Download, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*";

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
    }, 600);
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

/* Spec row with dotted leader, as on a machine nameplate */
function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-3 font-mono text-xs">
      <span className="tech-label">{label}</span>
      <span
        aria-hidden
        className="flex-1 border-b border-dotted border-line-strong"
      />
      <span className="text-right text-fg">{value}</span>
    </div>
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
      className="blueprint relative flex min-h-screen items-center overflow-hidden pt-32 pb-24"
    >
      {/* Faint signal aura, top-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 75% 15%, rgba(255,92,0,0.07), transparent 70%)",
        }}
      />

      {/* Corner registration marks */}
      <div aria-hidden className="crosshair absolute top-28 left-6 hidden lg:block" />
      <div aria-hidden className="crosshair absolute top-28 right-6 hidden lg:block" />
      <div aria-hidden className="crosshair absolute bottom-8 left-6 hidden lg:block" />
      <div aria-hidden className="crosshair absolute bottom-8 right-6 hidden lg:block" />

      {/* Vertical coordinates, right edge */}
      <span
        aria-hidden
        className="tech-label absolute right-7 top-1/2 hidden -translate-y-1/2 lg:block"
        style={{ writingMode: "vertical-rl" }}
      >
        49.0069° N — 8.4037° E
      </span>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Document meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="mb-10 hidden items-center justify-between border-b border-line pb-3 sm:flex"
        >
          <span className="tech-label">DOC.REF — HV / PORTFOLIO</span>
          <span className="tech-label">{t("hero.location")}</span>
          <span className="tech-label flex items-center gap-2">
            <span className="led led-ok" aria-hidden />
            STATUS: ACTIVE
          </span>
        </motion.div>

        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* LEFT COLUMN — Identification */}
          <div className="order-2 lg:order-1 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint"
            >
              <span className="text-accent">SYS.00</span>
              <span className="mx-3" aria-hidden>
                —
              </span>
              IDENTIFICATION
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: "easeOut" }}
              className="font-display mt-4 font-bold uppercase leading-[0.88]"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            >
              <span className="block">Harshal</span>
              <span className="block text-accent">
                <ScrambleText text="VANKUDRE" />
              </span>
            </motion.h1>

            {/* Measurement line */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.55, duration: 0.5, ease: "easeOut" }}
              className="mt-6 flex max-w-xl origin-left items-center gap-3"
              aria-hidden
            >
              <span className="h-3 w-px bg-line-strong" />
              <span className="h-px flex-1 bg-line-strong" />
              <span className="tech-label whitespace-nowrap">
                AI ENGINEERING — EST. 2021
              </span>
              <span className="h-px flex-1 bg-line-strong" />
              <span className="h-3 w-px bg-line-strong" />
            </motion.div>

            {/* Typewriter readout */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-6 flex min-h-7 items-center font-mono text-base text-dim sm:text-lg"
            >
              <span className="mr-3 text-faint" aria-hidden>
                $
              </span>
              <span>{prefersReducedMotion ? roles[currentRole] : displayText}</span>
              <span className="cursor-blink ml-1 inline-block h-5 w-2.5 bg-accent" aria-hidden />
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-5 max-w-xl text-base leading-relaxed text-dim sm:text-lg"
            >
              Building enterprise{" "}
              <span className="font-medium text-accent">AI chatbots</span>,{" "}
              <span className="font-medium text-accent">RAG systems</span>, and
              full-stack apps that ship.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <a href="#projects" className="btn btn-solid">
                {t("hero.viewProjects")}
                <ArrowRight size={15} />
              </a>
              <a
                href="/cv.pdf"
                download="Harshal-Vankudre-CV.pdf"
                className="btn btn-ghost"
              >
                <Download size={15} />
                {t("hero.downloadCV")}
              </a>
              <a href="#contact" className="btn btn-ghost">
                {t("hero.contact")}
              </a>
            </motion.div>

            {/* Field-data strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-line border border-line"
            >
              {[
                ["35%", t("hero.fasterResponses")],
                ["60%", t("hero.tierAutomated")],
                ["50+", t("hero.internalUsers")],
              ].map(([value, label]) => (
                <div key={label} className="p-4 sm:p-5">
                  <span aria-hidden className="block h-px w-4 bg-accent" />
                  <div className="font-display mt-2 text-3xl font-bold sm:text-4xl">
                    {value}
                  </div>
                  <div className="tech-label mt-1.5 normal-case tracking-[0.12em]">
                    {label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
              className="mt-8 flex items-center gap-6 font-mono text-xs uppercase tracking-[0.14em]"
            >
              <span className="tech-label">Find me</span>
              <a
                href="https://github.com/HarshalVankudre"
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex items-center gap-1 text-dim"
              >
                GitHub <ArrowUpRight size={12} />
              </a>
              <a
                href="https://www.linkedin.com/in/harshal-vankudre/"
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex items-center gap-1 text-dim"
              >
                LinkedIn <ArrowUpRight size={12} />
              </a>
              <a
                href="mailto:harshalvankudre@gmail.com"
                className="link-draw inline-flex items-center gap-1 text-dim"
              >
                Email <ArrowUpRight size={12} />
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN — ID plate (Typenschild) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <div className="panel relative">
              {/* Four orange registration corners */}
              {[
                "top-[-1px] left-[-1px] border-t border-l",
                "top-[-1px] right-[-1px] border-t border-r",
                "bottom-[-1px] left-[-1px] border-b border-l",
                "bottom-[-1px] right-[-1px] border-b border-r",
              ].map((pos) => (
                <span
                  key={pos}
                  aria-hidden
                  className={`absolute h-4 w-4 border-accent ${pos}`}
                />
              ))}

              {/* Plate header */}
              <div className="flex items-center justify-between border-b border-line px-5 py-3">
                <span className="tech-label">
                  ID-PLATE <span className="text-accent">{"//"}</span> HV-01
                </span>
                <span className="tech-label flex items-center gap-2 text-ok">
                  <span className="led led-ok" aria-hidden />
                  OPERATIONAL
                </span>
              </div>

              {/* Monogram field */}
              <div className="blueprint relative flex min-h-56 items-center justify-center overflow-hidden border-b border-line p-8">
                <span
                  aria-hidden
                  className="outline-text font-display absolute right-4 bottom-2 select-none text-[5rem] font-bold leading-none"
                >
                  01
                </span>
                <div aria-hidden className="crosshair absolute top-3 left-3" />
                <div aria-hidden className="crosshair absolute bottom-3 right-3" />
                <motion.div
                  animate={prefersReducedMotion ? {} : { y: [0, -6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="font-display text-[7rem] font-bold leading-none sm:text-[8.5rem]"
                >
                  HV<span className="text-accent">.</span>
                </motion.div>
              </div>

              {/* Spec rows */}
              <div className="space-y-3.5 px-5 py-5">
                <SpecRow label="ROLE" value={`${t("exp.ruko.role")} @ RÜKO`} />
                <SpecRow label="BASE" value={t("hero.location")} />
                <SpecRow label="EDU" value={t("edu.hka.degree")} />
                <SpecRow label="LANG" value="EN · DE" />
                <SpecRow label="FOCUS" value="RAG / LLM / Full-Stack" />
              </div>

              {/* Current build */}
              <div className="border-t border-line bg-overlay px-5 py-4">
                <div className="tech-label flex items-center gap-2 text-accent">
                  <span className="led led-accent" aria-hidden />
                  Currently building
                </div>
                <div className="mt-1.5 text-sm font-medium text-fg">
                  Rüko GPT — internal AI for 50+ employees
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-accent"
      >
        <span className="tech-label">Scroll</span>
        <span className="relative block h-10 w-px bg-line-strong" aria-hidden>
          <span className="animate-cue-drop absolute -left-[1.5px] top-0 block h-1 w-1 rounded-full bg-accent" />
        </span>
        <ChevronDown size={14} aria-hidden />
      </motion.a>
    </section>
  );
}
