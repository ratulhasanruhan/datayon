import Link from "next/link";
import { cn } from "@/lib/cn";

type Common = {
  className?: string;
  children: React.ReactNode;
  variant?: "primary" | "ghost" | "muted";
};

type ButtonAsLink = Common & { href: string } & React.ComponentProps<typeof Link>;
type ButtonAsButton = Common & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { className, children, variant = "primary", ...rest } = props;

  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-2.5 font-sans text-[11px] font-semibold tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal sm:text-sm";

  const styles =
    variant === "primary"
      ? "bg-navy text-cream shadow-md hover:bg-navy2 hover:shadow-lg dark:bg-teal dark:text-navy dark:hover:bg-teal-dark"
      : variant === "ghost"
        ? "border border-border/80 bg-surface-elevated/50 text-ink shadow-sm hover:border-teal/40 hover:bg-art/50 dark:border-navy2 dark:bg-navy-mid/30 dark:hover:bg-navy-mid/50"
        : "text-teal hover:underline";

  if ("href" in rest && rest.href) {
    const { href, ...linkRest } = rest;
    return (
      <Link
        href={href}
        className={cn(base, styles, className)}
        {...linkRest}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={cn(base, styles, className)}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
