"use client"

import { useRef, type ElementType, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

gsap.registerPlugin(ScrollTrigger, useGSAP)

/** Reduced motion = fewer and gentler animations, not zero. We keep opacity fades, drop movement. */
const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

type Variant = "up" | "left" | "right" | "scale" | "flip" | "rotateX" | "tilt"

const variants: Record<Variant, gsap.TweenVars> = {
  up: { y: 90, autoAlpha: 0 },
  left: { x: -120, autoAlpha: 0 },
  right: { x: 120, autoAlpha: 0 },
  scale: { scale: 0.8, autoAlpha: 0 },
  flip: { rotationY: -75, transformOrigin: "left center", autoAlpha: 0 },
  rotateX: { rotationX: 70, y: 80, transformOrigin: "center bottom", autoAlpha: 0 },
  tilt: { rotationZ: -6, y: 100, scale: 0.92, autoAlpha: 0 },
}

interface RevealProps {
  children: ReactNode
  as?: ElementType
  variant?: Variant
  delay?: number
  stagger?: number
  className?: string
  /** If set, animates direct children instead of the container itself */
  childSelector?: string
}

export function Reveal({
  children,
  as: Tag = "div",
  variant = "up",
  delay = 0,
  stagger = 0.12,
  className,
  childSelector,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return

      const targets = childSelector ? el.querySelectorAll(childSelector) : [el]

      // Reduced motion: keep a gentle fade only — no movement
      if (prefersReducedMotion()) {
        gsap.fromTo(
          targets,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.4,
            delay,
            ease: "power1.out",
            stagger: childSelector ? Math.min(stagger, 0.06) : 0,
            scrollTrigger: { trigger: el, start: "top 85%" },
          },
        )
        return
      }

      gsap.fromTo(
        targets,
        { ...variants[variant] },
        {
          x: 0,
          y: 0,
          scale: 1,
          rotationX: 0,
          rotationY: 0,
          rotationZ: 0,
          autoAlpha: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          force3D: true,
          stagger: childSelector ? stagger : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={className} style={{ perspective: 1000 }}>
      {children}
    </Tag>
  )
}

interface ParallaxProps {
  children: ReactNode
  className?: string
  /** Positive moves up as you scroll down, negative moves down. */
  speed?: number
  /** Optional rotation amount (deg) tied to scroll for a 3D feel. */
  rotate?: number
  /** Optional scale range for depth, e.g. 1.08 zooms out to 1 while scrolling. */
  scaleFrom?: number
}

/**
 * Scroll-driven parallax. Only animates transform (GPU-composited),
 * scrub eases the catch-up so motion feels weighted, never jittery.
 */
export function Parallax({ children, className, speed = 80, rotate = 0, scaleFrom = 1 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      // Reduced motion: parallax is purely decorative movement — skip it entirely
      if (prefersReducedMotion()) return

      gsap.fromTo(
        el,
        { yPercent: speed / 10, rotateZ: rotate ? -rotate : 0, scale: scaleFrom },
        {
          yPercent: -speed / 10,
          rotateZ: rotate,
          scale: 1,
          ease: "none",
          force3D: true,
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  )
}

interface AnimatedTextProps {
  text: string
  as?: ElementType
  className?: string
  delay?: number
}

/** Splits text into words and animates them in with a 3D stagger on scroll. */
export function AnimatedText({ text, as: Tag = "h2", className, delay = 0 }: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const words = text.split(" ")

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const words = el.querySelectorAll("[data-word]")

      // Reduced motion: simple fade per word, no 3D rotation
      if (prefersReducedMotion()) {
        gsap.fromTo(
          words,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4, delay, ease: "power1.out", stagger: 0.03, scrollTrigger: { trigger: el, start: "top 90%" } },
        )
        return
      }

      gsap.fromTo(
        words,
        { yPercent: 130, rotationX: -110, z: -120, autoAlpha: 0, transformOrigin: "center bottom" },
        {
          yPercent: 0,
          rotationX: 0,
          z: 0,
          autoAlpha: 1,
          duration: 1,
          delay,
          ease: "power4.out",
          force3D: true,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: "top 90%" },
        },
      )
    },
    { scope: ref },
  )

  return (
    <Tag ref={ref} className={`group/at ${className ?? ""}`} style={{ perspective: 1000 }}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <span
            data-word
            className="inline-block transition-[letter-spacing,transform] duration-500 ease-out group-hover/at:tracking-wide"
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  )
}

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: "left" | "center"
  className?: string
  titleClassName?: string
  /** Render as a lighter palette for dark sections */
  dark?: boolean
}

/**
 * Reusable animated section heading: eyebrow + 3D word-reveal title + subtitle.
 * On hover the whole block subtly expands letter-spacing for a tactile feel.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = ref.current
      if (!el) return
      const eb = el.querySelector("[data-eyebrow]")
      const sub = el.querySelector("[data-subtitle]")
      const reduced = prefersReducedMotion()
      if (eb) {
        gsap.fromTo(
          eb,
          { x: reduced ? 0 : -30, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } },
        )
      }
      if (sub) {
        gsap.fromTo(
          sub,
          { y: reduced ? 0 : 30, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.8, delay: 0.25, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } },
        )
      }
    },
    { scope: ref },
  )

  return (
    <div
      ref={ref}
      className={`group/sh flex flex-col gap-3 ${align === "center" ? "items-center text-center" : ""} ${className ?? ""}`}
    >
      {eyebrow ? (
        <p
          data-eyebrow
          className={`text-sm font-bold uppercase tracking-wider transition-[letter-spacing] duration-500 group-hover/sh:tracking-[0.25em] ${
            dark ? "text-accent" : "text-primary"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <AnimatedText
        as="h2"
        text={title}
        className={`font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl ${titleClassName ?? ""}`}
      />
      {subtitle ? (
        <p
          data-subtitle
          className={`max-w-2xl text-lg leading-relaxed text-pretty transition-[letter-spacing] duration-500 group-hover/sh:tracking-wide ${
            dark ? "text-background/70" : "text-muted-foreground"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
