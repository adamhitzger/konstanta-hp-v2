"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LANGS, langNames, langSelectorContent, type Lang } from "@/lib/translations"

/**
 * CZ / SK / DE přepínač. Nepoužívá useSearchParams (žádná query jiná než
 * `lang` na webu nežije), takže nepotřebuje Suspense boundary — jen aktuální
 * `pathname` a cílový jazyk. `cs` je výchozí, takže se u ní parametr smaže.
 */
export function LangSwitcher({ lang, variant = "header" }: { lang: Lang; variant?: "header" | "footer" }) {
  const pathname = usePathname()
  const t = langSelectorContent[lang] ?? langSelectorContent.cs

  const hrefFor = (l: Lang) => (l === "cs" ? pathname : `${pathname}?lang=${l}`)

  if (variant === "footer") {
    return (
      <div className="flex items-center gap-1.5" role="group" aria-label={t.aria}>
        {LANGS.map((l) => (
          <Link
            key={l}
            href={hrefFor(l)}
            scroll={false}
            aria-current={lang === l ? "true" : undefined}
            className={`rounded-full border px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
              lang === l
                ? "border-foreground bg-foreground text-background"
                : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            }`}
          >
            {langNames[l].short}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-border p-0.5" role="group" aria-label={t.aria}>
      {LANGS.map((l) => (
        <Link
          key={l}
          href={hrefFor(l)}
          scroll={false}
          aria-current={lang === l ? "true" : undefined}
          className={`rounded-full px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] transition-colors ${
            lang === l ? "bg-foreground text-background" : "text-foreground/50 hover:text-foreground"
          }`}
        >
          {langNames[l].short}
        </Link>
      ))}
    </div>
  )
}
