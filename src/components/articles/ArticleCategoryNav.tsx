import Link from "next/link";
import {
  ARTICLE_CATEGORY_ENTRIES,
} from "@/lib/articles/categories";
import { cn } from "@/lib/cn";

type Props = {
  activeSlug?: string | null;
  /** Extra classes for the nav wrapper (e.g. home vs archive spacing) */
  className?: string;
};

/** Filter chips: `/articles` and `/articles?category=<slug>` */
export function ArticleCategoryNav({ activeSlug, className }: Props) {
  return (
    <nav
      className={cn(
        "mb-10 flex flex-wrap gap-2 border-b border-border/60 pb-6",
        className
      )}
      aria-label="বিভাগ অনুযায়ী আর্টিকেল"
    >
      <CategoryChip href="/articles" active={!activeSlug}>
        সব
      </CategoryChip>
      {ARTICLE_CATEGORY_ENTRIES.map((c) => (
        <CategoryChip
          key={c.slug}
          href={`/articles?category=${c.slug}`}
          active={activeSlug === c.slug}
        >
          {c.label}
        </CategoryChip>
      ))}
    </nav>
  );
}

function CategoryChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      className={cn(
        "rounded-full border px-3.5 py-1.5 font-sans text-xs font-medium transition",
        active
          ? "border-teal bg-teal/15 text-ink dark:bg-teal/20 dark:text-cream"
          : "border-border/80 bg-surface-elevated/80 text-muted hover:border-teal/40 hover:text-ink dark:border-navy2 dark:bg-navy-mid/30 dark:hover:text-cream"
      )}
    >
      {children}
    </Link>
  );
}
