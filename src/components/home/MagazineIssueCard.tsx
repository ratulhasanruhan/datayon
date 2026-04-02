import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { LogoMark } from "@/components/brand/LogoMark";
import { cn } from "@/lib/cn";

type Props = {
  issueLabel: string;
  dateLabel: string;
  excerpt: string;
};

/** Magazine cover — official dot-grid mark + Hind Siliguri wordmark (`Branding/…profile_logo…`). */
export function MagazineIssueCard({ issueLabel, dateLabel, excerpt }: Props) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[min(420px,70vh)] flex-col overflow-hidden rounded-lg border border-border/60 shadow-lg transition hover:shadow-xl",
        "bg-gradient-to-br from-navy via-navy-mid to-navy-deep dark:from-navy-deep dark:via-navy dark:to-navy-mid"
      )}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-1.5 bg-gradient-to-b from-teal via-teal-dark to-teal"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -right-8 top-4 opacity-[0.1] transition group-hover:opacity-[0.14]"
        aria-hidden
      >
        <LogoMark size={200} variant="on-dark" />
      </div>

      <div className="relative flex flex-1 flex-col justify-between pl-5 pr-5 pt-10 sm:pl-7 sm:pr-8 sm:pt-12">
        <div className="flex flex-col items-center text-center">
          <LogoMark size={88} variant="on-dark" className="drop-shadow-sm" />
          <p className="mt-5 font-brand text-xl font-bold tracking-tight text-cream sm:text-2xl">
            {BRAND.name}
          </p>
          <p className="mt-2 font-brand text-[10px] font-medium tracking-[0.28em] text-teal/90">
            {BRAND.tagline}
          </p>
        </div>

        <div className="mt-10 border-t border-cream/15 bg-black/15 px-4 py-5 backdrop-blur-sm sm:px-5">
          <p className="font-sans text-[10px] font-medium tracking-widest text-cream/70">
            {issueLabel}
          </p>
          <p className="mt-1 font-sans text-[11px] text-teal/90">{dateLabel}</p>
          <p className="mt-3 font-body text-sm leading-relaxed text-cream/85">
            {excerpt}
          </p>
          <Link
            href="/magazine"
            className="mt-4 inline-flex items-center gap-1 font-sans text-[11px] font-semibold text-teal transition hover:gap-2 hover:text-cream"
          >
            সংখ্যা বিস্তারিত
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
