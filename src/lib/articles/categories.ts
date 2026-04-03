/**
 * Canonical আর্টিকেল বিভাগ — Appwrite `articles.category` stores the **label** (Bengali).
 * URLs use ASCII **slug** (`?category=analysis`).
 */
export const ARTICLE_CATEGORY_ENTRIES = [
  { slug: "analysis", label: "বিশ্লেষণ" },
  { slug: "startup", label: "স্টার্টআপ" },
  { slug: "interview", label: "সাক্ষাৎকার" },
  { slug: "policy", label: "নীতি" },
  { slug: "ai", label: "AI" },
  { slug: "education", label: "শিক্ষা" },
] as const;

export type ArticleCategorySlug = (typeof ARTICLE_CATEGORY_ENTRIES)[number]["slug"];

export function getCategoryLabelBySlug(slug: string | undefined | null): string | null {
  if (!slug) return null;
  const found = ARTICLE_CATEGORY_ENTRIES.find((c) => c.slug === slug);
  return found ? found.label : null;
}

/** Map stored DB label → URL slug when we want a filter link */
export function getCategorySlugFromLabel(label: string): string | null {
  const t = label.trim();
  const found = ARTICLE_CATEGORY_ENTRIES.find((c) => c.label === t);
  return found ? found.slug : null;
}
