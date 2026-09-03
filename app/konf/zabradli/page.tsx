import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ZabradliConfigurator } from "@/components/configurator/zabradli-configurator"
import { sanityFetch } from "@/sanity/lib/client"
import { PRODUCT_PHOTOS_QUERY } from "@/sanity/lib/queries"
import type { ProductPhotosDoc } from "@/types"
import { getLang } from "@/lib/translations"
import { buildGalleryPhotos, buildProductInfo } from "@/lib/product-photos"

export const metadata: Metadata = {
  title: "Konfigurátor zábradlí | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Nakonfigurujte si skleněné nebo hliníkové zábradlí k terase, balkonu i schodišti — rozměry, výplň, motiv — a vyžádejte si nezávaznou kalkulaci zdarma.",
  alternates: { canonical: "/konf/zabradli" },
}

export default async function KonfZabradliPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const [{ lang: langParam }, photoDocs] = await Promise.all([
    searchParams,
    sanityFetch<ProductPhotosDoc[] | null>({ query: PRODUCT_PHOTOS_QUERY }).catch((error) => {
      console.error("Nepodařilo se načíst fotky produktových variant ze Sanity:", error)
      return null
    }),
  ])
  const lang = getLang(langParam)
  const photos = buildGalleryPhotos(photoDocs)
  const info = buildProductInfo(photoDocs, lang)

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <ZabradliConfigurator photos={photos} info={info} lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
