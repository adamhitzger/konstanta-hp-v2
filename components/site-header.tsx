"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import Link from "next/link"

const navItems = [
  { label: "Úvod", href: "#uvod" },
  { label: "O nás", href: "/o-nas" },
  { label: "Produkty", href: "#produkty" },
  { label: "Realizace", href: "#realizace" },
  { label: "Proč my", href: "#proc-my" },
  { label: "Kontakt", href: "#kontakt" },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-brand bg-background">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center" aria-label="Konstanta HP">
          <Image
            src="/logo-konstanta.svg"
            alt="Konstanta HP"
            width={200}
            height={54}
            priority
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/45 transition-colors duration-200 hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop contact + CTA */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex flex-col items-end gap-0.5">
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
            href="#kontakt"
            className="group flex items-center gap-3 rounded-full border-2 border-foreground bg-foreground px-5 py-2.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-background transition-all duration-300 hover:bg-background hover:text-foreground"
          >
            Kalkulace zdarma
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-3 lg:hidden">
          <a
            href="#kontakt"
            className="rounded-full border border-foreground bg-foreground px-3 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-background"
          >
            Kalkulace
          </a>
          {/* Hamburger — morphs to X */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Zavřít menu" : "Otevřít menu"}
            className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] border border-foreground"
          >
            <span
              className={`block h-[1.5px] w-5 bg-foreground origin-center transition-all duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-foreground transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-foreground origin-center transition-all duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t-2 border-foreground bg-background lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3.5 font-mono text-[11px] uppercase tracking-[0.12em] text-foreground/55 transition-colors hover:text-brand"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-5 flex flex-col gap-3 pb-5">
              <a
                href="tel:+420770169411"
                className="flex items-center gap-2 font-mono text-xs text-foreground/60"
              >
                <Phone className="h-3.5 w-3.5" /> +420 770 169 411
              </a>
              <a
                href="#kontakt"
                className="rounded-full border-2 border-foreground bg-foreground px-4 py-3 text-center font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-background"
              >
                Kalkulace zdarma
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
