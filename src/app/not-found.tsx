import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { LogoMark } from "@/components/brand/LogoMark";

export default function NotFound() {
  return (
    <main
      id="main"
      className="flex flex-1 flex-col items-center justify-center bg-editorial-hero py-24"
    >
      <Container className="text-center">
        <div className="mx-auto mb-6 flex justify-center opacity-[0.2]">
          <LogoMark size={72} variant="on-light" />
        </div>
        <p className="font-mono text-sm font-medium text-teal">৪০৪</p>
        <h1 className="mt-3 font-display text-3xl font-black text-ink sm:text-4xl">
          পৃষ্ঠাটি পাওয়া যায়নি
        </h1>
        <p className="mx-auto mt-4 max-w-md font-body text-base text-muted">
          লিঙ্কটি ভুল হতে পারে, অথবা পৃষ্ঠাটি সরানো হয়েছে।
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary">
            মূল পাতায় ফিরুন
          </Button>
          <Button href="/articles" variant="ghost">
            প্রবন্ধ
          </Button>
        </div>
        <p className="mt-8">
          <Link
            href="/magazine"
            className="font-sans text-sm text-teal hover:underline"
          >
            মাসিক সংখ্যা
          </Link>
        </p>
      </Container>
    </main>
  );
}
