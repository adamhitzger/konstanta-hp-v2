import type { Metadata } from "next"
import {
  Mailbox,
  KeyRound,
  DoorClosed,
  Hash,
  Smartphone,
  Siren,
  SquareAsterisk,
  Package,
  RotateCw,
  Video,
} from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/subpages/page-hero"
import { ClosingCta } from "@/components/subpages/closing-cta"
import { Reveal } from "@/components/reveal"
import { TiltCard } from "@/components/o-nas/tilt-card"
import { chytraReseniContent, getLang } from "@/lib/translations"

export const metadata: Metadata = {
  title: "Chytrá řešení | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Elektrozámek, videotelefon, kódová klávesnice, ovládání brány přes aplikaci TaHoma, integrovaná schránka i dvířka HUP. Chytré doplňky k hliníkovému oplocení od KONSTANTY.",
  alternates: { canonical: "/chytra-reseni" },
}

/** Pořadí odpovídá `chytraReseniContent[lang].items`. */
const icons = [Mailbox, KeyRound, DoorClosed, Hash, Smartphone, Siren, SquareAsterisk, Package, RotateCw, Video]

/** Index položky, u které se vypisují platformové tagy (TaHoma – iOS / Android). */
const TAGGED_ITEM = 4

export default async function ChytraReseniPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)
  const t = chytraReseniContent[lang] ?? chytraReseniContent.cs
  const items = t.items.map((item, i) => ({ ...item, Icon: icons[i] }))

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <PageHero kicker={t.kicker} heading={t.heading} subtitle={t.subtitle} />

          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <Reveal
              variant="tilt"
              childSelector="[data-item]"
              stagger={0.08}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {items.map((item, i) => (
                <div data-item key={item.title}>
                  <TiltCard className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-colors duration-300 hover:border-brand/50">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                      <item.Icon className="h-6 w-6" />
                    </span>
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="mt-1.5 font-heading text-lg font-bold leading-snug">{item.title}</h2>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground text-pretty">{item.text}</p>
                    {i === TAGGED_ITEM ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {t.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </TiltCard>
                </div>
              ))}
            </Reveal>
          </section>

          <ClosingCta heading={t.ctaHeading} text={t.ctaText} cta={t.cta} lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
