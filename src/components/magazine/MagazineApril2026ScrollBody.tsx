import Link from "next/link";
import Image from "next/image";
import { BRAND } from "@/lib/brand";
import {
  april2026BodySheets,
  april2026FrontSheets,
} from "@/components/magazine/data/april-2026";
import { MagazineCoverApril2026 } from "@/components/magazine/MagazineCoverApril2026";
import { MagazineSheetPage } from "@/components/magazine/MagazineSheet";
import { MagazineTocPage } from "@/components/magazine/MagazineTocPage";

type Props = {
  /** Appwrite Storage কভার URL — থাকলে স্ক্রল মোডে সেটি দেখায় (ফ্লিপবুকের সঙ্গে মিল) */
  remoteCoverUrl?: string | null;
};

/** স্ক্রল মোডের জন্য; প্রিন্ট রুটে `remoteCoverUrl` ছাড়া কল করুন → স্থানীয় প্রচ্ছদ (PDF জেনারেশন) */
export function MagazineApril2026ScrollBody({ remoteCoverUrl = null }: Props) {
  const front = april2026FrontSheets();
  const body = april2026BodySheets();

  return (
    <>
      {remoteCoverUrl != null && remoteCoverUrl.length > 0 ? (
        <section
          data-magazine-cover
          className="magazine-sheet border-b border-border/30 bg-cream text-navy"
          aria-label="প্রচ্ছদ"
        >
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[520px]">
            <Image
              src={remoteCoverUrl}
              alt="ডেটায়ন এপ্রিল ২০২৬ প্রচ্ছদ"
              fill
              className="object-cover object-top"
              sizes="520px"
              priority
            />
          </div>
        </section>
      ) : (
        <MagazineCoverApril2026 />
      )}

      {front.map((sheet) => (
        <MagazineSheetPage key={sheet.id} sheet={sheet} />
      ))}

      <MagazineTocPage />

      {body.map((sheet) => (
        <MagazineSheetPage key={sheet.id} sheet={sheet} />
      ))}

      <div className="no-print border-t border-border px-4 py-10 text-center">
        <Link
          href="/magazine"
          className="font-sans text-sm font-medium text-teal hover:underline"
        >
          ← মাসিক তালিকা
        </Link>
        <p className="mt-3 font-sans text-xs text-muted">
          {BRAND.name} · {BRAND.url} · {BRAND.editorEmail}
        </p>
      </div>
    </>
  );
}
