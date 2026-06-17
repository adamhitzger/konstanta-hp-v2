import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Reveal, SectionHeading, Parallax } from "@/components/reveal"

const items = [
  { image: "/realizace-1.png", title: "Hliníkový plot", place: "Rodinný dům, Brno", motif: "Tahokov", color: "bg-primary text-primary-foreground" },
  { image: "/realizace-2.png", title: "Plot s posuvnou bránou", place: "Novostavba, Praha-západ", motif: "Plaňka 90", color: "bg-foreground text-background" },
  { image: "/realizace-3.png", title: "Plot v dekoru dřeva", place: "Vila, Olomouc", motif: "Okenice standard", color: "bg-accent text-accent-foreground" },
]

export function Realizace() {
  return (
    <section id="realizace" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal variant="up" className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Naše realizace"
            className="max-w-2xl"
          />
          <Button render={<a href="#realizace" />} nativeButton={false} size="lg" variant="outline" className="w-fit font-semibold">
            Všechny realizace
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </Reveal>

        <Reveal variant="tilt" childSelector="[data-real]" className="grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <Parallax key={it.title} speed={[35, 70, 50][i % 3]}>
            <figure
              data-real
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src={it.image || "/placeholder.svg"}
                alt={it.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Motif badge */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-background/85 px-3 py-1 text-[11px] font-semibold text-foreground">
                  {it.motif}
                </span>
              </div>

              {/* White caption */}
              <figcaption className="absolute inset-x-0 bottom-0 bg-background p-5 border-t border-border">
                <h3 className="font-heading text-xl font-bold">{it.title}</h3>
                <p className="text-base text-muted-foreground">{it.place}</p>
              </figcaption>
            </figure>
            </Parallax>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
