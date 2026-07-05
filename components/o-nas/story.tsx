import Image from "next/image"
import { Reveal, AnimatedText, Parallax } from "@/components/reveal"

const paragraphs = [
  "KONSTANTA – rodinná firma, kterou jsme založili v roce 2022. Začínali jsme v celkem divoké době, ale poctivé řemeslo si cestu vždycky najde. Měli jsme jasný plán a chuť dělat věci pořádně a jinak. Dnes máme za sebou přes stovky hotových projektů, a hlavně čisté svědomí, že za námi zůstává dobrá práce, která přežije generace.",
  "Název KONSTANTA nevznikl náhodou. Je to symbol stability a spolehlivosti. A přesně tím chceme být pro naše zákazníky. Naše věci navrhujeme a montujeme tak, aby vydržely – bez kompromisů. Nehoníme se za rekordy v počtu zakázek, svou práci děláme precizně a kvalita je u nás vždy na prvním místě.",
  "A přesně takové jsou naše ploty, brány a pergoly – prostě drží, nesesypou se po první zimě a budou vám dělat radost spoustu let.",
  "Pokud chcete parťáky, kteří se s vámi lidsky domluví, drží slovo a udělají precizní práci, jsme tu pro vás.",
]

/** Narrative block (verbatim copy) + a framed team photo with blueprint decor. */
export function Story() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        {/* Text */}
        <div className="flex flex-col gap-6">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            Náš příběh
          </p>

          <AnimatedText
            as="h2"
            text="Konstanta = stabilita a spolehlivost"
            className="font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl lg:text-5xl"
          />

          <Reveal as="div" variant="up" childSelector="[data-p]" stagger={0.15} className="flex flex-col gap-5">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                data-p
                className={
                  i === 0
                    ? "text-xl leading-relaxed text-foreground text-pretty"
                    : "text-lg leading-relaxed text-muted-foreground text-pretty"
                }
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Image with engineering frame */}
        <Reveal variant="flip" className="relative">
          <Parallax speed={40}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-border">
              <Image src="/team.png" alt="Tým Konstanta HP" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
              {/* corner ticks */}
              <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-brand" />
              <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-brand" />
            </div>
          </Parallax>

          {/* floating badge */}
          <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-background px-5 py-4 shadow-sm sm:block">
            <p className="font-heading text-3xl font-extrabold uppercase leading-none text-foreground">2022</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              rodinná firma
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
