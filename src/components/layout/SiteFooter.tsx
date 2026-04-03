import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { Container } from "@/components/layout/Container";
import { LogoLockup } from "@/components/brand/LogoLockup";
import { LogoMark } from "@/components/brand/LogoMark";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/80 bg-paper text-ink dark:border-navy2 dark:bg-navy-deep dark:text-cream">
      <div
        className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 opacity-[0.06] dark:opacity-[0.08]"
        aria-hidden
      >
        <LogoMark size={240} variant="on-light" className="dark:hidden" />
        <LogoMark size={240} variant="on-dark" className="hidden dark:block" />
      </div>

      <Container className="relative py-12 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="max-w-md">
            <div className="dark:hidden">
              <LogoLockup tone="default" size="lg" />
            </div>
            <div className="hidden dark:block">
              <LogoLockup tone="inverse" size="lg" />
            </div>
            <p className="mt-6 font-body text-sm leading-relaxed text-muted dark:text-cream/75">
              বাংলায় প্রযুক্তি, স্টার্টআপ ও নীতি — পরিষ্কার ভাষায়, সম্পাদকীয় মানের নকশায়।
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-[0.2em] text-teal dark:text-teal/90">
                নেভিগেশন
              </p>
              <ul className="mt-4 flex flex-col gap-2.5 font-sans text-sm">
                <li>
                  <Link
                    href="/magazine"
                    className="text-ink/80 transition hover:text-teal dark:text-cream/80 dark:hover:text-teal"
                  >
                    মাসিক সংখ্যা
                  </Link>
                </li>
                <li>
                  <Link
                    href="/articles"
                    className="text-ink/80 transition hover:text-teal dark:text-cream/80 dark:hover:text-teal"
                  >
                    সর্বশেষ প্রবন্ধ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-ink/80 transition hover:text-teal dark:text-cream/80 dark:hover:text-teal"
                  >
                    সম্পাদকীয়
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-ink/80 transition hover:text-teal dark:text-cream/80 dark:hover:text-teal"
                  >
                    গোপনীয়তা নীতি
                  </Link>
                </li>
                <li>
                  <Link
                    href="/copyright"
                    className="text-ink/80 transition hover:text-teal dark:text-cream/80 dark:hover:text-teal"
                  >
                    কপিরাইট
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-sans text-[10px] font-semibold tracking-[0.2em] text-teal dark:text-teal/90">
                যোগাযোগ
              </p>
              <a
                href={`mailto:${BRAND.editorEmail}`}
                className="mt-4 block font-mono text-sm text-ink/90 underline-offset-4 hover:text-teal hover:underline dark:text-cream/90"
              >
                {BRAND.editorEmail}
              </a>
              <a
                href={BRAND.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block font-sans text-sm text-ink/80 transition hover:text-teal dark:text-cream/80 dark:hover:text-teal"
              >
                ফেসবুক — {BRAND.name}
              </a>
              <a
                href={`https://${BRAND.url}`}
                className="mt-2 block font-mono text-xs text-muted underline-offset-4 hover:text-teal hover:underline dark:text-cream/55"
              >
                {BRAND.url}
              </a>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-border/60 dark:border-cream/10">
        <Container className="flex flex-col items-center justify-between gap-3 py-4 sm:flex-row">
          <span className="font-sans text-[10px] tracking-wide text-muted dark:text-cream/45">
            © {new Date().getFullYear()} {BRAND.name} · সর্বস্বত্ব সংরক্ষিত
          </span>
          <span className="font-sans text-[10px] text-muted dark:text-cream/40">{BRAND.nameLatin}</span>
        </Container>
      </div>
    </footer>
  );
}
