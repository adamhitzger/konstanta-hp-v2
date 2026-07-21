"use client"

import { useRef } from "react"
import { Ruler, PencilRuler, Hammer, Factory, Wrench, BadgeCheck } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { procesFlowContent, type Lang } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger, useGSAP)

const icons = [Ruler, PencilRuler, Hammer, Factory, Wrench, BadgeCheck]

/**
 * Process timeline. A brand connector line "draws" down (scaleY, scrubbed)
 * as you scroll; each step slides in with a depth offset (y + z + fade).
 */
export function ProcesFlow({ lang = "cs" }: { lang?: Lang }) {
  const t = procesFlowContent[lang] ?? procesFlowContent.cs
  const steps = t.steps.map((s, i) => ({ ...s, Icon: icons[i] }))
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      // Draw the connector line
      const line = root.current!.querySelector("[data-line]")
      if (line && !reduced) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: root.current!.querySelector("[data-steps]"),
              start: "top 70%",
              end: "bottom 75%",
              scrub: 0.5,
            },
          },
        )
      }

      // Steps with depth offset
      gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el) => {
        gsap.from(el, {
          y: reduced ? 0 : 50,
          z: reduced ? 0 : -120,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%" },
        })
      })
    },
    { scope: root },
  )

  return (
    <section
      id="jak-to-probiha"
      ref={root}
      className="relative overflow-hidden border-b border-border bg-foreground py-20 text-background sm:py-28"
      style={{ perspective: 1000 }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-3">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            {t.kicker}
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
            {t.heading}
          </h2>
        </div>

        <div data-steps className="relative pl-16 sm:pl-24">
          {/* rail */}
          <div className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-background/15 sm:left-[39px]" />
          <div
            data-line
            className="absolute left-[27px] top-2 bottom-2 w-[2px] bg-brand sm:left-[39px]"
          />

          <ol className="flex flex-col gap-10 sm:gap-12">
            {steps.map((s, i) => (
              <li data-step key={i} className="relative [transform-style:preserve-3d]">
                {/* node */}
                <span className="absolute -left-16 flex h-14 w-14 items-center justify-center rounded-2xl border border-background/15 bg-brand text-brand-foreground shadow-lg sm:-left-24 sm:h-[3.5rem] sm:w-[3.5rem]">
                  <s.Icon className="h-6 w-6" />
                </span>
                <div className="pt-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">
                    {t.krokLabel(String(i + 1).padStart(2, "0"))}
                  </p>
                  <h3 className="mt-1 font-heading text-xl font-bold uppercase sm:text-2xl">{s.title}</h3>
                  <p className="mt-2 max-w-lg text-lg leading-relaxed text-background/70 text-pretty">
                    {s.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
