import { Query } from "node-appwrite";
import { getDatabases } from "@/lib/appwrite/server";
import {
  APPWRITE_DATABASE_ID,
  COLLECTION_ARTICLES,
  COLLECTION_ISSUES,
} from "@/lib/appwrite/constants";
import { mapArticleDoc, mapIssueDoc } from "@/lib/appwrite/mappers";
import type { Article, MagazineIssue } from "@/types/content";
import { isAppwriteConfigured } from "@/lib/appwrite/config";

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

export async function getArticles(limit = 24): Promise<Article[]> {
  if (!isAppwriteConfigured()) return [];
  return safeList(async () => {
    const db = getDatabases();
    const res = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ARTICLES,
      [Query.orderDesc("published_at"), Query.limit(limit)]
    );
    return res.documents.map(mapArticleDoc);
  }, []);
}

export async function getFeaturedArticles(limit = 3): Promise<Article[]> {
  if (!isAppwriteConfigured()) return [];
  return safeList(async () => {
    const db = getDatabases();
    const res = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ARTICLES,
      [
        Query.equal("featured", true),
        Query.orderDesc("published_at"),
        Query.limit(limit),
      ]
    );
    if (res.documents.length > 0) {
      return res.documents.map(mapArticleDoc);
    }
    const fallback = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_ARTICLES,
      [Query.orderDesc("published_at"), Query.limit(limit)]
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
