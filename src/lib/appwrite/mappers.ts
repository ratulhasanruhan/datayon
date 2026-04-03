import type { Models } from "node-appwrite";
import type { Article, MagazineIssue } from "@/types/content";

/** Appwrite `Document` typings omit collection attributes; we read them dynamically. */
type Doc = Models.Document & Record<string, unknown>;

export function mapArticleDoc(doc: Models.Document): Article {
  const d = doc as Doc;
  return {
    id: doc.$id,
    title: String(d.title ?? ""),
    slug: String(d.slug ?? ""),
    excerpt: String(d.excerpt ?? ""),
    category: String(d.category ?? ""),
    readTime: String(d.read_time ?? ""),
    publishedAt: String(d.published_at ?? ""),
    featured: Boolean(d.featured),
    content: d.content != null ? String(d.content) : undefined,
    coverFileId:
      d.cover_file_id != null && String(d.cover_file_id).length > 0
        ? String(d.cover_file_id)
        : undefined,
  };
}

export function mapIssueDoc(doc: Models.Document): MagazineIssue {
  const d = doc as Doc;
  return {
    id: doc.$id,
    issueNumber: String(d.issue_number ?? ""),
    monthLabel: String(d.month_label ?? ""),
    headline: String(d.headline ?? ""),
    excerpt: String(d.excerpt ?? ""),
    coverLine: String(d.cover_line ?? ""),
    sortOrder: Number(d.sort_order ?? 0),
    magazineCoverFileId:
      d.magazine_cover_file_id != null &&
      String(d.magazine_cover_file_id).length > 0
        ? String(d.magazine_cover_file_id)
        : undefined,
    magazinePdfFileId:
      d.magazine_pdf_file_id != null && String(d.magazine_pdf_file_id).length > 0
        ? String(d.magazine_pdf_file_id)
        : undefined,
  };
}
