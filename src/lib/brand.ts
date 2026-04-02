/** Datayon magazine — shared brand tokens (`Branding/` + site). */
export const BRAND = {
  /**
   * Hind Siliguri = logo/wordmark (see `datayon_facebook_profile_logo*.html`).
   * Tiro Bangla = long-form প্রবন্ধ body (literary Bangla serif).
   * Noto Serif Bengali = section headings; Noto Sans Bengali = UI/body; DM Sans = Latin UI.
   */
  font: {
    google:
      "https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Hind+Siliguri:wght@500;600;700&family=Tiro+Bangla&family=Noto+Serif+Bengali:wght@400;500;600;700;900&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap",
  },
  colors: {
    navy: "#0d1b2a",
    navyDeep: "#060e18",
    navyMid: "#0f2336",
    cream: "#f0ebe0",
    teal: "#3a8fa3",
    tealDark: "#2a6f80",
    gray: "#6a8a9a",
    grayLight: "#8aa0aa",
    border: "#1a3040",
  },
  name: "ডেটায়ন",
  nameLatin: "DATAYON",
  tagline: "বাংলার প্রযুক্তি চিন্তা",
  url: "datayon.bd",
  social: "@datayon",
} as const;

export type Brand = typeof BRAND;
