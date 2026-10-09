import type { Metadata } from "next"
import Image from "next/image"
import { ArrowRight, Mail, Phone, SlidersHorizontal } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Reveal, AnimatedText } from "@/components/reveal"
import { CopyCode } from "@/components/slevove-kody/copy-code"
import { getLang, withLang } from "@/lib/translations"

/**
 * Landing pro čtenáře PR článku v magazínu Bydlení (2026) — vede sem QR kód pod
 * článkem. Text je jen česky (článek je český), proto žádné `xContent` v
 * translations.ts. Stránka se neindexuje a není v sitemapě, aby kód nešel
 * dohledat přes Google mimo čtenáře článku.
 */
const CODE = "BYD26SL10"
const EMAIL = "nabidky@konstantahp.cz"
const PHONE = { value: "+420 770 169 411", href: "tel:+420770169411" }

export const metadata: Metadata = {
  title: "Sleva 10 % pro čtenáře magazínu Bydlení | KONSTANTA",
  description: "Děkujeme za přečtení článku. Se slevovým kódem BYD26SL10 získáte slevu 10 % na celou zakázku.",
  robots: { index: false, follow: true },
}

export default async function SlevaByd26Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)

  const ways = [
    {
      icon: Mail,
      title: "E-mailem",
      text: (
        <>
          Pošlete nám svou představu nebo poptávku na e-mail a do předmětu zprávy uveďte:{" "}
          <strong className="font-mono text-foreground">{CODE}</strong>
        </>
      ),
      cta: "Napsat e-mail",
      detail: EMAIL,
      href: `mailto:${EMAIL}?subject=${CODE}`,
    },
    {
      icon: SlidersHorizontal,
      title: "Přes konfigurátor",
      text: (
        <>
          Sestavte si svůj plot, bránu, branku nebo pergolu v našem konfigurátoru a do pole Poznámka na konci
          formuláře napište: <strong className="font-mono text-foreground">{CODE}</strong>
        </>
      ),
      cta: "Otevřít konfigurátor",
      detail: null,
      href: withLang("/konf", lang),
    },
    {
      icon: Phone,
      title: "Telefonicky",
      text: (
        <>
          Nebo nám jednoduše zavolejte a <strong className="font-mono text-foreground">{CODE}</strong> sdělte během
          hovoru.
        </>
      ),
      cta: "Zavolat",
      detail: PHONE.value,
      href: PHONE.href,
    },
  ]

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          {/* Hlavička — grafika už sama nese „Sleva 10 % / kód“, proto se neořezává. */}
          <section className="relative overflow-hidden border-b border-border bg-foreground py-10 sm:py-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.6]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                maskImage: "radial-gradient(100% 100% at 50% 0%, black, transparent 80%)",
              }}
            />
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-[3/2] overflow-hidden rounded-3xl border border-background/15">
                <Image
                  src="/slevove-kody/byd26sl10.jpg"
                  alt={`Sleva 10 % na zakázku, kód ${CODE}`}
                  fill
                  priority
                  sizes="(max-width: 1152px) 100vw, 1104px"
                  className="object-cover"
                />
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="flex flex-col items-start gap-6">
              <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                <span className="h-[2px] w-8 bg-brand" />
                Pro čtenáře magazínu Bydlení
              </p>
              <AnimatedText
                as="h1"
                text="Děkujeme, že jste se dostali až k nám."
                className="font-heading text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-balance sm:text-5xl"
              />
              <p className="max-w-2xl text-xl leading-relaxed text-muted-foreground text-pretty">
                Jako poděkování za přečtení článku od nás získáváte slevu{" "}
                <strong className="text-foreground">10 % na celou zakázku</strong>.
              </p>
              <CopyCode code={CODE} />
            </div>

            <h2 className="mt-16 font-heading text-2xl font-extrabold uppercase tracking-tight sm:text-3xl">
              Jak slevu uplatnit?
            </h2>
            <Reveal variant="up" childSelector="[data-way]" stagger={0.12} className="mt-8 grid gap-4 md:grid-cols-3">
              {ways.map((way) => (
                <article
                  data-way
                  key={way.title}
                  className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 sm:p-8"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-brand">
                    <way.icon className="h-5 w-5" />
                  </span>
                  <h3 className="font-heading text-xl font-bold">{way.title}</h3>
                  <p className="flex-1 text-base leading-relaxed text-muted-foreground text-pretty">{way.text}</p>
                  <a
                    href={way.href}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 font-mono text-[12px] font-medium uppercase tracking-[0.1em] text-brand-foreground transition-all duration-300 hover:brightness-110"
                  >
                    {way.cta}
                    <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  {way.detail ? (
                    <a href={way.href} className="text-center text-sm text-muted-foreground hover:text-brand">
                      {way.detail}
                    </a>
                  ) : null}
                </article>
              ))}
            </Reveal>

            <div className="mt-16 border-t border-border pt-8">
              <p className="text-lg">Těšíme se na spolupráci.</p>
              <p className="mt-1 font-heading text-lg font-bold">Tým KONSTANTA</p>
            </div>
          </section>
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
