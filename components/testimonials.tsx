import Image from "next/image"
import { AnimatedText } from "@/components/reveal"
import { testimonialsContent, type Lang } from "@/lib/translations"

const images = ["/recenze-1.png", "/recenze-2.png", "/recenze-3.png"]

function ReviewCard({ r, uid }: { r: (typeof testimonialsContent)["cs"]["reviews"][0] & { image: string }; uid: string }) {
  return (
    <figure key={uid} className="w-72 shrink-0 overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={r.image || "/placeholder.svg"}
          alt={r.project}
          fill
          sizes="288px"
          className="object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-brand-foreground">
          {r.project}
        </span>
      </div>
      <blockquote className="flex flex-col gap-4 p-6">
        <div className="text-base text-brand">★★★★★</div>
        <p className="text-base leading-relaxed text-pretty text-foreground/65">„{r.text}"</p>
        <figcaption>
          <p className="font-heading font-bold">{r.name}</p>
          <p className="text-base text-muted-foreground">{r.place}</p>
        </figcaption>
      </blockquote>
    </figure>
  )
}

export function Testimonials({ lang = "cs" }: { lang?: Lang }) {
  const t = testimonialsContent[lang] ?? testimonialsContent.cs
  const reviews = t.reviews.map((r, i) => ({ ...r, image: images[i] }))
  const marqueeSet = [...reviews, ...reviews]

  return (
    <section className="overflow-hidden py-20">
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedText
          as="h2"
          text={t.heading}
          className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        />
      </div>

      {/* Marquee — two identical sets for seamless infinite loop */}
      <div className="group [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex animate-[marquee_20s_linear_infinite] group-hover:[animation-play-state:paused]">
          {/* Set A */}
          <div className="flex shrink-0 gap-6 pr-6">
            {marqueeSet.map((r, i) => (
              <ReviewCard key={`a-${i}`} r={r} uid={`a-${i}`} />
            ))}
          </div>
          {/* Set B — clone for seamless loop */}
          <div className="flex shrink-0 gap-6 pr-6" aria-hidden>
            {marqueeSet.map((r, i) => (
              <ReviewCard key={`b-${i}`} r={r} uid={`b-${i}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
