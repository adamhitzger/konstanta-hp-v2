import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/subpages/page-hero"
import { buttonVariants } from "@/components/ui/button"

/**
 * 404 pro celý web. Odpověď má status 404 a Next přidá `noindex` — z indexu
 * je tak venku i přes `index, follow` zděděné z layoutu. Jen česky:
 * not-found nedostává `searchParams`, takže `?lang=` tu neznáme.
 */
export const metadata: Metadata = {
  title: "Stránka nenalezena | KONSTANTA",
  description: "Tuhle stránku jsme nenašli. Pokračujte na hliníkové ploty, brány, pergoly nebo konfigurátor s kalkulací zdarma.",
}

const links = [
  { href: "/konf/oploceni", label: "Konfigurátor plotu a brány" },
  { href: "/konf/pergoly", label: "Konfigurátor pergoly" },
  { href: "/realizace", label: "Realizace" },
  { href: "/o-nas", label: "O nás" },
]

export default function NotFound() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <PageHero
            kicker="Chyba 404"
            heading="Tahle stránka neexistuje"
            subtitle="Odkaz je možná starý nebo v něm chybí písmenko. Hliníkové ploty, brány a pergoly najdete níže."
          />
          <section className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="flex flex-wrap gap-3">
              <a href="/" className={buttonVariants({ size: "lg", className: "font-semibold" })}>
                Zpět na úvod
              </a>
              <a href="/#kontakt" className={buttonVariants({ size: "lg", variant: "outline", className: "font-semibold" })}>
                Kontaktujte nás
              </a>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between rounded-xl border border-border px-5 py-4 font-heading font-bold transition-colors hover:border-brand hover:text-brand"
                  >
                    {link.label}
                    <span aria-hidden>→</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
