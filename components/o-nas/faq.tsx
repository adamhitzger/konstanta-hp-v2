"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { faqContent, type Lang } from "@/lib/translations"

/** Accordion. Height animates via the grid-rows 0fr→1fr trick (smooth, cheap). */
export function Faq({ lang = "cs" }: { lang?: Lang }) {
  const t = faqContent[lang] ?? faqContent.cs
  const faqs = t.faqs
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-border bg-muted py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="lg:sticky lg:top-32 lg:h-fit">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            {t.kicker}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl lg:text-5xl">
            {t.heading}
          </h2>
          <p className="mt-4 max-w-sm text-lg leading-relaxed text-muted-foreground">
            {t.intro}
          </p>
        </div>

        <ul className="flex flex-col divide-y divide-border border-y border-border">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <li key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 py-5 text-left"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-[11px] tabular-nums text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-lg font-bold sm:text-xl">{f.q}</span>
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-brand bg-brand text-brand-foreground" : "border-border text-foreground"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-6 pl-9 text-base leading-relaxed text-muted-foreground text-pretty">
                      {f.a}
                    </p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
