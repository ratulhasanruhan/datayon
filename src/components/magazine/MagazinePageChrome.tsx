import { LogoMark } from "@/components/brand/LogoMark";
import { BRAND } from "@/lib/brand";
import { magazinePageLabel } from "@/components/magazine/magazine-page-utils";
import { APRIL_2026_META } from "@/components/magazine/data/april-2026";

type Props = {
  page: number;
  /** ফুটারে বাম দিকে — বিভাগ বা শিরোনাম সংক্ষেপে */
  runningTitle: string;
  flip?: boolean;
};

/**
 * প্রতিটি পাতায় ব্র্যান্ডিং: ডট-গ্রিড মার্ক + বাংলা ওয়ার্ডমার্ক (LogoLockup স্টাইল), পাতা নম্বর।
 */
export function MagazinePageChrome({ page, runningTitle, flip = false }: Props) {
  const pad = flip ? "px-1 py-1" : "px-0 py-2 sm:py-2.5";
  const markSize = flip ? 22 : 28;
  const titleClass = flip
    ? "text-[13px] leading-tight"
    : "text-[15px] leading-tight sm:text-base";

  return (
    <div className={`shrink-0 border-border/50 ${pad}`}>
      <div className="flex items-start justify-between gap-2 border-b border-teal/25 pb-2">
        <span className="flex min-w-0 items-start gap-2">
          <LogoMark size={markSize} variant="on-light" className="mt-0.5 shrink-0 opacity-95" />
          <span className="min-w-0 leading-tight">
            <span
              className={`font-brand font-bold tracking-tight text-ink dark:text-cream ${titleClass}`}
            >
              {BRAND.name}
            </span>
            <span
              className={`mt-0.5 block font-sans font-medium normal-case tracking-normal text-muted ${flip ? "text-[8px]" : "text-[9px] sm:text-[10px]"}`}
            >
              {APRIL_2026_META.issueLabel} · {APRIL_2026_META.monthLabel}
            </span>
          </span>
        </span>
        <span className="shrink-0 pt-0.5 font-mono text-[9px] tabular-nums text-ink/75 sm:text-[10px]">
          {magazinePageLabel(page)}
        </span>
      </div>
      <p
        className={`mt-1.5 truncate ${flip ? "text-[9px]" : "text-[10px] sm:text-xs"} font-sans text-muted`}
        title={runningTitle}
      >
        {runningTitle}
      </p>
    </div>
  );
}

export function MagazinePageChromeFooter({
  page,
  flip = false,
}: Pick<Props, "page" | "flip">) {
  const small = flip ? "text-[8px]" : "text-[9px]";
  return (
    <div
      className={`mt-auto flex shrink-0 items-center justify-between gap-2 border-t border-border/40 pt-2 ${small} font-sans text-muted`}
    >
      <span className="min-w-0 truncate font-medium text-ink/80">{BRAND.name}</span>
      <span className="shrink-0 font-mono tabular-nums text-teal/90">
        {magazinePageLabel(page)}
      </span>
      <span className="min-w-0 truncate text-right">{BRAND.url}</span>
    </div>
  );
}
