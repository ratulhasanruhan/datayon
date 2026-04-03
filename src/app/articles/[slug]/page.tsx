import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getArticleCoverUrl } from "@/lib/appwrite/covers";
import { getArticleBySlug } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";

type Props = { params: Promise<{ slug: string }> };

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://datayon.bd";

export const revalidate = 120;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  if (!isAppwriteConfigured()) {
    return { title: slug };
  }
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "প্রবন্ধ" };
  const cover = getArticleCoverUrl(article.coverFileId);
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      locale: "bn_BD",
      type: "article",
      ...(cover
        ? {
            images: [
              {
                url: cover,
                width: 1200,
                height: 675,
                alt: article.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: cover ? "summary_large_image" : "summary",
      title: article.title,
      description: article.excerpt,
      ...(cover ? { images: [cover] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  if (!isAppwriteConfigured()) {
    return (
      <main
        id="main"
        className="flex-1 border-t border-border/80 bg-paper py-16"
      >
        <Container>
          <p className="font-body text-muted">Appwrite সংযোগ সেট করুন।</p>
        </Container>
      </main>
    );
  }

  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt || undefined,
    inLanguage: "bn",
    url: `${siteUrl.replace(/\/$/, "")}/articles/${slug}`,
    ...(getArticleCoverUrl(article.coverFileId)
      ? {
          image: getArticleCoverUrl(article.coverFileId),
        }
      : {}),
  };

  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-editorial-hero texture-grain"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="relative z-[1] py-12 sm:py-16 lg:py-20">
        <Container className="max-w-2xl">
          <ArticleCover
            coverFileId={article.coverFileId}
            alt={article.title}
            variant="hero"
            priority
            className="mb-10 w-full"
          />

          <SectionLabel>{article.category}</SectionLabel>
          <h1 className="mt-6 font-article text-3xl font-normal leading-[1.25] tracking-tight text-ink sm:text-4xl md:text-[2.45rem]">
            {article.title}
          </h1>
          <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-sans text-xs text-warm">
            <span>{article.readTime}</span>
            {article.publishedAt ? (
              <>
                <span className="text-border" aria-hidden>
                  ·
                </span>
                <time dateTime={article.publishedAt}>
                  {new Date(article.publishedAt).toLocaleDateString("bn-BD")}
                </time>
              </>
            ) : null}
          </p>

          {article.excerpt ? (
            <p className="mt-10 border-l-[3px] border-teal pl-5 font-article text-lg font-normal leading-relaxed text-muted">
              {article.excerpt}
            </p>
          ) : null}

          {article.content ? (
            <div className="prose-bn mt-12 text-ink/95">
              {article.content.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ) : null}

          <p className="mt-14 border-t border-border/80 pt-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-teal transition hover:gap-3"
            >
              <span aria-hidden>←</span>
              সব প্রবন্ধ
            </Link>
          </p>
        </Container>
      </article>
    </main>
  );
}
