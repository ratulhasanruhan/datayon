import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/brand";
import { SITE_DESCRIPTION } from "@/lib/seo/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.name} — ${BRAND.tagline}`,
    short_name: BRAND.nameLatin,
    description: SITE_DESCRIPTION,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#f0ebe0",
    theme_color: "#0d1b2a",
    lang: "bn",
    icons: [
      {
        src: "/brand/datayon-mark.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
    ],
  };
}
