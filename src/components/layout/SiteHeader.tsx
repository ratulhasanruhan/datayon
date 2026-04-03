"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/cn";
import { LogoLockup } from "@/components/brand/LogoLockup";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const nav = [
  { href: "/", label: "প্রচ্ছদ" },
  { href: "/magazine", label: "মাসিক" },
  { href: "/articles", label: "প্রবন্ধ" },
  { href: "/about", label: "সম্পর্কে" },
];

function useActive(href: string, pathname: string) {
  return href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);
}

function DesktopNavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = useActive(href, pathname);

  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-3 py-2 font-sans text-[11px] font-medium transition-colors lg:text-[12px]",
        active
          ? "bg-navy/12 text-ink shadow-[inset_0_-2px_0_0_var(--color-teal)] dark:bg-cream/10 dark:text-cream"
          : "text-muted hover:bg-art/80 hover:text-ink dark:hover:bg-navy-mid/60 dark:hover:text-cream"
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const active = useActive(href, pathname);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2.5 font-sans text-sm transition-colors",
        active
          ? "bg-navy/10 font-medium text-ink dark:bg-cream/10 dark:text-cream"
          : "text-muted hover:bg-art/50 hover:text-ink dark:hover:bg-navy-mid/50"
      )}
    >
      {children}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-paper/90 shadow-[0_1px_0_rgba(13,27,42,0.04)] backdrop-blur-md dark:shadow-[0_1px_0_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex h-[56px] max-w-[1200px] items-center justify-between gap-2 px-4 sm:h-[60px] sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2 sm:gap-2.5"
          onClick={() => setOpen(false)}
        >
          <LogoLockup size="sm" showLatin />
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ThemeToggle className="hidden sm:inline-flex" />
          <nav
            className="hidden items-center gap-0.5 md:flex lg:gap-1"
            aria-label="প্রধান মেনু"
          >
            {nav.map((item) => (
              <DesktopNavLink key={item.href} href={item.href}>
                {item.label}
              </DesktopNavLink>
            ))}
            <Link
              href="/articles"
              className="ml-1 rounded-full bg-navy px-3.5 py-2 font-sans text-[10px] font-semibold text-cream shadow-sm transition hover:bg-navy2 dark:bg-teal dark:text-navy dark:hover:bg-teal-dark lg:text-[11px]"
            >
              সাবস্ক্রাইব
            </Link>
          </nav>

          <ThemeToggle className="sm:hidden" />

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full p-2 text-ink transition hover:bg-art/70 dark:hover:bg-navy-mid/60 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-border bg-paper/98 backdrop-blur-md md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-0.5 px-3 py-2" aria-label="মোবাইল মেনু">
          {nav.map((item) => (
            <MobileNavLink
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </MobileNavLink>
          ))}
          <Link
            href="/articles"
            className="mx-0 mt-2 rounded-full bg-navy py-3 text-center font-sans text-sm font-semibold text-cream"
            onClick={() => setOpen(false)}
          >
            সাবস্ক্রাইব
          </Link>
        </nav>
      </div>
    </header>
  );
}
