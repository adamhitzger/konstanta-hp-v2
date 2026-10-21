import type { ImageLoaderProps } from "next/image"

/**
 * Obrázky ze Sanity zmenšuje přímo Sanity CDN parametry v URL, ne Next optimalizátor.
 *
 * Fotky ve Studiu jsou originály z foťáku (5 000–6 000 px, 2–4 MB). Next optimalizátor
 * si na každou šířku × formát stahoval celý originál a po vypršení cache znovu; komponenty
 * s `unoptimized` posílaly originál rovnou návštěvníkovi. Obojí šlo do bandwidth kvóty
 * Sanity, která na free plánu web při vyčerpání zablokuje.
 */
export const isSanityImage = (src: string) => src.startsWith("https://cdn.sanity.io/images/")

export function sanityLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src)
  const p = url.searchParams
  const w = Number(p.get("w"))
  const h = Number(p.get("h"))
  // Ořez s pevným poměrem (`CARD_IMG` v lib/reviews.ts) — výška se škáluje se šířkou.
  // Samotné `h` (loga) by se s `w` přetahovalo, šířka z `<Image>` stačí.
  if (w && h) p.set("h", String(Math.round((h * width) / w)))
  else p.delete("h")
  p.set("w", String(width))
  if (!p.has("fit")) p.set("fit", "max")
  p.set("auto", "format")
  p.set("q", String(quality ?? 75))
  return url.toString()
}

/** `srcSet` pro ruční `<img>`/`<picture>` mimo `next/image` (hero galerie na homepage). */
export const sanitySrcSet = (src: string, widths: number[]): string =>
  widths.map((width) => `${sanityLoader({ src, width })} ${width}w`).join(", ")

/**
 * Pro místa mimo `next/image` (e-maily). Pevně JPEG: `auto=format` by podle hlavičky
 * klienta poslal WebP/AVIF, který část poštovních klientů (Outlook) nezobrazí.
 */
export const sanityImg = (src: string, width: number): string =>
  isSanityImage(src) ? `${src}${src.includes("?") ? "&" : "?"}w=${width}&fit=max&fm=jpg&q=80` : src
