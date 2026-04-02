/**
 * Upload sample cover images to Storage and set `cover_file_id` on articles that lack it.
 * Usage: node --env-file=.env.local scripts/backfill-article-covers.mjs
 *
 * Requires: API key with Storage + Databases, bucket `NEXT_PUBLIC_APPWRITE_BUCKET_COVERS`.
 */
import {
  Client,
  Databases,
  ID,
  Permission,
  Query,
  Role,
  Storage,
} from "node-appwrite";
import { InputFile } from "node-appwrite/file";

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const DB = "main";
const ART = "articles";
const BUCKET = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_COVERS ?? "article-covers";
const readAny = [Permission.read(Role.any())];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function uploadCover(storage, slug) {
  const url = `https://picsum.photos/seed/${encodeURIComponent(slug)}/960/540`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  return storage.createFile({
    bucketId: BUCKET,
    fileId: ID.unique(),
    file: InputFile.fromBuffer(buf, `${slug}.jpg`),
    permissions: readAny,
  });
}

async function main() {
  if (!endpoint || !projectId || !apiKey) {
    console.error(
      "Set NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID, APPWRITE_API_KEY"
    );
    process.exit(1);
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const databases = new Databases(client);
  const storage = new Storage(client);

  try {
    await storage.getBucket({ bucketId: BUCKET });
  } catch (e) {
    console.error("Bucket not found:", BUCKET, e.message ?? e);
    process.exit(1);
  }

  let res = await databases.listDocuments(DB, ART, [Query.limit(100)]);
  let docs = res.documents;
  if (res.total > 100) {
    const more = await databases.listDocuments(DB, ART, [
      Query.limit(100),
      Query.offset(100),
    ]);
    docs = docs.concat(more.documents);
  }

  const need = docs.filter((d) => !d.cover_file_id || String(d.cover_file_id).trim() === "");
  console.log("Articles:", docs.length, "| without cover:", need.length);

  for (const doc of need) {
    const slug = String(doc.slug ?? doc.$id);
    try {
      const file = await uploadCover(storage, slug);
      await databases.updateDocument({
        databaseId: DB,
        collectionId: ART,
        documentId: doc.$id,
        data: { cover_file_id: file.$id },
      });
      console.log("Cover OK:", slug, file.$id);
    } catch (e) {
      console.warn("Failed:", slug, e.message ?? e);
    }
    await sleep(400);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
