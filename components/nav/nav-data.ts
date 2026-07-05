/**
 * Navigation model. Two leaf kinds — nezaměňovat:
 *  - "anchor" → skok na sekci (#id) v rámci stránky, render jako <a>, smooth scroll.
 *  - "page"   → samostatná routa, render jako Next <Link>.
 * Struktura vychází z „Ikony a podikony na webu".
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

export const navItems: NavTop[] = [
  {
    label: "Jsme Konstanta",
    children: [
      { label: "Jsme Konstanta", desc: "Kdo jsme a čemu věříme", href: "/o-nas#jsme-konstanta", type: "anchor" },
      { label: "Síla Konstanty", desc: "10 pilířů naší práce", href: "/o-nas#sila-konstanty", type: "anchor" },
      { label: "Co oceníte", desc: "Nejdůležitější v kostce", href: "/o-nas#co-ocenite", type: "anchor" },
      { label: "Jak to u nás probíhá", desc: "Postup od zaměření po montáž", href: "/o-nas#jak-to-probiha", type: "anchor" },
      { label: "Certifikáty a patenty", desc: "Patent, materiály, ocenění", href: "/o-nas#certifikaty", type: "anchor" },
      { label: "FAQ", desc: "Časté dotazy a odpovědi", href: "/o-nas#faq", type: "anchor" },
    ],
  },
  {
    label: "Co nabízíme",
    children: [
      { label: "Ploty", desc: "Hliníkové ploty na míru", href: "/#produkty", type: "anchor" },
      { label: "Brány a branky", desc: "Posuvné, křídlové, s pohonem", href: "/#produkty", type: "anchor" },
      { label: "Pergoly", desc: "Bioklimatické s lamelami", href: "/#produkty", type: "anchor" },
      { label: "Přípravné práce", desc: "Základy a podezdívky", href: "/#produkty", type: "anchor" },
      { label: "Chytrá řešení", desc: "Automatizace a technologie", href: "/#produkty", type: "anchor" },
      { label: "Subdodávky", desc: "Pro firmy a partnery", href: "/#produkty", type: "anchor" },
    ],
  },
  { label: "Realizace", href: "/#realizace", type: "anchor" },
  // TODO: až vznikne, přesměrovat na dedikovanou routu /pro-firmy (type: "page")
  { label: "Pro firmy", href: "/#kontakt", type: "anchor" },
  { label: "Kontakty", href: "/#kontakt", type: "anchor" },
]

export function hasChildren(
  item: NavTop,
): item is { label: string; children: NavLeaf[] } {
  return "children" in item
}

/** Sticky-header offset (px) used when smooth-scrolling to an anchor. */
export const HEADER_OFFSET = 80
