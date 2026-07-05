import { Stamp, ShieldCheck, Trophy, FileCheck } from "lucide-react"
import { Reveal } from "@/components/reveal"

const items = [
  { Icon: Stamp, title: "Patentovaný komorový systém", note: "Vlastní chráněná konstrukce" },
  { Icon: ShieldCheck, title: "Certifikovaný hliník EN-AW", note: "Ověřený španělský dodavatel" },
  { Icon: Trophy, title: "Firma roku", note: "Ocenění za odvedenou práci" },
  { Icon: FileCheck, title: "Záruka a doklady", note: "Vše písemně a bez hvězdiček" },
]

/** Trust block — restrained badge grid for patents, certificates and awards. */
export function Certifikaty() {
  return (
    <section id="certifikaty" className="border-b border-border bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-3">
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
            <span className="h-[2px] w-8 bg-brand" />
            Certifikáty a patenty
          </p>
          <h2 className="max-w-2xl font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
            Za kvalitou stojíme papírově
          </h2>
        </div>

        <Reveal variant="up" childSelector="[data-cert]" stagger={0.1} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((c, i) => (
            <div
              data-cert
              key={i}
              className="group flex flex-col gap-4 rounded-2xl border border-border p-6 transition-colors duration-300 hover:border-brand/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-brand/40 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-brand-foreground">
                <c.Icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-heading text-lg font-bold leading-snug">{c.title}</h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                  {c.note}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
