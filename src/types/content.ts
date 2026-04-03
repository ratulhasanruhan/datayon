/** Article row (Appwrite `articles` collection). */
export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  /** Appwrite `$updatedAt` — use for sort and “last updated” */
  updatedAt: string;
  featured: boolean;
  content?: string;
  /** Appwrite Storage file id (`article-covers` bucket). */
  coverFileId?: string;
};

/** Magazine issue row (Appwrite `issues` collection). */
export type MagazineIssue = {
  id: string;
  issueNumber: string;
  monthLabel: string;
  headline: string;
  excerpt: string;
  coverLine: string;
  sortOrder: number;
  /** `magazine-assets` bucket — exported cover PNG */
  magazineCoverFileId?: string;
  /** `magazine-assets` bucket — full issue PDF */
  magazinePdfFileId?: string;
};
