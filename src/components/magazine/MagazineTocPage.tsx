import { APRIL_2026_TOC, APRIL_2026_TOC_PAGE } from "@/components/magazine/data/april-2026";
import { MagazinePageChrome, MagazinePageChromeFooter } from "@/components/magazine/MagazinePageChrome";

export function MagazineTocPage({ flip = false }: { flip?: boolean }) {
  return (
    <section
      className={
        flip
          ? "magazine-sheet flex min-h-0 min-w-0 flex-1 flex-col border-0 bg-surface-elevated px-3 py-3 dark:bg-navy-mid/20 sm:px-4"
          : "magazine-sheet flex min-h-[min(100vh,880px)] flex-col border-b border-border/30 bg-surface-elevated px-6 py-8 print:min-h-[270mm] sm:px-10 sm:py-10 dark:bg-navy-mid/20"
      }
      aria-label="সূচিপত্র"
    >
      <MagazinePageChrome
        page={APRIL_2026_TOC_PAGE}
        runningTitle="সূচিপত্র · এই সংখ্যায়"
        flip={flip}
      />

      <div className={flip ? "mt-3 min-h-0 flex-1" : "mt-6 flex-1"}>
        <p className="font-sans text-[10px] font-semibold tracking-[0.3em] text-teal">
          সূচিপত্র
        </p>
        <h2
          className={
            flip
              ? "mt-2 font-display text-lg font-black text-ink sm:text-xl"
              : "mt-3 font-display text-3xl font-black text-ink"
          }
        >
          এই সংখ্যায়
        </h2>
        <ul
          className={
            flip
              ? "mt-4 space-y-1.5 border-t border-border/60 pt-4"
              : "mt-8 space-y-2.5 border-t border-border/60 pt-8"
          }
        >
          {APRIL_2026_TOC.map((row) => (
            <li
              key={`${row.page}-${row.title}`}
              className={
                flip
                  ? "flex items-baseline justify-between gap-2 border-b border-dashed border-border/40 pb-1.5 font-body text-[11px] text-ink/90 last:border-0"
                  : "flex items-baseline justify-between gap-4 border-b border-dashed border-border/40 pb-3 font-body text-sm text-ink/90 last:border-0"
              }
            >
              <span className="flex-1 leading-snug">{row.title}</span>
              <span className="shrink-0 font-mono text-[10px] tabular-nums text-teal sm:text-xs">
                {row.page}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <MagazinePageChromeFooter page={APRIL_2026_TOC_PAGE} flip={flip} />
    </section>
  );
}
