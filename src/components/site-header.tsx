"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as Popover from "@radix-ui/react-popover";
import { Languages, Menu, Download } from "lucide-react";

import { CommandMenu } from "@/components/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { getResume } from "@/data/resume";
import { ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        active && "text-foreground",
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const resume = getResume(locale);
  const base = `/${locale}`;
  const links: Array<{ href: string; label: string }> = [
    { href: base, label: t.nav.home },
    { href: `${base}/projects`, label: t.nav.projects },
    { href: `${base}/resume`, label: t.nav.resume },
  ];

  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const activePath = pathname === "/" ? base : pathname;
  const nextLocale: Locale = locale === "en" ? "de" : "en";

  function switchLocale() {
    const current = `/${locale}`;
    const rest = activePath.startsWith(current)
      ? activePath.slice(current.length)
      : activePath;
    const target = `/${nextLocale}${rest || ""}`;
    const suffix = `${window.location.search}${window.location.hash}`;
    router.push(`${target}${suffix}`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <Link href={base} className="inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-gradient-to-br from-primary/10 via-fuchsia-500/10 to-cyan-400/10 text-sm font-semibold">
            HV
          </span>
          <div className="hidden leading-tight sm:block">
            <div className="text-sm font-semibold">{resume.name}</div>
            <div className="text-xs text-muted-foreground">Portfolio</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              active={activePath === l.href}
            />
          ))}
          <NavLink href={`${base}#contact`} label={t.nav.contact} active={false} />
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="outline"
            className="hidden sm:inline-flex"
          >
            <a href={resume.links.cv} target="_blank" rel="noreferrer">
              <Download className="h-4 w-4" />
              {t.nav.downloadCv}
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
            onClick={switchLocale}
          >
            <Languages className="h-4 w-4" />
            {locale.toUpperCase()}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="sm:hidden"
            aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
            onClick={switchLocale}
          >
            <Languages className="h-4 w-4" />
          </Button>
          <CommandMenu locale={locale} />
          <ThemeToggle />

          <Popover.Root open={mobileOpen} onOpenChange={setMobileOpen}>
            <Popover.Trigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </Popover.Trigger>
            <Popover.Portal>
              <Popover.Content
                align="end"
                sideOffset={10}
                className="z-50 w-56 rounded-2xl border border-border bg-background p-2 shadow-xl"
              >
                <div className="flex flex-col">
                  {links.map((l) => (
                    <NavLink
                      key={l.href}
                      href={l.href}
                      label={l.label}
                      active={activePath === l.href}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}
                  <NavLink
                    href={`${base}#contact`}
                    label={t.nav.contact}
                    active={false}
                    onClick={() => setMobileOpen(false)}
                  />
                  <div className="my-2 border-t border-border" />
                  <a
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    href={resume.links.cv}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t.hero.downloadCv}
                  </a>
                </div>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>
      </div>
    </header>
  );
}
