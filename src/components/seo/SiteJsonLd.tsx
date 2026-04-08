import { BRAND } from "@/lib/brand";
import {
  SITE_DESCRIPTION,
  SITE_URL,
  publisherLogoPngAbsoluteUrl,
} from "@/lib/seo/site";

/** Site-wide JSON-LD for search engines (Organization + WebSite). */
export function SiteJsonLd() {
  const logoUrl = publisherLogoPngAbsoluteUrl();
  const root = SITE_URL.replace(/\/$/, "");
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BRAND.name,
        alternateName: [BRAND.nameLatin, "Datayon"],
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: logoUrl,
          contentUrl: logoUrl,
          encodingFormat: "image/png",
          caption: `${BRAND.name} — mark`,
        },
        sameAs: [BRAND.facebookUrl],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "editorial",
          email: BRAND.editorEmail,
          url: SITE_URL,
          availableLanguage: ["bn", "en"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: BRAND.name,
        alternateName: BRAND.nameLatin,
        url: SITE_URL,
        inLanguage: "bn-BD",
        description: SITE_DESCRIPTION,
        publisher: { "@id": `${SITE_URL}/#organization` },
        isPartOf: { "@id": `${SITE_URL}/#organization` },
        hasPart: [
          { "@id": `${root}/magazine#webpage` },
          { "@id": `${root}/articles#webpage` },
          { "@id": `${root}/about#webpage` },
        ],
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": `${root}/magazine#webpage`,
        url: `${root}/magazine`,
        name: "মাসিক সংখ্যা",
        inLanguage: "bn-BD",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${root}/articles#webpage`,
        url: `${root}/articles`,
        name: "আর্টিকেল",
        inLanguage: "bn-BD",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${root}/about#webpage`,
        url: `${root}/about`,
        name: "সম্পর্কে",
        inLanguage: "bn-BD",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
