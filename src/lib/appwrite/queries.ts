import { Query } from "node-appwrite";
import { categoryFieldValuesForFilter } from "@/lib/articles/categories";
import { getDatabases } from "@/lib/appwrite/server";
import {
  APPWRITE_DATABASE_ID,
  COLLECTION_ARTICLES,
  COLLECTION_ISSUES,
} from "@/lib/appwrite/constants";
import { mapArticleDoc, mapIssueDoc } from "@/lib/appwrite/mappers";
import type { Article, MagazineIssue } from "@/types/content";
import { isAppwriteConfigured } from "@/lib/appwrite/config";

/** List order: last modified (Appwrite system attribute). */
const ARTICLE_ORDER_DESC = Query.orderDesc("$updatedAt");

async function safeList<T>(
  fn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error("[appwrite]", e);
    return fallback;
  }
}

type ArticleListOptions = {
  /** Canonical Bengali label — `categoryFieldValuesForFilter` may match legacy rows */
  category?: string;
  /** Substring match on `title` or `excerpt` (Appwrite `contains`) */
  search?: string;
};

function categoryClause(label: string) {
  const values = categoryFieldValuesForFilter(label);
  return values.length === 1
    ? Query.equal("category", values[0])
    : Query.or(values.map((v) => Query.equal("category", v)));
}

function searchClause(term: string) {
  const t = term.trim().slice(0, 200);
  if (!t) return null;
  return Query.or([Query.contains("title", t), Query.contains("excerpt", t)]);
}

function articleListQueries(
  limit: number,
  options?: ArticleListOptions
): string[] {
  const filters: string[] = [];
  if (options?.category) {
    filters.push(categoryClause(options.category));
  }
  const search = searchClause(options?.search ?? "");
  if (search) {
    filters.push(search);
  }
  return [...filters, ARTICLE_ORDER_DESC, Query.limit(limit)];
}

export async function getArticles(
  limit = 24,
  options?: ArticleListOptions
): Promise<Article[]> {
  if (!isAppwriteConfigured()) return [];
  return safeList(async () => {
    const db = getDatabases();
    const q = articleListQueries(limit, options);
    const res = await db.listDocuments(APPWRITE_DATABASE_ID, COLLECTION_ARTICLES, q);
    return res.documents.map(mapArticleDoc);
  }, []);
}

export async function getFeaturedArticles(
  limit = 3,
  options?: ArticleListOptions
): Promise<Article[]> {
  if (!isAppwriteConfigured()) return [];
  return safeList(async () => {
    const db = getDatabases();
    const featuredQueries = options?.category
      ? [
          Query.equal("featured", true),
          categoryClause(options.category),
          ARTICLE_ORDER_DESC,
          Query.limit(limit),
        ]
      : [Query.equal("featured", true), ARTICLE_ORDER_DESC, Query.limit(limit)];
    const res = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ARTICLES,
      featuredQueries
    );
    if (res.documents.length > 0) {
      return res.documents.map(mapArticleDoc);
    }
    const fallback = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ARTICLES,
      options?.category
        ? [categoryClause(options.category), ARTICLE_ORDER_DESC, Query.limit(limit)]
        : [ARTICLE_ORDER_DESC, Query.limit(limit)]
    );
    return fallback.documents.map(mapArticleDoc);
  }, []);
}

export async function getLatestIssue(): Promise<MagazineIssue | null> {
  if (!isAppwriteConfigured()) return null;
  return safeList(async () => {
    const db = getDatabases();
    const res = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ISSUES,
      [Query.orderDesc("sort_order"), Query.limit(1)]
    );
    const first = res.documents[0];
    return first ? mapIssueDoc(first) : null;
  }, null);
}

export async function getIssues(limit = 12): Promise<MagazineIssue[]> {
  if (!isAppwriteConfigured()) return [];
  return safeList(async () => {
    const db = getDatabases();
    const res = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ISSUES,
      [Query.orderDesc("sort_order"), Query.limit(limit)]
    );
    return res.documents.map(mapIssueDoc);
  }, []);
}

export type IssueSearchOptions = {
  search: string;
};

/** Substring search on headline, excerpt, cover line, month label, issue number */
export async function searchIssues(
  limit = 24,
  options: IssueSearchOptions
): Promise<MagazineIssue[]> {
  if (!isAppwriteConfigured()) return [];
  const clause = issueSearchClause(options.search);
  if (!clause) return [];
  return safeList(async () => {
    const db = getDatabases();
    const res = await db.listDocuments(APPWRITE_DATABASE_ID, COLLECTION_ISSUES, [
      clause,
      Query.orderDesc("sort_order"),
      Query.limit(limit),
    ]);
    return res.documents.map(mapIssueDoc);
  }, []);
}

function issueSearchClause(term: string) {
  const t = term.trim().slice(0, 200);
  if (!t) return null;
  return Query.or([
    Query.contains("headline", t),
    Query.contains("excerpt", t),
    Query.contains("cover_line", t),
    Query.contains("month_label", t),
    Query.contains("issue_number", t),
  ]);
}

/** সংখ্যা ০১ · এপ্রিল ২০২৬ (issue_number `০১`). */
export async function getApril2026Issue(): Promise<MagazineIssue | null> {
  if (!isAppwriteConfigured()) return null;
  return safeList(async () => {
    const db = getDatabases();
    const res = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ISSUES,
      [Query.equal("issue_number", "০১"), Query.limit(1)]
    );
    const first = res.documents[0];
    return first ? mapIssueDoc(first) : null;
  }, null);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!isAppwriteConfigured() || !slug) return null;
  return safeList(async () => {
    const db = getDatabases();
    const res = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ARTICLES,
      [Query.equal("slug", slug), Query.limit(1)]
    );
    const first = res.documents[0];
    return first ? mapArticleDoc(first) : null;
  }, null);
}
