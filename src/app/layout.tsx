import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  DM_Sans,
  Hind_Siliguri,
  Noto_Sans_Bengali,
  Noto_Serif_Bengali,
  Tiro_Bangla,
} from "next/font/google";
import "./globals.css";
import { SiteJsonLd } from "@/components/seo/SiteJsonLd";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { BRAND } from "@/lib/brand";
import { DEFAULT_OG_IMAGE_PATH } from "@/lib/seo/page-metadata";
import { SEO_KEYWORDS, SITE_DESCRIPTION, SITE_DESCRIPTION_EN, SITE_URL } from "@/lib/seo/site";

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

const siteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || undefined;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: BRAND.nameLatin,
  ...(siteVerification
    ? { verification: { google: siteVerification } }
    : {}),
  appleWebApp: {
    title: BRAND.name,
    capable: true,
  },
  title: {
    default: `${BRAND.name} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [...SEO_KEYWORDS],
  authors: [{ name: BRAND.name, url: SITE_URL }],
  creator: BRAND.name,
  publisher: BRAND.name,
  category: "technology",
  classification: "Magazine",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: BRAND.nameLatin,
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: SITE_DESCRIPTION,
    countryName: "Bangladesh",
    emails: ["editor@datayon.bd"],
    images: [
      {
        url: DEFAULT_OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: `${BRAND.name} — ${BRAND.tagline}`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@datayon",
    creator: "@datayon",
    title: `${BRAND.name} — ${BRAND.tagline}`,
    description: SITE_DESCRIPTION_EN,
    images: [DEFAULT_OG_IMAGE_PATH],
  },
  alternates: {
    canonical: "/",
    languages: {
      "bn-BD": "/",
      "x-default": "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        type: "image/x-icon",
        sizes: "32x32",
      },
      {
        url: "/web-app-manifest-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
      {
        url: "/web-app-manifest-512x512.png",
        type: "image/png",
        sizes: "512x512",
      },
    ],
    apple: [
      {
        url: "/web-app-manifest-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#0d1b2a",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0ebe0" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1b2a" },
  ],
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      data-scroll-behavior="smooth"
      className={`${hindSiliguri.variable} ${tiroBangla.variable} ${dmSans.variable} ${notoSerifBengali.variable} ${notoSansBengali.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-paper text-ink antialiased">
        <SiteJsonLd />
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
        <Analytics />
      </body>
    </html>
  );
}
