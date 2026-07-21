import { navContent, type Lang } from "@/lib/translations"

/**
 * Navigation model. Two leaf kinds — nezaměňovat:
 *  - "anchor" → skok na sekci (#id) v rámci stránky, render jako <a>, smooth scroll.
 *  - "page"   → samostatná routa, render jako Next <Link>.
 * Struktura vychází z „Ikony a podikony na webu". Popisky se berou z
 * `lib/translations.ts` podle aktuálního jazyka.
 */
export type NavLeaf = {
  label: string
  desc: string // krátký popis pod nadpisem v desktop dropdownu
  href: string
  type: "anchor" | "page"
}

export type NavTop =
  | { label: string; href: string; type: "anchor" | "page" } // bez potomků
  | { label: string; children: NavLeaf[] } // dropdown

export function getNavItems(lang: Lang): NavTop[] {
  const t = navContent[lang] ?? navContent.cs
  return [
    {
      label: t.jsmeKonstanta,
      children: [
        { ...t.jsmeKonstantaChildren[0], href: "/o-nas#jsme-konstanta", type: "anchor" },
        { ...t.jsmeKonstantaChildren[1], href: "/o-nas#sila-konstanty", type: "anchor" },
        { ...t.jsmeKonstantaChildren[2], href: "/o-nas#co-ocenite", type: "anchor" },
        { ...t.jsmeKonstantaChildren[3], href: "/o-nas#jak-to-probiha", type: "anchor" },
        { ...t.jsmeKonstantaChildren[4], href: "/o-nas#certifikaty", type: "anchor" },
        { ...t.jsmeKonstantaChildren[5], href: "/o-nas#faq", type: "anchor" },
      ],
    },
    {
      label: t.coNabizime,
      children: [
        { ...t.coNabizimeChildren[0], href: "/#produkty", type: "anchor" },
        { ...t.coNabizimeChildren[1], href: "/#produkty", type: "anchor" },
        { ...t.coNabizimeChildren[2], href: "/#produkty", type: "anchor" },
        { ...t.coNabizimeChildren[3], href: "/#produkty", type: "anchor" },
        { ...t.coNabizimeChildren[4], href: "/#produkty", type: "anchor" },
        { ...t.coNabizimeChildren[5], href: "/#produkty", type: "anchor" },
      ],
    },
    { label: t.realizace, href: "/#realizace", type: "anchor" },
    { label: t.konfigurator, href: "/konf", type: "page" },
    // TODO: až vznikne, přesměrovat na dedikovanou routu /pro-firmy (type: "page")
    { label: t.proFirmy, href: "/#kontakt", type: "anchor" },
    { label: t.kontakty, href: "/#kontakt", type: "anchor" },
  ]
}

export function hasChildren(
  item: NavTop,
): item is { label: string; children: NavLeaf[] } {
  return "children" in item
}

/** Sticky-header offset (px) used when smooth-scrolling to an anchor. */
export const HEADER_OFFSET = 80
