"use client";

import * as React from "react";
import { Copy, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const ICONS = {
  mail: Mail,
  phone: Phone,
} as const;

export function CopyableLink({
  icon,
  href,
  value,
  copyValue,
  label,
}: {
  icon: keyof typeof ICONS;
  href: string;
  value: string;
  copyValue?: string;
  label: string;
}) {
  const Icon = ICONS[icon];

  async function onCopy() {
    const text = copyValue ?? value;
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied.`);
    } catch {
      toast.message("Copy failed. Please copy manually.");
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background/60 px-3 py-2">
      <a
        className="flex min-w-0 flex-1 items-center gap-3 text-sm text-foreground/90 hover:text-foreground"
        href={href}
      >
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="truncate">{value}</span>
      </a>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-label={`Copy ${label}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void onCopy();
        }}
      >
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
}
