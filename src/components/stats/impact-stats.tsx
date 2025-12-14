"use client";

import * as React from "react";
import { animate, useInView } from "framer-motion";
import { Sparkles, Timer, Zap } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function CountUp({
  value,
  suffix,
  className,
}: {
  value: number;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        setDisplay(latest);
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className={cn(className)}>
      {Math.round(display)}
      {suffix ?? ""}
    </span>
  );
}

const ICONS = [Zap, Sparkles, Timer] as const;

export function ImpactStats({
  items,
  eyebrow = "Impact",
  className,
}: {
  items: ReadonlyArray<{
    value: number;
    suffix?: string;
    label: string;
    description: string;
  }>;
  eyebrow?: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-3", className)}>
      {items.map((stat, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <div
            key={stat.label}
            className="rounded-2xl bg-gradient-to-br from-primary/15 via-fuchsia-500/10 to-cyan-400/10 p-[1px]"
          >
            <Card className="h-full rounded-2xl border-0 bg-card/70">
              <CardHeader className="flex flex-row items-start justify-between gap-4 py-5">
                <div className="space-y-1">
                  <div className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                    {eyebrow}
                  </div>
                  <div className="text-sm font-semibold">{stat.label}</div>
                </div>
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-background/60">
                  <Icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-4xl font-semibold tracking-tight">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
