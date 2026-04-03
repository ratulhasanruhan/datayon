import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = SITE_URL.replace(/\/$/, "");
  const lastModified = new Date();

  return [
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
    { url: `${root}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${root}/media-kit`, lastModified, changeFrequency: "monthly", priority: 0.48 },
    { url: `${root}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.35 },
    { url: `${root}/copyright`, lastModified, changeFrequency: "yearly", priority: 0.35 },
  ];
}
