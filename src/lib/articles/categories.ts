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
  { slug: "skill", label: "স্কিল" },
  { slug: "ayojon", label: "আয়োজন" },
] as const;

export type ArticleCategorySlug = (typeof ARTICLE_CATEGORY_ENTRIES)[number]["slug"];

/** Old URL `?category=education` → `skill` (শিক্ষা renamed to স্কিল). */
const LEGACY_SLUG_ALIASES: Record<string, ArticleCategorySlug> = {
  education: "skill",
};

export function getCategoryLabelBySlug(slug: string | undefined | null): string | null {
  if (!slug) return null;
  const resolved = LEGACY_SLUG_ALIASES[slug] ?? slug;
  const found = ARTICLE_CATEGORY_ENTRIES.find((c) => c.slug === resolved);
  return found ? found.label : null;
}

/** Map stored DB label → URL slug when we want a filter link */
export function getCategorySlugFromLabel(label: string): string | null {
  const t = label.trim();
  const found = ARTICLE_CATEGORY_ENTRIES.find((c) => c.label === t);
  if (found) return found.slug;
  /** Legacy Appwrite value before rename to স্কিল */
  if (t === "শিক্ষা") return "skill";
  return null;
}

/**
 * Appwrite `category` field values to match for a canonical label (handles renames).
 * @see getArticles — uses OR when more than one value
 */
export function categoryFieldValuesForFilter(label: string): string[] {
  if (label === "স্কিল") return ["স্কিল", "শিক্ষা"];
  return [label];
}
