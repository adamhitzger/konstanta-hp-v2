import type { Lang } from "@/lib/translations"
import type { Review, ReviewDoc } from "@/types"

/** Pole s překladem hodnocení podle jazyka stránky. */
const TEXT_FIELD: Record<Lang, "text" | "skText" | "njText"> = {
  cs: "text",
  sk: "skText",
  de: "njText",
}

/**
 * Karta recenze je 288 px široká, ale ze Studia chodí originály (běžně přes 5 000 px
 * na šířku) a `next.config.mjs` má `images.unoptimized`, takže by je prohlížeč stáhl
 * celé. Zmenšení proto řeší Sanity image CDN přímo v URL — 2× kvůli retině.
 */
const CARD_IMG = "?w=576&h=432&fit=crop&auto=format"

/**
 * Recenze ze Studia → data pro `Testimonials`. Vypadnou rozdělané dokumenty
 * (bez textu nebo bez podpisu) — ve Studiu jde uložit i prázdná recenze a v marquee
 * by se pak točila prázdná karta.
 */
export function buildReviews(docs: ReviewDoc[] | null | undefined, lang: Lang): Review[] {
  if (!docs) return []

  return docs.flatMap((doc) => {
    // Chybějící překlad spadne na češtinu — lepší česká recenze než prázdné místo.
    const text = (doc[TEXT_FIELD[lang]] ?? doc.text)?.trim()
    const name = doc.author_name?.trim()
    if (!text || !name) return []

    return [
      {
        id: doc._id,
        name,
        text,
        rating: Math.min(5, Math.max(1, Math.round(doc.rating ?? 5))),
        image: doc.image ? `${doc.image}${CARD_IMG}` : undefined,
        url: doc.author_url?.trim() || undefined,
      },
    ]
  })
}
