"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import VelocityLean from "@/components/effects/VelocityLean";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";
import { hasFinePointer, prefersReducedMotion } from "@/lib/motion";
import { setGlow } from "@/lib/glow";
import { PRELOADER_DONE_EVENT, PRELOADER_STORAGE_KEY } from "@/lib/preloader";

/**
 * Kill-switch for the per-char weight bloom — it animates font weight,
 * which reflows the h1 while hovered. Flip to false to fall back to
 * glow + velocity skew only if profiling ever shows jank.
 */
const HERO_CHAR_INTERACTION = true;

/** Pointer falloff radius (px) and variable-weight range for the bloom. */
const CHAR_RADIUS = 200;
const WEIGHT_MIN = 420;
const WEIGHT_MAX = 640;

/**
 * Full-viewport opening statement: the name in huge Fraunces lines
 * revealed from behind masks, drifting upward at a slower rate than
 * the scroll (parallax) while fading toward the work list.
 *
 * After the entrance settles (fine pointers only), the name turns
 * tactile: characters bloom in weight around the cursor and the
 * shader's volt pool swells behind the headline.
 */
export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const h1Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    (_, contextSafe) => {
      if (prefersReducedMotion() || !sectionRef.current) return;

      // --- Interactive name — armed once, after the entrance finishes ---
      let armed = false;
      let cleanupName: (() => void) | undefined;

      const armName = contextSafe!(() => {
        const h1 = h1Ref.current;
        if (armed || !h1 || !hasFinePointer()) return;
        armed = true;

        // The reveal masks have done their job — release the clipping so
        // the per-char lift can rise above the line box.
        gsap.set(".mask", { overflow: "visible" });

        const onEnterGlow = () => setGlow(1);
        const onLeaveGlow = () => setGlow(0);
        h1.addEventListener("pointerenter", onEnterGlow);
        h1.addEventListener("pointerleave", onLeaveGlow);

        if (!HERO_CHAR_INTERACTION) {
          cleanupName = () => {
            h1.removeEventListener("pointerenter", onEnterGlow);
            h1.removeEventListener("pointerleave", onLeaveGlow);
            setGlow(0);
          };
          return;
        }

        const split = SplitText.create("[data-hero-line]", { type: "chars" });
        const chars = split.chars as HTMLElement[];
        const centers = chars.map(() => ({ x: 0, y: 0 }));
        const weights = chars.map(() => WEIGHT_MIN);
        const setW = chars.map((c) => gsap.quickSetter(c, "fontWeight"));
        const setY = chars.map((c) => gsap.quickSetter(c, "y", "px"));

        let px = 0;
        let py = 0;

        // Viewport coords are only valid for the scroll position they were
        // measured at — re-measured on every hover start, so no stale cache.
        const measure = () => {
          chars.forEach((c, i) => {
            const r = c.getBoundingClientRect();
            centers[i].x = r.left + r.width / 2;
            centers[i].y = r.top + r.height / 2;
          });
        };

        // One batched write pass per frame; pointermove only stores coords.
        const tick = () => {
          for (let i = 0; i < chars.length; i++) {
            const d = Math.hypot(px - centers[i].x, py - centers[i].y);
            const f = Math.max(0, 1 - d / CHAR_RADIUS);
            const bloom = f * f;
            const target = WEIGHT_MIN + bloom * (WEIGHT_MAX - WEIGHT_MIN);
            weights[i] += (target - weights[i]) * 0.22;
            setW[i](Math.round(weights[i]));
            setY[i](-bloom * 6);
          }
        };

        const onEnter = (e: PointerEvent) => {
          // A relax tween may still be running from the last hover — the
          // ticker takes over from wherever the chars currently sit.
          gsap.killTweensOf(chars);
          chars.forEach((c, i) => {
            weights[i] = parseFloat(c.style.fontWeight) || WEIGHT_MIN;
          });
          px = e.clientX;
          py = e.clientY;
          measure();
          gsap.ticker.add(tick);
        };
        const onMove = (e: PointerEvent) => {
          px = e.clientX;
          py = e.clientY;
        };
        const onLeave = contextSafe!(() => {
          gsap.ticker.remove(tick);
          weights.fill(WEIGHT_MIN);
          gsap.to(chars, {
            fontWeight: WEIGHT_MIN,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true,
          });
        });

        h1.addEventListener("pointerenter", onEnter);
        h1.addEventListener("pointermove", onMove, { passive: true });
        h1.addEventListener("pointerleave", onLeave);

        cleanupName = () => {
          gsap.ticker.remove(tick);
          h1.removeEventListener("pointerenter", onEnter);
          h1.removeEventListener("pointermove", onMove);
          h1.removeEventListener("pointerleave", onLeave);
          h1.removeEventListener("pointerenter", onEnterGlow);
          h1.removeEventListener("pointerleave", onLeaveGlow);
          setGlow(0);
          split.revert();
        };
      });

      const enter = contextSafe!((delay: number) => {
        gsap.to("[data-hero-line]", {
          yPercent: 0,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.12,
          delay,
          onComplete: armName,
        });
        gsap.to("[data-hero-meta]", {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          delay: delay + 0.55,
        });
      });

      // First visit: pre-hide while the preloader covers the page, then
      // start when its wipe actually finishes (event-driven, with a
      // failsafe). Refresh: start almost at once.
      let firstVisit = true;
      try {
        firstVisit = !sessionStorage.getItem(PRELOADER_STORAGE_KEY);
      } catch {
        // Storage blocked — assume first visit; the event/failsafe covers it.
      }
      gsap.set("[data-hero-line]", { yPercent: 115 });
      gsap.set("[data-hero-meta]", { autoAlpha: 0, y: 24 });
      let failsafe: ReturnType<typeof setTimeout> | undefined;
      const onPreloaderDone = () => {
        if (failsafe) clearTimeout(failsafe);
        enter(0.05);
      };
      if (firstVisit) {
        window.addEventListener(PRELOADER_DONE_EVENT, onPreloaderDone, {
          once: true,
        });
        failsafe = setTimeout(() => {
          window.removeEventListener(PRELOADER_DONE_EVENT, onPreloaderDone);
          enter(0);
        }, 6000);
      } else {
        enter(0.25);
      }

      // Parallax out
      gsap.to("[data-hero-parallax]", {
        yPercent: -14,
        autoAlpha: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        if (failsafe) clearTimeout(failsafe);
        window.removeEventListener(PRELOADER_DONE_EVENT, onPreloaderDone);
        cleanupName?.();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-[100svh] flex-col justify-between px-gutter pb-12 pt-32 sm:pt-40"
    >
      <div data-hero-parallax>
        <p data-hero-meta className="label-mono mb-6 sm:mb-10">
          {t("home.role")} — RÜKO GmbH · {t("hero.location")}
        </p>

        <VelocityLean strength={1.2}>
          <h1 ref={h1Ref} className="font-display text-fg">
            <span className="mask">
              <span data-hero-line className="block text-display-xl tracking-tight">
                Harshal
              </span>
            </span>
            <span className="mask">
              <span
                data-hero-line
                className="block text-display-xl italic tracking-tight text-fg sm:ml-[10vw]"
              >
                Vankudre<span className="not-italic text-accent">.</span>
              </span>
            </span>
          </h1>
        </VelocityLean>
      </div>

      <div
        data-hero-parallax
        className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"
      >
        <p
          data-hero-meta
          className="max-w-md text-base leading-relaxed text-dim sm:text-lg"
        >
          {t("home.tagline")}
        </p>

        <div data-hero-meta className="flex items-center gap-10">
          <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-dim">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {t("home.status")}
          </span>

          <span
            className="hidden items-center gap-3 sm:inline-flex"
            aria-hidden
          >
            <span className="label-mono">{t("home.scroll")}</span>
            <span className="relative h-12 w-px overflow-hidden bg-line-strong">
              <span className="animate-cue-drop absolute left-0 top-0 h-4 w-px bg-accent" />
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
