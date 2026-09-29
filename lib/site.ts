import type { Metadata } from 'next'

type OpenGraph = NonNullable<Metadata['openGraph']>
type Twitter = NonNullable<Metadata['twitter']>

/**
 * Absolutní základ webu bez koncového lomítka. Používá ho `metadataBase`
 * v layoutu (relativní `alternates.canonical` na stránkách), sitemapa
 * a robots.txt. Holá doména dělá 308 na `www`, proto je tady www tvar.
 */
export const SITE_URL = "https://www.konstantahp.cz"

/**
 * Výchozí titulek a popis webu. Bydlí tady, protože je potřebuje layout
 * (`metadata`) i homepage (WebPage JSON-LD) — a musí být totožné.
 */
export const SITE_NAME = 'KONSTANTA - hliníkové ploty s.r.o.'
export const DEFAULT_TITLE = 'Hliníkové ploty, brány a pergoly na míru | KONSTANTA'
export const DEFAULT_DESCRIPTION =
  'Vyrábíme a montujeme hliníkové ploty, brány, branky a bioklimatické pergoly na míru. Výrobna na Vysočině, montáž po celé ČR. Zaměření a kalkulace zdarma.'

const OG_IMAGE = {
  url: '/og-image.jpg',
  width: 1200,
  height: 630,
  alt: 'Hliníková brána a plot KONSTANTA před moderním domem',
  type: 'image/jpeg',
}

/** Open Graph společný všem stránkám — layout ho má bez `url`. */
export const BASE_OPEN_GRAPH: OpenGraph = {
  type: 'website',
  locale: 'cs_CZ',
  alternateLocale: ['sk_SK', 'de_DE'],
  siteName: SITE_NAME,
  images: [OG_IMAGE],
}

export const BASE_TWITTER: Twitter = {
  card: 'summary_large_image',
  images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
}

/**
 * Open Graph konkrétní stránky s `og:url`. Next `openGraph` z layoutu
 * nemerguje — objekt na stránce ho nahradí celý — proto se tu skládá
 * znovu i s obrázkem.
 */
export function pageOpenGraph(path: string): OpenGraph {
  return { ...BASE_OPEN_GRAPH, url: path }
}
