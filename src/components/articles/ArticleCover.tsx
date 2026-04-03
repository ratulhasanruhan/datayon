import Image from "next/image";
import { cn } from "@/lib/cn";
import { getArticleCoverUrl } from "@/lib/appwrite/covers";

type Props = {
  coverFileId?: string | null;
  alt: string;
  /** List / home card thumbnail */
  variant?: "thumb" | "card" | "hero";
  className?: string;
  priority?: boolean;
};

/** Cover image from Appwrite Storage, or editorial placeholder matching site palette. */
export function ArticleCover({
  coverFileId,
  alt,
  variant = "hero",
  className,
  priority = false,
}: Props) {
  const src = getArticleCoverUrl(coverFileId ?? undefined);

  /** Thumb: fixed widths only — `w-full` inside `shrink-0` parent collapses to 0 (no visible image). */
  const ratio =
    variant === "thumb"
      ? "aspect-[4/3] w-[104px] shrink-0 sm:w-[176px]"
      : variant === "card"
        ? "aspect-[16/10] w-full max-sm:aspect-[5/3]"
        : "";

  const radius =
    variant === "card"
      ? "rounded-t-xl rounded-b-none border-x-0 border-t-0"
      : "rounded-xl";

  if (!src) {
    return (
      <div
        className={cn(
          "relative overflow-hidden border border-border/50 bg-magazine-band dark:bg-navy-mid/40",
          radius,
          variant === "hero"
            ? "aspect-[16/10] w-full min-h-[12rem] sm:min-h-[14rem]"
            : ratio,
          className
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal/15 via-transparent to-navy/10" />
        <div className="absolute bottom-3 left-3 h-1 w-12 rounded-full bg-teal/50" />
      </div>
    );
  }

  /**
   * Hero: fixed aspect box + `fill` so height is never 0 (flex ancestors on desktop
   * can collapse intrinsic-height images). `min-w-0` + `z-10` avoid overflow/stacking issues.
   */
  if (variant === "hero") {
    return (
      <div
        className={cn(
          "relative z-10 w-full min-w-0 overflow-hidden border border-border/40 bg-art shadow-sm",
          "aspect-[16/10] min-h-[12rem] sm:min-h-0",
          radius,
          className
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, min(672px, 100vw)"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-border/40 bg-art shadow-sm",
        radius,
        ratio,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes={
          variant === "thumb"
            ? "(max-width: 639px) 112px, 176px"
            : "(max-width: 640px) 46vw, (max-width: 1024px) 33vw, 28vw"
        }
        priority={priority}
      />
    </div>
  );
}
