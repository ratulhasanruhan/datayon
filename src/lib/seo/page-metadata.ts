import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { absoluteUrl, SEO_KEYWORDS, SITE_DESCRIPTION_EN } from "@/lib/seo/site";

export const OG_SIZE = { width: 1200, height: 630, type: "image/png" as const };

/** Default OG + Facebook share image (`/opengraph-image`); same asset as `/facebook-image`. */
export function defaultOgImages(alt: string): NonNullable<Metadata["openGraph"]>["images"] {
  return [
    {
      url: "/opengraph-image",
      width: OG_SIZE.width,
      height: OG_SIZE.height,
      alt,
      type: OG_SIZE.type,
    },
  ];
}

function twitterImageUrlFromOg(
  images: NonNullable<Metadata["openGraph"]>["images"]
): string | undefined {
  if (!images) return undefined;
  const first = Array.isArray(images) ? images[0] : images;
  if (first && typeof first === "object" && "url" in first && first.url) {
    return typeof first.url === "string" ? first.url : String(first.url);
  }
  return undefined;
}

export type BuildPageMetadataOptions = {
  /** Segment for root `title.template`, or full title when `absoluteTitle` is true */
  title: string;
  description: string;
  path: string;
  /** Uses `title` as full document title (home page) */
  absoluteTitle?: boolean;
  descriptionEn?: string;
  openGraphTitle?: string;
  /** Overrides `description` for Open Graph / Facebook preview only */
  openGraphDescription?: string;
  keywords?: string[];
  ogType?: "website" | "article";
  publishedTime?: string;
  images?: NonNullable<Metadata["openGraph"]>["images"];
};

export function buildPageMetadata(opts: BuildPageMetadataOptions): Metadata {
  const path = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const url = absoluteUrl(path);
  const ogTitle = opts.openGraphTitle ?? opts.title;
  const ogDescription = opts.openGraphDescription ?? opts.description;
  const alt = `${ogTitle} · ${BRAND.name}`;
  const images = opts.images ?? defaultOgImages(alt);
  const twUrl = twitterImageUrlFromOg(images) ?? "/twitter-image";

  const titleField: Metadata["title"] = opts.absoluteTitle
    ? { absolute: opts.title }
    : opts.title;

  return {
    title: titleField,
    description: opts.description,
    keywords: opts.keywords ?? [...SEO_KEYWORDS],
    alternates: { canonical: path },
    openGraph: {
      type: opts.ogType ?? "website",
      url,
      title: ogTitle,
      description: ogDescription,
      siteName: BRAND.nameLatin,
      locale: "bn_BD",
      alternateLocale: ["en_US"],
      ...(opts.publishedTime ? { publishedTime: opts.publishedTime } : {}),
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: opts.descriptionEn ?? SITE_DESCRIPTION_EN,
      images: [twUrl],
    },
  };
}
