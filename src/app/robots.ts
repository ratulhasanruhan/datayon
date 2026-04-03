import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const root = SITE_URL.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/magazine/april-2026/print",
          "/magazine/april-2026/cover",
        ],
      },
    ],
    host: root,
    sitemap: `${root}/sitemap.xml`,
  };
}
