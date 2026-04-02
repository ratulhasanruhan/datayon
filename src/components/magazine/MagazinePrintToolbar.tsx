"use client";

export function MagazinePrintToolbar() {
  return (
    <div className="no-print sticky top-0 z-40 border-b border-border/80 bg-paper/95 px-4 py-3 backdrop-blur-sm print:hidden">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
        <p className="font-sans text-xs text-muted">
          প্রিন্ট মেনু থেকে PDF হিসেবে সংরক্ষণ করুন (Chrome: প্রিন্ট → Save as PDF)
        </p>
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-full bg-navy px-5 py-2 font-sans text-xs font-semibold text-cream transition hover:bg-navy2 dark:bg-teal dark:text-navy dark:hover:bg-teal-dark"
        >
          প্রিন্ট / PDF
        </button>
      </div>
    </div>
  );
}
