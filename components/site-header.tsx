"use client"

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, ChevronDown, X } from "lucide-react"
import { navItems, hasChildren, HEADER_OFFSET, type NavLeaf } from "@/components/nav/nav-data"

type LenisLike = {
  scrollTo: (t: HTMLElement, o?: Record<string, unknown>) => void
  stop?: () => void
  start?: () => void
}
const getLenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis
const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches

/** Split into columns of at most `size` items (max 2 pod sebou). */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

/** Smooth-scroll to a #hash with the sticky-header offset (Lenis if available). */
function smoothToHash(hash: string) {
  const el = document.querySelector(hash) as HTMLElement | null
  if (!el) return
  const lenis = getLenis()
  if (lenis && !reducedMotion()) {
    lenis.scrollTo(el, {
      offset: -HEADER_OFFSET,
      duration: 1,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    })
  } else {
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
    window.scrollTo({ top: y, behavior: reducedMotion() ? "auto" : "smooth" })
  }
}

/** Anchors on the *current* page scroll smoothly; cross-page anchors navigate. */
function handleAnchorClick(e: React.MouseEvent, href: string, onDone?: () => void) {
  const url = new URL(href, window.location.origin)
  if (url.pathname === window.location.pathname && url.hash) {
    e.preventDefault()
    smoothToHash(url.hash)
  }
  onDone?.()
}

/** Renders a leaf: "anchor" → <a> (+smooth), "page" → Next <Link>. */
function NavLeafLink({
  leaf,
  className,
  onNavigate,
  tabIndex,
  children,
}: {
  leaf: NavLeaf
  className?: string
  onNavigate?: () => void
  tabIndex?: number
  children?: ReactNode
}) {
  if (leaf.type === "page") {
    return (
      <Link href={leaf.href} className={className} tabIndex={tabIndex} onClick={() => onNavigate?.()}>
        {children ?? leaf.label}
      </Link>
    )
  }
  return (
    <a
      href={leaf.href}
      className={className}
      tabIndex={tabIndex}
      onClick={(e) => handleAnchorClick(e, leaf.href, onNavigate)}
    >
      {children ?? leaf.label}
    </a>
  )
}

