/**
 * Public file URLs for article covers (Appwrite Storage `view`).
 * Bucket must allow `read` for `any` (see seed script).
 */
export function getArticleCoverUrl(
  fileId: string | undefined | null
): string | null {
  if (!fileId || typeof fileId !== "string") return null;
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(
    /\/$/,
    ""
  );
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  const bucket =
    process.env.NEXT_PUBLIC_APPWRITE_BUCKET_COVERS ?? "article-covers";
  if (!endpoint || !project) return null;
  return `${endpoint}/storage/buckets/${bucket}/files/${fileId}/view?project=${encodeURIComponent(project)}`;
}
