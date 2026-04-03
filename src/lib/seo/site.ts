import { BRAND } from "@/lib/brand";

/** Production canonical origin — set `NEXT_PUBLIC_SITE_URL=https://datayon.bd` on Vercel. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://datayon.bd"
).replace(/\/$/, "");

export const SITE_DESCRIPTION =
  "বাংলায় প্রযুক্তি, স্টার্টআপ, AI, ডেটা, নীতি ও সংস্কৃতি — ডেটায়ন মাসিক ম্যাগাজিন ও অনলাইন আর্টিকেল।";

export const SITE_DESCRIPTION_EN =
  "Datayon — Bangla tech magazine: startups, AI, data, policy & culture.";

export const SEO_KEYWORDS = [
  "ডেটায়ন",
  "Datayon",
  "বাংলা প্রযুক্তি",
  "টেক ম্যাগাজিন",
  "Bangladesh tech",
  "বাংলা টেক নিউজ",
  "স্টার্টআপ বাংলাদেশ",
  "AI বাংলা",
  "datayon.bd",
] as const;

export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${p}`;
}
