import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProfileHero } from "@/components/o-nas/profile-hero"
import { SectionNav } from "@/components/o-nas/section-nav"
import { Story } from "@/components/o-nas/story"
import { SilaKonstanty } from "@/components/o-nas/sila-konstanty"
import { CoOcenite } from "@/components/o-nas/co-ocenite"
import { ProcesFlow } from "@/components/o-nas/proces-flow"
import { Certifikaty } from "@/components/o-nas/certifikaty"
import { Faq } from "@/components/o-nas/faq"
import { ZaverCta } from "@/components/o-nas/zaver-cta"
import { getLang } from "@/lib/translations"

export const metadata: Metadata = {
  title: "O nás | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Jsme KONSTANTA – rodinná firma od roku 2022. Precizní hliníkové ploty, brány a pergoly s vlastním patentovaným komorovým systémem. Stovky realizací, montáž do 24 hodin.",
  alternates: { canonical: "/o-nas" },
}

export default async function ONasPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <ProfileHero lang={lang} />
          <SectionNav lang={lang} />
          <Story lang={lang} />
          <SilaKonstanty lang={lang} />
          <CoOcenite lang={lang} />
          <ProcesFlow lang={lang} />
          <Certifikaty lang={lang} />
          <Faq lang={lang} />
          <ZaverCta lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
