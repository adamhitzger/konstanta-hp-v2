"use client"

import { Timer, BoxSelect, Gem, LifeBuoy } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { TiltCard } from "./tilt-card"

const benefits = [
  { Icon: Timer, title: "Montáž do 24 h", text: "Většinu zakázek dokončíme během jednoho dne." },
  { Icon: BoxSelect, title: "Patentovaný komorový systém", text: "Vlastní konstrukce pro vyšší pevnost a stabilitu." },
  { Icon: Gem, title: "Španělský hliník bez kompromisů", text: "Ověřený dodavatel, žádné levné náhražky." },
  { Icon: LifeBuoy, title: "Servis i po letech", text: "Rozebíratelné konstrukce, opravitelné po částech." },
]

/** Compact benefit strip — 3–4 highlights pulled from the 10 points. Tilt cards. */
export function CoOcenite() {
  return (
    <section id="co-ocenite" className="border-b border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            Co oceníte
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
            Nejdůležitější v kostce
          </h2>
        </div>

        <Reveal variant="tilt" childSelector="[data-b]" stagger={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <div data-b key={i}>
              <TiltCard className="rounded-2xl border border-border bg-background p-6 transition-colors duration-300 hover:border-brand/50">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                  <b.Icon className="h-6 w-6" />
                </span>
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-brand">
                  0{i + 1}
                </p>
                <h3 className="mt-1.5 font-heading text-lg font-bold leading-snug">{b.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{b.text}</p>
              </TiltCard>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
