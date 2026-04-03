import Image from "next/image";
import Link from "next/link";
import { LogoMark } from "@/components/brand/LogoMark";
import { APPWRITE_BUCKET_MAGAZINE } from "@/lib/appwrite/constants";
import {
  getInteractiveIssuePath,
  issueMonthYearLabel,
} from "@/lib/magazine/issue-links";
import { getStorageFileViewUrl } from "@/lib/appwrite/storage-url";
import type { MagazineIssue } from "@/types/content";
import { cn } from "@/lib/cn";

type Props = {
  issue: MagazineIssue;
};

/** মোবাইলে কম প্যাডিং/ছোট টাইপ; স্ম স্ক্রিন থেকে আরামদায়ক */
export function HomeMagazineIssueCard({ issue }: Props) {
  const monthYear = issueMonthYearLabel(issue);
  const coverUrl = getStorageFileViewUrl(
    APPWRITE_BUCKET_MAGAZINE,
    issue.magazineCoverFileId
  );
  const pdfUrl = getStorageFileViewUrl(
    APPWRITE_BUCKET_MAGAZINE,
    issue.magazinePdfFileId
  );
  const interactiveHref = getInteractiveIssuePath(issue);
  const hasPdf = pdfUrl != null && pdfUrl.length > 0;

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-lg border border-border/60 bg-surface-elevated/95 shadow-sm transition sm:rounded-xl",
        "hover:border-teal/35 hover:shadow-md dark:border-navy2 dark:bg-navy-mid/40"
      )}
    >
      <div className="relative aspect-[3/4] w-full max-h-[200px] overflow-hidden bg-navy-deep/20 sm:max-h-none">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt=""
            fill
            className="object-cover object-top"
            sizes="(max-width: 639px) 45vw, (min-width: 1024px) 33vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-b from-navy-mid/30 to-paper">
            <LogoMark size={40} className="sm:hidden" variant="on-light" />
            <LogoMark size={56} className="hidden sm:block" variant="on-light" />
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-deep/92 to-transparent px-2 pb-2 pt-8 sm:px-3 sm:pb-3 sm:pt-12">
          <p className="font-display text-sm font-bold leading-tight text-cream sm:text-lg md:text-xl">
            {monthYear}
          </p>
          <p className="mt-0.5 font-sans text-[9px] text-cream/75 sm:mt-1 sm:text-[11px]">
            সংখ্যা {issue.issueNumber}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-2.5 sm:p-5">
        <h3 className="font-display text-[13px] font-bold leading-snug text-ink line-clamp-2 sm:text-base md:text-lg">
          {issue.headline}
        </h3>
        <p className="mt-1.5 line-clamp-2 flex-1 font-body text-[10px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
          {issue.excerpt}
        </p>

        <div className="mt-2.5 flex gap-1.5 sm:mt-4 sm:gap-2">
          {interactiveHref ? (
            <Link
              href={interactiveHref}
              className="inline-flex min-h-[32px] flex-1 items-center justify-center rounded-full bg-navy px-1.5 py-1.5 text-center font-sans text-[10px] font-semibold leading-tight text-cream transition hover:bg-navy2 sm:min-h-0 sm:px-3 sm:py-2 sm:text-xs dark:bg-teal dark:text-navy"
            >
              <span className="sm:hidden">পড়ুন</span>
              <span className="hidden sm:inline">ইন্টারেক্টিভ</span>
            </Link>
          ) : (
            <span className="inline-flex min-h-[32px] flex-1 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-border px-1 py-1 text-center font-sans text-[9px] text-muted sm:text-xs">
              শীঘ্রই
            </span>
          )}
          {hasPdf ? (
            <a
              href={pdfUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[32px] flex-1 items-center justify-center rounded-full border border-teal/50 bg-teal/10 px-1.5 py-1.5 text-center font-sans text-[10px] font-semibold leading-tight text-teal hover:bg-teal/20 sm:px-3 sm:py-2 sm:text-xs"
            >
              PDF
            </a>
          ) : (
            <span className="inline-flex min-h-[32px] flex-1 items-center justify-center rounded-full border border-dashed border-border/80 px-1 py-1 text-center font-sans text-[9px] text-muted sm:text-xs">
              —
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
