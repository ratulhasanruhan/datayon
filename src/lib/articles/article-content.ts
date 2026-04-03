import sanitizeHtml from "sanitize-html";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

/** Detects fragment that looks like HTML tags (CMS / pasted HTML). */
export function isProbablyHtml(s: string): boolean {
  return /<[a-zA-Z][^>]*>|<\/[a-zA-Z]+>/.test(s);
}

/** Detects common Markdown patterns (headings, lists, links, emphasis, fences, tables). */
export function isProbablyMarkdown(s: string): boolean {
  if (isProbablyHtml(s)) return false;
  const lines = s.split("\n");
  for (const line of lines) {
    const l = line.trim();
    if (/^#{1,6}\s/.test(l)) return true;
    if (/^[-*+]\s/.test(l)) return true;
    if (/^\d+\.\s/.test(l)) return true;
    if (l.startsWith(">")) return true;
    if (l.startsWith("```")) return true;
    if (/^\|.+\|/.test(l)) return true;
  }
  if (/\*\*[^*]+\*\*/.test(s)) return true;
  if (/\[[^\]]+\]\([^)]+\)/.test(s)) return true;
  if (/`[^`]+`/.test(s)) return true;
  if (/^---+$/m.test(s)) return true;
  return false;
}

/** Plain text: not HTML and not Markdown — keep legacy line-by-line `<p>` rendering. */
export function isPlainArticleContent(s: string): boolean {
  return !isProbablyHtml(s) && !isProbablyMarkdown(s);
}

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      a: ["href", "name", "target", "rel"],
    },
  });
}

export function markdownToSafeHtml(md: string): string {
  const raw = marked.parse(md) as string;
  return sanitizeArticleHtml(raw);
}
