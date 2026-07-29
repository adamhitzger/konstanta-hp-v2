import type { ConfPhotoItem, ConfPhotosWithMotiv, ProductPhotosDoc } from "@/types"

/**
 * `productPhotos` dokumenty v Sanity nemají žádné strojové id — rozlišují se jen
 * lidsky čitelným `nameCs`. Tahle mapa říká, který dokument (podle přesného názvu,
 * jak je zadaný v Sanity) patří ke kterému `photosKey` z `lib/konf-content.ts` /
 * `lib/perg-content.ts`. Když klient dokument v Studiu přejmenuje, daná položka
 * jen přijde o fotky v galerii (nespadne nic) — proto stojí za to při přejmenování
 * v Sanity tuhle mapu zase doladit.
 */
export const PRODUCT_PHOTOS_NAME_MAP: Record<keyof ConfPhotosWithMotiv, string> = {
  dvoukridla: "Dvoukřídlá",
  jednokridla: "Jednokřídlá brána",
  samonosna: "Samonosná brána",
  poKolejnici: "Brána po kolejnici",
  telSam: "Teleskopická brána",
  telPoj: "Teleskopická pojezdová brána",
  atypicka: "Atypická brána",
  sikma: "Šikmá brána",
  skladaci: "Křídlová skládací brána",
  sekcni: "Sekční brána po kolejnicích",
  branka: "Branka",
  ploty: "Plotové dílce",
  bioklimaticka: "Bioklimatické pergoly",
  zahrada: "Zimní zahrady",
  pristresek: "Přístřešky",
}

/** Klíč pole v `productPhotos` → id motivu, stejné jako `motivy`/`motivLabels`. */
const MOTIV_FIELD_TO_ID: Record<string, string> = {
  okS: "o-standart",
  okK: "kapka",
  okKM: "kapka-mini",
  p60: "planka-60",
  p90: "plaka-90",
  p120: "planka-120",
  p150: "planka-150",
  tycka: "tycka",
  vlKom: "vlastní kombinace",
  drevodekor: "drevodekor",
  tahokov: "tahokov",
}

function flattenDoc(doc: ProductPhotosDoc): ConfPhotoItem[] {
  return Object.entries(MOTIV_FIELD_TO_ID).flatMap(([field, motiv]) => {
    const urls = (doc[field as keyof ProductPhotosDoc] as string[] | null | undefined) ?? []
    return urls.filter(Boolean).map((url) => ({ url, motiv }))
  })
}

/**
 * Vezme syrové `productPhotos` dokumenty (PRODUCT_PHOTOS_QUERY) a poskládá je do
 * stejného tvaru, jaký dřív měl `ConfPhotos`/`ConfPhotosWithMotiv` z `confPhotos` —
 * takže `Configurator`/`PergolaConfigurator` a jednotlivé kroky se nemusí měnit,
 * jen se jinak plní `photos` prop.
 */
export function buildGalleryPhotos(docs: ProductPhotosDoc[] | null | undefined): ConfPhotosWithMotiv {
  const byName = new Map<string, ProductPhotosDoc>()
  for (const doc of docs ?? []) {
    if (doc.nameCs) byName.set(doc.nameCs.trim(), doc)
  }

  const result = {} as ConfPhotosWithMotiv
  for (const key of Object.keys(PRODUCT_PHOTOS_NAME_MAP) as (keyof ConfPhotosWithMotiv)[]) {
    const doc = byName.get(PRODUCT_PHOTOS_NAME_MAP[key])
    result[key] = doc ? flattenDoc(doc) : []
  }
  return result
}
