"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import TransitionLink from "@/components/ui/TransitionLink";
import Magnetic from "@/components/ui/Magnetic";
import { gsap, useGSAP } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

export default function Navbar() {
  const { t, language, setLanguage } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "/#work", label: t("nav.work") },
    { href: "/about", label: t("nav.about") },
    { href: "/now", label: t("nav.now") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock scroll while the overlay menu is open
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      if (!menuOpen || !overlayRef.current || prefersReducedMotion()) return;
      gsap.from("[data-menu-link]", {
        yPercent: 120,
        duration: 0.7,
        ease: "power4.out",
        stagger: 0.07,
        delay: 0.1,
      });
      gsap.from("[data-menu-meta]", {
        autoAlpha: 0,
        y: 12,
        duration: 0.5,
        delay: 0.45,
      });
    },
    { scope: overlayRef, dependencies: [menuOpen] }
  );

  const langToggle = (
    <div className="flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em]">
      <button
        onClick={() => setLanguage("en")}
        aria-pressed={language === "en"}
        className={
          language === "en"
            ? "text-accent"
            : "text-faint transition-colors hover:text-dim"
        }
      >
        EN
      </button>
      <span className="text-faint" aria-hidden>
        /
      </span>
      <button
        onClick={() => setLanguage("de")}
        aria-pressed={language === "de"}
        className={
          language === "de"
            ? "text-accent"
            : "text-faint transition-colors hover:text-dim"
        }
      >
        DE
      </button>
    </div>
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled && !menuOpen
            ? "border-b border-line bg-bg/70 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <nav
          className="flex h-16 items-center justify-between px-gutter sm:h-20"
          aria-label="Main"
        >
          <TransitionLink
            href="/"
            className="font-display text-xl text-fg"
            aria-label="Harshal Vankudre — home"
          >
            HV<span className="text-accent">.</span>
          </TransitionLink>

          {/* Desktop */}
          <div className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-7">
              {links.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
                  >
                    {link.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
            {langToggle}
            <Magnetic strength={0.25}>
              <TransitionLink
                href="/#contact"
                className="inline-flex h-10 items-center rounded-full bg-accent px-5 font-mono text-xs font-medium uppercase tracking-[0.18em] text-accent-ink transition-transform hover:scale-[1.03]"
              >
                {t("nav.letsTalk")}
              </TransitionLink>
            </Magnetic>
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-6 bg-fg transition-transform duration-300 ${
                menuOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-fg transition-transform duration-300 ${
                menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay menu */}
      {menuOpen && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[75] flex flex-col justify-between bg-bg/95 px-gutter pb-10 pt-28 backdrop-blur-lg md:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="space-y-2">
              {[...links, { href: "/#contact", label: t("nav.contact") }].map(
                (link, i) => (
                  <li key={link.href} className="mask">
                    <TransitionLink
                      data-menu-link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="block font-display text-display-md text-fg transition-colors hover:text-accent"
                    >
                      <span className="mr-4 align-super font-mono text-xs tracking-[0.18em] text-faint">
                        0{i + 1}
                      </span>
                      {link.label}
                    </TransitionLink>
                  </li>
                )
              )}
            </ul>
          </nav>
          <div data-menu-meta className="flex items-center justify-between">
            {langToggle}
            <span className="label-mono">Karlsruhe, DE</span>
          </div>
        </div>
      )}
    </>
  );
}
