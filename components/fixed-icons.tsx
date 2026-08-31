"use client"

import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { fixedIconsContent, withLang, type Lang } from "@/lib/translations"

const PHONE = "+420 770 169 411"

/**
 * Tlačítko „Kalkulace zdarma" do mobilní hlavičky.
 *
 * Svislý pruh vpravo (viz `FixedIcons`) se na úzkém displeji nezobrazuje — ležel by
 * přes obsah stránky — a tenhle odkaz ho tam nahrazuje mezi logem a hamburgerem.
 * Bydlí ve stejném souboru jako pruh, aby cíl i popisek zůstaly na jednom místě.
 */
export function CalcCtaButton({ lang = "cs", className }: { lang?: Lang; className?: string }) {
  const t = fixedIconsContent[lang] ?? fixedIconsContent.cs

  return (
    <Link
      href={withLang("/konf", lang)}
      className={`flex h-10 items-center justify-center rounded-lg bg-brand px-3 font-mono text-[10px] font-semibold tracking-[0.06em] whitespace-nowrap text-brand-foreground uppercase transition-colors duration-300 hover:bg-foreground hover:text-background focus-visible:outline-none motion-reduce:transition-none ${className ?? ""}`}
    >
      {t.calc}
    </Link>
  )
}

/**
 * Plovoucí lišta poptávky — přebírá roli CTA „Poptat řešení", které v hlavičce
 * ubíralo místo logu a menu (předloha: `FixedIcons` ze starého projektu `konstantahp`).
 *
 *  - vlevo úzké oranžové ikony (telefon, e-mail), které po najetí vyjedou i s popiskem,
 *  - vpravo svislý pruh „Kalkulace zdarma" otočený o 90° — hlavní konverzní odkaz,
 *    proto je jediný a text u něj nese celý pruh, ne ikona.
 *
 * Renderuje se ze `SiteHeader`, aby byl na každé stránce bez zásahu do jednotlivých
 * `page.tsx`. `fixed` je vůči viewportu i uvnitř `sticky` hlavičky, ta netransformuje.
 */
export function FixedIcons({ lang = "cs" }: { lang?: Lang }) {
  const t = fixedIconsContent[lang] ?? fixedIconsContent.cs

  const links = [
    { key: "tel", href: `tel:${PHONE.replace(/\s/g, "")}`, label: t.call, Icon: Phone },
    { key: "mail", href: withLang("/#kontakt", lang), label: t.write, Icon: Mail },
  ]

  return (
    <>
      {/* ---- Levý sloupec: kontakt ---- */}
      {/* Na mobilu schované — přes úzký displej by lišta ležela na obsahu stránky. */}
      <div className="fixed top-1/2 left-0 z-40 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {links.map(({ key, href, label, Icon }) => (
          <Link
            key={key}
            href={href}
            aria-label={label}
            /* `w-11 → hover:w-56`: v klidu je vidět jen ikona, popisek se vysune až
               po najetí. Šířka se animuje na kontejneru, text uvnitř je `whitespace-nowrap`,
               aby se během přechodu nelámal do dvou řádků. */
            className="group flex h-11 w-11 items-center overflow-hidden rounded-r-xl bg-brand text-brand-foreground transition-[width,background-color] duration-500 ease-in-out hover:w-56 hover:bg-foreground hover:text-background focus-visible:w-56 focus-visible:outline-none motion-reduce:transition-none"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center">
              <Icon className="h-4 w-4" />
            </span>
            <span className="pr-4 font-mono text-[11px] font-medium tracking-[0.12em] whitespace-nowrap uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* ---- Pravý pruh: kalkulace zdarma ---- */}
      {/* Skrytý pod `xl` — tam, kde hlavička přepíná na hamburger, se stejný odkaz
          vysází jako `CalcCtaButton` mezi logo a hamburger (viz `SiteHeader`). */}
      <Link
        href={withLang("/konf", lang)}
        className="group fixed top-1/2 right-0 z-40 hidden h-60 w-11 -translate-y-1/2 items-center justify-center rounded-l-xl bg-brand text-brand-foreground transition-colors duration-300 hover:bg-foreground hover:text-background focus-visible:outline-none motion-reduce:transition-none xl:flex"
      >
        {/* Rotace textu, ne celého pruhu — pruh tak drží svou šířku i poloměr rohů. */}
        <span className="rotate-90 font-mono text-[12px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase">
          {t.calc}
        </span>
      </Link>
    </>
  )
}
