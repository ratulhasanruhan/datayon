import type { Metadata } from "next";
import { MagazineCoverApril2026 } from "@/components/magazine/MagazineCoverApril2026";
import { MagazineCoverExportMount } from "@/components/magazine/MagazineCoverExportMount";

/**
 * শুধু প্রচ্ছদ — `npm run magazine:pdf` এ ওয়েবের মতো PNG-এর জন্য।
 * সার্চ ইঞ্জিন থেকে লুকাতে চাইলে robots বা noindex যোগ করা যায়।
 */
export const metadata: Metadata = {
  title: "প্রচ্ছদ এক্সপোর্ট · এপ্রিল ২০২৬",
  description:
    "ডেটায়ন এপ্রিল ২০২৬ — অভ্যন্তরীণ প্রচ্ছদ এক্সপোর্ট (প্রিন্ট/PNG পাইপলাইন)।",
  robots: { index: false, follow: false },
};

export default function MagazineApril2026CoverExportPage() {
  return (
    <>
      <MagazineCoverExportMount />
      <main
        id="main"
        className="flex min-h-screen w-full justify-center bg-paper px-3 py-4 sm:px-4"
      >
        {/*
          সরু কলাম → প্রচ্ছদ PNG পোর্ট্রেট অনুপাতে (ওয়েব ম্যাগাজিন কভার)।
        */}
        <div className="w-full max-w-[520px]">
          <MagazineCoverApril2026 />
        </div>
      </main>
    </>
  );
}
