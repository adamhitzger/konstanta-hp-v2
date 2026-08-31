import type {
  ConfPhotoItem,
  ProductPhotosDoc,
  RealizaceCat,
  RealizaceGroup,
  RealizaceTeaser,
} from "@/types"

/** Pořadí záložek na /realizace. Zároveň klíčuje texty v `realizaceContent`. */
export const REALIZACE_CATS: RealizaceCat[] = ["ploty", "brany", "branky", "pergoly", "zabradli"]

/**
 * `cat` ze Sanity → záložka. Branky mají ve Studiu vlastní kategorii `productPhotos`,
 * takže dostávají i vlastní záložku — dřív se slévaly do „Brány a branky" a vjezdové
 * brány pak v galerii přebíjely fotky vstupních branek.
 */
const CAT_MAP: Record<string, RealizaceCat> = {
  ploty: "ploty",
  brany: "brany",
  branky: "branky",
  pergoly: "pergoly",
  zabradli: "zabradli",
}

/**
 * Pole v `productPhotos` → id motivu (stejná id jako `motivLabels`). Nadmnožina mapy
 * v lib/product-photos.ts: navíc `lamela`, `vypalovani` a `sklo`, které konfigurátor
 * nezobrazuje, ale na realizacích dávají smysl (pergoly, zábradlí).
 */
const MOTIV_FIELD_TO_ID: Record<string, string> = {
  okS: "o-standart",
  okK: "kapka",
  okKM: "kapka-mini",
  p60: "planka-60",
  p90: "plaka-90",
  p120: "planka-120",
  p150: "planka-150",
  tycka: "tycka",
  tahokov: "tahokov",
  drevodekor: "drevodekor",
  lamela: "lamela-105",
  vypalovani: "vypaleni",
  sklo: "sklo",
  vlKom: "vlastní kombinace",
}

/**
 * Poskládá fotky realizací do záložek. Fotky se deduplikují podle URL — tentýž
 * záběr bývá v Sanity nahraný u víc produktů (např. plot i branka ze stejné zakázky)
 * a v galerii by se pak objevil dvakrát za sebou.
 *
 * `banner` (Úvodní fotka) se přidává až nakonec a bez motivu: je to kurátorovaný
 * záběr produktu, ne fotka konkrétní realizace, takže patří na konec a ne do filtru.
 */
export function buildRealizace(docs: ProductPhotosDoc[] | null | undefined): RealizaceGroup[] {
  const byCat = new Map<RealizaceCat, ConfPhotoItem[]>(REALIZACE_CATS.map((c) => [c, []]))
  const seen = new Map<RealizaceCat, Set<string>>(REALIZACE_CATS.map((c) => [c, new Set()]))

  const push = (cat: RealizaceCat, url: string | undefined, motiv?: string) => {
    if (!url) return
    const urls = seen.get(cat)!
    if (urls.has(url)) return
    urls.add(url)
    byCat.get(cat)!.push(motiv ? { url, motiv } : { url })
  }

  for (const doc of docs ?? []) {
    const cat = doc.cat ? CAT_MAP[doc.cat] : undefined
    if (!cat) continue
    for (const [field, motiv] of Object.entries(MOTIV_FIELD_TO_ID)) {
      const urls = doc[field as keyof ProductPhotosDoc] as string[] | null | undefined
      for (const url of urls ?? []) push(cat, url, motiv)
    }
  }

  // Bannery až po fotkách realizací, ať galerii nevede produktový render.
  for (const doc of docs ?? []) {
    const cat = doc.cat ? CAT_MAP[doc.cat] : undefined
    if (cat) push(cat, doc.banner)
  }

  return REALIZACE_CATS.map((cat) => ({ cat, photos: byCat.get(cat)! })).filter(
    (g) => g.photos.length > 0,
  )
}

/**
 * Pořadí dlaždic v upoutávce na homepage. Vlastní seznam, ne `REALIZACE_CATS` —
 * ta má od rozdělení branek pět položek a branky by z trojice na homepage vytlačily
 * pergoly. Na homepage se drží tři nosné produkty, branky mají svou záložku v galerii.
 */
const TEASER_CATS: RealizaceCat[] = ["ploty", "brany", "pergoly", "zabradli"]

/**
 * Upoutávka realizací na homepage — jedna úvodní fotka na kategorii, v pořadí
 * `TEASER_CATS`. Kategorie bez nahrané úvodní fotky se přeskočí, takže sekce
 * nikdy nevykreslí prázdnou dlaždici.
 */
export function buildRealizaceTeaser(
  docs: { cat?: string; banner?: string }[] | null | undefined,
  limit = 3,
): RealizaceTeaser[] {
  const out: RealizaceTeaser[] = []
  for (const cat of TEASER_CATS) {
    const doc = (docs ?? []).find((d) => d.cat && CAT_MAP[d.cat] === cat && d.banner)
    if (doc?.banner) out.push({ cat, banner: doc.banner })
    if (out.length === limit) break
  }
  return out
}
