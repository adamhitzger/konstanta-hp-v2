import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getLang, konfPickerContent } from "@/lib/translations"

export const metadata: Metadata = {
  title: "Konfigurátor | KONSTANTA – hliníkové ploty, brány a pergoly",
  description: "Vyberte si, co chcete nakonfigurovat — hliníkové oplocení s bránou a brankou, nebo bioklimatickou pergolu — a vyžádejte si nezávaznou kalkulaci zdarma.",
  alternates: { canonical: "/konf" },
}

const pickerHrefs = ["/konf/oploceni", "/konf/pergoly"]
const pickerImages = ["/gallery-ploty-wide.png", "/gallery-pergola-wide.png"]

export default async function KonfPickerPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)
  const t = konfPickerContent[lang] ?? konfPickerContent.cs
  const pickerCards = t.cards.map((c, i) => ({
    ...c,
    href: lang === "cs" ? pickerHrefs[i] : `${pickerHrefs[i]}?lang=${lang}`,
    image: pickerImages[i],
  }))

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mb-12 flex flex-col items-center gap-3 text-center">
              <p className="text-sm font-bold tracking-wider text-primary uppercase">{t.eyebrow}</p>
              <h1 className="font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-5xl">{t.heading}</h1>
              <p className="max-w-xl text-lg text-muted-foreground text-pretty">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {pickerCards.map((card) => (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group relative flex aspect-4/5 flex-col justify-end overflow-hidden rounded-3xl border border-border shadow-sm transition-shadow hover:shadow-xl sm:aspect-3/4"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                  <div className="relative z-10 flex flex-col gap-3 p-6 sm:p-8">
                    <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">{card.title}</h2>
                    <p className="max-w-xs text-sm text-white/80 text-pretty sm:text-base">{card.description}</p>
                    <span className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-foreground transition-transform group-hover:translate-x-1">
                      {t.cta}
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
