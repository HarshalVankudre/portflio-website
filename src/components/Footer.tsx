"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";
import TransitionLink from "@/components/ui/TransitionLink";
import Magnetic from "@/components/ui/Magnetic";

const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Berlin",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

export default function Footer() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const [time, setTime] = useState<string | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const tick = () => setTime(timeFormatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const backToTop = () => {
    if (lenis) lenis.scrollTo(0);
    else window.scrollTo({ top: 0 });
  };

  return (
    <footer className="relative border-t border-line px-gutter py-12">
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-2xl text-fg">
            HV<span className="text-accent">.</span>
          </p>
          <p className="label-mono mt-3">© {year} Harshal Vankudre</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="label-mono mb-4">{t("footer.menu")}</h3>
          <ul className="space-y-2.5">
            <li>
              <TransitionLink
                href="/#work"
                className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
              >
                {t("nav.work")}
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/about"
                className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
              >
                {t("nav.about")}
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/now"
                className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
              >
                {t("nav.now")}
              </TransitionLink>
            </li>
            <li>
              <TransitionLink
                href="/#contact"
                className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim"
              >
                {t("nav.contact")}
              </TransitionLink>
            </li>
          </ul>
        </nav>

        <div>
          <h3 className="label-mono mb-4">{t("footer.localTime")}</h3>
          <p
            className="font-mono text-sm text-dim tabular-nums"
            suppressHydrationWarning
          >
            {time ?? "--:--:--"} CET
          </p>
          <p className="label-mono mt-2">Karlsruhe, DE</p>
        </div>

        <div className="flex items-start md:justify-end">
          <Magnetic strength={0.3}>
            <button
              onClick={backToTop}
              className="flex h-16 w-16 items-center justify-center rounded-full border border-line-strong font-mono text-base text-dim transition-colors hover:border-accent hover:text-accent"
              aria-label={t("footer.backToTop")}
            >
              ↑
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
