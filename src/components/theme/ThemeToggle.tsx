"use client";

import { startTransition, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => setMounted(true));
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border bg-surface text-ink transition-colors hover:bg-art/80 dark:hover:bg-navy-mid/80",
        className
      )}
      aria-label={isDark ? "আলো মোড" : "গাঢ় মোড"}
    >
      {!mounted ? (
        <span className="h-4 w-4" aria-hidden />
      ) : isDark ? (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 3a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0V4a1 1 0 0 0-1-1zm0 15a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm7-8a1 1 0 0 0-1-1h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zM7 11a1 1 0 0 0-1 1H5a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1zm11.707-5.707a1 1 0 0 0-1.414 0l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414zM8.414 16.414a1 1 0 0 0-1.414 0l-.707.707a1 1 0 1 0 1.414 1.414l.707-.707a1 1 0 0 0 0-1.414zM16.414 8.414a1 1 0 0 0 0-1.414l-.707-.707a1 1 0 1 0-1.414 1.414l.707.707a1 1 0 0 0 1.414 0zM8.414 7.586a1 1 0 0 0 1.414 0l.707-.707a1 1 0 1 0-1.414-1.414l-.707.707a1 1 0 0 0 0 1.414zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" />
        </svg>
      ) : (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M21.752 15.002A9.718 9.718 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998z" />
        </svg>
      )}
    </button>
  );
}