export function SiteHeader() {
  // ---- Desktop dropdown state ----
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const closeTimer = useRef<number>(undefined)
  const navRef = useRef<HTMLElement>(null)

  const openNow = (i: number) => {
    window.clearTimeout(closeTimer.current)
    setOpenIdx(i)
  }
  // hover-intent: small delay so the pointer can cross the button→panel gap
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current)
    closeTimer.current = window.setTimeout(() => setOpenIdx(null), 120)
  }

  // Close desktop dropdown on outside pointer / focus
  useEffect(() => {
    const onOutside = (e: Event) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenIdx(null)
    }
    document.addEventListener("pointerdown", onOutside)
    document.addEventListener("focusin", onOutside)
    return () => {
      document.removeEventListener("pointerdown", onOutside)
      document.removeEventListener("focusin", onOutside)
    }
  }, [])

  const onButtonKey = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      const willOpen = e.key === "ArrowDown" ? true : openIdx !== i
      setOpenIdx(willOpen ? i : null)
      if (willOpen) {
        requestAnimationFrame(() => document.querySelector<HTMLElement>(`#nav-panel-${i} a`)?.focus())
      }
    } else if (e.key === "Escape") {
      setOpenIdx(null)
    }
  }

  const onPanelKey = (e: React.KeyboardEvent, i: number) => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(`#nav-panel-${i} a`))
    if (!items.length) return
    const cur = items.indexOf(document.activeElement as HTMLElement)
    if (e.key === "ArrowDown") {
      e.preventDefault()
      items[(cur + 1) % items.length]?.focus()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      items[(cur - 1 + items.length) % items.length]?.focus()
    } else if (e.key === "Home") {
      e.preventDefault()
      items[0]?.focus()
    } else if (e.key === "End") {
      e.preventDefault()
      items[items.length - 1]?.focus()
    } else if (e.key === "Escape") {
      e.preventDefault()
      setOpenIdx(null)
      document.getElementById(`nav-btn-${i}`)?.focus()
    } else if (e.key === "Tab") {
      setOpenIdx(null)
    }
  }

  // ---- Mobile drawer state ----
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expanded, setExpanded] = useState<number | null>(null)
  const hamburgerRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)

  const closeMobile = () => {
    setMobileOpen(false)
    hamburgerRef.current?.focus()
  }

  // Lock body scroll (and pause Lenis) while the drawer is open
  useEffect(() => {
    const lenis = getLenis()
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
      lenis?.stop?.()
    } else {
      document.body.style.overflow = ""
      lenis?.start?.()
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  // Focus trap + Escape inside the drawer
  useEffect(() => {
    if (!mobileOpen) return
    const drawer = drawerRef.current
    if (!drawer) return
    const focusable = () =>
      Array.from(
        drawer.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'),
      ).filter((el) => el.offsetParent !== null)

    requestAnimationFrame(() => focusable()[0]?.focus())

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        closeMobile()
        return
      }
      if (e.key !== "Tab") return
      const items = focusable()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    drawer.addEventListener("keydown", onKey)
    return () => drawer.removeEventListener("keydown", onKey)
  }, [mobileOpen])

  const topLinkClass =
    "flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/45 transition-colors duration-200 hover:text-brand focus-visible:text-foreground focus-visible:outline-none"

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-brand bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Konstanta HP">
          <Image src="/logo-konstanta.svg" alt="Konstanta HP" width={300} height={104} priority className="h-24 w-auto" />
        </Link>

        {/* ---- Desktop nav ---- */}
        <nav ref={navRef} aria-label="Hlavní menu" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item, i) =>
              hasChildren(item) ? (
                <li key={item.label} className="relative" onMouseEnter={() => openNow(i)} onMouseLeave={scheduleClose}>
                  <button
                    id={`nav-btn-${i}`}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openIdx === i}
                    aria-controls={`nav-panel-${i}`}
                    onClick={() => setOpenIdx(openIdx === i ? null : i)}
                    onKeyDown={(e) => onButtonKey(e, i)}
                    className={`${topLinkClass} ${openIdx === i ? "text-foreground" : ""}`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3 w-3 transition-transform duration-200 motion-reduce:transition-none ${
                        openIdx === i ? "rotate-180 text-brand" : ""
                      }`}
                    />
                  </button>

                  {/* pt-3 keeps the button→panel gap hoverable */}
                  <div className={`absolute left-0 top-full pt-3 ${openIdx === i ? "" : "pointer-events-none"}`}>
                    <ul
                      id={`nav-panel-${i}`}
                      aria-label={item.label}
                      onKeyDown={(e) => onPanelKey(e, i)}
                      className={`flex gap-3 rounded-2xl border border-border bg-background p-3 shadow-xl transition duration-150 ease-out motion-reduce:transition-none ${
                        openIdx === i ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
                      }`}
                    >
                      {/* max 2 pod sebou → rozlije se do sloupců po dvou */}
                      {chunk(item.children, 2).map((col, ci) => (
                        <li key={ci}>
                          <ul className="flex w-[230px] flex-col">
                            {col.map((leaf, li) => (
                              <li key={leaf.label}>
                                {li > 0 && (
                                  <span aria-hidden className="mx-4 my-1 block h-px bg-brand/45" />
                                )}
                                <NavLeafLink
                                  leaf={leaf}
                                  onNavigate={() => setOpenIdx(null)}
                                  tabIndex={openIdx === i ? 0 : -1}
                                  className="group/leaf block rounded-xl px-4 py-3 transition-colors duration-150 hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                                >
                                  <span className="block font-mono text-[13px] font-medium uppercase tracking-[0.1em] text-foreground transition-colors duration-150 group-hover/leaf:text-brand">
                                    {leaf.label}
                                  </span>
                                  <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                                    {leaf.desc}
                                  </span>
                                </NavLeafLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLeafLink leaf={item} className={topLinkClass} />
                </li>
              ),
            )}
          </ul>
        </nav>

        {/* ---- Desktop contact + CTA ---- */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="hidden flex-col items-end gap-0.5 xl:flex">
            <a
              href="tel:+420770169411"
              className="flex items-center gap-1.5 font-mono text-[11px] font-medium text-foreground/55 transition-colors hover:text-foreground"
            >
              <Phone className="h-3 w-3" />
              +420 770 169 411
            </a>
            <a
              href="mailto:obchod@konstantahp.cz"
              className="flex items-center gap-1.5 font-mono text-[10px] text-foreground/40 transition-colors hover:text-foreground"
            >
              <Mail className="h-2.5 w-2.5" />
              obchod@konstantahp.cz
            </a>
          </div>
          <a
            href="/#kontakt"
            onClick={(e) => handleAnchorClick(e, "/#kontakt")}
            className="group inline-flex items-center gap-2 rounded-full border-2 border-foreground bg-foreground px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-background transition-all duration-300 hover:border-brand hover:bg-brand hover:text-brand-foreground"
          >
            Poptat řešení
          </a>
        </div>

        {/* ---- Mobile controls ---- */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="/#kontakt"
            onClick={(e) => handleAnchorClick(e, "/#kontakt")}
            className="rounded-full border border-foreground bg-foreground px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-background"
          >
            Poptat
          </a>
          <button
            ref={hamburgerRef}
            type="button"
            aria-label="Otevřít menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
            onClick={() => setMobileOpen(true)}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-foreground"
          >
            <span className="block h-[1.5px] w-5 bg-foreground" />
            <span className="block h-[1.5px] w-5 bg-foreground" />
            <span className="block h-[1.5px] w-5 bg-foreground" />
          </button>
        </div>
      </div>

      {/* ---- Mobile overlay ---- */}
      <div
        aria-hidden
        onClick={closeMobile}
        className={`fixed inset-0 z-40 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300 motion-reduce:transition-none lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* ---- Mobile drawer ---- */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Hlavní menu"
        className={`fixed inset-y-0 right-0 z-50 flex w-[86%] max-w-sm flex-col border-l-2 border-brand bg-background shadow-2xl transition-transform duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-border px-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Menu</span>
          <button
            type="button"
            onClick={closeMobile}
            aria-label="Zavřít menu"
            className="flex h-10 w-10 items-center justify-center border border-foreground text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav aria-label="Hlavní menu" className="flex-1 overflow-y-auto px-4 py-4">
          <ul className="flex flex-col">
            {navItems.map((item, i) =>
              hasChildren(item) ? (
                <li key={item.label} className="border-b border-border">
                  <button
                    type="button"
                    aria-expanded={expanded === i}
                    aria-controls={`m-panel-${i}`}
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="flex w-full items-center justify-between py-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-foreground"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 text-brand transition-transform duration-300 motion-reduce:transition-none ${
                        expanded === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    id={`m-panel-${i}`}
                    className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
                    style={{ gridTemplateRows: expanded === i ? "1fr" : "0fr" }}
                  >
                    <ul className="overflow-hidden">
                      {item.children.map((leaf) => (
                        <li key={leaf.label}>
                          <NavLeafLink
                            leaf={leaf}
                            onNavigate={closeMobile}
                            tabIndex={expanded === i ? 0 : -1}
                            className="block border-l border-border py-2.5 pl-4 font-mono text-[12px] uppercase tracking-[0.1em] text-foreground/60 transition-colors hover:text-brand"
                          />
                        </li>
                      ))}
                      <li aria-hidden className="h-2" />
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.label} className="border-b border-border">
                  <NavLeafLink
                    leaf={item}
                    onNavigate={closeMobile}
                    className="block py-4 font-mono text-[13px] font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:text-brand"
                  />
                </li>
              ),
            )}
          </ul>

          {/* contact + CTA */}
          <div className="mt-6 flex flex-col gap-3">
            <a href="tel:+420770169411" className="flex items-center gap-2 font-mono text-xs text-foreground/60">
              <Phone className="h-3.5 w-3.5" /> +420 770 169 411
            </a>
            <a
              href="/#kontakt"
              onClick={(e) => handleAnchorClick(e, "/#kontakt", closeMobile)}
              className="rounded-full border-2 border-foreground bg-foreground px-4 py-3 text-center font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-background transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
            >
              Poptat řešení
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}
