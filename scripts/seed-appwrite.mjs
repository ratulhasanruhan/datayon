/**
 * One-time setup: database `main`, collections, attributes, sample documents.
 * Usage (from repo root):  node --env-file=.env.local scripts/seed-appwrite.mjs
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
const ISS = "issues";
const BUCKET = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_COVERS ?? "article-covers";
const BUCKET_MAGAZINE =
  process.env.NEXT_PUBLIC_APPWRITE_BUCKET_MAGAZINE ?? "magazine-assets";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  if (!endpoint || !projectId || !apiKey) {
    console.error("Missing NEXT_PUBLIC_APPWRITE_ENDPOINT, NEXT_PUBLIC_APPWRITE_PROJECT_ID, or APPWRITE_API_KEY");
    process.exit(1);
  }

  const client = new Client().setEndpoint(endpoint).setProject(projectId).setKey(apiKey);
  const databases = new Databases(client);
  const storage = new Storage(client);

  console.log("Endpoint:", endpoint, "\nProject:", projectId);

  try {
    await databases.create({ databaseId: DB, name: "Datayon Main" });
    console.log("Created database:", DB);
  } catch (e) {
    if (String(e.code) === "409" || e?.type === "database_already_exists") {
      console.log("Database already exists:", DB);
    } else {
      throw e;
    }
  }

  const readAny = [Permission.read(Role.any())];

  try {
    await databases.createCollection({
      databaseId: DB,
      collectionId: ART,
      name: "Articles",
      permissions: readAny,
      documentSecurity: false,
    });
    console.log("Created collection:", ART);
  } catch (e) {
    if (String(e.code) === "409") {
      console.log("Collection exists:", ART);
    } else {
      throw e;
    }
  }

  try {
    await databases.createCollection({
      databaseId: DB,
      collectionId: ISS,
      name: "Issues",
      permissions: readAny,
      documentSecurity: false,
    });
    console.log("Created collection:", ISS);
  } catch (e) {
    if (String(e.code) === "409") {
      console.log("Collection exists:", ISS);
    } else {
      throw e;
    }
  }

  const attrFns = [
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "title",
        size: 512,
        required: true,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "slug",
        size: 256,
        required: true,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "excerpt",
        size: 4000,
        required: false,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "category",
        size: 128,
        required: false,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "read_time",
        size: 64,
        required: false,
      }),
    () =>
      databases.createDatetimeAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "published_at",
        required: false,
      }),
    () =>
      databases.createBooleanAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "featured",
        required: false,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "content",
        size: 120000,
        required: false,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ART,
        key: "cover_file_id",
        size: 36,
        required: false,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "issue_number",
        size: 32,
        required: true,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "month_label",
        size: 128,
        required: true,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "headline",
        size: 512,
        required: true,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "excerpt",
        size: 4000,
        required: false,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "cover_line",
        size: 512,
        required: false,
      }),
    () =>
      databases.createIntegerAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "sort_order",
        required: true,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "magazine_cover_file_id",
        size: 36,
        required: false,
      }),
    () =>
      databases.createStringAttribute({
        databaseId: DB,
        collectionId: ISS,
        key: "magazine_pdf_file_id",
        size: 36,
        required: false,
      }),
  ];

  for (const fn of attrFns) {
    try {
      await fn();
      await sleep(2500);
    } catch (e) {
      if (String(e.code) === "409") {
        /* attribute exists */
      } else {
        console.warn("Attribute note:", e.message ?? e);
      }
    }
  }

  console.log("Waiting for attributes to become available...");
  await sleep(5000);

  try {
    await storage.createBucket({
      bucketId: BUCKET,
      name: "Article covers",
      permissions: readAny,
      fileSecurity: false,
      allowedFileExtensions: ["jpg", "jpeg", "png", "webp", "gif"],
    });
    console.log("Created bucket:", BUCKET);
  } catch (e) {
    if (String(e.code) === "409") {
      console.log("Bucket exists:", BUCKET);
    } else {
      console.warn("Bucket note:", e.message ?? e);
    }
  }

  try {
    await storage.createBucket({
      bucketId: BUCKET_MAGAZINE,
      name: "Magazine assets",
      permissions: readAny,
      fileSecurity: false,
      allowedFileExtensions: ["pdf", "png"],
    });
    console.log("Created bucket:", BUCKET_MAGAZINE);
  } catch (e) {
    if (String(e.code) === "409") {
      console.log("Bucket exists:", BUCKET_MAGAZINE);
    } else {
      console.warn("Magazine bucket note:", e.message ?? e);
    }
  }

  async function uploadArticleCover(slug) {
    const url = `https://picsum.photos/seed/${encodeURIComponent(slug)}/960/540`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const file = await storage.createFile({
      bucketId: BUCKET,
      fileId: ID.unique(),
      file: InputFile.fromBuffer(buf, `${slug}.jpg`),
      permissions: readAny,
    });
    return file.$id;
  }

  const existingA = await databases.listDocuments(DB, ART, [Query.limit(1)]);
  const existingI = await databases.listDocuments(DB, ISS, [Query.limit(1)]);
  const skipIssues = existingI.total > 0;
  const skipArticles = existingA.total > 0;

  const now = new Date().toISOString();

  const issueDocs = [
    {
      issue_number: "০১",
      month_label: "এপ্রিল ২০২৬",
      headline: "বাংলাদেশের ডেটা অর্থনীতি — কতটা প্রস্তুত আমরা?",
      excerpt:
        "তথ্য প্রযুক্তির নতুন যুগে বাংলাদেশ কোথায় দাঁড়িয়ে — প্রচ্ছদ প্রবন্ধ ও নির্বাচিত বিশ্লেষণ।",
      cover_line: "ডেটা সেন্টার থেকে স্টার্টআপ — একটি বিস্তৃত চিত্র।",
      sort_order: 1,
    },
  ];

  if (!skipIssues) {
    for (const row of issueDocs) {
      try {
        await databases.createDocument(DB, ISS, ID.unique(), row, [
          Permission.read(Role.any()),
        ]);
        console.log("Seeded issue document");
      } catch (e) {
        console.warn("Issue seed:", e.message ?? e);
      }
    }
  } else {
    console.log("Skipping issue documents (already have", existingI.total, ")");
  }

  const articleRows = [
    {
      title: "চ্যাটবট থেকে এজেন্ট — পরবর্তী ধাপ",
      slug: "chatbot-to-agent-next",
      excerpt: "লার্জ ল্যাঙ্গুয়েজ মডেল এখন শুধু উত্তর দেয় না—কাজ করার এজেন্টে পরিণত হচ্ছে।",
      category: "বিশ্লেষণ",
      read_time: "৫ মিনিটে পড়ুন",
      published_at: now,
      featured: true,
      content:
        "এটি একটি নমুনা প্রবন্ধ। বাংলাদেশের প্রেক্ষাপটে AI এজেন্ট ও নীতির দিকগুলো এখানে বিস্তারিত যুক্ত করা যাবে।",
    },
    {
      title: "ঢাকার টেক ইকোসিস্টেম ২০২৬",
      slug: "dhaka-tech-ecosystem-2026",
      excerpt: "ফান্ডিং, ট্যালেন্ট ও রেগুলেটরি পরিবেশ—একটি দ্রুত মানচিত্র।",
      category: "স্টার্টআপ",
      read_time: "৬ মিনিটে পড়ুন",
      published_at: now,
      featured: true,
      content: "স্টার্টআপ ও বিনিয়োগের প্রবণতা সংক্ষেপে।",
    },
    {
      title: `"কোড লেখা মানে গল্প বলা"`,
      slug: "code-as-story-interview",
      excerpt: "একজন বাংলাদেশি ডেভেলপারের সাক্ষাৎকার—কোড সংস্কৃতি ও ভবিষ্যৎ।",
      category: "সাক্ষাৎকার",
      read_time: "৪ মিনিটে পড়ুন",
      published_at: now,
      featured: true,
      content: "সাক্ষাৎকারের সম্পূর্ণ টেক্সট এখানে থাকবে।",
    },
    {
      title: "ক্লাউড নিরাপত্তা ১০১",
      slug: "cloud-security-101",
      excerpt: "ছোট দলের জন্য প্রাথমিক চেকলিস্ট।",
      category: "বিশ্লেষণ",
      read_time: "৭ মিনিটে পড়ুন",
      published_at: now,
      featured: false,
      content: "নিরাপত্তার মৌলিক ধাপ।",
    },
  ];

  if (!skipArticles) {
    for (const row of articleRows) {
      let coverFileId;
      try {
        coverFileId = await uploadArticleCover(row.slug);
      } catch (e) {
        console.warn("Cover upload skipped:", row.slug, e.message ?? e);
      }
      const payload = {
        ...row,
        ...(coverFileId ? { cover_file_id: coverFileId } : {}),
      };
      try {
        await databases.createDocument(DB, ART, ID.unique(), payload, [
          Permission.read(Role.any()),
        ]);
        console.log("Seeded article:", row.slug, coverFileId ? "(+cover)" : "");
      } catch (e) {
        console.warn("Article seed:", row.slug, e.message ?? e);
      }
    }
  } else {
    console.log("Skipping article documents (already have", existingA.total, ")");
  }

  console.log("Done. Refresh the site.");
  console.log(
    "Tip: API key needs Databases + Storage scopes. Existing articles: add `cover_file_id` in Console or clear collection and re-seed for sample covers."
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
