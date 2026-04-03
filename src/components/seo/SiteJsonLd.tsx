import { BRAND } from "@/lib/brand";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/seo/site";

const LOGO_PNG = `${SITE_URL}/brand/datayon-profile-logo-2048-light.png`;

/** Site-wide JSON-LD for search engines (Organization + WebSite). */
export function SiteJsonLd() {
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
          url: LOGO_PNG,
          width: 2048,
          height: 2048,
          caption: `${BRAND.name} — lockup`,
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
