import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/subpages/page-hero"
import { ClosingCta } from "@/components/subpages/closing-cta"
import { RealizaceGallery } from "@/components/realizace-gallery"
import { sanityFetch } from "@/sanity/lib/client"
import { REALIZACE_QUERY } from "@/sanity/lib/queries"
import { REALIZACE_CATS, buildRealizace } from "@/lib/realizace"
import { getLang, realizacePageContent } from "@/lib/translations"
import type { ProductPhotosDoc, RealizaceCat } from "@/types"

export const metadata: Metadata = {
  title: "Realizace | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Fotogalerie dokončených realizací KONSTANTY – hliníkové ploty, brány a branky, bioklimatické pergoly a zábradlí. Prohlédněte si je podle motivu a výplně.",
  alternates: { canonical: "/realizace" },
}

export default async function RealizacePage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string; filter?: string }>
}) {
  const [{ lang: langParam, filter }, photoDocs] = await Promise.all([
    searchParams,
    sanityFetch<ProductPhotosDoc[] | null>({ query: REALIZACE_QUERY }).catch((error) => {
      console.error("Nepodařilo se načíst fotky realizací ze Sanity:", error)
      return null
    }),
  ])
  const lang = getLang(langParam)
  const t = realizacePageContent[lang] ?? realizacePageContent.cs
  const groups = buildRealizace(photoDocs)
  /** `?filter=ploty|brany|branky|pergoly|zabradli` předvybere záložku. Neznámá hodnota se ignoruje. */
  const initialCat = REALIZACE_CATS.find((c) => c === filter) as RealizaceCat | undefined

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <PageHero kicker={t.kicker} heading={t.heading} subtitle={t.subtitle} />
          <RealizaceGallery groups={groups} initialCat={initialCat} lang={lang} />
          <ClosingCta
            heading={t.ctaHeading}
            text={t.ctaText}
            cta={t.cta}
            ctaCall={t.ctaCall}
            lang={lang}
          />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
