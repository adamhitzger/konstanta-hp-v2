"use client"

import { useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"

/**
 * 3D tilt-on-hover wrapper (perspective + rotateX/Y ~6°) with a soft glare
 * that follows the cursor. Pure transform/opacity for 60fps. Disabled on
 * touch and prefers-reduced-motion — there it's a plain static card.
 */
export function TiltCard({
  children,
  className = "",
  max = 6,
}: {
  children: ReactNode
  className?: string
  max?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      const glare = glareRef.current
      if (!el) return

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const coarse = window.matchMedia("(pointer: coarse)").matches
      if (reduced || coarse) return

      const rotX = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" })
      const rotY = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" })

      const onMove = (e: MouseEvent) => {
        const r = el.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5 // -0.5..0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        rotY(px * max * 2)
        rotX(-py * max * 2)
        if (glare) {
          gsap.to(glare, {
            duration: 0.4,
            ease: "power2",
            "--gx": `${(px + 0.5) * 100}%`,
            "--gy": `${(py + 0.5) * 100}%`,
            opacity: 1,
          } as gsap.TweenVars)
        }
      }
      const onLeave = () => {
        rotX(0)
        rotY(0)
        if (glare) gsap.to(glare, { opacity: 0, duration: 0.5 })
      }

      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", onLeave)
      return () => {
        el.removeEventListener("mousemove", onMove)
        el.removeEventListener("mouseleave", onLeave)
      }
    },
    { scope: ref },
  )

  return (
    <div style={{ perspective: 900 }} className="h-full [transform-style:preserve-3d]">
      <div
        ref={ref}
        className={`relative h-full [transform-style:preserve-3d] ${className}`}
      >
        {children}
        {/* Cursor-tracking glare */}
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(220px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.55), transparent 60%)",
          }}
        />
      </div>
    </div>
  )
}
