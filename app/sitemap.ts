import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { LANGS, withLang } from "@/lib/translations"

/**
 * Sitemapa pro /sitemap.xml. Web nemá dynamické routy — realizace i recenze
 * jsou sekce statických stránek — takže stačí ruční seznam. Studio se
 * neuvádí (viz `robots.ts`).
 *
 * Jazykové verze žijí na stejné cestě s `?lang=sk|de` (viz `withLang`),
 * proto se hlásí jako hreflang alternativy; `cs` je výchozí bez parametru
 * a zároveň `x-default`.
 */
const pages: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/konf", priority: 0.9 },
  { path: "/konf/oploceni", priority: 0.9 },
  { path: "/konf/pergoly", priority: 0.9 },
  { path: "/konf/zabradli", priority: 0.8 },
  { path: "/konf/zaklady", priority: 0.7 },
  { path: "/realizace", priority: 0.8 },
  { path: "/chytra-reseni", priority: 0.7 },
  { path: "/pripravne-prace", priority: 0.7 },
  { path: "/pro-firmy", priority: 0.7 },
  { path: "/o-nas", priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map(({ path, priority }) => {
    const url = `${SITE_URL}${path}`
    const languages = Object.fromEntries(
      LANGS.map((lang) => [lang, `${SITE_URL}${withLang(path, lang)}`]),
    )
    return {
      url,
      changeFrequency: "monthly",
      priority,
      alternates: { languages: { ...languages, "x-default": url } },
    }
  })
}
