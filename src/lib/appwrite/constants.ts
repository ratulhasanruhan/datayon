/** Appwrite Database — create in Console or run `npm run seed:appwrite`. */
export const APPWRITE_DATABASE_ID = "main";
export const COLLECTION_ARTICLES = "articles";
export const COLLECTION_ISSUES = "issues";
/** Magazine email subscribers (`name` + `email`). Created via `npm run seed:appwrite`. */
export const COLLECTION_SUBSCRIBERS = "subscribers";

/** Storage bucket for article cover images (public read). Override via env. */
export const APPWRITE_BUCKET_COVERS =
  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_COVERS ?? "article-covers";

/** Magazine PDF + exported cover PNG (`magazine-assets`). */
export const APPWRITE_BUCKET_MAGAZINE =
  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_MAGAZINE ?? "magazine-assets";
