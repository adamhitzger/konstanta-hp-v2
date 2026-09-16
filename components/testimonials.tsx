"use client"

import { useRef } from "react"
import Image from "next/image"
import { AnimatedText } from "@/components/reveal"
import { testimonialsContent, type Lang } from "@/lib/translations"
import { useAutoScrollLoop } from "@/lib/use-auto-scroll-loop"
import type { Review } from "@/types"

function Stars({ rating, label }: { rating: number; label: string }) {
  return (
    <div className="text-base" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} aria-hidden className={i < rating ? "text-brand" : "text-muted-foreground/30"}>
          ★
        </span>
      ))}
    </div>
  )
}

/* `tabbable=false` u dalších kopií pásu: karta je klikací, ale tabulátor ji přeskočí. */
function ReviewCard({ r, t, tabbable = true }: { r: Review; t: (typeof testimonialsContent)["cs"]; tabbable?: boolean }) {
  const card = (
    <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 group-hover/card:border-brand/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={r.image || "/placeholder.svg"}
          alt={t.photoAlt(r.name)}
          fill
          sizes="288px"
          draggable={false}
          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>
      <blockquote className="flex flex-1 flex-col gap-4 p-6">
        <Stars rating={r.rating} label={t.ratingAlt(r.rating)} />
        {/* Recenze z Googlu jsou různě dlouhé — bez ořezu by nejdelší z nich natáhla
            výšku všech karet v pásu a u těch krátkých by zůstalo prázdné místo.
            Celé znění si zákazník otevře prokliknutím karty. */}
        <p className="line-clamp-4 text-base leading-relaxed text-pretty text-foreground/65">„{r.text}"</p>
        <figcaption className="mt-auto">
          <p className="font-heading font-bold">{r.name}</p>
          {r.url ? (
            // Odkaz je celá karta (viz níž), tohle je jen její vizuální výzva k akci.
            <span className="text-base text-muted-foreground underline-offset-4 transition-colors group-hover/card:text-foreground group-hover/card:underline">
              {t.sourceLink}
            </span>
          ) : null}
        </figcaption>
      </blockquote>
    </figure>
  )

  // Recenze bez `author_url` zůstane obyčejnou kartou — odkaz nikam by byl horší
  // než žádný.
  if (!r.url) return <div className="w-72 shrink-0">{card}</div>

  return (
    <a
      href={r.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      /* Odkazem je celá karta, jejíž obsah (figure + blockquote) Chrome do názvu
         odkazu nesloží — bez labelu by čtečka hlásila jen „odkaz". Obsah karty
         zůstává v accessibility stromu, label ho nepřebíjí. */
      aria-label={t.sourceAlt(r.name)}
      draggable={false}
      tabIndex={tabbable ? undefined : -1}
      className="group/card block w-72 shrink-0"
    >
      {card}
    </a>
  )
}

export function Testimonials({ reviews, lang = "cs" }: { reviews: Review[]; lang?: Lang }) {
  const t = testimonialsContent[lang] ?? testimonialsContent.cs
  const scrollerRef = useRef<HTMLDivElement>(null)
  const firstCopyRef = useRef<HTMLDivElement>(null)
  const copies = useAutoScrollLoop(scrollerRef, firstCopyRef, reviews.length > 0)

  // Bez recenzí (prázdné Studio nebo spadlý fetch) sekci vůbec nevykreslujeme —
  // samotný nadpis nad prázdným pásem vypadá jako rozbitá stránka.
  if (reviews.length === 0) return null

  return (
    <section className="py-20">
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedText
          as="h2"
          text={t.heading}
          className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        />
      </div>

      {/* Pás recenzí sám pomalu jede (viz `useAutoScrollLoop`), ale je to obyčejný
          `overflow-x-auto` kontejner: návštěvník si ho posune kolečkem, prstem
          i tahem myší, pás se zastaví a po chvíli zase naváže. Posuvník je schovaný —
          při přeskoku smyčky by poskakoval; že pás pokračuje, ukazují vymaskované
          okraje. `data-lenis-prevent-horizontal`: vodorovné gesto na trackpadu
          nemá Lenis polykat jako svislý scroll stránky. */}
      <div
        ref={scrollerRef}
        data-lenis-prevent-horizontal
        aria-label={t.heading}
        className="no-scrollbar cursor-grab select-none overflow-x-auto pb-2 active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
      >
        <div className="flex w-max">
          {Array.from({ length: copies }, (_, copy) => (
            /* Další kopie jsou vizuální výplň smyčky — čtečka a tabulátor projdou
               recenze jednou. Klikací zůstávají (bez `inert`): vidět je typicky
               právě prostřední kopie. */
            <div
              key={copy}
              ref={copy === 0 ? firstCopyRef : undefined}
              className="flex gap-6 pr-6"
              aria-hidden={copy > 0 ? true : undefined}
            >
              {reviews.map((r) => (
                <ReviewCard key={`${copy}-${r.id}`} r={r} t={t} tabbable={copy === 0} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
