import { NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";
import { isAppwriteConfigured } from "@/lib/appwrite/config";
import {
  APPWRITE_DATABASE_ID,
  COLLECTION_SUBSCRIBERS,
} from "@/lib/appwrite/constants";
import { getDatabases } from "@/lib/appwrite/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!isAppwriteConfigured()) {
    return NextResponse.json(
      { ok: false, error: "service_unavailable" },
      { status: 503 }
    );
  }

  let body: { name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();

  if (!name || name.length > 200) {
    return NextResponse.json({ ok: false, error: "invalid_name" }, { status: 400 });
  }
  if (!email || email.length > 320 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  try {
    const db = getDatabases();
    const existing = await db.listDocuments(
      APPWRITE_DATABASE_ID,
      COLLECTION_SUBSCRIBERS,
      [Query.equal("email", email), Query.limit(1)]
    );
    if (existing.documents.length > 0) {
      return NextResponse.json({ ok: true, already: true });
    }

    await db.createDocument(
      APPWRITE_DATABASE_ID,
      COLLECTION_SUBSCRIBERS,
      ID.unique(),
      { name, email }
    );
    return NextResponse.json({ ok: true, already: false });
  } catch (e) {
    console.error("[api/subscribe]", e);
    return NextResponse.json(
      { ok: false, error: "internal_error" },
      { status: 500 }
    );
  }
}
