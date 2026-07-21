"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { silaKonstantyContent, type Lang } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Sticky two-column: the left side stays pinned with a big running index
 * (01–10) that follows the active point; the 10 points scroll on the right
 * and slide in with a small depth offset. Active point via IntersectionObserver.
 */
export function SilaKonstanty({ lang = "cs" }: { lang?: Lang }) {
  const t = silaKonstantyContent[lang] ?? silaKonstantyContent.cs
  const points = t.points
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
            {t.kicker}
          </p>
          <h2 className="mt-4 font-heading text-4xl font-extrabold uppercase tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {t.headingLines[0]}
            <br />
            {t.headingLines[1]}
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
