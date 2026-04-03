import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { SiteSearchForm } from "@/components/search/SiteSearchForm";
import { getCategoryLabelBySlug } from "@/lib/articles/categories";
import { getArticles, searchIssues } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { getInteractiveIssuePath, issueMonthYearLabel } from "@/lib/magazine/issue-links";

export const revalidate = 120;

type PageProps = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const q = sp.q?.trim();
  const slug = sp.category?.trim();
  const label = getCategoryLabelBySlug(sp.category);
  const title = q
    ? `«${q}» · খোঁজার ফল`
    : "খোঁজা · ম্যাগাজিন ও আর্টিকেল";
  const description = q
    ? `ডেটায়ন — «${q}» অনুসন্ধান: মাসিক সংখ্যা ও আর্টিকেল।`
    : "ডেটায়ন — মাসিক ম্যাগাজিন ও অনলাইন আর্টিকেল খুঁজুন।";
  const pathParts = new URLSearchParams();
  if (slug && label) pathParts.set("category", slug);
  if (q) pathParts.set("q", q);
  const path =
    pathParts.toString() === "" ? "/search" : `/search?${pathParts.toString()}`;

  const base = buildPageMetadata({
    title,
    description,
    path,
    descriptionEn: q
      ? `Datayon — search results for «${q}» (magazine & articles).`
      : "Datayon — search magazine issues and articles.",
    openGraphTitle: title,
  });

  return {
    ...base,
    robots: q ? { index: false, follow: true } : { index: true, follow: true },
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const rawQ = sp.q?.trim() ?? "";
  const categorySlug = sp.category?.trim();
  const categoryLabel = getCategoryLabelBySlug(categorySlug);
  const invalidSlug = Boolean(categorySlug && !categoryLabel);

  if (invalidSlug) {
    const p = new URLSearchParams();
    if (rawQ) p.set("q", rawQ);
    redirect(p.toString() ? `/search?${p.toString()}` : "/search");
  }

  const configured = isAppwriteConfigured();
  const hasQuery = rawQ.length > 0;

  const [articles, issues] =
    configured && hasQuery && !invalidSlug
      ? await Promise.all([
          getArticles(48, {
            ...(categoryLabel ? { category: categoryLabel } : {}),
            search: rawQ,
          }),
          searchIssues(24, { search: rawQ }),
        ])
      : [[], []];

  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <header className="mb-8 max-w-2xl">
          <SectionLabel>খোঁজা</SectionLabel>
          <h1 className="mt-5 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
            ম্যাগাজিন ও আর্টিকেল
          </h1>
          <p className="mt-4 font-body text-lg leading-relaxed text-muted">
            {hasQuery ? (
              <>
                <span className="font-medium text-ink">«{rawQ}»</span>
                {categoryLabel ? (
                  <>
                    {" "}
                    · বিভাগ:{" "}
                    <span className="font-medium text-ink">{categoryLabel}</span>
                  </>
                ) : null}{" "}
                — অনুসন্ধানের ফল।
              </>
            ) : (
              "মাসিক সংখ্যার শিরোনাম বা আর্টিকেলের শিরোনাম/সারাংশ দিয়ে খুঁজুন।"
            )}
          </p>
        </header>

        <div className="mb-10 max-w-xl">
          <SiteSearchForm
            id="search-page-form"
            defaultQuery={rawQ}
          />
        </div>

        {!configured ? (
          <div
            className="rounded-xl border border-border bg-surface/60 px-6 py-10 dark:bg-navy-mid/25"
            role="status"
          >
            <p className="font-body text-base leading-relaxed text-ink/90">
              <strong className="font-sans font-semibold text-teal">Appwrite</strong>{" "}
              সংযোগ সেট করুন (
              <code className="rounded-md bg-art px-2 py-0.5 font-mono text-xs text-muted">
                .env.local
              </code>
              )।
            </p>
          </div>
        ) : !hasQuery ? (
          <p className="rounded-xl border border-dashed border-border px-6 py-10 text-center font-body text-muted">
            উপরের ঘরে কীওয়ার্ড লিখে খুঁজুন। বিভাগ ফিল্টারের জন্য{" "}
            <Link href="/articles" className="font-medium text-teal hover:underline">
              আর্টিকেল
            </Link>{" "}
            থেকে বিভাগ বেছে নিয়ে আবার খুঁজতে পারেন।
          </p>
        ) : (
          <div className="space-y-14">
            <section aria-labelledby="search-mag">
              <h2
                id="search-mag"
                className="font-display text-xl font-bold text-ink sm:text-2xl"
              >
                মাসিক সংখ্যা
              </h2>
              {issues.length === 0 ? (
                <p className="mt-4 font-body text-muted">
                  এই অনুসন্ধানে কোনো সংখ্যা মেলেনি।
                </p>
              ) : (
                <ul className="mt-6 flex flex-col gap-3 sm:gap-4">
                  {issues.map((issue) => {
                    const interactiveHref = getInteractiveIssuePath(issue);
                    const href = interactiveHref ?? "/magazine";
                    return (
                      <li key={issue.id}>
                        <Link
                          href={href}
                          className="group block rounded-xl border border-border/70 bg-surface-elevated/50 p-4 transition hover:border-teal/40 hover:bg-art/30 dark:border-navy2 dark:bg-navy-mid/20 dark:hover:bg-navy-mid/35 sm:p-5"
                        >
                          <p className="font-sans text-xs font-semibold text-teal">
                            {issueMonthYearLabel(issue)} · সংখ্যা {issue.issueNumber}
                          </p>
                          <p className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-teal">
                            {issue.headline}
                          </p>
                          <p className="mt-1 line-clamp-2 font-body text-sm text-muted">
                            {issue.excerpt}
                          </p>
                          {!interactiveHref ? (
                            <p className="mt-2 font-sans text-xs text-warm">
                              ম্যাগাজিন আর্কাইভে দেখুন
                            </p>
                          ) : null}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            <section aria-labelledby="search-art">
              <h2
                id="search-art"
                className="font-display text-xl font-bold text-ink sm:text-2xl"
              >
                আর্টিকেল
              </h2>
              {articles.length === 0 ? (
                <p className="mt-4 font-body text-muted">
                  এই অনুসন্ধানে কোনো আর্টিকেল মেলেনি।
                </p>
              ) : (
                <ul className="mt-6 flex flex-col gap-2.5 sm:gap-3">
                  {articles.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/articles/${a.slug}`}
                        className="group flex min-h-[5.5rem] flex-row items-stretch gap-3 overflow-hidden rounded-xl border border-border/70 bg-surface-elevated/50 p-3 transition hover:border-teal/40 hover:bg-art/40 dark:border-navy2 dark:bg-navy-mid/20 dark:hover:bg-navy-mid/35 sm:min-h-0 sm:gap-6 sm:p-2"
                      >
                        <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center py-0.5 pl-0.5 sm:px-4 sm:py-4">
                          <p className="font-sans text-[9px] font-semibold tracking-widest text-teal sm:text-[10px]">
                            {a.category}
                          </p>
                          <p className="mt-1 font-article text-[16px] font-normal leading-snug text-ink group-hover:text-teal sm:text-2xl sm:leading-tight">
                            {a.title}
                          </p>
                          <p className="mt-1.5 line-clamp-2 font-article text-[13px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
                            {a.excerpt}
                          </p>
                        </div>
                        <div className="flex shrink-0 flex-col justify-center sm:pr-2 sm:pl-1">
                          <ArticleCover
                            coverFileId={a.coverFileId}
                            alt={a.title}
                            variant="thumb"
                            className="rounded-lg sm:rounded-xl"
                          />
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        )}
      </Container>
    </main>
  );
}
