import Image from "next/image"
import { Reveal, AnimatedText, Parallax } from "@/components/reveal"
import { storyContent, type Lang } from "@/lib/translations"

/** Narrative block (verbatim copy) + a framed team photo with blueprint decor. */
export function Story({ lang = "cs" }: { lang?: Lang }) {
  const t = storyContent[lang] ?? storyContent.cs
  const paragraphs = t.paragraphs
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            {t.kicker}
          </p>

          <AnimatedText
            as="h2"
            text={t.heading}
            className="font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl lg:text-5xl"
          />

          <Reveal as="div" variant="up" childSelector="[data-p]" stagger={0.15} className="flex flex-col gap-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                data-p
                className={
                  i === 0
                    ? "text-xl leading-relaxed text-foreground text-pretty"
                    : "text-lg leading-relaxed text-muted-foreground text-pretty"
                }
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Image with engineering frame */}
        <Reveal variant="flip" className="relative">
          <Parallax speed={40}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
              <Image src="/team.png" alt="Tým Konstanta HP" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              {/* corner ticks */}
              <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-brand" />
              <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-brand" />
            </div>
          </Parallax>

          {/* floating badge */}
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-background px-5 py-4 shadow-sm sm:block">
            <p className="font-heading text-3xl font-extrabold uppercase leading-none text-foreground">{t.badgeYear}</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              {t.badgeLabel}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
