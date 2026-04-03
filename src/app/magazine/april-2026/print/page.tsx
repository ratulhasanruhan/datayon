import type { Metadata } from "next";
import { MagazineApril2026ScrollBody } from "@/components/magazine/MagazineApril2026ScrollBody";
import { MagazinePrintMount } from "@/components/magazine/MagazinePrintMount";

/**
 * Playwright `page.pdf()` টার্গেট — শুধু স্ক্রল লেআউট, ক্রোম ছাড়া।
 * `npm run magazine:pdf`
 */
export const metadata: Metadata = {
  title: "প্রিন্ট লেআউট · এপ্রিল ২০২৬",
  description: "ডেটায়ন এপ্রিল ২০২৬ — PDF প্রিন্ট টার্গেট (অভ্যন্তরীণ টুল)।",
  robots: { index: false, follow: false },
};

export default function MagazineApril2026PrintPage() {
  return (
    <>
      <MagazinePrintMount />
      <main
        id="main"
        className="magazine-print-root bg-paper print:bg-paper"
      >
        <MagazineApril2026ScrollBody />
      </main>
    </>
  );
}
