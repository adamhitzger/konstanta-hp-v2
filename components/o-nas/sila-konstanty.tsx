"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const points = [
  { t: "Komplexní řešení bez starostí", d: "Zajistíme celý proces od návrhu až po montáž. Nemusíte řešit žádné koordinace mezi firmami." },
  { t: "Vždy myslíme dopředu", d: "Už při návrhu počítáme s budoucím využitím a návazností na další prvky jako pergoly, garáže, brány nebo technologie." },
  { t: "Promyšlená atypická řešení", d: "Umíme pracovat se svažitým terénem, omezeným prostorem i nestandardními požadavky. Každý projekt hledá vlastní řešení." },
  { t: "Vlastní patentovaný systém", d: "Používáme vlastní konstrukční systém založený na komorových profilech, který zvyšuje pevnost a stabilitu." },
  { t: "Bezkonkurenčně kvalitní materiály", d: "Pracujeme s hliníkovými systémy od ověřeného španělského dodavatele. Levné kompromisy nepoužíváme." },
  { t: "Mimořádný důraz na detail", d: "Čisté spoje, nerezové prvky a lakování v barvě konstrukce. Věci, které nejsou na první pohled vidět, rozhodují nejvíc." },
  { t: "Důsledná kontrola kvality", d: "Každý díl prochází kontrolou ještě před montáží. Co nesplní nároky, se dál nepouští." },
  { t: "Montáž v rekordním čase do 24 hodin", d: "Díky přípravě a sehranému týmu zvládáme většinu zakázek dokončit během jednoho dne." },
  { t: "Snadný servis i po letech", d: "Konstrukce jsou navržené tak, aby šly snadno rozebrat a opravit po částech." },
  { t: "Normální lidský přístup", d: "Zakládáme si na dlouhodobé spolupráci a odpovědnosti za odvedenou práci." },
]

/**
 * Sticky two-column: the left side stays pinned with a big running index
 * (01–10) that follows the active point; the 10 points scroll on the right
 * and slide in with a small depth offset. Active point via IntersectionObserver.
 */
export function SilaKonstanty() {
  const root = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx))
        })
      },
      { rootMargin: "-50% 0px -45% 0px" },
    )
    root.current?.querySelectorAll("[data-point]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      gsap.utils.toArray<HTMLElement>("[data-point]").forEach((el) => {
        gsap.from(el, {
          y: reduced ? 0 : 60,
          z: reduced ? 0 : -80,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      id="sila-konstanty"
      ref={root}
      className="relative border-b border-border bg-muted py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-8">
        {/* LEFT — sticky heading + running index */}
        <div className="lg:sticky lg:top-32 lg:h-fit lg:self-start">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            Proč my
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold uppercase tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Síla
            <br />
            Konstanty
          </h2>

          {/* running index */}
          <div className="mt-8 flex items-end gap-3" style={{ fontVariantNumeric: "tabular-nums" }}>
            <span className="font-heading text-7xl font-extrabold leading-none text-brand sm:text-8xl">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="mb-2 font-mono text-sm uppercase tracking-[0.15em] text-muted-foreground">
              / 10
            </span>
          </div>
          {/* progress */}
          <div className="mt-5 hidden h-[3px] w-full max-w-xs overflow-hidden rounded-full bg-border lg:block">
            <div
              className="h-full rounded-full bg-brand transition-[width] duration-500 ease-out"
              style={{ width: `${((active + 1) / points.length) * 100}%` }}
            />
          </div>
        </div>

        {/* RIGHT — the points */}
        <ol className="flex flex-col gap-4">
          {points.map((p, i) => (
            <li
              key={i}
              data-point
              data-idx={i}
              className={`group flex gap-5 rounded-2xl border bg-background p-6 transition-colors duration-300 sm:p-7 ${
                active === i ? "border-brand/60" : "border-border hover:border-brand/40"
              }`}
            >
              <span
                className="shrink-0 font-mono text-sm font-medium tabular-nums text-brand"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-heading text-xl font-bold">{p.t}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground text-pretty">
                  {p.d}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
