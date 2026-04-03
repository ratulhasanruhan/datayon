import type { MagazineVisual as VisualType } from "@/components/magazine/data/april-2026";

type Props = {
  variant: VisualType;
  flip?: boolean;
  className?: string;
};

/** পাতার উপরের অংশে সাজসজ্জার জন্য লাইটওয়েট SVG ইলাস্ট্রেশন (অফলাইন, কোনো বাইরের ইমেজ লাগে না) */
export function MagazineVisual({ variant, flip, className = "" }: Props) {
  if (variant === "none") return null;

  const h = flip ? "h-[72px]" : "h-[100px] sm:h-[120px]";
  const wrap = `relative w-full overflow-hidden rounded-lg border border-teal/15 bg-gradient-to-br from-navy/[0.06] via-paper to-teal/[0.08] ${h} ${className}`;

  switch (variant) {
    case "data-network":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3a8fa3" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0d1b2a" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <rect width="400" height="120" fill="url(#g1)" />
            {[40, 120, 200, 280, 360].map((x, i) => (
              <circle key={i} cx={x} cy={30 + (i % 3) * 25} r="4" fill="#3a8fa3" opacity="0.9" />
            ))}
            {[0, 1, 2, 3].map((i) => (
              <line
                key={`l-${i}`}
                x1={80 + i * 80}
                y1={35 + (i % 2) * 20}
                x2={120 + i * 70}
                y2={75 - (i % 2) * 15}
                stroke="#3a8fa3"
                strokeWidth="1.2"
                opacity="0.45"
              />
            ))}
          </svg>
        </div>
      );
    case "ai-brain":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            <path
              d="M200 20c-40 0-70 25-70 55 0 18 12 32 28 38-4 10-12 18-22 22 28-4 48-22 52-42 6 2 12 3 18 3 40 0 70-25 70-55s-30-55-70-55-18 0-26 2z"
              fill="none"
              stroke="#3a8fa3"
              strokeWidth="2"
              opacity="0.5"
            />
            <circle cx="200" cy="58" r="22" fill="#0d1b2a" opacity="0.15" />
            <path
              d="M175 55h50M185 65h30M190 75h25"
              stroke="#3a8fa3"
              strokeWidth="1.5"
              opacity="0.6"
            />
          </svg>
        </div>
      );
    case "cloud":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            <ellipse cx="120" cy="70" rx="55" ry="28" fill="#3a8fa3" opacity="0.18" />
            <ellipse cx="200" cy="60" rx="70" ry="32" fill="#0d1b2a" opacity="0.12" />
            <ellipse cx="280" cy="72" rx="60" ry="26" fill="#3a8fa3" opacity="0.15" />
            <rect x="60" y="88" width="280" height="3" rx="1" fill="#3a8fa3" opacity="0.25" />
          </svg>
        </div>
      );
    case "startup":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            <rect x="70" y="40" width="50" height="60" rx="4" fill="#0d1b2a" opacity="0.2" />
            <rect x="140" y="25" width="50" height="75" rx="4" fill="#3a8fa3" opacity="0.35" />
            <rect x="210" y="50" width="50" height="50" rx="4" fill="#0d1b2a" opacity="0.18" />
            <rect x="280" y="35" width="50" height="65" rx="4" fill="#3a8fa3" opacity="0.22" />
            <path d="M50 95h300" stroke="#3a8fa3" strokeWidth="1.5" opacity="0.35" />
          </svg>
        </div>
      );
    case "code":
      return (
        <div
          className={`${wrap} flex items-stretch bg-[#0a1520] px-3 py-2`}
          aria-hidden
        >
          <pre
            className={`w-full whitespace-pre-wrap font-mono leading-relaxed text-cream/90 ${flip ? "text-[7px]" : "text-[9px] sm:text-[10px]"}`}
          >
            <span className="text-teal/90">rag.retrieve(ctx)</span>
            {" → prompt\n"}
            <span className="text-cream/55">def learn(): return iterate()</span>
            {"\n"}
            <span className="text-warm/70"># ডেটায়ন · বাংলা প্রযুক্তি</span>
          </pre>
        </div>
      );
    case "books":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            {[0, 1, 2, 3].map((i) => (
              <rect
                key={i}
                x={90 + i * 52}
                y={35 - i * 4}
                width="40"
                height={70 + i * 5}
                rx="2"
                fill={i % 2 === 0 ? "#3a8fa3" : "#0d1b2a"}
                opacity={0.15 + i * 0.05}
              />
            ))}
          </svg>
        </div>
      );
    case "abstract":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            <circle cx="100" cy="50" r="40" fill="none" stroke="#3a8fa3" strokeWidth="1.2" opacity="0.35" />
            <circle cx="220" cy="70" r="55" fill="none" stroke="#0d1b2a" strokeWidth="1" opacity="0.2" />
            <circle cx="320" cy="45" r="35" fill="#3a8fa3" opacity="0.12" />
          </svg>
        </div>
      );
    case "network":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            <path
              d="M40 90 L120 40 L200 85 L280 35 L360 80"
              fill="none"
              stroke="#3a8fa3"
              strokeWidth="1.5"
              opacity="0.4"
            />
            {[40, 120, 200, 280, 360].map((x, i) => (
              <circle key={i} cx={x} cy={[90, 40, 85, 35, 80][i]} r="5" fill="#0d1b2a" opacity="0.35" />
            ))}
          </svg>
        </div>
      );
    case "roadmap":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            <defs>
              <marker id="arr" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#3a8fa3" opacity="0.7" />
              </marker>
            </defs>
            <line
              x1="40"
              y1="75"
              x2="360"
              y2="75"
              stroke="#3a8fa3"
              strokeWidth="2"
              opacity="0.35"
              markerEnd="url(#arr)"
            />
            {[60, 140, 220, 300].map((x, i) => (
              <g key={i}>
                <circle cx={x} cy="75" r="10" fill="#0d1b2a" opacity="0.25" />
                <text x={x - 4} y="79" fill="#3a8fa3" fontSize="9" fontWeight="bold">
                  {i + 1}
                </text>
              </g>
            ))}
          </svg>
        </div>
      );
    case "meme-panel":
      return (
        <div
          className={`${wrap} flex gap-2 p-2 !bg-gradient-to-br from-paper to-surface-elevated`}
          aria-hidden
        >
          <div className="flex flex-1 flex-col justify-center rounded-md border border-navy/25 bg-white/95 px-2 py-1.5 shadow-sm dark:bg-navy-deep/80">
            <p className={`font-sans font-bold leading-tight text-ink ${flip ? "text-[8px]" : "text-[10px]"}`}>
              ডেভ: এটা শুধু অস্থায়ী…
            </p>
            <p className={`mt-1 font-sans text-muted ${flip ? "text-[7px]" : "text-[9px]"}`}>
              একই কোড · ২০২১ থেকে
            </p>
          </div>
          <div className="flex flex-1 flex-col justify-center rounded-md border border-navy/25 bg-white/95 px-2 py-1.5 shadow-sm dark:bg-navy-deep/80">
            <p className={`font-sans font-bold text-ink ${flip ? "text-[8px]" : "text-[10px]"}`}>
              প্রোড: সব ঠিক আছে
            </p>
            <p className={`mt-1 font-sans text-muted ${flip ? "text-[7px]" : "text-[9px]"}`}>
              লগ দেখা হয়নি কখনো
            </p>
          </div>
        </div>
      );
    case "puzzle-grid":
      return (
        <div className={wrap} aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 120">
            <g opacity="0.55">
              {Array.from({ length: 6 }, (_, r) =>
                Array.from({ length: 10 }, (__, c) => (
                  <rect
                    key={`${r}-${c}`}
                    x={40 + c * 32}
                    y={20 + r * 16}
                    width="28"
                    height="12"
                    rx="2"
                    fill={(r + c) % 3 === 0 ? "#3a8fa3" : "#0d1b2a"}
                    opacity={0.12 + ((r + c) % 5) * 0.04}
                  />
                ))
              ).flat()}
            </g>
          </svg>
          <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-mono text-[10px] font-semibold text-teal">
            ? → যুক্তি → কোড
          </p>
        </div>
      );
    default:
      return null;
  }
}
