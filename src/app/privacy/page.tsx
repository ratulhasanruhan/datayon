import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";
import { buildPageMetadata } from "@/lib/seo/page-metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "গোপনীয়তা নীতি",
  description: `${BRAND.name} — ব্যক্তিগত তথ্য, কুকিজ ও ট্র্যাকিং সম্পর্কিত নীতি।`,
  path: "/privacy",
  descriptionEn: "Datayon privacy policy — cookies, analytics and personal data.",
});

export default function PrivacyPage() {
  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <article className="prose-bn mx-auto max-w-2xl">
          <SectionLabel>আইন ও নীতি</SectionLabel>
          <h1 className="mt-6 font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            গোপনীয়তা নীতি
          </h1>
          <p className="mt-4 font-body text-sm text-muted">
            শেষ হালনাগাদ: এপ্রিল ২০২৬ · প্রযোজ্য {BRAND.url}
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">সংক্ষিপ্ত বিবরণ</h2>
          <p className="mt-4 font-body text-base leading-[1.9] text-ink/90">
            {BRAND.name} আপনার গোপনীয়তাকে সম্মান করে। এই পাতায় বর্ণিত হয় কী ধরনের তথ্য সংগ্রহ বা
            প্রক্রিয়াকরণ হতে পারে এবং কীভাবে ব্যবহার করা হয়।
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">স্বয়ংক্রিয়ভাবে সংগৃহীত তথ্য</h2>
          <p className="mt-4 font-body text-base leading-[1.9] text-ink/90">
            ওয়েবসাইট চালু রাখতে ও ট্রাফিক বুঝতে আমরা সাধারণ লগ (যেমন ব্রাউজার ধরন, আনুমানিক অবস্থান,
            রেফারার, সময়) এবং কুকিজ বা অনুরূপ প্রযুক্তি ব্যবহার করতে পারি। এগুলো ব্যক্তি শনাক্তকরণের
            জন্য নয়, বরং পরিষেবার মান ও নিরাপত্তা উন্নত করার জন্য।
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">যোগাযোগ ও জমা দেওয়া বিষয়বস্তু</h2>
          <p className="mt-4 font-body text-base leading-[1.9] text-ink/90">
            আপনি যখন আমাদের ইমেইলে লেখা, প্রস্তাব বা অন্যান্য উপাদান পাঠান, সেই তথ্য শুধুমাত্র উত্তর
            দেওয়া, সম্পাদনা যাচাই বা প্রকাশনা সম্পর্কিত যোগাযোগের জন্য ব্যবহার করা হতে পারে। তৃতীয়
            পক্ষের কাছে বিক্রি করা হয় না।
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">তৃতীয় পক্ষের সেবা</h2>
          <p className="mt-4 font-body text-base leading-[1.9] text-ink/90">
            সাইটে এমন লিংক বা এমবেড থাকতে পারে যা অন্য প্রতিষ্ঠান পরিচালনা করে। তাদের গোপনীয়তা নীতি
            আলাদা; আমরা তাদের কার্যক্রমের জন্য দায়ী নই।
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">আপনার অধিকার ও যোগাযোগ</h2>
          <p className="mt-4 font-body text-base leading-[1.9] text-ink/90">
            গোপনীয়তা সম্পর্কিত প্রশ্ন বা অনুরোধের জন্য ইমেইল করুন:{" "}
            <a
              href={`mailto:${BRAND.editorEmail}`}
              className="font-mono text-teal underline-offset-4 hover:underline"
            >
              {BRAND.editorEmail}
            </a>
            ।
          </p>
        </article>
      </Container>
    </main>
  );
}
