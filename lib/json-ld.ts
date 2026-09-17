import { SITE_URL } from "@/lib/site"
import { FOUNDED_YEAR, faqContent, type Lang } from "@/lib/translations"

/**
 * Strukturovaná data (schema.org) pro Google. Renderují se přes <JsonLd />
 * v `components/json-ld.tsx`. Firemní údaje (NAP) musí sedět s patičkou
 * (`components/site-footer.tsx`) a s Google Business Profile — když se něco
 * změní, měnit na všech místech.
 */

const ORG_ID = `${SITE_URL}/#organization`

export const ORGANIZATION = {
  name: "KONSTANTA - hliníkové ploty s.r.o.",
  legalName: "KONSTANTA - hliníkové ploty s.r.o.",
  ico: "21827150",
  telephone: "+420770169411",
  email: "info@konstantahp.cz",
  street: "Maleč 36",
  postalCode: "582 76",
  locality: "Maleč",
  region: "Kraj Vysočina",
  sameAs: [
    "https://www.instagram.com/konstantaploty/",
    "https://www.facebook.com/Konstantahp.cz",
    "https://www.youtube.com/@KONSTANTAHP",
  ],
} as const

/** LocalBusiness pro celý web — vkládá se v `app/layout.tsx`. */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["HomeAndConstructionBusiness", "LocalBusiness"],
    "@id": ORG_ID,
    name: ORGANIZATION.name,
    legalName: ORGANIZATION.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-konstanta.svg`,
    image: `${SITE_URL}/og-image.jpg`,
    telephone: ORGANIZATION.telephone,
    email: ORGANIZATION.email,
    foundingDate: String(FOUNDED_YEAR),
    vatID: `CZ${ORGANIZATION.ico}`,
    identifier: { "@type": "PropertyValue", propertyID: "IČO", value: ORGANIZATION.ico },
    address: {
      "@type": "PostalAddress",
      streetAddress: ORGANIZATION.street,
      postalCode: ORGANIZATION.postalCode,
      addressLocality: ORGANIZATION.locality,
      addressRegion: ORGANIZATION.region,
      addressCountry: "CZ",
    },
    areaServed: { "@type": "Country", name: "Česká republika" },
    sameAs: ORGANIZATION.sameAs,
    priceRange: "$$",
    knowsAbout: ["hliníkové ploty", "hliníkové brány", "bioklimatické pergoly", "hliníkové zábradlí"],
    makesOffer: [
      { name: "Hliníkové ploty na míru", url: `${SITE_URL}/konf/oploceni` },
      { name: "Hliníkové brány a branky", url: `${SITE_URL}/konf/oploceni` },
      { name: "Bioklimatické pergoly", url: `${SITE_URL}/konf/pergoly` },
      { name: "Hliníkové a skleněné zábradlí", url: `${SITE_URL}/konf/zabradli` },
    ].map((o) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: o.name, url: o.url, provider: { "@id": ORG_ID } },
    })),
  }
}

/** FAQPage z téhož pole, které vykresluje `components/o-nas/faq.tsx`. */
export function faqJsonLd(lang: Lang) {
  const t = faqContent[lang] ?? faqContent.cs
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }
}

/** Drobečková navigace — první položka je vždy homepage. */
export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "KONSTANTA", path: "/" }, ...items].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  }
}
