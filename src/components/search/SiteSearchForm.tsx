"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  defaultQuery?: string;
  className?: string;
  id?: string;
};

/** Unified search: `/search?q=…` — আর্টিকেল + মাসিক সংখ্যা */
export function SiteSearchForm({
  defaultQuery = "",
  className,
  id = "site-search",
}: Props) {
  const router = useRouter();
  const [value, setValue] = useState(defaultQuery);

  useEffect(() => {
    setValue(defaultQuery);
  }, [defaultQuery]);

  const submit = useCallback(
    (e?: FormEvent) => {
      e?.preventDefault();
      const t = value.trim();
      const params = new URLSearchParams();
      if (typeof window !== "undefined") {
        const current = new URLSearchParams(window.location.search);
        const cat = current.get("category");
        if (cat) params.set("category", cat);
      }
      if (t) {
        params.set("q", t);
      }
      const qs = params.toString();
      router.push(qs ? `/search?${qs}` : "/search");
    },
    [value, router]
  );

  return (
    <form
      role="search"
      aria-label="ম্যাগাজিন ও আর্টিকেল খোঁজা"
      className={cn("w-full", className)}
      onSubmit={submit}
    >
      <div className="flex w-full flex-row items-stretch gap-0">
        <label htmlFor={id} className="sr-only">
          মাসিক সংখ্যা বা আর্টিকেল — শিরোনাম ও বিবরণ দিয়ে খুঁজুন
        </label>
        <input
          id={id}
          name="q"
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="মাসিক সংখ্যা ও আর্টিকেল খুঁজুন…"
          autoComplete="off"
          className={cn(
            "min-h-[48px] w-full min-w-0 flex-1 rounded-l-xl rounded-r-none border border-r-0 border-border/80 bg-surface-elevated/95 px-3 py-2.5 font-body text-[15px] text-ink shadow-sm ring-1 ring-border/30 sm:px-4 sm:py-3",
            "placeholder:text-muted/80",
            "focus:z-[1] focus:border-teal/50 focus:outline-none focus:ring-2 focus:ring-teal/25",
            "dark:border-navy2/90 dark:bg-navy-mid/40 dark:ring-navy2/50"
          )}
        />
        <button
          type="submit"
          className={cn(
            "inline-flex min-h-[48px] min-w-[5.5rem] shrink-0 items-center justify-center rounded-l-none rounded-r-xl border border-teal/30 bg-teal/10 px-3 font-sans text-sm font-semibold text-teal transition sm:min-w-[7.5rem] sm:px-5",
            "hover:bg-teal/15 focus:z-[1] focus:outline-none focus:ring-2 focus:ring-teal/30",
            "dark:border-teal/25 dark:bg-teal/15 dark:hover:bg-teal/20"
          )}
        >
          খুঁজুন
        </button>
      </div>
    </form>
  );
}
