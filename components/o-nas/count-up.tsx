"use client"

import { useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/**
 * Counts from 0 to `value` once the element enters the viewport.
 * Respects reduced motion (jumps straight to the final value).
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
}: {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const obj = { n: reduced ? value : 0 }
      const render = () => (el.textContent = `${prefix}${Math.round(obj.n)}${suffix}`)
      render()
      if (reduced) return

      gsap.to(obj, {
        n: value,
        duration,
        ease: "power2.out",
        onUpdate: render,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      })
    },
    { scope: ref },
  )

  return <span ref={ref} className={className}>{`${prefix}0${suffix}`}</span>
}
