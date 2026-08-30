import { ArrowRight, Phone } from "lucide-react"
import { withLang, type Lang } from "@/lib/translations"

/**
 * Closing CTA for the content subpages. Lighter counterpart to <ZaverCta />
 * on /o-nas — sits on the page background instead of the dark band.
 */
export function ClosingCta({
  heading,
  text,
  cta,
  ctaCall,
  lang,
  href = "/#kontakt",
}: {
  heading: string
  text: string
  cta: string
  ctaCall?: string
  lang: Lang
  href?: string
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-6 rounded-3xl border border-border bg-muted px-6 py-14 text-center sm:px-12">
        <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
          {heading}
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">{text}</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href={withLang(href, lang)}
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-brand-foreground transition-all duration-300 hover:brightness-110"
          >
            {cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          {ctaCall ? (
            <a
              href="tel:+420770169411"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-border px-8 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-foreground hover:text-background"
            >
              <Phone className="h-4 w-4" />
              {ctaCall}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  )
}
