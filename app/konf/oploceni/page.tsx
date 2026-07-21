import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Configurator } from "@/components/configurator/configurator"
import { sanityFetch } from "@/sanity/lib/client"
import { CONF_IMGS_QUERY } from "@/sanity/lib/queries"
import type { ConfPhotos } from "@/types"
import { getLang } from "@/lib/translations"

export const metadata: Metadata = {
  title: "Konfigurátor oplocení | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Nakonfigurujte si bránu, branku, sloupky i motiv hliníkového oplocení na míru a vyžádejte si nezávaznou kalkulaci zdarma.",
  alternates: { canonical: "/konf/oploceni" },
}

export default async function KonfOploceniPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const [{ lang: langParam }, photos] = await Promise.all([
    searchParams,
    sanityFetch<ConfPhotos | null>({ query: CONF_IMGS_QUERY }).catch((error) => {
      console.error("Nepodařilo se načíst fotky konfigurátoru ze Sanity:", error)
      return null
    }),
  ])
  const lang = getLang(langParam)

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <Configurator photos={photos ?? undefined} lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
