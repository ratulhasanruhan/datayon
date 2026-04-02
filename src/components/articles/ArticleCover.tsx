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

  const ratio =
    variant === "thumb"
      ? "aspect-[4/3] w-full max-w-[140px] sm:max-w-[176px]"
      : variant === "card"
        ? "aspect-[16/10] w-full"
        : "aspect-[16/10] w-full";

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
          ratio,
          className
        )}
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-teal/15 via-transparent to-navy/10" />
        <div className="absolute bottom-3 left-3 h-1 w-12 rounded-full bg-teal/50" />
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
            ? "(max-width: 640px) 40vw, 176px"
            : variant === "card"
              ? "(max-width: 768px) 100vw, 33vw"
              : "(max-width: 768px) 100vw, 42rem"
        }
        priority={priority}
      />
    </div>
  );
}
