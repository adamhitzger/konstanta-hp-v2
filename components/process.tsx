"use client"

import { useRef } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { processContent, type Lang } from "@/lib/translations"

const images = ["/proces-1.png", "/proces-2.png", "/proces-3.png", "/proces-4.png", "/proces-5.png"]

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Process({ lang = "cs" }: { lang?: Lang }) {
  const t = processContent[lang] ?? processContent.cs
  const steps = t.steps.map((s, i) => ({ ...s, image: images[i] }))
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const ctx = root.current
      if (!ctx) return

      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]", ctx)
      const texts = gsap.utils.toArray<HTMLElement>("[data-text]", ctx)
      const images = gsap.utils.toArray<HTMLElement>("[data-image]", ctx)
      const fill = ctx.querySelector("[data-progress]") as HTMLElement | null

      // Initial: only the first step visible
      layers.forEach((l, i) => gsap.set(l, { autoAlpha: i === 0 ? 1 : 0, zIndex: i === 0 ? 2 : 1 }))
      texts.forEach((t, i) => gsap.set(t, { autoAlpha: i === 0 ? 1 : 0, xPercent: i === 0 ? 0 : 12 }))
      images.forEach((im, i) => gsap.set(im, { autoAlpha: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 10, scale: i === 0 ? 1 : 1.06 }))

      // Lenis already smooths the scroll; a light scrub (0.5) keeps the
      // pinned timeline in tight sync without double-lagging the motion.
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: ctx,
          start: "top top",
          end: () => "+=" + (steps.length - 1) * 90 + "%",
          pin: true,
          scrub: 0.5,
        },
      })

      for (let i = 1; i < steps.length; i++) {
        const prev = i - 1
        // Bring next layer above
        tl.set(layers[i], { zIndex: 3 }, i - 0.5)
        tl.set(layers[prev], { zIndex: 1 }, i - 0.5)

        // Out: previous text + image animate together
        tl.to(texts[prev], { autoAlpha: 0, xPercent: -12, duration: 0.5 }, i - 0.5)
        tl.to(images[prev], { autoAlpha: 0, yPercent: -10, scale: 0.96, duration: 0.5 }, i - 0.5)
        tl.to(layers[prev], { autoAlpha: 0, duration: 0.5 }, i - 0.5)

        // In: next text + image animate together (simultaneously, smooth)
        tl.to(layers[i], { autoAlpha: 1, duration: 0.5 }, i - 0.5)
        tl.fromTo(texts[i], { autoAlpha: 0, xPercent: 12 }, { autoAlpha: 1, xPercent: 0, duration: 0.6 }, i - 0.45)
        tl.fromTo(
          images[i],
          { autoAlpha: 0, yPercent: 10, scale: 1.06 },
          { autoAlpha: 1, yPercent: 0, scale: 1, duration: 0.6 },
          i - 0.45,
        )
      }

      if (fill) {
        gsap.fromTo(
          fill,
          { scaleX: 1 / steps.length },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ctx,
              start: "top top",
              end: () => "+=" + (steps.length - 1) * 90 + "%",
              scrub: true,
            },
          },
        )
      }
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative min-h-screen overflow-hidden bg-foreground text-background">
      <div className="flex min-h-screen items-center py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 max-w-2xl sm:mb-12">
            <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
              {t.heading}
            </h2>
          </div>

          {/* Stacked layers – crossfade smoothly on scroll (desktop + mobile) */}
          <div className="relative min-h-[26rem] sm:min-h-[24rem]">
            {steps.map((s) => (
              <div key={s.num} data-layer className="absolute inset-0">
                <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
                  {/* Text */}
                  <div data-text className="flex flex-col gap-4 sm:gap-5">
                    <span className="font-heading text-[clamp(4.5rem,12vw,14rem)] font-extrabold uppercase leading-none tracking-[-0.03em] text-background/30">{s.num}</span>
                    <h3 className="font-heading text-2xl font-bold uppercase sm:text-3xl">{s.title}</h3>
                    <p className="max-w-md text-lg leading-relaxed text-background/75 sm:text-xl">{s.text}</p>
                  </div>

                  {/* Image with margin */}
                  <div className="md:p-4 lg:p-6">
                    <div
                      data-image
                      className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-background/10 shadow-2xl"
                    >
                      <Image src={s.image || "/placeholder.svg"} alt={s.title} fill className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-10 h-1 w-full overflow-hidden rounded-full bg-background/15">
            <div data-progress className="h-full w-full origin-left rounded-full bg-brand" />
          </div>
        </div>
      </div>
    </section>
  )
}
