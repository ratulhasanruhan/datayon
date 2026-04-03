import { BRAND } from "@/lib/brand";
import { LogoMark } from "@/components/brand/LogoMark";
import { APRIL_2026_META } from "@/components/magazine/data/april-2026";

type Props = {
  /** ফ্লিপবুকের ভিতরে — উচ্চতা কমায় */
  embedded?: boolean;
};

/** প্রচ্ছদ — `Branding/A/dataayon_refined_brand.html` স্টাইল অনুযায়ী */
export function MagazineCoverApril2026({ embedded = false }: Props) {
  const m = APRIL_2026_META;
  return (
    <section
      data-magazine-cover
      className={`magazine-sheet flex flex-col bg-cream text-navy print:min-h-[280mm] ${
        embedded
          ? "min-h-0 flex-1"
          : "min-h-[min(100vh,860px)]"
      }`}
      aria-label="প্রচ্ছদ"
    >
      <div className="flex items-start justify-between border-b border-navy/10 px-5 pt-4 font-sans text-[10px] tracking-widest text-teal sm:px-7 sm:pt-5">
        <span>
          {m.issueLabel} · {m.monthLabel}
        </span>
        <span className="text-warm">{m.price}</span>
      </div>

      <div className="flex items-center gap-3 px-5 pt-4 sm:px-7 sm:pt-5">
        <LogoMark size={40} variant="on-light" />
        <div>
          <p className="font-brand text-2xl font-bold tracking-tight sm:text-3xl">
            {BRAND.name}
          </p>
          <p className="mt-1 font-sans text-[10px] tracking-[0.35em] text-teal">
            {BRAND.tagline}
          </p>
        </div>
      </div>

      <div className="mx-5 mt-4 h-px bg-navy sm:mx-7" aria-hidden />

      {/* আর্ট এরিয়া — গ্রিড + কেন্দ্রিক ডেটা ভিজ */}
      <div className="relative mx-5 mt-5 flex-1 overflow-hidden rounded-md bg-art sm:mx-7">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(to right, #c8c0b0 0.5px, transparent 0.5px),
              linear-gradient(to bottom, #c8c0b0 0.5px, transparent 0.5px)
            `,
            backgroundSize: "80px 63px",
          }}
        />
        <div
          className={`relative flex h-full items-center justify-center ${
            embedded ? "min-h-[120px]" : "min-h-[220px] sm:min-h-[280px]"
          }`}
        >
          <div className="absolute h-[180px] w-[180px] rounded-full border border-navy/15 sm:h-[220px] sm:w-[220px]" />
          <div className="absolute h-[120px] w-[120px] rounded-full border border-navy/20 sm:h-[140px] sm:w-[140px]" />
          <div className="absolute h-16 w-16 rounded-full border-2 border-teal/80 sm:h-20 sm:w-20" />
          <div className="absolute h-3 w-3 rounded-full bg-teal shadow-sm" />
          <div className="absolute left-1/2 top-8 h-1/2 w-px bg-navy/25" aria-hidden />
          <div className="absolute bottom-8 left-1/2 h-1/2 w-px bg-navy/25" aria-hidden />
          <div className="absolute left-8 top-1/2 h-px w-1/3 bg-navy/25" aria-hidden />
          <div className="absolute right-8 top-1/2 h-px w-1/3 bg-navy/25" aria-hidden />
          <span className="relative z-[1] font-sans text-[9px] font-medium tracking-[0.2em] text-navy/40">
            DATA · MAP · SIGNAL
          </span>
        </div>
      </div>

      <div className="mt-auto bg-navy px-5 py-8 text-cream sm:px-8 sm:py-10">
        <div className="mb-3 inline-block rounded-sm bg-teal px-3 py-1 font-sans text-[9px] font-semibold tracking-widest text-cream">
          প্রচ্ছদ
        </div>
        <h2 className="font-display text-xl font-bold leading-tight sm:text-2xl">
          {m.cover.headline1}
        </h2>
        <p className="mt-1 font-display text-xl font-bold text-teal sm:text-2xl">
          {m.cover.headline2}
        </p>
        <p className="mt-4 max-w-prose font-body text-sm leading-relaxed text-cream/75">
          {m.cover.deck}
        </p>
        <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-cream/10 pt-5 font-sans text-[10px] text-teal/90">
          {m.cover.chips.map((c) => (
            <span key={c}>+ {c}</span>
          ))}
        </div>
        <div className="mt-8 space-y-2 border-t border-cream/10 pt-4 font-sans text-[10px] text-cream/55">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <span>{BRAND.url}</span>
            <span>{m.issn}</span>
          </div>
          <p>
            {BRAND.editorEmail} ·{" "}
            <a
              href={BRAND.facebookUrl}
              className="text-teal/90 underline-offset-2 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ফেসবুক
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
