import { ArrowUpRight, Mail } from "lucide-react"
import Image from "next/image"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons"
import { Reveal, SectionHeading } from "@/components/reveal"

const socials = [
  {
    name: "Instagram",
    handle: "@konstantaploty",
    href: "https://www.instagram.com/konstantaploty/",
    Icon: InstagramIcon,
  },
  {
    name: "Facebook",
    handle: "Konstanta HP",
    href: "https://www.facebook.com/Konstantahp.cz",
    Icon: FacebookIcon,
  },
  {
    name: "YouTube",
    handle: "@KONSTANTAHP",
    href: "https://www.youtube.com/@KONSTANTAHP",
    Icon: YoutubeIcon,
  },
  {
    name: "E-mail",
    handle: "info@konstantahp.cz",
    href: "mailto:info@konstantahp.cz",
    Icon: Mail,
  },
]

const igUrl = "https://www.instagram.com/konstantaploty/"
const gallery = [
  { src: "/ig-1.png", alt: "Hliníkový plot s vodorovnými lamelami" },
  { src: "/ig-2.png", alt: "Posuvná hliníková brána" },
  { src: "/ig-3.png", alt: "Detail hliníkových lamel" },
  { src: "/ig-4.png", alt: "Hliníková branka" },
  { src: "/ig-5.png", alt: "Hliníková pergola" },
  { src: "/ig-6.png", alt: "Plot s imitací dřeva" },
  { src: "/ig-7.png", alt: "Plot s integrovanou schránkou" },
  { src: "/ig-8.png", alt: "Montáž plotu" },
  { src: "/ig-9.png", alt: "Dům s osvětleným plotem" },
]

export function Social() {
  return (
    <section id="site" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Jsme i na sociálních sítích"
          subtitle="Podívejte se na naše nejnovější realizace, novinky a inspiraci na hliníkové ploty, brány a pergoly."
          className="mb-12 max-w-2xl"
        />

        <Reveal variant="tilt" childSelector="[data-social]" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map(({ name, handle, href, Icon }) => (
            <a
              data-social
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-foreground hover:bg-muted"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition-colors duration-200 group-hover:bg-foreground/85">
                  <Icon className="h-7 w-7" />
                </span>
                <div>
                  <p className="font-heading text-lg font-bold">{name}</p>
                  <p className="text-base text-muted-foreground">{handle}</p>
                </div>
              </div>
              <ArrowUpRight className="h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
          ))}
        </Reveal>

        {/* Instagram photo grid */}
        <Reveal
          variant="scale"
          childSelector="[data-ig]"
          stagger={0.08}
          className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-3 lg:grid-cols-3"
        >
          {gallery.map((img, i) => (
            <a
              data-ig
              key={img.src}
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Otevřít příspěvek na Instagramu: ${img.alt}`}
              className="group relative aspect-square overflow-hidden rounded-xl"
            >
              <Image
                src={img.src || "/placeholder.svg"}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/40 group-hover:opacity-100">
                <InstagramIcon className="h-8 w-8 text-background" />
              </div>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
