import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Reveal, AnimatedText } from "@/components/reveal"

const products = [
  {
    title: "Hliníkové ploty",
    image: "/produkt-plot.png",
    tags: ["Bezúdržbové", "Moderní vzhled", "Odolnost"],
    text: "Horizontální i vertikální profily v široké škále barev RAL.",
    code: "HP-01",
  },
  {
    title: "Brány",
    image: "/produkt-brana.png",
    tags: ["Posuvné", "Křídlové", "S pohonem"],
    text: "Posuvné i křídlové brány s elektrickým pohonem na dálkové ovládání.",
    code: "HP-02",
  },
  {
    title: "Branky",
    image: "/produkt-branka.png",
    tags: ["Na míru", "Elektrozámek", "Design"],
    text: "Vstupní branky sladěné s plotem i bránou do jednoho celku.",
    code: "HP-03",
  },
  {
    title: "Pergoly",
    image: "/produkt-pergola.png",
    tags: ["Bioklimatické", "Lamely", "Stínění"],
    text: "Hliníkové pergoly s nastavitelnými lamelami pro příjemný stín.",
    code: "HP-04",
  },
]

/* Alternating asymmetry — row 1: narrow | wide, row 2: wide | narrow */
const colSpans = ["lg:col-span-5", "lg:col-span-7", "lg:col-span-7", "lg:col-span-5"]

export function Products() {
  return (
    <section id="produkty" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <AnimatedText
          as="h2"
          text="Kompletní hliníkové oplocení na míru"
          className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl max-w-2xl"
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-brand sm:text-right sm:shrink-0">
          4 produktové řady
        </p>
      </div>

      <Reveal
        variant="tilt"
        childSelector="[data-card]"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12"
      >
        {products.map((p, i) => (
          <article
            data-card
            key={p.title}
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
                {/* Content gradient footer */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/95 via-foreground/50 to-transparent p-5 pt-16">
                  <h3 className="font-heading text-xl font-bold uppercase text-background">{p.title}</h3>
                  <p className="mt-1.5 text-base leading-relaxed text-background/90 max-w-[280px]">{p.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-brand px-2.5 py-1 text-[11px] font-medium text-brand-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#kontakt"
                    className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-background/70 transition-all duration-300 group-hover:gap-3 group-hover:text-brand"
                  >
                    Poptat <ArrowRight className="h-3 w-3 text-brand" />
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </Reveal>
    </section>
  )
}
