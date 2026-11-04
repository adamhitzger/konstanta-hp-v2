import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { financovaniContent, withLang, type Lang } from "@/lib/translations"

/**
 * Financing via partner Broker Consulting, a.s. Copy + disclaimer come from
 * p. Líbal verbatim — the disclaimer is legally required, keep it next to the CTA.
 * TODO: CTA target — waiting on where "Více o možnostech financování" should lead
 * (partner form / landing page); until then it points to the contact form.
 */
export function Financovani({ lang = "cs" }: { lang?: Lang }) {
  const t = financovaniContent[lang] ?? financovaniContent.cs
  return (
    <section id="financovani" className="border-b border-border bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Photo with partner logo badge */}
        <Reveal variant="up" className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border">
            <Image
              src="/financovani/financovani.jpg"
              alt={t.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-brand" />
          </div>

          <div className="absolute -bottom-6 right-4 rounded-2xl border border-border bg-white px-5 py-4 shadow-sm sm:right-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-500">{t.partner}</p>
            <Image
              src="/financovani/broker-consulting.png"
              alt="Broker Consulting"
              width={820}
              height={328}
              className="mt-2 h-10 w-auto sm:h-12"
            />
          </div>
        </Reveal>

        <Reveal variant="up" className="flex flex-col gap-5">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            {t.kicker}
          </p>
          <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
            {t.heading}
          </h2>
          <p className="font-heading text-xl font-bold">{t.lead}</p>
          <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{t.paragraph}</p>

          <div>
            <a
              href={withLang("/#kontakt", lang)}
              className="group mt-2 inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-brand-foreground transition-all duration-300 hover:brightness-110"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          <p className="mt-2 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
            {t.disclaimer}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
