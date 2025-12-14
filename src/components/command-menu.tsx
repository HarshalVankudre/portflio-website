"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import {
  ExternalLink,
  FileText,
  Home,
  Mail,
  Search,
  Sparkles,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { getResume } from "@/data/resume";
import { ui, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type CommandItem = {
  label: string;
  icon: React.ReactNode;
  href: string;
  external?: boolean;
};

export function CommandMenu({ locale }: { locale: Locale }) {
  const t = ui[locale];
  const resume = getResume(locale);
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const base = `/${locale}`;
  const navItems: CommandItem[] = [
    { label: t.nav.home, icon: <Home className="h-4 w-4" />, href: base },
    {
      label: t.nav.projects,
      icon: <Sparkles className="h-4 w-4" />,
      href: `${base}/projects`,
    },
    {
      label: t.nav.resume,
      icon: <FileText className="h-4 w-4" />,
      href: `${base}/resume`,
    },
    {
      label: t.nav.contact,
      icon: <Mail className="h-4 w-4" />,
      href: `${base}#contact`,
    },
  ];

  const linkItems: CommandItem[] = [
    {
      label: "GitHub",
      icon: <ExternalLink className="h-4 w-4" />,
      href: resume.links.github,
      external: true,
    },
    {
      label: "LinkedIn",
      icon: <ExternalLink className="h-4 w-4" />,
      href: resume.links.linkedin,
      external: true,
    },
    {
      label: t.hero.downloadCv,
      icon: <ExternalLink className="h-4 w-4" />,
      href: resume.links.cv,
      external: true,
    },
  ];

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const run = React.useCallback(
    (item: CommandItem) => {
      setOpen(false);
      if (item.external) {
        window.open(item.href, "_blank", "noopener,noreferrer");
        return;
      }
      if (item.href.endsWith("#contact")) {
        if (pathname !== base) {
          router.push(base);
          requestAnimationFrame(() => {
            window.location.hash = "#contact";
          });
          return;
        }
        window.location.hash = "#contact";
        return;
      }
      router.push(item.href);
    },
    [base, pathname, router],
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-3 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur hover:text-foreground",
          )}
        >
          <Search className="h-4 w-4" />
          <span className="hidden sm:inline">{t.nav.search}</span>
          <span className="ml-2 hidden rounded-md border border-border px-2 py-0.5 text-xs sm:inline">
            {t.command.ctrlk}
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-background shadow-2xl">
          <Dialog.Title className="sr-only">{t.command.title}</Dialog.Title>
          <Command className="flex flex-col">
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Command.Input
                placeholder={t.command.placeholder}
                className="h-9 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
            </div>
            <Command.List className="max-h-[60vh] overflow-auto p-2">
              <Command.Empty className="px-4 py-10 text-center text-sm text-muted-foreground">
                {t.command.empty}
              </Command.Empty>

              <Command.Group
                heading={t.command.navigation}
                className="px-2 py-2 text-xs text-muted-foreground"
              >
                {navItems.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={item.label}
                    onSelect={() => run(item)}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground/90 outline-none aria-selected:bg-accent aria-selected:text-foreground"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Command.Item>
                ))}
              </Command.Group>

              <Command.Group
                heading={t.command.links}
                className="px-2 py-2 text-xs text-muted-foreground"
              >
                {linkItems.map((item) => (
                  <Command.Item
                    key={item.href}
                    value={item.label}
                    onSelect={() => run(item)}
                    className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm text-foreground/90 outline-none aria-selected:bg-accent aria-selected:text-foreground"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Command.Item>
                ))}
              </Command.Group>
            </Command.List>
            <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> {t.command.footer}
              </span>
              <span>{t.command.closeHint}</span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
