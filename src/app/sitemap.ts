import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://datayon.bd";

export default function sitemap(): MetadataRoute.Sitemap {
  const root = base.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    { url: root, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${root}/magazine`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    { url: `${root}/articles`, lastModified, changeFrequency: "daily", priority: 0.9 },
    { url: `${root}/about`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  ];
}
