"use client";

import { useState } from "react";
import { MagazineFlipBook } from "@/components/magazine/MagazineFlipBook";

type Props = {
  children: React.ReactNode;
  /** Appwrite `magazine-assets` কভার PNG */
  remoteCoverUrl: string | null;
  /** Appwrite `magazine-assets` পূর্ণ ইস্যু PDF */
  pdfUrl: string | null;
};

export function MagazineApril2026Reader({
  children,
  remoteCoverUrl,
  pdfUrl,
}: Props) {
  const [mode, setMode] = useState<"flip" | "scroll">("flip");

  return (
    <>
      <div className="no-print sticky top-0 z-40 border-b border-border/80 bg-paper/95 backdrop-blur-sm print:hidden">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-sans text-xs text-muted">পড়ার ধরন:</span>
            <button
              type="button"
              onClick={() => setMode("flip")}
              className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold transition ${
                mode === "flip"
                  ? "bg-navy text-cream dark:bg-teal dark:text-navy"
                  : "bg-muted/30 text-ink hover:bg-muted/50"
              }`}
            >
              বই · পাতা ওল্টানো
            </button>
            <button
              type="button"
              onClick={() => setMode("scroll")}
              className={`rounded-full px-3 py-1.5 font-sans text-xs font-semibold transition ${
                mode === "scroll"
                  ? "bg-navy text-cream dark:bg-teal dark:text-navy"
                  : "bg-muted/30 text-ink hover:bg-muted/50"
              }`}
            >
              স্ক্রল
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {pdfUrl ? (
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-teal/60 bg-teal/10 px-4 py-2 font-sans text-xs font-semibold text-teal transition hover:bg-teal/20"
              >
                PDF ডাউনলোড
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-full bg-navy px-4 py-2 font-sans text-xs font-semibold text-cream transition hover:bg-navy2 dark:bg-teal dark:text-navy dark:hover:bg-teal-dark"
            >
              ব্রাউজারে প্রিন্ট / PDF
            </button>
          </div>
        </div>
        {!pdfUrl ? (
          <p className="border-t border-border/40 px-4 pb-2 pt-1 text-center font-sans text-[11px] text-muted">
            অফিসিয়াল PDF শীঘ্রই আপলোড করা হবে — এখন ব্রাউজার প্রিন্ট বা নিচের স্ক্রল মোড ব্যবহার করুন।
          </p>
        ) : null}
      </div>

      <div
        className={
          mode === "flip" ? "block print:hidden" : "hidden print:hidden"
        }
      >
        <MagazineFlipBook remoteCoverUrl={remoteCoverUrl} />
      </div>
      <div
        className={
          mode === "scroll" ? "block" : "hidden print:block"
        }
      >
        {children}
      </div>
    </>
  );
}
