import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, SectionHeading, Parallax } from "@/components/reveal"
import { realizaceContent, realizacePageContent, withLang, type Lang } from "@/lib/translations"
import type { RealizaceTeaser } from "@/types"

/** Když v Sanity ještě není nahraná úvodní fotka, sekce spadne na tyhle záběry. */

/**
 * Upoutávka realizací na homepage. Fotky jsou reálné úvodní fotky (`photo`)
 * produktových kategorií ze Sanity — jedna na kategorii, poskládané
 * `buildRealizaceTeaser` v lib/realizace.ts. Celá sekce vede na /realizace,
 * kde je kompletní galerie s filtrem motivů.
 */
export function Realizace({ items = [], lang = "cs" }: { items?: RealizaceTeaser[]; lang?: Lang }) {
  const t = realizaceContent[lang] ?? realizaceContent.cs
  const rt = realizacePageContent[lang] ?? realizacePageContent.cs
  const href = withLang("/realizace", lang)

  /* Každá dlaždice je jedna kategorie, takže vede rovnou na její záložku v galerii. */
  const cards =
    items.length > 0
      && items.map((it) => ({
          key: it.cat,
          image: it.banner,
          title: rt.cats[it.cat].tab,
          text: rt.cats[it.cat].heading,
          href: withLang(`/realizace?filter=${it.cat}`, lang),
        }))

  return (
    <section id="realizace" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="up" className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={t.heading} className="max-w-2xl" />
          <Button
            render={<a href={href} />}
            nativeButton={false}
            size="lg"
            variant="outline"
            className="w-fit font-semibold hover:border-brand hover:bg-brand hover:text-brand-foreground"
          >
            {t.cta}
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Reveal>

        <Reveal variant="tilt" childSelector="[data-real]" className="grid gap-6 md:grid-cols-3">
          {cards && cards.map((c, i) => (
            <Parallax key={c.key} speed={[35, 70, 50][i % 3]}>
              <a data-real href={c.href} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src={c.image}
                  alt={c.text}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />

                <div className="absolute left-4 top-4">
                  <span className="rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-brand-foreground">
                    {c.title}
                  </span>
                </div>

                <figcaption className="absolute inset-x-0 bottom-0 border-t border-border bg-background p-5">
                  <h3 className="font-heading text-xl font-bold">{c.text}</h3>
                  <p className="mt-0.5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                    {t.cta}
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </figcaption>
              </a>
            </Parallax>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
