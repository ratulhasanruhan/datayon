import { cn } from "@/lib/cn";

type Props = {
  size?: number;
  className?: string;
  /** Light background → navy mark; dark background → cream/teal mark */
  variant?: "on-dark" | "on-light";
};

/** Dot-grid mark — paths from `Branding/datayon_facebook_profile_icon_only_transparent.html`. */
export function LogoMark({ size = 40, className, variant = "on-dark" }: Props) {
  const onLight = variant === "on-light";
  const c = onLight ? "#0d1b2a" : "#f0ebe0";
  const t = "#3a8fa3";
  const cDim = onLight ? "#0d1b2a" : "#f0ebe0";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="8" cy="8" r="3.5" fill={c} />
      <circle cx="24" cy="8" r="2" fill={cDim} opacity={0.35} />
      <circle cx="40" cy="8" r="5" fill={t} />
      <circle cx="8" cy="24" r="2.5" fill={cDim} opacity={0.45} />
      <circle cx="24" cy="24" r="4" fill={c} />
      <circle cx="40" cy="24" r="2" fill={t} opacity={0.72} />
      <circle cx="8" cy="40" r="4.5" fill={t} />
      <circle cx="24" cy="40" r="2.5" fill={cDim} opacity={0.35} />
      <circle cx="40" cy="40" r="3" fill={cDim} opacity={0.5} />
      <line x1="8" y1="8" x2="24" y2="24" stroke={c} strokeWidth="0.8" opacity={0.15} />
      <line x1="40" y1="8" x2="24" y2="24" stroke={t} strokeWidth="0.8" opacity={0.32} />
      <line x1="8" y1="40" x2="24" y2="24" stroke={t} strokeWidth="0.8" opacity={0.32} />
      <line x1="40" y1="40" x2="24" y2="24" stroke={c} strokeWidth="0.8" opacity={0.15} />
      <line x1="8" y1="8" x2="40" y2="8" stroke={c} strokeWidth="0.5" opacity={0.1} />
      <line x1="8" y1="40" x2="40" y2="40" stroke={c} strokeWidth="0.5" opacity={0.1} />
    </svg>
  );
}
