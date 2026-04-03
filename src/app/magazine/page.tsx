import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { MagazineIssueArchiveCard } from "@/components/magazine/MagazineIssueArchiveCard";
import { groupIssuesByYear } from "@/lib/magazine/issue-links";
import { getIssues } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "মাসিক সংখ্যা",
  description: `${BRAND.name} — মাসিক ম্যাগাজিনের সংখ্যা ও প্রচ্ছদ। বছরভিত্তিক আর্কাইভ।`,
  path: "/magazine",
  descriptionEn: "Datayon magazine issues — monthly covers and year archive.",
});

export const revalidate = 120;

export default async function MagazinePage() {
  const configured = isAppwriteConfigured();
  const issues = configured ? await getIssues(48) : [];
  const byYear = groupIssuesByYear(issues);

  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <header className="mb-14 max-w-3xl">
          <SectionLabel>মাসিক আর্কাইভ</SectionLabel>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
            সংখ্যাসমূহ
          </h1>
          <p className="mt-4 font-body text-lg leading-relaxed text-muted">
            প্রতি সংখ্যায় <strong className="font-medium text-ink">মাস ও বছর</strong> (যেমন{" "}
            <span className="font-display">এপ্রিল ২০২৬</span>) স্পষ্টভাবে দেখানো হয়েছে। বছর অনুযায়ী
            গোষ্ঠীবদ্ধ আর্কাইভ।
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center font-sans text-sm font-medium text-teal underline-offset-4 hover:underline"
            >
              ← প্রচ্ছদ
            </Link>
          </div>
        </header>

        {!configured ? (
          <p className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-10 text-center font-body text-muted dark:bg-navy-mid/20">
            Appwrite সংযোগ সেট করুন।
          </p>
        ) : issues.length === 0 ? (
          <div
            className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-14 text-center dark:bg-navy-mid/20"
            role="status"
          >
            <p className="font-body text-sm text-muted">
              ডেটাবেসে কোনো সংখ্যা এখনও নেই।{" "}
              <code className="rounded-md bg-art px-2 py-0.5 font-mono text-xs">
                npm run seed:appwrite
              </code>
            </p>
          </div>
        ) : (
          <div className="space-y-16 lg:space-y-20">
            {byYear.map(({ year, items }) => (
              <section
                key={year}
                className="relative scroll-mt-24"
                aria-labelledby={`year-${year}`}
              >
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-4">
                  <div className="flex min-w-0 items-baseline gap-4">
                    <h2
                      id={`year-${year}`}
                      className="font-display text-4xl font-black tabular-nums tracking-tight text-navy/90 dark:text-cream/90 sm:text-5xl"
                    >
                      {year}
                    </h2>
                    <span className="hidden h-8 w-px bg-teal/30 sm:block" aria-hidden />
                    <p className="font-sans text-sm text-muted">
                      {items.length}টি সংখ্যা
                    </p>
                  </div>
                  <div
                    className="h-1 w-24 rounded-full bg-gradient-to-r from-teal to-teal/20 sm:w-32"
                    aria-hidden
                  />
                </div>

                <ul className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
                  {items.map((issue) => (
                    <li key={issue.id}>
                      <MagazineIssueArchiveCard issue={issue} />
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}

      </Container>
    </main>
  );
}
