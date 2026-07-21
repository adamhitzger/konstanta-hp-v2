import { ArrowUpRight, Mail } from "lucide-react"
import Image from "next/image"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons"
import { Reveal, SectionHeading } from "@/components/reveal"
import { socialContent, type Lang } from "@/lib/translations"

const socialIcons = [InstagramIcon, FacebookIcon, YoutubeIcon, Mail]
const socialMeta = [
  { name: "Instagram", handle: "@konstantaploty", href: "https://www.instagram.com/konstantaploty/" },
  { name: "Facebook", handle: "Konstanta HP", href: "https://www.facebook.com/Konstantahp.cz" },
  { name: "YouTube", handle: "@KONSTANTAHP", href: "https://www.youtube.com/@KONSTANTAHP" },
  { name: "", handle: "info@konstantahp.cz", href: "mailto:info@konstantahp.cz" },
]

const igUrl = "https://www.instagram.com/konstantaploty/"
const gallerySrcs = ["/ig-1.png", "/ig-2.png", "/ig-3.png", "/ig-4.png", "/ig-5.png", "/ig-6.png", "/ig-7.png", "/ig-8.png", "/ig-9.png"]

export function Social({ lang = "cs" }: { lang?: Lang }) {
  const t = socialContent[lang] ?? socialContent.cs
  const socials = socialMeta.map((s, i) => ({ ...s, name: i === 3 ? t.emailLabel : s.name, Icon: socialIcons[i] }))
  const gallery = gallerySrcs.map((src, i) => ({ src, alt: t.galleryAlts[i] }))

  return (
    <section id="site" className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t.heading}
          subtitle={t.subtitle}
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
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand text-brand-foreground transition-colors duration-200 group-hover:bg-brand/85">
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
              aria-label={`${t.igAriaPrefix} ${img.alt}`}
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
