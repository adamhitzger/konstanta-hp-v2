import type { Metadata } from "next"
import { Check, Compass, Building2, Factory, Landmark, HardHat } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/subpages/page-hero"
import { ClosingCta } from "@/components/subpages/closing-cta"
import { Reveal, AnimatedText } from "@/components/reveal"
import { proFirmyContent, getLang } from "@/lib/translations"

export const metadata: Metadata = {
  title: "Pro firmy | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Pro architekty, developery, průmyslové areály, obce a generální dodavatele. Konzultace už ve fázi návrhu, kompletní dodávka od výroby po montáž a spolehlivé subdodávky hliníkových profilů.",
  alternates: { canonical: "/pro-firmy" },
}

/** Pořadí odpovídá `proFirmyContent[lang].segments`. */
const icons = [Compass, Building2, Factory, Landmark, HardHat]

export default async function ProFirmyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)
  const t = proFirmyContent[lang] ?? proFirmyContent.cs
  const segments = t.segments.map((segment, i) => ({ ...segment, Icon: icons[i] }))

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <PageHero kicker={t.kicker} heading={t.heading} subtitle={t.subtitle} />

          {/* Segmenty — střídavě zarovnané řádky s claimem KONSTANTY */}
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <Reveal variant="up" childSelector="[data-seg]" stagger={0.12} className="flex flex-col gap-4">
              {segments.map((segment, i) => (
                <article
                  data-seg
                  key={segment.title}
                  className="grid gap-6 rounded-3xl border border-border bg-background p-6 transition-colors duration-300 hover:border-brand/50 sm:p-8 lg:grid-cols-[auto_1fr_minmax(0,20rem)] lg:items-start lg:gap-10"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                    <segment.Icon className="h-6 w-6" />
                  </span>

                  <div className="flex flex-col gap-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-balance">
                      {segment.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-foreground text-pretty">{segment.lead}</p>
                    <p className="text-base leading-relaxed text-muted-foreground text-pretty">{segment.text}</p>
                  </div>

                  <p className="rounded-2xl bg-muted p-5 text-base leading-relaxed text-pretty lg:mt-8">
                    <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.15em] text-brand">
                      {t.claimLabel}
                    </span>
                    {segment.claim}
                  </p>
                </article>
              ))}
            </Reveal>
          </section>

          {/* Subdodávky + na čem si zakládáme */}
          <section id="subdodavky" className="scroll-mt-28 border-y border-border bg-muted py-16 sm:py-24">
            <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
              <div className="flex flex-col gap-4">
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                  <span className="h-[2px] w-8 bg-brand" />
                  {t.subdodavkyTitle}
                </p>
                <AnimatedText
                  as="h2"
                  text={t.qualityHeading}
                  className="font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl"
                />
                <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.subdodavkyText}</p>
              </div>

              <div className="flex flex-col gap-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">{t.qualityKicker}</p>
                <Reveal variant="left" childSelector="[data-q]" stagger={0.1} className="flex flex-col gap-3">
                  {t.qualityPoints.map((point) => (
                    <p
                      data-q
                      key={point}
                      className="flex items-start gap-3 rounded-2xl border border-border bg-background px-5 py-4 text-base leading-relaxed text-pretty"
                    >
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
                      {point}
                    </p>
                  ))}
                </Reveal>
              </div>
            </div>
          </section>

          <ClosingCta heading={t.ctaHeading} text={t.ctaText} cta={t.cta} ctaCall={t.ctaCall} lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
