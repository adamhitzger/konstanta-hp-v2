"use client"

import Link from "next/link"
import { Mail, Phone } from "lucide-react"
import { fixedIconsContent, withLang, type Lang } from "@/lib/translations"

const PHONE = "+420 770 169 411"

/**
 * Plovoucí lišta poptávky — přebírá roli CTA „Poptat řešení", které v hlavičce
 * ubíralo místo logu a menu (předloha: `FixedIcons` ze starého projektu `konstantahp`).
 *
 *  - vlevo úzké ikony (telefon, e-mail), které po najetí vyjedou i s popiskem,
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
            className="group flex h-11 w-11 items-center overflow-hidden rounded-r-xl bg-foreground text-background transition-[width,background-color] duration-500 ease-in-out hover:w-56 hover:bg-brand hover:text-brand-foreground focus-visible:w-56 focus-visible:outline-none motion-reduce:transition-none"
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
      {/* Na rozdíl od levého sloupce svítí i na mobilu — po odebrání CTA z hlavičky
          je to na úzkém displeji jediný stále viditelný odkaz na poptávku. */}
      <Link
        href={withLang("/konf", lang)}
        className="group fixed top-1/2 right-0 z-40 flex h-60 w-11 -translate-y-1/2 items-center justify-center rounded-l-xl bg-foreground text-background transition-colors duration-300 hover:bg-brand hover:text-brand-foreground focus-visible:outline-none motion-reduce:transition-none"
      >
        {/* Rotace textu, ne celého pruhu — pruh tak drží svou šířku i poloměr rohů. */}
        <span className="rotate-90 font-mono text-[12px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase">
          {t.calc}
        </span>
      </Link>
    </>
  )
}
