import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Reveal, AnimatedText } from "@/components/reveal"
import { productsContent, withLang, type Lang } from "@/lib/translations"

const images = ["/real/Plot2.jpg", "/real/brana2.png", "/real/Branka2.jpg", "/real/pergola-2.jpg"]
const codes = ["HP-01", "HP-02", "HP-03", "HP-04"]
/** Pořadí sedí s `productsContent.items`: plot, brána, branka, pergola — každý
 * produkt míří na svou vlastní záložku galerie. */
const hrefs = [
  "/realizace?filter=ploty",
  "/realizace?filter=brany",
  "/realizace?filter=branky",
  "/realizace?filter=pergoly",
]
/** Cíl tlačítka „Poptat" — ploty, brány i branky řeší jeden konfigurátor oplocení. */
const konfHrefs = ["/konf/oploceni", "/konf/oploceni", "/konf/oploceni", "/konf/pergoly"]

/* Alternating asymmetry — row 1: narrow | wide, row 2: wide | narrow */
const colSpans = ["lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"]

export function Products({ lang = "cs" }: { lang?: Lang }) {
  const t = productsContent[lang] ?? productsContent.cs
  const products = t.items.map((p, i) => ({
    ...p,
    image: images[i],
    code: codes[i],
    href: withLang(hrefs[i], lang),
    konfHref: withLang(konfHrefs[i], lang),
  }))

  return (
    <section id="produkty" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <AnimatedText
          as="h2"
          text={t.heading}
          className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl max-w-2xl"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand sm:text-right sm:shrink-0">
          {t.badge}
        </p>
      </div>

      <Reveal
        variant="tilt"
        childSelector="[data-card]"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12"
      >
        {products.map((p, i) => (
          <article
            key={p.title}
            data-card
            className={`group aspect-[4/3] sm:aspect-auto sm:min-h-80 ${colSpans[i]}`}
          >
            {/* Double-bezel: outer shell */}
            <div className="h-full rounded-2xl border border-brand/40 bg-muted p-[5px] transition-colors duration-300 group-hover:border-brand">
              {/* Inner core */}
              <div className="relative h-full overflow-hidden rounded-xl">
                <Image
                  src={p.image || "/placeholder.svg"}
                  alt={p.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />

                {/* Celá karta vede do galerie realizací. Je to samostatný odkaz pod
                    obsahem, ne obal celé karty — jinak by uvnitř skončilo tlačítko
                    „Poptat" jako <a> v <a>. */}
                <Link
                  href={p.href}
                  aria-label={`${p.title} — ${t.galleryCta}`}
                  className="absolute inset-0 z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-inset"
                />

                {/* Content gradient footer.
                    `pointer-events-none` propouští kliky na odkaz karty pod ním;
                    tlačítko „Poptat" si je bere zpět přes `pointer-events-auto`. */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent p-5 pt-16">
                  <h3 className="font-heading text-xl font-bold uppercase text-background">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-background/90 max-w-[360px]">{p.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-medium text-brand-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hlavní konverzní akce karty. Dřív to byl drobný textový odkaz,
                      který v ploše karty zanikal — teď plnohodnotné tlačítko. */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                    <Link
                      href={p.konfHref}
                      className="pointer-events-auto inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold whitespace-nowrap text-brand-foreground shadow-lg shadow-foreground/25 transition-colors duration-300 hover:bg-background hover:text-foreground focus-visible:ring-2 focus-visible:ring-background focus-visible:outline-none motion-reduce:transition-none"
                    >
                      {t.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-background/70 transition-all duration-300 group-hover:gap-3 group-hover:text-background motion-reduce:transition-none">
                      {t.galleryCta}
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  )
}
