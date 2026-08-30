import type { Metadata } from "next"
import Image from "next/image"
import { Check } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/subpages/page-hero"
import { ClosingCta } from "@/components/subpages/closing-cta"
import { Reveal, AnimatedText, Parallax } from "@/components/reveal"
import { pripravneContent, getLang } from "@/lib/translations"

export const metadata: Metadata = {
  title: "Přípravné práce | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Výkopy, betonáž základů, podezdívky, elektro příprava pro pohony bran i odvoz zeminy. Kompletní stavební přípravu před montáží hliníkového oplocení zajistíme od A do Z.",
  alternates: { canonical: "/pripravne-prace" },
}

export default async function PripravnePracePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)
  const t = pripravneContent[lang] ?? pripravneContent.cs

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <PageHero kicker={t.kicker} heading={t.heading} subtitle={t.subtitle} />

          {/* Přehled navazujících prací + fotka */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
              <div className="flex flex-col gap-6">
                <p className="text-xl leading-relaxed text-foreground text-pretty">{t.intro}</p>
                <p className="font-heading text-lg font-bold">{t.servicesTitle}</p>
                <Reveal variant="left" childSelector="[data-s]" stagger={0.06} className="flex flex-col gap-2">
                  {t.services.map((service) => (
                    <p
                      data-s
                      key={service}
                      className="flex items-start gap-3 border-b border-border pb-2 text-base leading-relaxed text-muted-foreground text-pretty last:border-b-0"
                    >
                      <Check className="mt-1 h-4 w-4 shrink-0 text-brand" />
                      {service}
                    </p>
                  ))}
                </Reveal>
                <p className="rounded-2xl bg-muted p-5 text-lg leading-relaxed text-pretty">{t.outro}</p>
              </div>

              <Reveal variant="flip" className="relative lg:sticky lg:top-28">
                <Parallax speed={30}>
                  <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
                    <Image
                      src="/proces-2.png"
                      alt={t.kicker}
                      fill
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                    <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-brand" />
                    <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-brand" />
                  </div>
                </Parallax>
              </Reveal>
            </div>
          </section>

          {/* Stavební příprava — 5 fází */}
          <section className="border-y border-border bg-muted py-16 sm:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="mb-12 flex flex-col gap-3">
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                  <span className="h-[2px] w-8 bg-brand" />
                  {t.phasesKicker}
                </p>
                <AnimatedText
                  as="h2"
                  text={t.phasesHeading}
                  className="max-w-3xl font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl"
                />
              </div>

              <Reveal variant="up" childSelector="[data-phase]" stagger={0.12} className="flex flex-col gap-4">
                {t.phases.map((phase, i) => (
                  <article
                    data-phase
                    key={phase.title}
                    className="grid gap-6 rounded-3xl border border-border bg-background p-6 sm:p-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12"
                  >
                    <div className="flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
                      <p className="font-heading text-5xl font-extrabold leading-none text-brand/25">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <h3 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-balance">
                        {phase.title}
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground text-pretty">{phase.lead}</p>
                    </div>

                    <ul className="flex flex-col gap-4">
                      {phase.items.map((item) => (
                        <li key={item.t} className="border-l-2 border-brand/30 pl-5">
                          <p className="font-heading text-base font-bold leading-snug">{item.t}</p>
                          <p className="mt-1 text-base leading-relaxed text-muted-foreground text-pretty">{item.d}</p>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </Reveal>
            </div>
          </section>

          <ClosingCta
            heading={t.ctaHeading}
            text={t.ctaText}
            cta={t.cta}
            lang={lang}
            href="/konf/zaklady"
          />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
