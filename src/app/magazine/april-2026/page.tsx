import type { Metadata } from "next";
import { MagazineApril2026Reader } from "@/components/magazine/MagazineApril2026Reader";
import { MagazineApril2026ScrollBody } from "@/components/magazine/MagazineApril2026ScrollBody";
import { MagazinePrintMount } from "@/components/magazine/MagazinePrintMount";
import { APRIL_2026_META } from "@/components/magazine/data/april-2026";
import { APPWRITE_BUCKET_MAGAZINE } from "@/lib/appwrite/constants";
import { getApril2026Issue } from "@/lib/appwrite/queries";
import { getStorageFileViewUrl } from "@/lib/appwrite/storage-url";
import { buildPageMetadata, defaultOgImages } from "@/lib/seo/page-metadata";

/** আপলোডের পর ফাইল আইডি দেখতে রিভ্যালিডেশন */
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const issue = await getApril2026Issue();
  const coverOg = getStorageFileViewUrl(
    APPWRITE_BUCKET_MAGAZINE,
    issue?.magazineCoverFileId
  );
  const title = "সংখ্যা ০১ · এপ্রিল ২০২৬";
  const description =
    "ডেটায়ন ম্যাগাজিন — AI, টেক নিউজ, স্টার্টআপ, ডেটা, টিউটোরিয়াল, টিপস, শেখা ও প্রোগ্রামিং। পূর্ণ সংখ্যা (প্রিন্ট/PDF)।";
  const ogTitle = `ডেটায়ন · ${APRIL_2026_META.issueLabel} · ${APRIL_2026_META.monthLabel}`;
  const images = coverOg
    ? [
        {
          url: coverOg,
          width: 1200,
          height: 1600,
          alt: "ডেটায়ন এপ্রিল ২০২৬ প্রচ্ছদ",
        },
      ]
    : defaultOgImages(`${ogTitle} · ডেটায়ন`);

  return buildPageMetadata({
    title,
    description,
    path: "/magazine/april-2026",
    descriptionEn: `Datayon magazine ${APRIL_2026_META.monthLabel} — Bangla tech, AI, startups, tutorials, full issue.`,
    openGraphTitle: ogTitle,
    openGraphDescription: APRIL_2026_META.cover.deck,
    ogType: "article",
    images,
  });
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
