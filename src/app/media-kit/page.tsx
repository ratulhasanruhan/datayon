import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "মিডিয়া কিট",
  description: `${BRAND.name} — পূর্ণ লোগো (PNG ২০৪৮×২০৪৮), ভেক্টর মার্ক (SVG) ও ব্র্যান্ড রঙ।`,
  path: "/media-kit",
  descriptionEn: `${BRAND.nameLatin} — full logo PNG, vector mark SVG, and brand colors.`,
});

const brandColors = [
  { name: "Navy", token: BRAND.colors.navy, label: "প্রাথমিক পটভূমি" },
  { name: "Teal", token: BRAND.colors.teal, label: "অ্যাকসেন্ট" },
  { name: "Cream", token: BRAND.colors.cream, label: "পাঠ্য / হালকা পট" },
] as const;

const pngLockups = [
  {
    href: "/brand/datayon-profile-logo-2048-light.png",
    fileLabel: "datayon-profile-logo-2048-light.png",
    title: "হালকা পট",
    hint: "ক্রিম ব্যাকগ্রাউন্ড — সোশ্যাল প্রোফাইল ও হালকা ডিজাইন।",
    alt: `${BRAND.name} — লোগো, হালকা পট`,
  },
  {
    href: "/brand/datayon-profile-logo-2048-dark.png",
    fileLabel: "datayon-profile-logo-2048-dark.png",
    title: "গাঢ় পট",
    hint: "নেভি ব্যাকগ্রাউন্ড — ডার্ক মোড ও গাঢ় লেআউট।",
    alt: `${BRAND.name} — লোগো, গাঢ় পট`,
  },
] as const;

export default function MediaKitPage() {
  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <header className="mx-auto max-w-2xl text-center">
          <SectionLabel>প্রেস ও অংশীদার</SectionLabel>
          <h1 className="mt-6 font-brand text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            মিডিয়া কিট
          </h1>
          <p className="mt-4 font-body text-muted">
            পূর্ণ লোগো (নাম + ট্যাগলাইন), আইকন মার্ক (SVG) ও ব্র্যান্ড রঙ।
          </p>
        </header>

        <div className="mx-auto mt-12 max-w-3xl space-y-14">
          <section aria-labelledby="png-heading">
            <h2
              id="png-heading"
              className="text-center font-display text-lg font-bold text-ink dark:text-cream"
            >
              পূর্ণ লোগো — PNG (২০৪৮ × ২০৪৮)
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center font-body text-sm text-muted">
              আইকন + বাংলা ওয়ার্ডমার্ক + ট্যাগলাইন। প্রেস ও সোশ্যালের জন্য।
            </p>
            <ul className="mt-8 grid gap-8 sm:grid-cols-2">
              {pngLockups.map((item) => (
                <li
                  key={item.href}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-surface-elevated/50 dark:border-navy2 dark:bg-navy-mid/20"
                >
                  <div className="relative aspect-square w-full bg-paper">
                    <Image
                      src={item.href}
                      alt={item.alt}
                      fill
                      sizes="(min-width: 640px) 45vw, 90vw"
                      className="object-contain p-4"
                      priority={item.href.includes("light")}
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 border-t border-border/60 p-4 dark:border-navy2">
                    <div>
                      <p className="font-sans text-sm font-semibold text-ink dark:text-cream">
                        {item.title}
                      </p>
                      <p className="mt-1 font-body text-xs text-muted">{item.hint}</p>
                      <p className="mt-2 font-mono text-[10px] text-muted/80">{item.fileLabel}</p>
                    </div>
                    <a
                      href={item.href}
                      download={item.fileLabel}
                      className="inline-flex w-fit rounded-full bg-teal/15 px-4 py-2 font-sans text-xs font-semibold text-teal transition hover:bg-teal/25"
                    >
                      PNG ডাউনলোড
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="svg-heading">
            <h2
              id="svg-heading"
              className="text-center font-display text-lg font-bold text-ink dark:text-cream"
            >
              আইকন মার্ক — SVG
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center font-body text-sm text-muted">
              শুধু গ্রিড চিহ্ন — ফ্যাবিকন, অ্যাপ আইকন বা ভেক্টর সম্পাদনার জন্য।
            </p>
            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-border/80 bg-surface-elevated/50 p-8 dark:border-navy2 dark:bg-navy-mid/20">
              <div className="flex justify-center rounded-xl bg-[#f0ebe0] p-10 ring-1 ring-inset ring-border/30">
                {/* eslint-disable-next-line @next/next/no-img-element -- small inline SVG preview */}
                <img
                  src="/brand/datayon-mark.svg"
                  alt={`${BRAND.name} মার্ক`}
                  className="h-24 w-24 sm:h-28 sm:w-28"
                  width={112}
                  height={112}
                />
              </div>
              <div className="mt-6 flex justify-center">
                <a
                  href="/brand/datayon-mark.svg"
                  download
                  className="rounded-full bg-teal/15 px-5 py-2.5 font-sans text-sm font-semibold text-teal transition hover:bg-teal/25"
                >
                  SVG ডাউনলোড
                </a>
              </div>
            </div>
          </section>

          <section aria-labelledby="colors-heading">
            <h2
              id="colors-heading"
              className="text-center font-display text-lg font-bold text-ink dark:text-cream"
            >
              ব্র্যান্ড রঙ
            </h2>
            <ul className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-3">
              {brandColors.map(({ name, token, label }) => (
                <li
                  key={name}
                  className="overflow-hidden rounded-xl border border-border/80 bg-surface-elevated/40 dark:border-navy2 dark:bg-navy-mid/20"
                >
                  <div
                    className="h-14 w-full border-b border-border/40"
                    style={{ backgroundColor: token }}
                  />
                  <div className="p-3 text-center">
                    <p className="font-sans text-xs font-semibold text-ink dark:text-cream">{name}</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted">{token}</p>
                    <p className="mt-1 font-sans text-[10px] text-muted">{label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-center font-body text-sm text-muted">
            <Link href="/about" className="font-medium text-teal underline-offset-4 hover:underline">
              সম্পাদকীয়
            </Link>
            {" · "}
            <Link href="/copyright" className="font-medium text-teal underline-offset-4 hover:underline">
              কপিরাইট
            </Link>
          </p>
        </div>
      </Container>
    </main>
  );
}
