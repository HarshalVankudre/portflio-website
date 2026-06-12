"use client";

import Link from "next/link";
import { type ComponentProps, type MouseEvent } from "react";
import { useTransitionRouter } from "@/components/providers/TransitionProvider";

type Props = ComponentProps<typeof Link> & {
  href: string;
  /** Shown in the curtain's center during the wipe (e.g. the case title). */
  transitionLabel?: string;
};

/**
 * Drop-in next/link replacement that routes through the curtain
 * transition. External links, modified clicks and new-tab targets
 * fall through to default browser behavior.
 */
export default function TransitionLink({
  href,
  onClick,
  transitionLabel,
  ...rest
}: Props) {
  const { navigate } = useTransitionRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
      return;
    if (rest.target === "_blank") return;
    if (/^(https?:)?\/\//.test(href) || href.startsWith("mailto:")) return;

    e.preventDefault();
    navigate(href, { label: transitionLabel });
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
