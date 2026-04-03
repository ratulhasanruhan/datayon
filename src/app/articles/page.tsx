import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { ArticleCategoryNav } from "@/components/articles/ArticleCategoryNav";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { SiteSearchForm } from "@/components/search/SiteSearchForm";
import { getCategoryLabelBySlug } from "@/lib/articles/categories";
import { getArticles } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const revalidate = 120;

type PageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const sp = await searchParams;
  const slug = sp.category?.trim();
  const label = getCategoryLabelBySlug(sp.category);
  const title = label ? `${label} · আর্টিকেল` : "আর্টিকেল";
  const description = label
    ? `ডেটায়ন — ${label} বিভাগের আর্টিকেল, বিশ্লেষণ ও মতামত।`
    : "ডেটায়ন ম্যাগাজিনের আর্টিকেল, বিশ্লেষণ ও ইন্টারভিউ — প্রযুক্তি, স্টার্টআপ, AI ও ডেটা।";
  const path =
    slug && label
      ? `/articles?category=${encodeURIComponent(slug)}`
      : "/articles";

  return buildPageMetadata({
    title,
    description,
    path,
    descriptionEn: label
      ? `Datayon — «${label}» category: articles and analysis.`
      : "Datayon — Bangla tech articles, analysis and interviews.",
    openGraphTitle: title,
  });
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = sp.q?.trim();
  if (q) {
    const p = new URLSearchParams();
    const cat = sp.category?.trim();
    if (cat) p.set("category", cat);
    p.set("q", q);
    redirect(`/search?${p.toString()}`);
  }

  const configured = isAppwriteConfigured();
  const categorySlug = sp.category?.trim() || undefined;
  const categoryLabel = getCategoryLabelBySlug(categorySlug);
  const invalidSlug = Boolean(categorySlug && !categoryLabel);

  const list =
    configured && !invalidSlug
      ? await getArticles(48, categoryLabel ? { category: categoryLabel } : undefined)
      : [];

  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <header className="mb-8 max-w-2xl">
          <SectionLabel>আর্কাইভ</SectionLabel>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
            আর্টিকেল
          </h1>
          <p className="mt-4 font-body text-lg leading-relaxed text-muted">
            {categoryLabel ? (
              <>
                <span className="font-medium text-ink">{categoryLabel}</span>
                {" — "}
                নির্বাচিত আর্টিকেল।
              </>
            ) : (
              "প্রযুক্তি খবর, গভীর বিশ্লেষণ ও মতামত।"
            )}
          </p>
        </header>

        <div className="mb-8 max-w-xl">
          <SiteSearchForm id="articles-archive-search" />
        </div>

        {configured ? (
          <>
            <ArticleCategoryNav activeSlug={categoryLabel ? categorySlug : null} />
            {invalidSlug ? (
              <p className="rounded-xl border border-dashed border-border px-6 py-8 text-center font-body text-muted">
                এই বিভাগের স্লগ স্বীকৃত নয়।{" "}
                <Link href="/articles" className="font-medium text-teal hover:underline">
                  সব আর্টিকেল
                </Link>
                ।
              </p>
            ) : list.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border px-6 py-12 text-center">
                <p className="font-body text-muted">
                  {categoryLabel
                    ? "এই বিভাগে এখনও কোনো আর্টিকেল নেই।"
                    : "কোনো আর্টিকেল পাওয়া যায়নি। টার্মিনালে "}
                  {!categoryLabel ? (
                    <>
                      <code className="rounded-md bg-art px-2 py-0.5 font-mono text-xs">
                        npm run seed:appwrite
                      </code>{" "}
                      চালান।
                    </>
                  ) : null}
                </p>
              </div>
            ) : (
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {list.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/articles/${a.slug}`}
                      className="group flex min-h-[5.5rem] flex-row items-stretch gap-3 overflow-hidden rounded-xl border border-border/70 bg-surface-elevated/50 p-3 transition hover:border-teal/40 hover:bg-art/40 dark:border-navy2 dark:bg-navy-mid/20 dark:hover:bg-navy-mid/35 sm:min-h-0 sm:gap-6 sm:p-2"
                    >
                      <div className="flex min-h-0 min-w-0 flex-1 flex-col justify-center py-0.5 pl-0.5 sm:px-4 sm:py-4">
                        <p className="font-sans text-[9px] font-semibold tracking-widest text-teal sm:text-[10px]">
                          {a.category}
                        </p>
                        <h2 className="mt-1 font-article text-[16px] font-normal leading-snug text-ink group-hover:text-teal sm:text-2xl sm:leading-tight">
                          {a.title}
                        </h2>
                        <p className="mt-1.5 line-clamp-2 font-article text-[13px] leading-relaxed text-muted sm:mt-2 sm:text-sm">
                          {a.excerpt}
                        </p>
                        <p className="mt-2 font-sans text-[10px] text-warm sm:mt-3 sm:text-[11px]">
                          {a.readTime}
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
          </>
        ) : (
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
        )}
      </Container>
    </main>
  );
}
