"use client"

import { useEffect, useRef, useState } from "react"

const links = [
  { id: "jsme-konstanta", label: "Jsme Konstanta" },
  { id: "sila-konstanty", label: "Síla Konstanty" },
  { id: "co-ocenite", label: "Co oceníte" },
  { id: "jak-to-probiha", label: "Jak to probíhá" },
  { id: "certifikaty", label: "Certifikáty" },
  { id: "faq", label: "FAQ" },
]

/**
 * Sticky in-page anchor nav under the main header. Smooth scroll is handled
 * globally by <SmoothScroll /> (Lenis, offset -80 for the sticky header).
 * The active section is tracked with an IntersectionObserver, and on mobile
 * the (horizontally scrollable) nav auto-scrolls to keep the active pill
 * centered in view.
 */
export function SectionNav() {
  const [active, setActive] = useState("jsme-konstanta")
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )
    links.forEach((l) => {
      const el = document.getElementById(l.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Keep the active pill centered within the horizontally-scrollable nav.
  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const el = list.querySelector<HTMLElement>(`[data-nav="${active}"]`)
    if (!el) return
    const listRect = list.getBoundingClientRect()
    const elRect = el.getBoundingClientRect()
    const delta = elRect.left - listRect.left - (list.clientWidth - el.clientWidth) / 2
    list.scrollTo({ left: list.scrollLeft + delta, behavior: "smooth" })
  }, [active])

  return (
    <nav className="sticky top-20 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul
          ref={listRef}
          className="flex items-center gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {links.map((l, i) => {
            const isActive = active === l.id
            return (
              <li key={l.id} data-nav={l.id} className="shrink-0">
                <a
                  href={`#${l.id}`}
                  className={`group flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors duration-200 ${
                    isActive
                      ? "bg-brand text-brand-foreground"
                      : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  <span className={isActive ? "text-brand-foreground/70" : "text-brand"}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
