import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getArticles } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";

export const metadata: Metadata = {
  title: "প্রবন্ধ",
  description: "ডেটায়ন ম্যাগাজিনের প্রবন্ধ, বিশ্লেষণ ও ইন্টারভিউ।",
};

export const revalidate = 120;

export default async function ArticlesPage() {
  const configured = isAppwriteConfigured();
  const list = configured ? await getArticles(48) : [];

  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <header className="mb-12 max-w-2xl">
          <SectionLabel>আর্কাইভ</SectionLabel>
          <h1 className="mt-5 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">
            প্রবন্ধ
          </h1>
          <p className="mt-4 font-body text-lg leading-relaxed text-muted">
            প্রযুক্তি খবর, গভীর বিশ্লেষণ ও মতামত।
          </p>
        </header>

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
        ) : list.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-6 py-12 text-center">
            <p className="font-body text-muted">
              কোনো প্রবন্ধ পাওয়া যায়নি। টার্মিনালে{" "}
              <code className="rounded-md bg-art px-2 py-0.5 font-mono text-xs">
                npm run seed:appwrite
              </code>{" "}
              চালান।
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {list.map((a, i) => (
              <li key={a.id}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="group flex flex-col gap-4 overflow-hidden rounded-xl border border-border/70 bg-surface-elevated/50 transition hover:border-teal/40 hover:bg-art/40 dark:border-navy2 dark:bg-navy-mid/20 dark:hover:bg-navy-mid/35 sm:flex-row sm:gap-6 sm:px-2 sm:py-2"
                >
                  <div className="shrink-0 sm:pl-2 sm:pt-2">
                    <ArticleCover
                      coverFileId={a.coverFileId}
                      alt={a.title}
                      variant="thumb"
                      className="sm:mx-0"
                    />
                  </div>
                  <div className="min-w-0 flex-1 px-5 pb-5 pt-0 sm:px-4 sm:py-4">
                    <span className="font-mono text-xs text-warm/70">
                      {(i + 1).toString().padStart(2, "0")}
                    </span>
                    <p className="mt-2 font-sans text-[10px] font-semibold tracking-widest text-teal">
                      {a.category}
                    </p>
                    <h2 className="mt-1 font-article text-xl font-normal text-ink group-hover:text-teal sm:text-2xl">
                      {a.title}
                    </h2>
                    <p className="mt-2 line-clamp-2 font-article text-sm leading-relaxed text-muted">
                      {a.excerpt}
                    </p>
                    <p className="mt-3 font-sans text-[11px] text-warm">{a.readTime}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </main>
  );
}
