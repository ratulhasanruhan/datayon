"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import React, { forwardRef, useEffect, useState } from "react";
import {
  april2026BodySheets,
  april2026FrontSheets,
} from "@/components/magazine/data/april-2026";
import { MagazineCoverApril2026 } from "@/components/magazine/MagazineCoverApril2026";
import { MagazineSheetPage } from "@/components/magazine/MagazineSheet";
import { MagazineTocPage } from "@/components/magazine/MagazineTocPage";

const HTMLFlipBook = dynamic(
  () => import("react-pageflip").then((mod) => mod.default),
  { ssr: false, loading: () => null }
);

type Props = {
  /** Appwrite `magazine-assets` cover PNG */
  remoteCoverUrl?: string | null;
};

const PageShell = forwardRef<
  HTMLDivElement,
  { w: number; h: number; children: React.ReactNode }
>(function PageShell({ w, h, children }, ref) {
  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-md border border-navy/20 bg-paper shadow-xl"
      style={{ width: w, height: h }}
    >
      <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden overscroll-contain">
        {children}
      </div>
    </div>
  );
});

/** ইন্টারেক্টিভ বই-স্টাইল পাতা ওল্টানো */
export function MagazineFlipBook({ remoteCoverUrl }: Props) {
  const [dim, setDim] = useState({ w: 360, h: 520 });

  useEffect(() => {
    const layout = () => {
      const w = Math.min(440, Math.max(300, window.innerWidth - 40));
      setDim({ w, h: Math.round(w * 1.42) });
    };
    layout();
    window.addEventListener("resize", layout);
    return () => window.removeEventListener("resize", layout);
  }, []);

  const front = april2026FrontSheets();
  const body = april2026BodySheets();

  const coverInner =
    remoteCoverUrl != null && remoteCoverUrl.length > 0 ? (
      <div className="relative h-full min-h-[400px] w-full shrink-0 bg-navy">
        <Image
          src={remoteCoverUrl}
          alt="ডেটায়ন এপ্রিল ২০২৬ প্রচ্ছদ"
          fill
          className="object-cover object-top"
          sizes="440px"
          priority
        />
      </div>
    ) : (
      <MagazineCoverApril2026 embedded />
    );

  return (
    <div className="flex flex-col items-center px-2 pb-8">
      <HTMLFlipBook
        className=""
        style={{}}
        width={dim.w}
        height={dim.h}
        startPage={0}
        size="fixed"
        minWidth={280}
        maxWidth={440}
        minHeight={400}
        maxHeight={680}
        drawShadow
        flippingTime={600}
        usePortrait
        startZIndex={0}
        autoSize
        maxShadowOpacity={0.35}
        showCover
        mobileScrollSupport
        clickEventForward
        useMouseEvents
        swipeDistance={30}
        showPageCorners
        disableFlipByClick={false}
      >
        <PageShell w={dim.w} h={dim.h}>
          {coverInner}
        </PageShell>
        {front.map((sheet) => (
          <PageShell key={sheet.id} w={dim.w} h={dim.h}>
            <MagazineSheetPage sheet={sheet} flip />
          </PageShell>
        ))}
        <PageShell w={dim.w} h={dim.h}>
          <MagazineTocPage flip />
        </PageShell>
        {body.map((sheet) => (
          <PageShell key={sheet.id} w={dim.w} h={dim.h}>
            <MagazineSheetPage sheet={sheet} flip />
          </PageShell>
        ))}
      </HTMLFlipBook>
      <p className="mt-6 text-center font-sans text-xs text-muted">
        ড্র্যাগ বা কোণে ক্লিক করে পাতা ওল্টান · মোবাইলে সোয়াইপ
      </p>
    </div>
  );
}
