import { ShieldCheck, Ruler, Truck, Wrench } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { statsContent, type Lang } from "@/lib/translations"

const icons = [Ruler, ShieldCheck, Truck, Wrench]

export function Stats({ lang = "cs" }: { lang?: Lang }) {
  const stats = (statsContent[lang] ?? statsContent.cs).map((s, i) => ({ ...s, icon: icons[i] }))
  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Rounded table: outer border + overflow-hidden clips corners, inner gap shows border color as dividers */}
      <div className="overflow-hidden rounded-2xl border border-border">
        <Reveal
          variant="up"
          childSelector="[data-stat]"
          className="grid grid-cols-2 gap-[1px] bg-border lg:grid-cols-4"
        >
          {stats.map((s) => (
            <div
              data-stat
              key={s.title}
              className="group flex flex-col gap-4 bg-background p-6 transition-colors duration-200 hover:bg-muted lg:p-8"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand">
                  {s.code}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-brand-foreground transition-colors duration-200 group-hover:bg-brand/85">
                  <s.icon className="h-5 w-5" />
                </span>
              </div>
              <div>
                <h3 className="font-heading text-base font-bold">{s.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
