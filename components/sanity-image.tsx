"use client"

import Image, { type ImageProps } from "next/image"
import { isSanityImage, sanityLoader } from "@/lib/sanity-image"

/**
 * `next/image`, který obrázky ze Sanity CDN zmenšuje přes `sanityLoader` (viz lib/sanity-image.ts).
 * Ostatní zdroje (`/public`, placeholder) jdou dál přes Next optimalizátor. Client komponenta
 * proto, že loader je funkce — ze server komponenty by se do `<Image>` předat nedala.
 */
export function SanityImage(props: ImageProps) {
  const fromSanity = typeof props.src === "string" && isSanityImage(props.src)
  return <Image {...props} loader={fromSanity ? sanityLoader : props.loader} />
}
