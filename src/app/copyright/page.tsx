import type { Metadata } from "next";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { SectionLabel } from "@/components/layout/SectionLabel";

export const metadata: Metadata = {
  title: "কপিরাইট",
  description: `${BRAND.name} — স্বত্ব ও ব্যবহার সম্পর্কিত নোটিশ।`,
};

export default function CopyrightPage() {
  const year = new Date().getFullYear();
  return (
    <main
      id="main"
      className="flex-1 border-t border-border/80 bg-paper py-12 sm:py-16 lg:py-20"
    >
      <Container>
        <article className="prose-bn mx-auto max-w-2xl">
          <SectionLabel>আইন ও নীতি</SectionLabel>
          <h1 className="mt-6 font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            কপিরাইট ও স্বত্বাধিকার
          </h1>
          <p className="mt-4 font-body text-sm text-muted">
            প্রযোজ্য {BRAND.url}
          </p>

          <p className="mt-10 font-body text-lg leading-[1.9] text-ink/90">
            © {year} {BRAND.name} ({BRAND.nameLatin})। ওয়েবসাইটের নকশা, লোগো, টাইপোগ্রাফি ও সম্পূর্ণ
            সম্পাদকীয় বিষয়বস্তু — যেখানে অন্যথা উল্লেখ নেই — সংশ্লিষ্ট স্বত্বাধিকারীদের অন্তর্গত।
            সর্বস্বত্ব সংরক্ষিত।
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">ব্যবহার ও পুনর্মুদ্রণ</h2>
          <p className="mt-4 font-body text-base leading-[1.9] text-ink/90">
            ব্যক্তিগত, অ-বাণিজ্যিক উদ্দেশ্যে সংক্ষিপ্ত উদ্ধৃতি বা শেয়ারিং সম্ভব, উৎস ও লেখকের নাম
            স্পষ্ট করে। সম্পূর্ণ নিবন্ধ, ছবি বা ইস্যু পুনর্মুদ্রণ, পুনঃপ্রকাশ বা বাণিজ্যিক ব্যবহারের
            জন্য আগে থেকে লিখিত অনুমতি প্রয়োজন। অনুমতির জন্য ইমেইল করুন।
          </p>

          <h2 className="mt-10 font-display text-xl font-bold text-ink">তৃতীয় পক্ষের বিষয়বস্তু</h2>
          <p className="mt-4 font-body text-base leading-[1.9] text-ink/90">
            কিছু লেখা, ছবি বা উদ্ধৃতিতে মূল সৃষ্টিকর্তা বা লাইসেন্সের উল্লেখ থাকতে পারে। সেই অংশের
            স্বত্ব সংশ্লিষ্ট অধিকারীদের।
          </p>

          <p className="mt-10 font-body text-base leading-[1.9] text-muted">
            যোগাযোগ:{" "}
            <a
              href={`mailto:${BRAND.editorEmail}`}
              className="font-mono text-teal underline-offset-4 hover:underline"
            >
              {BRAND.editorEmail}
            </a>
          </p>
        </article>
      </Container>
    </main>
  );
}
