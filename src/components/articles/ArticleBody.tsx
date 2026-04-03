import {
  isPlainArticleContent,
  isProbablyHtml,
  markdownToSafeHtml,
  sanitizeArticleHtml,
} from "@/lib/articles/article-content";

type Props = {
  content: string;
};

/**
 * Renders article body: plain text (line → paragraph), Markdown, or HTML — all sanitized when rich.
 */
export function ArticleBody({ content }: Props) {
  if (isPlainArticleContent(content)) {
    return (
      <div className="prose-bn mt-12 text-ink/95">
        {content.split("\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    );
  }

  const html = isProbablyHtml(content)
    ? sanitizeArticleHtml(content)
    : markdownToSafeHtml(content);

  return (
    <div
      className="prose-bn article-body-rich mt-12 text-ink/95"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
