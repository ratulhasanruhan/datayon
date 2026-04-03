import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "সম্পর্কে",
  description: `${BRAND.name} — সম্পাদকীয়, মিশন ও প্রকাশনা। ${BRAND.tagline}`,
  path: "/about",
  descriptionEn: `About ${BRAND.nameLatin} — Bangla tech magazine, mission and editorial.`,
});

export default function AboutPage() {
  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <article className="prose-bn mx-auto max-w-2xl">
          <SectionLabel>সম্পাদকীয়</SectionLabel>
          <h1 className="mt-6 font-brand text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            {BRAND.name}
          </h1>
          <p className="mt-4 font-brand text-lg font-medium text-muted">{BRAND.tagline}</p>
          <p className="mt-10 font-body text-lg leading-[1.9] text-ink/90">
            <strong>{BRAND.name}</strong> একটি বাংলা প্রযুক্তি ম্যাগাজিন। এই প্রকল্পটি{" "}
            <a
              href={BRAND.publisherUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-teal underline-offset-4 hover:underline"
            >
              {BRAND.publisherName}
            </a>{" "}
            পরিচালিত ও রক্ষণাবেক্ষণ করে; সম্পাদনা, অনুবাদ ও প্রকাশনায় স্বেচ্ছাসেবকদের অংশগ্রহণ রয়েছে।
            আমরা বাংলাদেশ ও বাংলা ভাষার টেক দুনিয়ার খবর, বিশ্লেষণ ও গল্প তুলে ধরতে চাই — পরিষ্কার
            ভাষায়, সম্মানজনক নকশায়।
          </p>
          <p className="mt-6 font-body text-lg leading-[1.9] text-ink/90">
            আপনি যদি দলে যোগ দিতে চান, লেখা বা অনুবাদ পাঠাতে চান, অথবা প্রকাশের জন্য উপযুক্ত বিষয়
            জমা দিতে চান — আমাদের লিখুন। সংক্ষিপ্ত পরিচিতি ও কাজের নমুনা সহ ইমেইল করুন।
          </p>
          <p className="mt-6 font-body text-base leading-[1.9] text-muted">
            ইমেইল:{" "}
            <a
              href={`mailto:${BRAND.editorEmail}`}
              className="font-mono text-teal underline-offset-4 hover:underline"
            >
              {BRAND.editorEmail}
            </a>
            <br />
            ফেসবুক:{" "}
            <a
              href={BRAND.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal underline-offset-4 hover:underline"
            >
              facebook.com/datayonbd
            </a>
            <br />
            ওয়েবসাইট:{" "}
            <a
              href={`https://${BRAND.url}`}
              className="font-mono text-teal underline-offset-4 hover:underline"
            >
              {BRAND.url}
            </a>
          </p>
        </article>
      </Container>
    </main>
  );
}
