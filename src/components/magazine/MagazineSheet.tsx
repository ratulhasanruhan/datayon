import type { MagazineSheet as SheetType } from "@/components/magazine/data/april-2026";
import { MagazinePageChrome, MagazinePageChromeFooter } from "@/components/magazine/MagazinePageChrome";
import { MagazineVisual } from "@/components/magazine/MagazineVisual";

export function MagazineSheetPage({
  sheet,
  flip = false,
}: {
  sheet: SheetType;
  flip?: boolean;
}) {
  const visual = sheet.visual ?? "abstract";

  return (
    <section
      className={
        flip
          ? "magazine-sheet flex min-h-0 min-w-0 flex-1 flex-col border-0 bg-paper px-3 py-3 sm:px-4"
          : "magazine-sheet flex min-h-[min(100vh,920px)] flex-col border-b border-border/30 bg-paper px-6 py-8 print:min-h-[270mm] sm:px-10 sm:py-10 lg:px-14 lg:py-12"
      }
      aria-label={`পাতা ${sheet.page}`}
    >
      <MagazinePageChrome
        page={sheet.page}
        runningTitle={sheet.runningTitle}
        flip={flip}
      />

      <div
        className={
          flip
            ? "mt-3 flex min-h-0 flex-1 flex-col gap-3"
            : "mt-6 flex flex-1 flex-col gap-6"
        }
      >
        {visual !== "none" ? (
          <MagazineVisual variant={visual} flip={flip} />
        ) : null}

        <div className="min-h-0 flex-1">
          {sheet.kicker ? (
            <p className="font-sans text-[10px] font-semibold tracking-[0.25em] text-teal">
              {sheet.kicker}
            </p>
          ) : null}
          <h2
            className={
              flip
                ? "mt-1.5 font-display text-base font-bold leading-snug text-ink sm:text-lg"
                : "mt-3 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl"
            }
          >
            {sheet.title}
          </h2>
          <div
            className={
              flip
                ? "mt-3 max-w-prose space-y-2.5 font-article text-[13px] leading-relaxed text-ink/90"
                : "mt-6 max-w-prose space-y-4 font-article text-base leading-[1.92] text-ink/90"
            }
          >
            {sheet.body.map((para, i) => (
              <p key={`${sheet.id}-${i}`}>{para}</p>
            ))}
          </div>
        </div>
      </div>

      <MagazinePageChromeFooter page={sheet.page} flip={flip} />
    </section>
  );
}
