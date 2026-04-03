/**
 * Public Storage file `view` URL (works when bucket allows read:any).
 */
export function getStorageFileViewUrl(
  bucketId: string,
  fileId: string | undefined | null
): string | null {
  if (!fileId || typeof fileId !== "string") return null;
  const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT?.replace(
    /\/$/,
    ""
  );
  const project = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
  if (!endpoint || !project) return null;
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${encodeURIComponent(project)}`;
}
