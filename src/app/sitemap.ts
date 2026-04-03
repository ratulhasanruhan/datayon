import type { MetadataRoute } from "next";
import { isAppwriteConfigured } from "@/lib/appwrite/config";
import { getArticles } from "@/lib/appwrite/queries";
import { SITE_URL } from "@/lib/seo/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const root = SITE_URL.replace(/\/$/, "");
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: root, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${root}/magazine`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${root}/magazine/april-2026`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.92,
    },
    { url: `${root}/articles`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${root}/search`, lastModified, changeFrequency: "monthly", priority: 0.45 },
    { url: `${root}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${root}/media-kit`, lastModified, changeFrequency: "monthly", priority: 0.48 },
    { url: `${root}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.35 },
    { url: `${root}/copyright`, lastModified, changeFrequency: "yearly", priority: 0.35 },
  ];

  if (!isAppwriteConfigured()) {
    return staticEntries;
  }

  const articles = await getArticles(500);
  const articleEntries: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${root}/articles/${a.slug}`,
    lastModified: a.updatedAt
      ? new Date(a.updatedAt)
      : a.publishedAt
        ? new Date(a.publishedAt)
        : lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));
  return [...staticEntries, ...articleEntries];
}
