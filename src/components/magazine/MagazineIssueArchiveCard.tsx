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

/** আর্কাইভ — মাস+বছর বড় টাইপ (এপ্রিল ২০২৬) */
export function MagazineIssueArchiveCard({ issue }: Props) {
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
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface-elevated/90 shadow-sm transition",
        "hover:-translate-y-0.5 hover:border-teal/30 hover:shadow-lg dark:border-navy2 dark:bg-navy-mid/35"
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-navy-deep/30">
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt=""
            fill
            className="object-cover object-top transition duration-300 group-hover:scale-[1.02]"
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
            <LogoMark size={56} variant="on-light" />
            <span className="font-brand text-sm font-bold text-ink/80">
              সংখ্যা {issue.issueNumber}
            </span>
          </div>
        )}
        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-paper/95 px-2.5 py-1 font-sans text-[10px] font-semibold text-navy shadow-sm backdrop-blur-sm dark:bg-navy-deep/90 dark:text-cream">
            বিনামূল্যে
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="font-sans text-[10px] font-semibold uppercase tracking-widest text-teal">
          সংখ্যা {issue.issueNumber}
        </p>
        <h2 className="mt-1 font-display text-xl font-bold leading-tight text-ink sm:text-2xl">
          {monthYear}
        </h2>
        <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink/95 sm:text-lg">
          {issue.headline}
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-muted">
          {issue.excerpt}
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {interactiveHref ? (
            <Link
              href={interactiveHref}
              className="inline-flex flex-1 items-center justify-center rounded-full bg-navy px-4 py-2.5 text-center font-sans text-xs font-semibold text-cream transition hover:bg-navy2 dark:bg-teal dark:text-navy dark:hover:bg-teal-dark sm:flex-initial"
            >
              <span className="sm:hidden">পড়ুন</span>
              <span className="hidden sm:inline">ইন্টারেক্টিভ</span>
            </Link>
          ) : (
            <span className="inline-flex flex-1 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-border px-4 py-2.5 text-center font-sans text-xs text-muted sm:flex-initial">
              ইন্টারেক্টিভ — শীঘ্রই
            </span>
          )}
          {hasPdf ? (
            <a
              href={pdfUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-full border border-teal/50 bg-teal/10 px-4 py-2.5 text-center font-sans text-xs font-semibold text-teal transition hover:bg-teal/20 sm:flex-initial"
            >
              PDF
            </a>
          ) : (
            <span className="inline-flex flex-1 items-center justify-center rounded-full border border-dashed border-border/80 px-4 py-2.5 text-center font-sans text-xs text-muted sm:flex-initial">
              PDF — শীঘ্রই
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
