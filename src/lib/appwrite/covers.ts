import { APPWRITE_BUCKET_COVERS } from "@/lib/appwrite/constants";
import { getStorageFileViewUrl } from "@/lib/appwrite/storage-url";

/** Article cover image (`article-covers` bucket). */
export function getArticleCoverUrl(
  fileId: string | undefined | null
): string | null {
  return getStorageFileViewUrl(APPWRITE_BUCKET_COVERS, fileId);
}
