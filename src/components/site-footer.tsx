import Link from "next/link";

import { getResume } from "@/data/resume";
import { ui, type Locale } from "@/lib/i18n";

export function SiteFooter({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const resume = getResume(locale);
  const base = `/${locale}`;

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {resume.name}.{" "}
          {locale === "de" ? "Erstellt mit Next.js." : "Built with Next.js."}
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link
            href={`${base}/projects`}
            className="text-muted-foreground hover:text-foreground"
          >
            {t.nav.projects}
          </Link>
          <Link
            href={`${base}/resume`}
            className="text-muted-foreground hover:text-foreground"
          >
            {t.nav.resume}
          </Link>
          <a
            href={resume.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={resume.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
