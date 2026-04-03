import { BRAND } from "@/lib/brand";
import {
  SITE_DESCRIPTION,
  SITE_URL,
  publisherLogoAbsoluteUrl,
} from "@/lib/seo/site";

/** Site-wide JSON-LD for search engines (Organization + WebSite). */
export function SiteJsonLd() {
  const logoUrl = publisherLogoAbsoluteUrl();
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
          encodingFormat: "image/svg+xml",
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
