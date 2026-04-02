import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Accent line on the left */
  accent?: boolean;
};

export function SectionLabel({ children, className, accent = true }: Props) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        accent && "border-l-[3px] border-teal pl-3",
        className
      )}
    >
      <p className="font-sans text-[10px] font-semibold tracking-[0.22em] text-teal">
        {children}
      </p>
    </div>
  );
}
