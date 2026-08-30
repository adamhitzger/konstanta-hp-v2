import { Download, FileText } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { certifikatyContent, type Lang } from "@/lib/translations"
import type { CertificateItem } from "@/types"

/**
 * Trust blok — dřív čtyři statické „odznaky", dnes reálné doklady nahrané v Sanity
 * (`certificate`, viz sanity/schemaTypes/certificates.tsx). Každá karta je odkaz
 * rovnou na soubor v Sanity CDN, otevírá se v nové záložce.
 *
 * Když Sanity nic nevrátí (nebo fetch spadne), sekce se pořád vykreslí s nadpisem
 * a hláškou — mizející sekce by na /o-nas nechala díru v kotvě `#certifikaty`,
 * na kterou míří menu i SectionNav.
 */
export function Certifikaty({
  items = [],
  lang = "cs",
}: {
  items?: CertificateItem[]
  lang?: Lang
}) {
  const t = certifikatyContent[lang] ?? certifikatyContent.cs

  return (
    <section id="certifikaty" className="border-b border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            {t.kicker}
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
            {t.heading}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">{t.intro}</p>
        </div>

        {items.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border px-6 py-10 text-center text-base text-muted-foreground">
            {t.empty}
          </p>
        ) : (
          <Reveal
            variant="up"
            childSelector="[data-cert]"
            stagger={0.1}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((c) => (
              <a
                data-cert
                key={c.id}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-brand/50"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/40 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                  <FileText className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <h3 className="font-heading text-lg font-bold leading-snug text-pretty">{c.title}</h3>
                  {c.note ? (
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                      {c.note}
                    </p>
                  ) : null}
                </div>
                <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-brand">
                  <Download className="h-3.5 w-3.5" />
                  {t.download}
                  {c.ext ? ` · ${c.ext}` : null}
                </span>
              </a>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  )
}
