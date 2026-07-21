import Image from "next/image"
import { Phone, Mail } from "lucide-react"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/social-icons"
import { LangSwitcher } from "@/components/nav/lang-switcher"
import { footerContent, type Lang } from "@/lib/translations"

// Odkazy zrcadlí hlavní menu v hlavičce (components/nav/nav-data.ts).
const productHrefs = ["/#produkty", "/#produkty", "/#produkty", "/#produkty", "/#produkty", "/#produkty"]

const companyHrefs = [
  "/o-nas#jsme-konstanta",
  "/o-nas#sila-konstanty",
  "/o-nas#co-ocenite",
  "/o-nas#jak-to-probiha",
  "/o-nas#certifikaty",
  "/o-nas#faq",
  "/#realizace",
  "/#kontakt",
  "/#kontakt",
]

export function SiteFooter({ lang = "cs" }: { lang?: Lang }) {
  const t = footerContent[lang] ?? footerContent.cs
  const contactPhones = [
    { tel: "+420770169411", label: "+420 770 169 411", email: { href: "mailto:info@konstantahp.cz", label: "info@konstantahp.cz" } },
    { tel: "+420722015842", label: "+420 722 015 842", email: { href: "mailto:nabidky@konstantahp.cz", label: "nabidky@konstantahp.cz" } },
    { tel: "+420728711590", label: "+420 728 711 590", email: null },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
          <a href="#uvod" className="flex items-center" aria-label="Konstanta HP">
            <Image src="/logo-konstanta.svg" alt="Konstanta HP" width={240} height={64} className="h-14 w-auto" />
          </a>
          <p className="max-w-sm text-base leading-relaxed text-muted-foreground">{t.tagline}</p>
          <div className="flex gap-3">
            <a
              href="https://www.instagram.com/konstantaploty/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground transition-colors hover:bg-brand/85"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/Konstantahp.cz"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground transition-colors hover:bg-brand/85"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.youtube.com/@KONSTANTAHP"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-brand-foreground transition-colors hover:bg-brand/85"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
          <LangSwitcher lang={lang} variant="footer" />
        </div>

        <div>
          <h3 className="mb-4 inline-block border-b-2 border-brand pb-1 font-heading font-bold">{t.coNabizime}</h3>
          <ul className="flex flex-col gap-2 text-base text-muted-foreground">
            {t.productLinks.map((label, i) => (
              <li key={label}>
                <a href={productHrefs[i]} className="hover:text-foreground">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 inline-block border-b-2 border-brand pb-1 font-heading font-bold">{t.jsmeKonstanta}</h3>
          <ul className="flex flex-col gap-2 text-base text-muted-foreground">
            {t.companyLinks.map((label, i) => (
              <li key={label}>
                <a href={companyHrefs[i]} className="hover:text-foreground">{label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 inline-block border-b-2 border-brand pb-1 font-heading font-bold">{t.kontakt}</h3>
          <ul className="flex flex-col gap-4 text-sm text-muted-foreground">
            {t.contactGroups.map((g, i) => (
              <li key={g.title}>
                <p className="mb-1 font-semibold text-foreground">{g.title}</p>
                <a href={`tel:${contactPhones[i].tel}`} className="flex items-center gap-2 hover:text-foreground">
                  <Phone className="h-4 w-4 text-primary" /> {contactPhones[i].label}
                </a>
                {contactPhones[i].email ? (
                  <a href={contactPhones[i].email!.href} className="flex items-center gap-2 hover:text-foreground">
                    <Mail className="h-4 w-4 text-primary" /> {contactPhones[i].email!.label}
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 inline-block border-b-2 border-brand pb-1 font-heading font-bold">{t.fakturacniUdaje}</h3>
          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            <p className="font-semibold text-foreground">KONSTANTA - hliníkové ploty s.r.o.</p>
            <p>IČO: 21827150</p>
            <p>DIČ: CZ21827150</p>
            <p>{t.sidlo} Maleč 36, 582 76, Česká republika</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Konstanta HP. {t.rights}</p>
          <p>{t.bottomTagline}</p>
        </div>
      </div>
    </footer>
  )
}
