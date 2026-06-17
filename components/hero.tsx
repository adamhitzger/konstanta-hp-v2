"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

const highlights = ["Bezúdržbový hliník", "Výroba na míru", "Montáž po celé ČR"]

const slides = [
  { src: "/hero-plot.png", alt: "Moderní hliníkový plot před rodinným domem" },
  { src: "/hero-plot-2.png", alt: "Hliníková posuvná brána u moderního domu" },
  { src: "/hero-plot-3.png", alt: "Hliníkový plot v dekoru dřeva kolem zahrady" },
]

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Hero() {
  const [current, setCurrent] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const imageWrap = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000)
    return () => clearInterval(timer)
  }, [])

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } })
      tl.from("[data-h-meta]", { y: 10, autoAlpha: 0, duration: 0.5 })
        .from("[data-h-divider]", { scaleX: 0, duration: 0.6, transformOrigin: "left center" })
        .from("[data-h-text]", { y: 20, autoAlpha: 0, duration: 0.6 }, "-=0.3")
        .from("[data-h-icon]", { y: 12, autoAlpha: 0, duration: 0.4, stagger: 0.08 }, "-=0.3")
        .from("[data-h-cta]", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .from("[data-h-image]", { xPercent: 6, autoAlpha: 0, duration: 1.2, ease: "power4.out" }, "-=0.9")
        .from("[data-h-badge-float]", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.4")

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

      if (!reduced && root.current) {
        gsap.to("[data-h-image]", {
          yPercent: 10,
          ease: "none",
          force3D: true,
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
        })
      }

      const wrap = imageWrap.current
      if (!wrap || reduced) return
      const onMove = (e: MouseEvent) => {
        const r = wrap.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        gsap.to(wrap, { rotationY: px * 8, rotationX: -py * 8, duration: 0.5, ease: "power2.out", transformPerspective: 900 })
      }
      const onLeave = () => gsap.to(wrap, { rotationY: 0, rotationX: 0, duration: 0.6, ease: "power2.out" })
      wrap.addEventListener("mousemove", onMove)
      wrap.addEventListener("mouseleave", onLeave)
      return () => {
        wrap.removeEventListener("mousemove", onMove)
        wrap.removeEventListener("mouseleave", onLeave)
      }
    },
    { scope: root },
  )

  const go = (dir: number) => setCurrent((c) => (c + dir + slides.length) % slides.length)

  return (
    <section ref={root} id="uvod" className="relative overflow-hidden bg-foreground text-background">
      {/* Technical metadata strip */}
      <div data-h-meta className="border-b border-background/10 px-4 py-2 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-background/30">
            Konstanta HP · IČO 21827150 · CZ
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.15em] text-background/30 sm:block">
            Hliníkové oplocení na míru · Est. 2010
          </span>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-24">
        {/* Left: Typography + CTA */}
        <div className="flex flex-col gap-8">
          <h1
            data-h-title
            className="font-heading text-[clamp(4rem,9vw,10rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-balance text-background"
          >
            Ploty,{" "}
            <br className="hidden sm:block" />
            které{" "}
            <br className="hidden sm:block" />
            vydrží.
          </h1>

          <div className="flex flex-col gap-4">
            <div data-h-divider className="h-[1px] w-16 bg-background/20" />
            <p data-h-text className="max-w-md text-lg leading-relaxed text-background/68 text-pretty">
              Navrhujeme, vyrábíme a montujeme moderní hliníkové oplocení, brány,
              branky a pergoly přesně na míru vašemu domu. Bez kompromisů.
            </p>
          </div>

          <ul className="flex flex-col gap-2">
            {highlights.map((h) => (
              <li key={h} data-h-icon className="flex items-center gap-3">
                <span className="h-[1px] w-5 shrink-0 bg-background/25" />
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-background/50">{h}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              data-h-cta
              href="#kontakt"
              className="group flex items-center justify-between rounded-full border-2 border-background bg-background px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground transition-all duration-[400ms] ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-transparent hover:text-background"
            >
              Kalkulace zdarma
              <span className="ml-5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-foreground/20 transition-all duration-300 group-hover:translate-x-0.5 group-hover:border-background/40">
                <ArrowRight className="h-3 w-3" />
              </span>
            </a>
            <a
              data-h-cta
              href="#produkty"
              className="flex items-center justify-center rounded-full border border-background/25 px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-background/55 transition-all duration-300 hover:border-background/55 hover:text-background"
            >
              Prohlédnout produkty
            </a>
          </div>
        </div>

        {/* Right: Double-bezel image frame */}
        <div className="relative [perspective:1000px]">
          {/* Outer bezel shell */}
          <div data-h-image className="rounded-3xl border border-background/15 p-[5px]">
            {/* Inner core with 3D tilt */}
            <div
              ref={imageWrap}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl [transform-style:preserve-3d]"
            >
              {slides.map((slide, i) => (
                <Image
                  key={slide.src}
                  src={slide.src || "/placeholder.svg"}
                  alt={slide.alt}
                  fill
                  priority
                  className={`object-cover transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
                />
              ))}

              <button
                onClick={() => go(-1)}
                aria-label="Předchozí fotka"
                className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-background/30 bg-foreground/60 text-background transition-colors hover:bg-foreground/80"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => go(1)}
                aria-label="Další fotka"
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-background/30 bg-foreground/60 text-background transition-colors hover:bg-foreground/80"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              {/* Slide indicators — horizontal bars */}
              <div className="absolute bottom-3 left-4 right-4 flex gap-1.5">
                {slides.map((s, i) => (
                  <button
                    key={s.src}
                    onClick={() => setCurrent(i)}
                    aria-label={`Přejít na fotku ${i + 1}`}
                    className={`h-[2px] flex-1 rounded-full transition-all duration-500 ${i === current ? "bg-background" : "bg-background/30"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Experience badge — white background, black text */}
          <div
            data-h-badge-float
            className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-background px-5 py-4 shadow-sm sm:block"
          >
            <p className="font-heading text-4xl font-extrabold uppercase leading-none text-foreground">15+</p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              let zkušeností
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
