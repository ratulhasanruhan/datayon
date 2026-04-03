import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCover } from "@/components/articles/ArticleCover";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { getCategorySlugFromLabel } from "@/lib/articles/categories";
import { getArticleCoverUrl } from "@/lib/appwrite/covers";
import { getArticleBySlug } from "@/lib/appwrite/queries";
import { isAppwriteConfigured } from "@/lib/appwrite/config";
import { BRAND } from "@/lib/brand";
import { buildPageMetadata } from "@/lib/seo/page-metadata";
import { SEO_KEYWORDS, SITE_URL } from "@/lib/seo/site";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 120;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const articlePath = `/articles/${slug}`;
  const fallback = buildPageMetadata({
    title: "আর্টিকেল",
    description: "ডেটায়ন — আর্টিকেল খুঁজে পাওয়া যায়নি বা CMS সংযোগ সক্রিয় নয়।",
    path: articlePath,
    descriptionEn: "Datayon article — not found or CMS not configured.",
  });

  if (!isAppwriteConfigured()) {
    return buildPageMetadata({
      title: "আর্টিকেল",
      description: "ডেটায়ন আর্টিকেল — Appwrite সংযোগ সেট করুন।",
      path: articlePath,
      descriptionEn: "Configure Appwrite to load Datayon articles.",
    });
  }
  const article = await getArticleBySlug(slug);
  if (!article) return fallback;

  const cover = getArticleCoverUrl(article.coverFileId);
  const base = SITE_URL.replace(/\/$/, "");
  const canonical = `${base}${articlePath}`;
  const ogImages = cover
    ? [
        {
          url: cover,
          width: 1200,
          height: 675,
          alt: article.title,
        },
      ]
    : [
        {
          url: `${base}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: article.title,
          type: "image/png" as const,
        },
      ];

  return {
    title: article.title,
    description: article.excerpt,
    keywords: [...SEO_KEYWORDS, article.category],
    alternates: { canonical: articlePath },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      locale: "bn_BD",
      type: "article",
      url: canonical,
      siteName: BRAND.nameLatin,
      publishedTime: article.publishedAt || undefined,
      modifiedTime: article.publishedAt || undefined,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: cover ? [cover] : [`${base}/twitter-image`],
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

  const categoryFilterSlug = getCategorySlugFromLabel(article.category);

  const pageUrl = `${SITE_URL}/articles/${slug}`;
  const coverUrl = getArticleCoverUrl(article.coverFileId);
  const orgId = `${SITE_URL}/#organization`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.publishedAt || undefined,
    dateModified: article.publishedAt || undefined,
    inLanguage: "bn-BD",
    articleSection: article.category,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    author: {
      "@type": "Organization",
      name: BRAND.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": orgId,
      name: BRAND.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/datayon-profile-logo-2048-light.png`,
        width: 2048,
        height: 2048,
      },
    },
    ...(coverUrl
      ? {
          image: {
            "@type": "ImageObject",
            url: coverUrl,
          },
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

          {categoryFilterSlug ? (
            <Link href={`/articles?category=${categoryFilterSlug}`} className="group block w-fit">
              <SectionLabel className="transition group-hover:opacity-80">
                {article.category}
              </SectionLabel>
            </Link>
          ) : (
            <SectionLabel>{article.category}</SectionLabel>
          )}
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
              সব আর্টিকেল
            </Link>
          </p>
        </Container>
      </article>
    </main>
  );
}
