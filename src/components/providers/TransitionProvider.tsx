"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";

interface TransitionContextValue {
  /** Navigate with the curtain wipe. Accepts paths and path#hash. */
  navigate: (href: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export const useTransitionRouter = () => useContext(TransitionContext);

/**
 * Cinematic page transitions for the App Router: a full-screen curtain
 * scales up from the bottom, the route swaps underneath, scroll resets,
 * ScrollTrigger re-measures, and the curtain peels away upward.
 */
export default function TransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const curtainRef = useRef<HTMLDivElement>(null);
  const pendingHash = useRef<string | null>(null);
  const inTransit = useRef(false);

  const scrollToHash = useCallback(
    (hash: string, immediate = false) => {
      const el = document.querySelector(hash);
      if (!el) return;
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -80, immediate });
      } else {
        el.scrollIntoView();
      }
    },
    [lenis]
  );

  const navigate = useCallback(
    (href: string) => {
      const [path, hash] = href.split("#");
      const targetPath = path || "/";

      // Same page: just glide to the anchor (or top).
      if (targetPath === pathname) {
        if (hash) scrollToHash(`#${hash}`);
        else if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0 });
        return;
      }

      pendingHash.current = hash ? `#${hash}` : null;

      const curtain = curtainRef.current;
      if (prefersReducedMotion() || !curtain) {
        router.push(href);
        return;
      }

      inTransit.current = true;
      lenis?.stop();
      gsap.killTweensOf(curtain);
      gsap.set(curtain, { display: "block", scaleY: 0, transformOrigin: "50% 100%" });
      gsap.to(curtain, {
        scaleY: 1,
        duration: 0.5,
        ease: "power3.inOut",
        onComplete: () => router.push(targetPath + (hash ? `#${hash}` : "")),
      });
    },
    [pathname, router, lenis, scrollToHash]
  );

  // Runs after the new route has rendered.
  useEffect(() => {
    const hash = pendingHash.current;
    pendingHash.current = null;

    if (!inTransit.current) {
      // Initial load or browser back/forward — just re-measure.
      requestAnimationFrame(() => ScrollTrigger.refresh());
      return;
    }
    inTransit.current = false;

    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      if (hash) scrollToHash(hash, true);

      const curtain = curtainRef.current;
      if (!curtain) return;
      gsap.set(curtain, { transformOrigin: "50% 0%" });
      gsap.to(curtain, {
        scaleY: 0,
        duration: 0.6,
        ease: "power3.inOut",
        delay: 0.1,
        onComplete: () => {
          gsap.set(curtain, { display: "none" });
          lenis?.start();
        },
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div
        ref={curtainRef}
        aria-hidden
        className="fixed inset-0 z-[100] hidden bg-bg"
        style={{ transform: "scaleY(0)" }}
      >
        <div className="absolute inset-x-0 top-0 h-px bg-accent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-accent" />
        <span className="label-mono absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-faint">
          HV — PORTFOLIO
        </span>
      </div>
    </TransitionContext.Provider>
  );
}
