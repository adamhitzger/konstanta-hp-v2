import Image from "next/image"
import { AnimatedText } from "@/components/reveal"
import { testimonialsContent, type Lang } from "@/lib/translations"
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

function ReviewCard({ r, t }: { r: Review; t: (typeof testimonialsContent)["cs"] }) {
  const card = (
    <figure className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card transition-colors duration-300 group-hover/card:border-brand/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={r.image || "/placeholder.svg"}
          alt={t.photoAlt(r.name)}
          fill
          sizes="288px"
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
      className="group/card block w-72 shrink-0"
    >
      {card}
    </a>
  )
}

export function Testimonials({ reviews, lang = "cs" }: { reviews: Review[]; lang?: Lang }) {
  const t = testimonialsContent[lang] ?? testimonialsContent.cs

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

      {/* Pás recenzí se posouvá ručně, ne automatickým marquee: návštěvník si čte
          vlastním tempem a nemusí trefovat kartu, která zrovna jede pryč. Posuvník
          je vidět pořád (viz `.scrollbar-brand` v globals.css), aby bylo poznat,
          že pás pokračuje i za okrajem. */}
      <div className="scrollbar-brand overflow-x-auto pb-5">
        {/* `w-max` = pás je široký přesně na součet karet, takže se scrolluje;
            `mx-auto` ho vycentruje, když se recenze na širokou obrazovku vejdou. */}
        <div className="mx-auto flex w-max gap-6 px-4 sm:px-6 lg:px-8">
          {reviews.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} r={r} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
