import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, AnimatedText, Parallax } from "@/components/reveal"
import Link from "next/link"
import { whyUsContent, withLang, type Lang } from "@/lib/translations"

export function WhyUs({ lang = "cs" }: { lang?: Lang }) {
  const t = whyUsContent[lang] ?? whyUsContent.cs
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
              text={t.heading}
              className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
            />
            <p data-anim className="text-xl leading-relaxed text-muted-foreground text-pretty transition-[letter-spacing] duration-500 hover:tracking-wide">
              {t.paragraph}
            </p>

            <ul data-anim className="flex flex-col gap-3">
              {t.reasons.map((r) => (
                <li key={r} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand text-brand-foreground">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-lg font-medium">{r}</span>
                </li>
              ))}
            </ul>

          <div className="flex flex-row space-x-4">

                      <Button render={<a href={withLang("/o-nas", lang)} />} nativeButton={false} size="lg" variant="outline" className="w-fit font-semibold hover:border-brand hover:bg-brand hover:text-brand-foreground">
                      {t.ctaAbout}
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>

                      <Button render={<Link href={withLang("#kontakt", lang)} />} nativeButton={false} size="lg" className=" w-fit font-semibold" data-anim>
                        {t.ctaContact}
                      </Button>
          </div>
            
          </div>
        </Reveal>
      </div>
    </section>
  )
}
