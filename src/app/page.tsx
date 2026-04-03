import type { Metadata } from "next";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ArticleCategoryNav } from "@/components/articles/ArticleCategoryNav";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { LogoMark } from "@/components/brand/LogoMark";
import { HomeMagazineIssues } from "@/components/home/HomeMagazineIssues";
import { SiteSearchForm } from "@/components/search/SiteSearchForm";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getArticles, getIssues } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { SITE_DESCRIPTION, SITE_DESCRIPTION_EN } from "@/lib/seo/site";

export const revalidate = 120;

export const metadata: Metadata = buildPageMetadata({
  title: `${BRAND.name} — ${BRAND.tagline}`,
  absoluteTitle: true,
  description: SITE_DESCRIPTION,
  path: "/",
  descriptionEn: SITE_DESCRIPTION_EN,
});

export default async function HomePage() {
  const configured = isAppwriteConfigured();
  const [articles, magazineIssues] = await Promise.all([
    getArticles(6),
    configured ? getIssues(24) : Promise.resolve([]),
  ]);

  return (
    <main id="main" className="flex-1">
      <section
        className="relative overflow-hidden border-b border-border/80 bg-editorial-hero texture-grain"
        aria-labelledby="intro-heading"
      >
        {/* Depth: soft glow + fine grid */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_70%_-15%,rgba(58,143,163,0.16),transparent_55%)] dark:bg-[radial-gradient(ellipse_75%_50%_at_80%_0%,rgba(58,143,163,0.14),transparent_52%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.2]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(58,143,163,0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(58,143,163,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "radial-gradient(ellipse 70% 65% at 50% 40%, black 15%, transparent 70%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-24 bottom-0 h-[min(380px,50vh)] w-[min(380px,50vw)] rounded-full bg-teal/[0.07] blur-3xl dark:bg-teal/[0.09]"
          aria-hidden
        />
        {/* Top-right soft orb (brand glow) */}
        <div
          className="pointer-events-none absolute -right-16 top-1/2 h-[min(420px,55vw)] w-[min(420px,55vw)] -translate-y-1/2 rounded-full bg-teal/[0.06] blur-3xl dark:bg-teal/[0.08] sm:-right-10 md:right-[8%]"
          aria-hidden
        />
        {/* Faint mark — transparent watermark, top-left */}
        <div
          className="pointer-events-none absolute -left-8 top-2 opacity-[0.07] dark:opacity-[0.05] sm:-left-16 sm:top-4 sm:opacity-[0.1] md:-left-20"
          aria-hidden
        >
          <LogoMark size={200} variant="on-light" />
        </div>

        <Container className="relative py-12 sm:py-16 lg:py-24">
          <div className="mx-auto max-w-3xl lg:max-w-[42rem]">
            <SectionLabel accent={false} className="pl-0">
              {BRAND.name} · ম্যাগাজিন
            </SectionLabel>
            <h1
              id="intro-heading"
              className="mt-5 font-brand text-[1.85rem] font-bold leading-[1.14] tracking-tight text-ink text-balance sm:mt-6 sm:text-4xl sm:leading-[1.12] md:text-[2.75rem] md:leading-[1.1]"
            >
              {BRAND.tagline}
            </h1>
            <p className="mt-5 max-w-xl font-body text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-lg">
              প্রতি মাসে একটি সমৃদ্ধ সংখ্যা, সঙ্গে নিয়মিত অনলাইন বিশ্লেষণ ও খবর — বাংলায়
              প্রযুক্তির গল্প, পরিষ্কার ভাষায়।
            </p>
            <ul
              className="mt-6 flex flex-wrap gap-2 sm:mt-7"
              aria-label="কভারেজ থিম"
            >
              {["মাসিক সংখ্যা", "স্টার্টআপ ও AI", "নীতি ও সংস্কৃতি"].map((label) => (
                <li
                  key={label}
                  className="rounded-full border border-border/70 bg-surface-elevated/90 px-3 py-1.5 font-sans text-[11px] font-medium tracking-wide text-muted shadow-sm ring-1 ring-border/30 dark:border-navy2/80 dark:bg-navy-mid/40 dark:ring-navy2/50 sm:text-xs"
                >
                  {label}
                </li>
              ))}
            </ul>
            <div className="mt-7 max-w-xl sm:mt-8">
              <SiteSearchForm id="hero-site-search" />
            </div>
            <div className="mt-8 flex w-full max-w-lg flex-row flex-wrap items-center gap-3 sm:mt-10">
              <Button
                href="/magazine"
                variant="primary"
                className="min-h-[48px] min-w-0 flex-1 justify-center px-4 py-3 sm:min-h-0 sm:flex-none sm:px-6 sm:py-2.5"
              >
                মাসিক সংখ্যা
              </Button>
              <Button
                href="/articles"
                variant="ghost"
                className="min-h-[48px] min-w-0 flex-1 justify-center px-4 py-3 sm:min-h-0 sm:flex-none sm:px-6 sm:py-2.5"
              >
                সব আর্টিকেল
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section
        className="border-b border-border/80 bg-magazine-band"
        aria-labelledby="mag-heading"
      >
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>মাসিক সংখ্যা</SectionLabel>
              <h2
                id="mag-heading"
                className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl"
              >
                প্রকাশিত সংখ্যা
              </h2>
            </div>
            <Link
              href="/magazine"
              className="group inline-flex items-center gap-1 font-sans text-sm font-medium text-teal transition hover:gap-2"
            >
              বছরভিত্তিক আর্কাইভ
              <span aria-hidden>→</span>
            </Link>
          </div>

          <HomeMagazineIssues issues={magazineIssues} />
        </Container>
      </section>

      <section
        className="border-b border-border/80 bg-paper/80 dark:bg-paper"
        aria-labelledby="articles-heading"
      >
        <Container className="py-14 sm:py-16 lg:py-20">
          <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <SectionLabel>অনলাইন</SectionLabel>
              <h2
                id="articles-heading"
                className="mt-4 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl"
              >
                সর্বশেষ আর্টিকেল
              </h2>
              <p className="mt-2 font-body text-sm leading-relaxed text-muted">
                মাসিকের বাইরেও নিয়মিত আপডেট ও মতামত।
              </p>
            </div>
            <Link
              href="/articles"
              className="group inline-flex shrink-0 items-center gap-1 self-start font-sans text-sm font-medium text-teal transition hover:gap-2 sm:self-auto"
            >
              পুরো আর্কাইভ
              <span aria-hidden>→</span>
            </Link>
          </div>

          <ArticleCategoryNav
            activeSlug={null}
            className="mb-8 sm:mb-10"
          />

          {articles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center dark:bg-navy-mid/20">
              <p className="font-body text-sm text-muted">
                এখনও কোনো আর্টিকেল নেই।{" "}
                <code className="rounded-md bg-art px-2 py-0.5 font-mono text-xs">
                  npm run seed:appwrite
                </code>{" "}
                চালিয়ে নমুনা ডেটা যোগ করুন।
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {articles.map((item, i) => (
                <li
                  key={item.id}
                  className={cn(
                    "min-w-0",
                    /* Below lg: four cards; lg+: six cards (3×2) */
                    i >= 4 && "hidden lg:block"
                  )}
                >
                  <article
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/70 bg-surface-elevated/95 shadow-sm ring-1 ring-border/40 transition",
                      "hover:-translate-y-0.5 hover:border-teal/40 hover:shadow-md hover:ring-teal/20 dark:bg-navy-mid/30 dark:ring-navy2/60"
                    )}
                  >
                    <div className="relative overflow-hidden">
                      <ArticleCover
                        coverFileId={item.coverFileId}
                        alt={item.title}
                        variant="card"
                        className="aspect-[4/3] sm:aspect-[16/10]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-deep/20 to-transparent opacity-0 transition group-hover:opacity-100 dark:from-navy-deep/40" />
                    </div>
                    <div className="flex flex-1 flex-col p-3 sm:p-5">
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-mono text-[8px] tabular-nums text-warm/70 sm:text-[10px]">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                        <span className="line-clamp-1 rounded-full bg-teal/10 px-2 py-0.5 text-center font-sans text-[8px] font-semibold uppercase tracking-wide text-teal dark:bg-teal/15 sm:text-[10px]">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="mt-2 line-clamp-3 font-article text-[13px] font-normal leading-snug text-ink group-hover:text-teal dark:group-hover:text-teal sm:line-clamp-2 sm:text-[17px] sm:leading-snug lg:text-lg">
                        <Link
                          href={`/articles/${item.slug}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-1.5 line-clamp-2 hidden font-body text-[11px] leading-relaxed text-muted sm:mt-2 sm:block sm:text-xs">
                        {item.excerpt}
                      </p>
                      <p className="mt-auto pt-2 font-sans text-[9px] text-warm sm:pt-3 sm:text-[11px]">
                        {item.readTime}
                      </p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-10 flex justify-center sm:mt-12">
            <Button href="/articles" variant="ghost">
              আরও আর্টিকেল
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
