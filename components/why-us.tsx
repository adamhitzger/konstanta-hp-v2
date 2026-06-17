import Image from "next/image"
import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, AnimatedText, Parallax } from "@/components/reveal"

const reasons = [
  "Vyrábíme i montujeme vše ve vlastní režii",
  "Garance kvality a maximální spokojenosti",
  "Hliník bez nutnosti údržby a nátěrů",
  "Řešení na míru i pro atypické pozemky",
]

export function WhyUs() {
  return (
    <section id="proc-my" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal variant="flip" className="relative">
          <Parallax speed={50}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/team.png" alt="Náš tým" fill className="object-cover" />
            </div>
          </Parallax>
        </Reveal>

        <Reveal as="div" variant="right" className="flex flex-col gap-6" childSelector="[data-anim]">
          <div id="o-nas" className="flex flex-col gap-6">
            <AnimatedText
              as="h2"
              text="Česká firma, která upřednostňuje kvalitu před kvantitou"
              className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
            />
            <p data-anim className="text-xl leading-relaxed text-muted-foreground text-pretty transition-[letter-spacing] duration-500 hover:tracking-wide">
              Jsme Konstanta HP – tým, který bere každou zakázku osobně. Veškeré
              produkty máme plně ve vlastní režii, a proto můžeme garantovat
              kvalitu i dlouhou životnost každého plotu.
            </p>

            <ul data-anim className="flex flex-col gap-3">
              {reasons.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-lg font-medium">{r}</span>
                </li>
              ))}
            </ul>

            <Button render={<a href="#kontakt" />} nativeButton={false} size="lg" className="mt-2 w-fit font-semibold" data-anim>
              Nezávazná kalkulace
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
