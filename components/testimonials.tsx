import type { CSSProperties } from "react"
import Image from "next/image"
import { AnimatedText } from "@/components/reveal"
import { testimonialsContent, type Lang } from "@/lib/translations"
import type { Review } from "@/types"

/**
 * Kolik karet musí být v jedné polovině pásu, aby na širokém monitoru nebyla
 * v marquee díra. Když je recenzí ve Studiu míň, seznam se zopakuje.
 */
const MIN_CARDS = 8

/** Sekund na jednu kartu — drží rychlost posuvu stejnou bez ohledu na počet recenzí. */
const SECONDS_PER_CARD = 3.5

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

function ReviewCard({
  r,
  t,
  /** Karta z klonované poloviny pásu — je `aria-hidden`, takže z ní nesmí jít tabovat. */
  clone,
}: {
  r: Review
  t: (typeof testimonialsContent)["cs"]
  clone?: boolean
}) {
  return (
    <figure className="flex w-72 shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={r.image || "/placeholder.svg"}
          alt={t.photoAlt(r.name)}
          fill
          sizes="288px"
          className="object-cover"
        />
      </div>
      <blockquote className="flex flex-1 flex-col gap-4 p-6">
        <Stars rating={r.rating} label={t.ratingAlt(r.rating)} />
        {/* Recenze z Googlu jsou různě dlouhé — bez ořezu by nejdelší z nich natáhla
            výšku všech karet v pásu a u těch krátkých by zůstalo prázdné místo.
            Celé znění si zákazník otevře odkazem pod podpisem. */}
        <p className="line-clamp-4 text-base leading-relaxed text-pretty text-foreground/65">„{r.text}"</p>
        <figcaption className="mt-auto">
          <p className="font-heading font-bold">{r.name}</p>
          {r.url ? (
            <a
              href={r.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              tabIndex={clone ? -1 : undefined}
              aria-label={t.sourceAlt(r.name)}
              className="text-base text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              {t.sourceLink}
            </a>
          ) : null}
        </figcaption>
      </blockquote>
    </figure>
  )
}

export function Testimonials({ reviews, lang = "cs" }: { reviews: Review[]; lang?: Lang }) {
  const t = testimonialsContent[lang] ?? testimonialsContent.cs

  // Bez recenzí (prázdné Studio nebo spadlý fetch) sekci vůbec nevykreslujeme —
  // samotný nadpis nad prázdným pásem vypadá jako rozbitá stránka.
  if (reviews.length === 0) return null

  const strip = Array.from({ length: Math.ceil(MIN_CARDS / reviews.length) }, () => reviews).flat()

  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedText
          as="h2"
          text={t.heading}
          className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        />
      </div>

      {/* Marquee — two identical sets for seamless infinite loop */}
      <div className="group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
          className="flex animate-[marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
          style={{ "--marquee-duration": `${strip.length * SECONDS_PER_CARD}s` } as CSSProperties}
        >
          {/* Set A */}
          <div className="flex shrink-0 gap-6 pr-6">
            {strip.map((r, i) => (
              <ReviewCard key={`a-${r.id}-${i}`} r={r} t={t} />
            ))}
          </div>
          {/* Set B — clone for seamless loop */}
          <div className="flex shrink-0 gap-6 pr-6" aria-hidden>
            {strip.map((r, i) => (
              <ReviewCard key={`b-${r.id}-${i}`} r={r} t={t} clone />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
