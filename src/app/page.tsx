import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { LogoMark } from "@/components/brand/LogoMark";
import { MagazineIssueCard } from "@/components/home/MagazineIssueCard";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getFeaturedArticles, getLatestIssue } from "@/lib/appwrite/queries";

export const revalidate = 120;

export default async function HomePage() {
  const [articles, issue] = await Promise.all([
    getFeaturedArticles(3),
    getLatestIssue(),
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
              <SectionLabel>মাসিক · প্রচ্ছদ</SectionLabel>
              <h2
                id="mag-heading"
                className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl"
              >
                এই মাসের সংখ্যা
              </h2>
              <p className="mt-2 font-body text-sm text-muted sm:text-base">
                সম্পাদকীয়, প্রচ্ছদ কাহিনী ও নির্বাচিত বিশ্লেষণ।
              </p>
            </div>
            <Link
              href="/magazine"
              className="group inline-flex items-center gap-1 font-sans text-sm font-medium text-teal transition hover:gap-2"
            >
              আর্কাইভ
              <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div className="order-2 lg:order-1">
              <p className="font-sans text-[10px] font-semibold tracking-[0.25em] text-teal">
                {issue ? `সংখ্যা ${issue.issueNumber}` : "সংখ্যা ০১"}
              </p>
              <h3 className="mt-3 font-display text-xl font-bold leading-snug text-ink sm:text-2xl">
                {issue?.headline ??
                  "বাংলাদেশের ডেটা অর্থনীতি — কতটা প্রস্তুত আমরা?"}
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-muted">
                {issue?.excerpt ??
                  "তথ্য প্রযুক্তির নতুন যুগে বাংলাদেশ কোথায় দাঁড়িয়ে — প্রচ্ছদ প্রবন্ধ ও নির্বাচিত বিশ্লেষণ।"}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/magazine" variant="primary">
                  সংখ্যা পড়ুন
                </Button>
                <span className="font-sans text-sm text-warm">
                  {issue?.monthLabel ?? "এপ্রিল ২০২৬"}
                </span>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <MagazineIssueCard
                issueLabel={
                  issue
                    ? `সংখ্যা ${issue.issueNumber} · প্রচ্ছদ কাহিনী`
                    : "সংখ্যা ০১ · প্রচ্ছদ কাহিনী"
                }
                dateLabel={issue?.monthLabel ?? "এপ্রিল ২০২৬"}
                excerpt={
                  issue?.coverLine ||
                  issue?.excerpt ||
                  "ডেটা সেন্টার থেকে স্টার্টআপ — একটি বিস্তৃত চিত্র।"
                }
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border/80" aria-labelledby="articles-heading">
        <Container className="py-14 sm:py-16">
          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>অনলাইন</SectionLabel>
              <h2
                id="articles-heading"
                className="mt-4 font-display text-2xl font-bold text-ink sm:text-3xl"
              >
                সর্বশেষ প্রবন্ধ
              </h2>
              <p className="mt-2 font-body text-sm text-muted">
                মাসিকের বাইরেও নিয়মিত আপডেট ও মতামত।
              </p>
            </div>
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
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item, i) => (
                <li key={item.id}>
                  <article
                    className={cn(
                      "group relative flex h-full flex-col overflow-hidden rounded-xl border border-border/80 bg-surface-elevated/90 shadow-sm transition",
                      "hover:-translate-y-0.5 hover:border-teal/35 hover:shadow-md dark:bg-navy-mid/25"
                    )}
                  >
                    <ArticleCover
                      coverFileId={item.coverFileId}
                      alt={item.title}
                      variant="card"
                    />
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className="font-mono text-[10px] text-warm/80">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <p className="mt-3 font-sans text-[10px] font-semibold tracking-widest text-teal">
                        {item.category}
                      </p>
                      <h3 className="mt-2 font-article text-[17px] font-normal leading-snug text-ink group-hover:text-teal dark:group-hover:text-teal sm:text-lg">
                        <Link
                          href={`/articles/${item.slug}`}
                          className="after:absolute after:inset-0 after:content-['']"
                        >
                          {item.title}
                        </Link>
                      </h3>
                      <p className="mt-4 font-sans text-[11px] text-warm">{item.readTime}</p>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-12 flex justify-center">
            <Button href="/articles" variant="ghost">
              আরও প্রবন্ধ
            </Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
