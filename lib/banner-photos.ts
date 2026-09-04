import { galleryContent, withLang, type Lang } from "@/lib/translations"
import type { BannerPhotoDoc, GallerySlide } from "@/types"

/**
 * Pořadí snímků ve Studiu drží pořadí záložek na /realizace: i-tý snímek vede
 * na i-tou kategorii. Snímek navíc (kdyby jich redakce nahrála víc) míří do
 * galerie bez filtru, ať nadpis nikdy nevede na neexistující záložku.
 */
const SLIDE_HREFS = [
  "/realizace?filter=ploty",
  "/realizace?filter=brany",
  "/realizace?filter=branky",
  "/realizace?filter=pergoly",
]

/**
 * Fotky ze Studia jsou originály z foťáku (tady 2 000–5 900 px, jednotky MB) a
 * `next.config.mjs` má `images.unoptimized`, takže je nikdo cestou nezmenší.
 * Zmenšení proto řeší Sanity image CDN přímo v URL — snímky jsou pozadí přes
 * celou obrazovku, takže desktop dostává 2 400 px a mobil 1 200 px.
 */
const DESKTOP_IMG = "?w=2400&fit=max&auto=format"
const MOBILE_IMG = "?w=1200&fit=max&auto=format"

/** Pole s nápisem přes fotku podle jazyka stránky. */
const TEXT_FIELD: Record<Lang, "cjText" | "skText" | "deText"> = {
  cs: "cjText",
  sk: "skText",
  de: "deText",
}

/**
 * Záložní snímky z `public/`, když ze Sanity nic nepřijde (výpadek dotazu nebo
 * prázdný dokument). Homepage tak nikdy nezůstane s prázdnou galerií.
 */
const FALLBACK_IMAGES = [
  { imgMobile: "/real/oploceni.png", imgDesktop: "/real/oploceni.jpeg" },
  { imgMobile: "/real/mobil/brana-sikma.jpg", imgDesktop: "/real/brana-sikma.jpg" },
  { imgMobile: "/real/Branka.jpg", imgDesktop: "/real/Branka.jpg" },
  { imgMobile: "/real/pergola.jpg", imgDesktop: "/real/pergola.jpg" },
]

const hrefFor = (i: number, lang: Lang) => withLang(SLIDE_HREFS[i] ?? "/realizace", lang)

/**
 * Snímky `bannerPhotos` ze Studia → data pro `HorizontalGallery`. Položky bez
 * fotky vypadnou — ve Studiu jde uložit i prázdný řádek pole a v liště by se
 * pak objevil černý snímek. Chybějící nápis nebo `mobilePhoto` se dopočítá:
 * text z `galleryContent` (resp. z `alt`), mobilní fotka z desktopové.
 */
export function buildGallerySlides(
  photos: BannerPhotoDoc[] | null | undefined,
  lang: Lang,
): GallerySlide[] {
  const t = galleryContent[lang] ?? galleryContent.cs

  const slides = (photos ?? []).flatMap((photo, i) => {
    const desktop = photo.src?.trim()
    if (!desktop) return []

    const mobile = photo.mobileSrc?.trim() || desktop
    // Chybějící překlad spadne na `alt` a pak na statický nadpis — lepší nápis
    // v cizím jazyce než prázdné místo přes celou obrazovku.
    const title = photo[TEXT_FIELD[lang]]?.trim() || photo.alt?.trim() || t.titles[i] || ""

    return [
      {
        title,
        // `alt` je ve Studiu jen česky, takže přednost dostane přeložený popisek
        // z `galleryContent` — `alt` slouží až snímkům nad rámec čtyř kategorií.
        label: t.labels[i] || photo.alt?.trim() || title,
        href: hrefFor(i, lang),
        imgMobile: `${mobile}${MOBILE_IMG}`,
        imgDesktop: `${desktop}${DESKTOP_IMG}`,
      },
    ]
  })

  if (slides.length > 0) return slides

  return FALLBACK_IMAGES.map((img, i) => ({
    ...img,
    title: t.titles[i],
    label: t.labels[i],
    href: hrefFor(i, lang),
  }))
}
