import { ArrowRight, Phone } from "lucide-react"
import { AnimatedText } from "@/components/reveal"

/** Closing CTA band. Global CTA is "Poptat řešení" (never "Kalkulace zdarma"). */
export function ZaverCta() {
  return (
    <section className="relative overflow-hidden bg-foreground py-24 text-background sm:py-32">
      {/* blueprint grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.6]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(100% 100% at 50% 0%, black, transparent 80%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 60%)" }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 px-4 text-center sm:px-6">
        <AnimatedText
          as="h2"
          text="Uděláme to pořádně. Ozvěte se."
          className="font-heading text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance text-background sm:text-6xl"
        />
        <p className="max-w-xl text-lg leading-relaxed text-background/70">
          Parťáci, kteří se s vámi lidsky domluví, drží slovo a udělají precizní práci.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="/#kontakt"
            className="group inline-flex items-center justify-center gap-3 rounded-full bg-brand px-8 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-brand-foreground transition-all duration-300 hover:brightness-110"
          >
            Poptat řešení
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="tel:+420770169411"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-background/30 px-8 py-4 font-mono text-[12px] font-medium uppercase tracking-[0.14em] text-background transition-colors duration-300 hover:border-background hover:bg-background hover:text-foreground"
          >
            <Phone className="h-4 w-4" />
            Zavolat
          </a>
        </div>
      </div>
    </section>
  )
}
