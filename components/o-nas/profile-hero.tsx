"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { CountUp } from "./count-up"
import { profileHeroContent, withLang, type Lang } from "@/lib/translations"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * A solid 3D "slab" faked with stacked slices along Z (no WebGL). The front
 * slice carries the surface look; the stack behind gives real thickness when
 * the model is tilted. Used to build the fence: concrete posts, aluminium
 * horizontal slats and the podezdívka base.
 */
function Slab({
  left,
  top,
  width,
  height,
  depth,
  layers = 8,
  h,
  s,
  lF,
  lB,
  radius = 4,
  metal = false,
}: {
  left: string
  top: string
  width: string
  height: string
  depth: number
  layers?: number
  h: number
  s: number
  lF: number
  lB: number
  radius?: number
  metal?: boolean
}) {
  const step = depth / Math.max(1, layers - 1)
  return (
    <div className="absolute [transform-style:preserve-3d]" style={{ left, top, width, height }}>
      {Array.from({ length: layers }).map((_, i) => {
        const t = layers === 1 ? 0 : i / (layers - 1)
        const l = lF + (lB - lF) * t
        return (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `translateZ(${-i * step}px)`,
              borderRadius: radius,
              background:
                metal && i === 0
                  ? `linear-gradient(180deg, hsl(${h} ${s}% ${l + 12}%) 0%, hsl(${h} ${s}% ${l}%) 16%, hsl(${h} ${s}% ${l - 5}%) 100%)`
                  : `linear-gradient(150deg, hsl(${h} ${s}% ${l + 5}%), hsl(${h} ${s}% ${l - 7}%))`,
              boxShadow: i === 0 ? "inset 0 0 0 1px rgba(255,255,255,0.08)" : undefined,
            }}
          />
        )
      })}
    </div>
  )
}

/** 7 horizontal aluminium slats + 2 concrete posts + base = the fence panel. */
function FenceModel() {
  const slats = Array.from({ length: 8 })
  return (
    <>
      {/* Aluminium slats (rendered first → posts sit in front of them) */}
      {slats.map((_, i) => (
        <Slab
          key={i}
          left="14%"
          top={`${12 + i * 6.4}%`}
          width="72%"
          height="4.2%"
          depth={22}
          layers={6}
          h={222}
          s={9}
          lF={30}
          lB={16}
          radius={3}
          metal
        />
      ))}

      {/* Podezdívka (concrete base) */}
      <Slab left="18%" top="63%" width="66%" height="32%" depth={30} layers={9} h={220} s={5} lF={74} lB={46} radius={2} />
      {/* base panel seams on the front face */}
      <div className="absolute" style={{ left: "18%", top: "63%", width: "66%", height: "32%", transform: "translateZ(0.5px)" }}>
        <div className="absolute inset-y-0" style={{ left: "33%", width: 2, background: "rgba(0,0,0,0.14)" }} />
        <div className="absolute inset-y-0" style={{ left: "66%", width: 2, background: "rgba(0,0,0,0.14)" }} />
      </div>

      {/* Sill */}
      
      {/* Concrete posts (in front) */}
      <Slab left="0%" top="1%" width="19%" height="98%" depth={46} layers={12} h={220} s={5} lF={80} lB={50} radius={4} />
      <Slab left="81%" top="1%" width="19%" height="98%" depth={46} layers={12} h={220} s={5} lF={80} lB={50} radius={4} />
    </>
  )
}

/**
 * HERO (#jsme-konstanta). Centerpiece: a 3D model of the actual product —
 * an aluminium horizontal-slat fence between two concrete posts — built
 * purely with CSS 3D transforms (no WebGL).
 * - mouse → tilt (rotateX/Y) on the inner wrapper
 * - scroll → the outer wrapper spins on Y (scrubbed)
 * These live on separate nested layers so they compose without fighting.
 */
