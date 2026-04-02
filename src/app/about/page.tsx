import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";

export const metadata: Metadata = {
  title: "সম্পর্কে",
  description: `${BRAND.name} — ${BRAND.tagline}`,
};

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
            <strong>{BRAND.name}</strong> একটি বাংলা প্রযুক্তি ম্যাগাজিন। আমরা
            বাংলাদেশ ও বাংলা ভাষার টেক দুনিয়ার খবর, বিশ্লেষণ ও গল্প তুলে ধরতে
            চাই — পরিষ্কার ভাষায়, সম্মানজনক নকশায়।
          </p>
          <p className="mt-6 font-body text-base leading-[1.9] text-muted">
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
