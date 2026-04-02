import type { Metadata, Viewport } from "next";
import {
  DM_Sans,
  Hind_Siliguri,
  Noto_Sans_Bengali,
  Noto_Serif_Bengali,
  Tiro_Bangla,
} from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { BRAND } from "@/lib/brand";

/* Brand: Hind Siliguri = logo/wordmark (Branding/datayon_facebook_profile_logo*.html). */
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm",
  display: "swap",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700", "900"],
  variable: "--font-noto-serif-bn",
  display: "swap",
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bn",
  display: "swap",
});

/** Long-form Bangla serif — editorial reading (Google Fonts). */
const tiroBangla = Tiro_Bangla({
  subsets: ["bengali"],
  weight: "400",
  variable: "--font-tiro-bn",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://datayon.bd";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description:
    "বাংলায় প্রযুক্তি, স্টার্টআপ, নীতি ও সংস্কৃতি — ডেটায়ন ম্যাগাজিন।",
  keywords: [
    "ডেটায়ন",
    "বাংলা প্রযুক্তি",
    "টেক ম্যাগাজিন",
    "Bangladesh tech",
    "Datayon",
  ],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    siteName: BRAND.nameLatin,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description:
      "বাংলায় প্রযুক্তি, স্টার্টআপ, নীতি ও সংস্কৃতি — ডেটায়ন ম্যাগাজিন।",
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — ${BRAND.tagline}`,
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/brand/datayon-mark.svg",
    apple: "/brand/datayon-mark.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0ebe0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1b2a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${tiroBangla.variable} ${dmSans.variable} ${notoSerifBengali.variable} ${notoSansBengali.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-paper text-ink antialiased">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-teal focus:px-4 focus:py-2 focus:text-navy"
          >
            মূল বিষয়বস্তুতে যান
          </a>
          <SiteHeader />
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
