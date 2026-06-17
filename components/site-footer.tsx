 import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons"

const productLinks = [
  { label: "Hliníkové ploty", href: "#produkty" },
  { label: "Brány", href: "#produkty" },
  { label: "Branky", href: "#produkty" },
  { label: "Pergoly", href: "#produkty" },
]

const customerLinks = [
  { label: "Pro zákazníky", href: "#" },
  { label: "Pro partnery", href: "#" },
  { label: "Recenze", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Realizace", href: "#realizace" },
  { label: "Kontakt", href: "#kontakt" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <a href="#uvod" className="flex items-center" aria-label="Konstanta HP">
            <Image src="/logo-konstanta.svg" alt="Konstanta HP" width={240} height={64} className="h-14 w-auto" />
          </a>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
            Výroba a montáž moderních hliníkových plotů, bran, branek a pergol na míru po celé České republice.
          </p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/konstantaploty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-foreground hover:text-foreground"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/Konstantahp.cz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-foreground hover:text-foreground"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@KONSTANTAHP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/60 transition-colors hover:border-foreground hover:text-foreground"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-heading font-bold">Produkty</h3>
          <ul className="flex flex-col gap-2 text-base text-muted-foreground">
            {productLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-foreground">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading font-bold">Pro zákazníky</h3>
          <ul className="flex flex-col gap-2 text-base text-muted-foreground">
            {customerLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-foreground">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading font-bold">Kontakt</h3>
          <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
            <li>
              <p className="mb-1 font-semibold text-foreground">Zaměření a obchod</p>
              <a href="tel:+420770169411" className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4 text-primary" /> +420 770 169 411
              </a>
              <a href="mailto:info@konstantahp.cz" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4 text-primary" /> info@konstantahp.cz
              </a>
            </li>
            <li>
              <p className="mb-1 font-semibold text-foreground">Fakturace, kalkulace, nabídky</p>
              <a href="tel:+420722015842" className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4 text-primary" /> +420 722 015 842
              </a>
              <a href="mailto:nabidky@konstantahp.cz" className="flex items-center gap-2 hover:text-foreground">
                <Mail className="h-4 w-4 text-primary" /> nabidky@konstantahp.cz
              </a>
            </li>
            <li>
              <p className="mb-1 font-semibold text-foreground">Výroba a technické řešení</p>
              <a href="tel:+420728711590" className="flex items-center gap-2 hover:text-foreground">
                <Phone className="h-4 w-4 text-primary" /> +420 728 711 590
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-heading font-bold">Fakturační údaje</h3>
          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">KONSTANTA - hliníkové ploty s.r.o.</p>
            <p>IČO: 21827150</p>
            <p>DIČ: CZ21827150</p>
            <p>Sídlo: Maleč 36, 582 76, Česká republika</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Konstanta HP. Všechna práva vyhrazena.</p>
          <p>Hliníkové ploty na míru</p>
        </div>
      </div>
    </footer>
  )
}
