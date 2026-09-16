"use client"

import { useRef } from "react"
import Image from "next/image"
import { AnimatedText } from "@/components/reveal"
import { customersContent, type Lang } from "@/lib/translations"
import { useAutoScrollLoop } from "@/lib/use-auto-scroll-loop"
import type { CustomerLogo } from "@/types"

/* `tabbable=false` u dalších kopií pásu: logo je klikací, ale tabulátor ho přeskočí. */
function Logo({ c, t, tabbable = true }: { c: CustomerLogo; t: (typeof customersContent)["cs"]; tabbable?: boolean }) {
  /* `h-10 w-auto` — všechna loga mají stejnou výšku, šířku si drží podle poměru
     stran z metadat assetu. `draggable={false}`, aby tah myší posouval pás,
     ne „zvedal" obrázek. */
  const img = (
    <Image
      src={c.logo}
      alt={c.name}
      width={c.width}
      height={c.height}
      draggable={false}
      className="h-10 w-auto max-w-[180px] object-contain opacity-70 grayscale transition-[opacity,filter] duration-300 group-hover/logo:opacity-100 group-hover/logo:grayscale-0 motion-reduce:transition-none"
    />
  )

  if (!c.url) return <div className="group/logo flex shrink-0 items-center px-8">{img}</div>

  return (
    <a
      href={c.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.linkAlt(c.name)}
      draggable={false}
      tabIndex={tabbable ? undefined : -1}
      className="group/logo flex shrink-0 items-center px-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      {img}
    </a>
  )
}

/**
 * Pás log zákazníků na homepage. Sám se pomalu posouvá, ale je to obyčejný
 * `overflow-x-auto` kontejner, takže si ho návštěvník kdykoli posune sám — kolečkem,
 * prstem i tahem myši; auto-posun se po zásahu na chvíli zastaví a pak naváže.
 * Bez log (prázdné Studio, spadlý fetch) se sekce nevykreslí — stejně jako recenze.
 */
export function Customers({ customers, lang = "cs" }: { customers: CustomerLogo[]; lang?: Lang }) {
  const t = customersContent[lang] ?? customersContent.cs
  const scrollerRef = useRef<HTMLDivElement>(null)
  const firstCopyRef = useRef<HTMLDivElement>(null)
  const copies = useAutoScrollLoop(scrollerRef, firstCopyRef, customers.length > 0)

  if (customers.length === 0) return null

  return (
    <section className="border-y border-border bg-muted/40 py-16">
      <div className="mx-auto mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedText
          as="h2"
          text={t.heading}
          className="font-heading text-2xl font-extrabold tracking-tight text-balance sm:text-3xl"
        />
      </div>

      {/* `data-lenis-prevent-horizontal`: vodorovné gesto na trackpadu má posouvat
          pás, ne ho Lenis polykat jako svislý scroll stránky. Okraje pásu jsou
          vymaskované do ztracena, aby bylo vidět, že pokračuje. */}
      <div
        ref={scrollerRef}
        data-lenis-prevent-horizontal
        aria-label={t.listLabel}
        className="no-scrollbar cursor-grab select-none overflow-x-auto active:cursor-grabbing [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex w-max items-center">
          {Array.from({ length: copies }, (_, copy) => (
            /* Další kopie jsou vizuální výplň smyčky — čtečka a tabulátor projdou
               loga jednou. Klikací zůstávají (bez `inert`): vidět je typicky
               právě prostřední kopie. */
            <div
              key={copy}
              ref={copy === 0 ? firstCopyRef : undefined}
              className="flex items-center"
              aria-hidden={copy > 0 ? true : undefined}
            >
              {customers.map((c) => (
                <Logo key={`${copy}-${c.id}`} c={c} t={t} tabbable={copy === 0} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
