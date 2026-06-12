"use client";

import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { useLanguage } from "@/context/LanguageContext";
import TransitionLink from "@/components/ui/TransitionLink";
import Magnetic from "@/components/ui/Magnetic";

/* timeZoneName comes from the formatter so the label flips CET/CEST
   with daylight saving instead of being hardcoded. */
const timeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Berlin",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZoneName: "short",
});

function formatBerlinTime(): { time: string; zone: string } {
  const parts = timeFormatter.formatToParts(new Date());
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? "";
  return {
    time: `${get("hour")}:${get("minute")}:${get("second")}`,
    zone: get("timeZoneName") || "CET",
  };
}

const CONNECT = [
  { label: "GitHub", href: "https://github.com/HarshalVankudre", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/harshal-vankudre/",
    external: true,
  },
  { label: "Email", href: "mailto:harshalvankudre@gmail.com", external: false },
];

export default function Footer() {
  const { t } = useLanguage();
  const lenis = useLenis();
  const [clock, setClock] = useState<{ time: string; zone: string } | null>(
    null
  );
  const year = new Date().getFullYear();

  useEffect(() => {
    const tick = () => setClock(formatBerlinTime());
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
      <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
        <div className="col-span-2 md:col-span-1">
          <p className="font-display text-2xl text-fg">
            HV<span className="text-accent">.</span>
          </p>
          <p className="label-mono mt-3">© {year} Harshal Vankudre</p>
        </div>

        <nav aria-label="Footer">
          <h3 className="label-mono mb-4">{t("footer.menu")}</h3>
          <ul className="space-y-1">
            {(
              [
                { href: "/#work", key: "nav.work" },
                { href: "/about", key: "nav.about" },
                { href: "/now", key: "nav.now" },
                { href: "/#contact", key: "nav.contact" },
              ] as const
            ).map((item) => (
              <li key={item.href}>
                <TransitionLink
                  href={item.href}
                  transitionLabel={t(item.key)}
                  className="group inline-flex min-h-9 items-center"
                >
                  <span className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim">
                    {t(item.key)}
                  </span>
                </TransitionLink>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="label-mono mb-4">{t("footer.connect")}</h3>
          <ul className="space-y-1">
            {CONNECT.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group inline-flex min-h-9 items-center gap-1"
                >
                  <span className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim">
                    {item.label}
                  </span>
                  {item.external && (
                    <span aria-hidden className="text-faint">
                      ↗
                    </span>
                  )}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/cv.pdf"
                download
                className="group inline-flex min-h-9 items-center"
              >
                <span className="link-draw font-mono text-xs uppercase tracking-[0.18em] text-dim">
                  {t("contact.downloadCv")}
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="label-mono mb-4">{t("footer.localTime")}</h3>
          <p
            className="font-mono text-sm text-dim tabular-nums"
            suppressHydrationWarning
          >
            {clock ? `${clock.time} ${clock.zone}` : "--:--:--"}
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