export function ProfileHero({ lang = "cs" }: { lang?: Lang }) {
  const t = profileHeroContent[lang] ?? profileHeroContent.cs
  const root = useRef<HTMLDivElement>(null)
  const spinRef = useRef<HTMLDivElement>(null) // scroll-driven rotation
  const tiltRef = useRef<HTMLDivElement>(null) // mouse-driven tilt
  const barRef = useRef<HTMLDivElement>(null) // resting angle + intro

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const coarse = window.matchMedia("(pointer: coarse)").matches

      // Resting three-quarter view + intro
      gsap.set(barRef.current, { rotationY: -24, rotationX: 12 })
      gsap.from(barRef.current, {
        rotationY: -80,
        z: -260,
        autoAlpha: 0,
        duration: 1.5,
        ease: "power4.out",
      })

      gsap.from("[data-hero-anim]", {
        y: 26,
        autoAlpha: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
        delay: 0.15,
      })

      if (reduced) return

      // Scroll → gently spin the fence as the hero scrolls away
      gsap.to(spinRef.current, {
        rotationY: 26,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      })

      // Mouse → tilt (skip on touch)
      if (coarse) return
      const rotX = gsap.quickTo(tiltRef.current, "rotationX", { duration: 0.6, ease: "power3" })
      const rotY = gsap.quickTo(tiltRef.current, "rotationY", { duration: 0.6, ease: "power3" })
      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5
        const ny = e.clientY / window.innerHeight - 0.5
        rotY(nx * 18)
        rotX(-ny * 14)
      }
      window.addEventListener("mousemove", onMove)
      return () => window.removeEventListener("mousemove", onMove)
    },
    { scope: root },
  )

  return (
    <section id="jsme-konstanta" ref={root} className="relative overflow-hidden border-b border-border bg-background">
      {/* Blueprint grid + soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(to right, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklch, var(--foreground) 6%, transparent) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(120% 100% at 70% 0%, black, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 65%)" }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-28 lg:px-8">
        {/* LEFT — copy */}
        <div className="flex flex-col gap-7">
          <p data-hero-anim className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />{t.kicker}
          </p>

          <h1
            data-hero-anim
            className="font-heading text-[clamp(3.5rem,9vw,8rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.02em] text-foreground"
          >
            {t.titleLines[0]}
            <br />
            {t.titleLines[1]}<span className="text-brand">.</span>
          </h1>

          <p data-hero-anim className="max-w-md text-xl leading-relaxed text-muted-foreground text-pretty">
            {t.subtitle}
          </p>

          <dl data-hero-anim className="flex flex-wrap gap-x-10 gap-y-4 pt-1">
            {[
              { v: <CountUp value={2022} prefix={t.stats[0].yearPrefix} />, l: t.stats[0].label },
              { v: <CountUp value={24} suffix={t.stats[1].suffix} />, l: t.stats[1].label },
              { v: <CountUp value={1} suffix={t.stats[2].suffix} />, l: t.stats[2].label },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <dt className="font-heading text-3xl font-extrabold text-foreground">{s.v}</dt>
                <dd className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{s.l}</dd>
              </div>
            ))}
          </dl>

          <div data-hero-anim className="pt-2">
            <a
              href={withLang("/#kontakt", lang)}
              className="group inline-flex items-center gap-3 rounded-full border-2 border-foreground bg-foreground px-7 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-background transition-all duration-300 hover:border-brand hover:bg-brand hover:text-brand-foreground"
            >
              {t.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        {/* RIGHT — 3D fence model */}
        <div className="relative flex min-h-[340px] items-center justify-center lg:min-h-[520px]">
          <div aria-hidden className="absolute left-2 top-6 hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            {t.captionLeft}
          </div>

          <div style={{ perspective: 1200 }} className="[transform-style:preserve-3d]">
            <div ref={spinRef} className="[transform-style:preserve-3d]">
              <div ref={tiltRef} className="[transform-style:preserve-3d]">
                <div
                  ref={barRef}
                  className="relative h-[260px] w-[340px] [transform-style:preserve-3d] sm:h-[330px] sm:w-[440px]"
                >
                  <FenceModel />
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden className="absolute bottom-6 right-2 hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:flex">
            <span className="h-[1px] w-8 bg-border" />
            {t.captionRight}
          </div>
        </div>
      </div>
    </section>
  )
}
