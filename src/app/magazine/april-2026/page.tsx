import type { Metadata } from "next";
import { MagazineApril2026Reader } from "@/components/magazine/MagazineApril2026Reader";
import { MagazineApril2026ScrollBody } from "@/components/magazine/MagazineApril2026ScrollBody";
import { MagazinePrintMount } from "@/components/magazine/MagazinePrintMount";
import { APRIL_2026_META } from "@/components/magazine/data/april-2026";
import { APPWRITE_BUCKET_MAGAZINE } from "@/lib/appwrite/constants";
import { getApril2026Issue } from "@/lib/appwrite/queries";
import { getStorageFileViewUrl } from "@/lib/appwrite/storage-url";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://datayon.bd";

/** আপলোডের পর ফাইল আইডি দেখতে রিভ্যালিডেশন */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const issue = await getApril2026Issue();
  const coverOg = getStorageFileViewUrl(
    APPWRITE_BUCKET_MAGAZINE,
    issue?.magazineCoverFileId
  );
  const base: Metadata = {
    title: "সংখ্যা ০১ · এপ্রিল ২০২৬",
    description:
      "ডেটায়ন ম্যাগাজিন — AI, টেক নিউজ, স্টার্টআপ, ডেটা, টিউটোরিয়াল, টিপস, শেখা ও প্রোগ্রামিং। পূর্ণ সংখ্যা (প্রিন্ট/PDF)।",
    openGraph: {
      title: `ডেটায়ন · ${APRIL_2026_META.issueLabel} · ${APRIL_2026_META.monthLabel}`,
      description: APRIL_2026_META.cover.deck,
      type: "article",
      locale: "bn_BD",
      url: `${siteUrl.replace(/\/$/, "")}/magazine/april-2026`,
      ...(coverOg
        ? { images: [{ url: coverOg, width: 1200, height: 1600, alt: "ডেটায়ন এপ্রিল ২০২৬ প্রচ্ছদ" }] }
        : {}),
    },
  };
  return base;
}

export default async function MagazineApril2026Page() {
  const issue = await getApril2026Issue();
  const remoteCoverUrl = getStorageFileViewUrl(
    APPWRITE_BUCKET_MAGAZINE,
    issue?.magazineCoverFileId
  );
  const pdfUrl = getStorageFileViewUrl(
    APPWRITE_BUCKET_MAGAZINE,
    issue?.magazinePdfFileId
  );

  return (
    <>
      <MagazinePrintMount />
      <main
        id="main"
        className="magazine-print-root bg-paper print:bg-paper"
      >
        <MagazineApril2026Reader
          remoteCoverUrl={remoteCoverUrl}
          pdfUrl={pdfUrl}
        >
          <MagazineApril2026ScrollBody remoteCoverUrl={remoteCoverUrl} />
        </MagazineApril2026Reader>
      </main>
    </>
  );
}
