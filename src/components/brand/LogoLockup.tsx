"use client";

import { useTheme } from "next-themes";
import { startTransition, useEffect, useState } from "react";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/brand/LogoMark";

type Props = {
  className?: string;
  /** Header: follows theme. Footer on navy: use `inverse`. */
  tone?: "default" | "inverse";
  size?: "sm" | "md" | "lg";
  /**
   * Optional Latin line — not part of the Facebook PNG lockup; default off.
   */
  showLatin?: boolean;
  /** Secondary line — tagline in Hind Siliguri (brand profile style). */
  showTagline?: boolean;
};

/**
 * Lockup: **dot-grid mark** + Bengali wordmark in **Hind Siliguri**
 * (`Branding/datayon_facebook_profile_logo_transparent.html`).
 */
export function LogoLockup({
  className,
  tone = "default",
  size = "md",
  showLatin = false,
  showTagline = false,
}: Props) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  const markVariant =
    tone === "inverse"
      ? "on-dark"
      : mounted && resolvedTheme === "dark"
        ? "on-dark"
        : "on-light";

  const markSize = size === "sm" ? 34 : size === "lg" ? 46 : 40;
  const titleClass =
    size === "sm"
      ? "text-[16px] sm:text-[17px]"
      : size === "lg"
        ? "text-xl sm:text-2xl"
        : "text-[17px] sm:text-[18px]";

  return (
    <div
      className={cn(
        "flex min-w-0 items-center gap-2.5 sm:gap-3",
        tone === "inverse" && "text-cream",
        className
      )}
    >
      <LogoMark size={markSize} variant={markVariant} />
      <div className="min-w-0 leading-tight">
        <span
          className={cn(
            "font-brand font-bold tracking-tight",
            titleClass,
            tone === "inverse" ? "text-cream" : "text-ink"
          )}
        >
          {BRAND.name}
        </span>
        {showLatin ? (
          <span
            className={cn(
              "mt-0.5 block font-sans text-[9px] font-semibold tracking-[0.35em] sm:text-[10px]",
              tone === "inverse" ? "text-cream/55" : "text-muted"
            )}
          >
            {BRAND.nameLatin}
          </span>
        ) : null}
        {showTagline ? (
          <span
            className={cn(
              "mt-1 block font-brand text-[11px] font-medium leading-snug sm:text-xs",
              tone === "inverse" ? "text-cream/75" : "text-muted"
            )}
          >
            {BRAND.tagline}
          </span>
        ) : null}
      </div>
    </div>
  );
}
