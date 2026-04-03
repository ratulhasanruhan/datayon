/**
 * `magazine-dist/` থেকে PDF ও কভার PNG আপলোড করে `issues` ডকুমেন্ট (issue_number ০১) আপডেট করে।
 * আগে `npm run magazine:pdf` চালান।
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client, Databases, ID, Permission, Query, Role, Storage } from "node-appwrite";
import { InputFile } from "node-appwrite/file";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;
const bucketId =
  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_MAGAZINE ?? "magazine-assets";

const DB = "main";
const ISS = "issues";

const pdfPath = path.join(root, "magazine-dist", "magazine-april-2026.pdf");
const coverPath = path.join(root, "magazine-dist", "magazine-april-2026-cover.png");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!endpoint || !projectId || !apiKey) {
    console.error(
      "Missing NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID, or APPWRITE_API_KEY"
    );
    process.exit(1);
  }
  if (!fs.existsSync(pdfPath) || !fs.existsSync(coverPath)) {
    console.error("Run npm run magazine:pdf first — expected files in magazine-dist/");
    process.exit(1);
  }

  const readAny = [Permission.read(Role.any())];
  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const storage = new Storage(client);
  const databases = new Databases(client);

  try {
    await storage.createBucket({
      bucketId,
      name: "Magazine assets",
      permissions: readAny,
      fileSecurity: false,
      allowedFileExtensions: ["pdf", "png"],
    });
    console.log("Created bucket:", bucketId);
  } catch (e) {
    if (String(e.code) === "409") {
      console.log("Bucket exists:", bucketId);
    } else {
      console.error("Bucket:", e.message ?? e);
      throw e;
    }
  }

  let createdAttr = false;
  for (const key of ["magazine_cover_file_id", "magazine_pdf_file_id"]) {
    try {
      await databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key,
        size: 36,
        required: false,
      });
      console.log("Created attribute:", key);
      createdAttr = true;
      await sleep(2500);
    } catch (e) {
      if (String(e.code) === "409") {
        console.log("Attribute exists:", key);
      } else {
        throw e;
      }
    }
  }
  if (createdAttr) {
    console.log("Waiting for attributes to be available...");
    await sleep(5000);
  }

  const pdfBuf = fs.readFileSync(pdfPath);
  const coverBuf = fs.readFileSync(coverPath);

  const pdfFile = await storage.createFile({
    bucketId,
    fileId: ID.unique(),
    file: InputFile.fromBuffer(pdfBuf, "magazine-april-2026.pdf"),
    permissions: readAny,
  });
  const coverFile = await storage.createFile({
    bucketId,
    fileId: ID.unique(),
    file: InputFile.fromBuffer(coverBuf, "magazine-april-2026-cover.png"),
    permissions: readAny,
  });

  const res = await databases.listDocuments(DB, ISS, [
    Query.equal("issue_number", "০১"),
    Query.limit(1),
  ]);
  const doc = res.documents[0];
  if (!doc) {
    console.error("No issue with issue_number ০১ — seed Appwrite or create the document.");
    process.exit(1);
  }

  await databases.updateDocument(DB, ISS, doc.$id, {
    magazine_pdf_file_id: pdfFile.$id,
    magazine_cover_file_id: coverFile.$id,
  });

  console.log("Updated issue", doc.$id);
  console.log("  magazine_pdf_file_id:", pdfFile.$id);
  console.log("  magazine_cover_file_id:", coverFile.$id);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
