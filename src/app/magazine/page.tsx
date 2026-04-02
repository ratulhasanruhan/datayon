import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getIssues } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";

export const metadata: Metadata = {
  title: "মাসিক সংখ্যা",
  description: `${BRAND.name} — মাসিক ম্যাগাজিনের সংখ্যা ও প্রচ্ছদ।`,
};

export const revalidate = 120;

export default async function MagazinePage() {
  const configured = isAppwriteConfigured();
  const issues = configured ? await getIssues(24) : [];

  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <header className="mb-12 max-w-2xl">
          <SectionLabel>মাসিক</SectionLabel>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
            সংখ্যাসমূহ
          </h1>
          <p className="mt-4 font-body text-lg leading-relaxed text-muted">
            প্রতি মাসে একটি সংখ্যা — প্রচ্ছদ, সম্পাদকীয় ও নির্বাচিত বিশ্লেষণ।
          </p>
        </header>

        {!configured ? (
          <p className="font-body text-muted">Appwrite সংযোগ সেট করুন।</p>
        ) : issues.length === 0 ? (
          <div
            className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-14 text-center dark:bg-navy-mid/20"
            role="status"
          >
            <p className="font-body text-sm text-muted">
              কোনো সংখ্যা এখনও নেই।{" "}
              <code className="rounded-md bg-art px-2 py-0.5 font-mono text-xs">
                npm run seed:appwrite
              </code>
            </p>
          </div>
        ) : (
          <ul className="grid gap-6 lg:grid-cols-2">
            {issues.map((issue) => (
              <li
                key={issue.id}
                className="relative overflow-hidden rounded-xl border border-border/80 bg-gradient-to-br from-surface-elevated to-surface p-8 shadow-sm dark:border-navy2 dark:from-navy-mid/40 dark:to-navy-deep/60"
              >
                <div
                  className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-teal to-teal-dark"
                  aria-hidden
                />
                <p className="pl-4 font-sans text-[10px] font-semibold tracking-widest text-teal">
                  সংখ্যা {issue.issueNumber} · {issue.monthLabel}
                </p>
                <h2 className="mt-3 pl-4 font-display text-2xl font-bold leading-snug text-ink">
                  {issue.headline}
                </h2>
                <p className="mt-3 pl-4 font-body text-sm leading-relaxed text-muted">
                  {issue.excerpt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
