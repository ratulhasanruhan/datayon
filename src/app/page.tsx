import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { LogoMark } from "@/components/brand/LogoMark";
import { HomeMagazineIssues } from "@/components/home/HomeMagazineIssues";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getFeaturedArticles, getIssues } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";

export const revalidate = 120;

export default async function HomePage() {
  const configured = isAppwriteConfigured();
  const [articles, magazineIssues] = await Promise.all([
    getFeaturedArticles(6),
    configured ? getIssues(24) : Promise.resolve([]),
  ]);

  return (
    <main id="main" className="flex-1">
      <section
        className="relative overflow-hidden border-b border-border/80 bg-editorial-hero texture-grain"
        aria-labelledby="intro-heading"
      >
        <div
          className="pointer-events-none absolute -left-20 top-4 opacity-[0.12] dark:opacity-[0.08]"
          aria-hidden
        >
          <LogoMark size={260} variant="on-light" />
        </div>

        <Container className="relative py-14 sm:py-16 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionLabel>{BRAND.name} · ম্যাগাজিন</SectionLabel>
              <h1
                id="intro-heading"
                className="mt-5 max-w-xl font-brand text-3xl font-bold leading-[1.2] tracking-tight text-ink sm:text-4xl md:text-[2.65rem]"
              >
                {BRAND.tagline}
              </h1>
              <p className="mt-5 max-w-lg font-body text-base leading-relaxed text-muted sm:text-lg">
                প্রতি মাসে একটি সমৃদ্ধ সংখ্যা, সঙ্গে নিয়মিত অনলাইন বিশ্লেষণ ও খবর — বাংলায়
                প্রযুক্তির গল্প, পরিষ্কার ভাষায়।
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="/magazine" variant="primary">
                  মাসিক সংখ্যা
                </Button>
                <Button href="/articles" variant="ghost">
                  সব প্রবন্ধ
                </Button>
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative aspect-square w-full max-w-[320px] rounded-2xl border border-border/50 bg-surface-elevated/80 p-8 shadow-inner dark:border-navy2 dark:bg-navy-mid/40">
                <div className="flex h-full flex-col items-center justify-center gap-5">
                  <LogoMark size={112} variant="on-light" />
                  <p className="text-center font-brand text-lg font-semibold text-ink dark:text-cream">
                    ডেটায়ন
                  </p>
                  <p className="text-center font-brand text-sm font-medium leading-snug text-muted">
                    {BRAND.tagline}
                  </p>
                </div>
              </div>
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
                সর্বশেষ প্রবন্ধ
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

          {articles.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border bg-surface/50 px-6 py-12 text-center dark:bg-navy-mid/20">
              <p className="font-body text-sm text-muted">
                এখনও কোনো প্রবন্ধ নেই।{" "}
                <code className="rounded-md bg-art px-2 py-0.5 font-mono text-xs">
                  npm run seed:appwrite
                </code>{" "}
                চালিয়ে নমুনা ডেটা যোগ করুন।
              </p>
            </div>
          ) : (
            <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
              {articles.map((item, i) => (
                <li key={item.id} className="min-w-0">
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
              আরও প্রবন্ধ
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
