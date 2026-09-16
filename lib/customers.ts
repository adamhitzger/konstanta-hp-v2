import type { CustomerDoc, CustomerLogo } from "@/types"

/**
 * Logo v pásu je vysoké 40 px (`h-10`), ze Studia ale chodí originály. Sanity image
 * CDN ho zmenší přímo v URL (viz `CARD_IMG` v lib/reviews.ts) — 3× kvůli retině
 * a ostrým hranám u textových log. SVG vrátí CDN beze změny.
 */
const LOGO_IMG = "?h=120&fit=max&auto=format"

/**
 * Dokumenty `customer` → data pro `<Customers />`. Vypadnou rozdělané záznamy bez
 * jména nebo loga; rozměry bez metadat spadnou na 3:1, ať `<Image>` dostane poměr.
 */
export function buildCustomers(docs: CustomerDoc[] | null | undefined): CustomerLogo[] {
  if (!docs) return []

  return docs.flatMap((doc) => {
    const name = doc.name?.trim()
    if (!name || !doc.logo) return []

    return [
      {
        id: doc._id,
        name,
        url: doc.url?.trim() || undefined,
        logo: `${doc.logo}${LOGO_IMG}`,
        width: doc.width && doc.height ? doc.width : 120,
        height: doc.width && doc.height ? doc.height : 40,
      },
    ]
  })
}
