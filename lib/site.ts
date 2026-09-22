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
