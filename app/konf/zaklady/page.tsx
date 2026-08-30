import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ZakladyForm } from "@/components/zaklady-form"
import { getLang, withLang, zakladyContent } from "@/lib/translations"

export const metadata: Metadata = {
  title: "Základy a příprava | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Nemáte hotové základy ani podezdívku? Popište nám situaci, přiložte fotku nebo nákres — zaměříme, navrhneme stavební řešení a naceníme bez navýšení po dokončení.",
  alternates: { canonical: "/konf/zaklady" },
}

export default async function ZakladyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)
  const t = zakladyContent[lang] ?? zakladyContent.cs

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Link
              href={withLang("/konf", lang)}
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backToPicker}
            </Link>

            <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-16">
              <div className="flex flex-col gap-6">
                <p className="text-sm font-bold uppercase tracking-wider text-primary">{t.eyebrow}</p>
                <h1 className="font-heading text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-balance sm:text-5xl">
                  {t.heading}
                </h1>
                <p className="text-lg text-muted-foreground text-pretty">{t.subtitle}</p>

                {t.paragraphs.map((paragraph, i) => (
                  <p
                    key={i}
                    className={
                      i === 0
                        ? "text-lg leading-relaxed text-foreground text-pretty"
                        : "text-base leading-relaxed text-muted-foreground text-pretty"
                    }
                  >
                    {paragraph}
                  </p>
                ))}

                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-muted p-6">
                  <p className="flex items-center gap-3 font-heading text-lg font-bold">
                    <ShieldCheck className="h-5 w-5 shrink-0 text-brand" />
                    {t.highlightTitle}
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground text-pretty">{t.highlightText}</p>
                </div>
              </div>

              <div className="lg:sticky lg:top-28">
                <ZakladyForm lang={lang} />
              </div>
            </div>
          </section>
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
