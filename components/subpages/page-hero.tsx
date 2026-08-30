import { AnimatedText } from "@/components/reveal"

/**
 * Shared hero band for the content subpages (chytrá řešení, přípravné práce,
 * pro firmy). Blueprint grid + brand glow, same visual language as <ZaverCta />.
 */
export function PageHero({
  kicker,
  heading,
  subtitle,
}: {
  kicker: string
  heading: string
  subtitle: string
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-foreground py-20 text-background sm:py-28">
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

      <div className="relative mx-auto flex max-w-4xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
          <span className="h-[2px] w-8 bg-brand" />
          {kicker}
        </p>
        <AnimatedText
          as="h1"
          text={heading}
          className="font-heading text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-balance text-background sm:text-5xl lg:text-6xl"
        />
        <p className="max-w-2xl text-lg leading-relaxed text-background/70 text-pretty">{subtitle}</p>
      </div>
    </section>
  )
}
