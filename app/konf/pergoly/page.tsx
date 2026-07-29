import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PergolaConfigurator } from "@/components/configurator/pergola-configurator"
import { sanityFetch } from "@/sanity/lib/client"
import { PRODUCT_PHOTOS_QUERY } from "@/sanity/lib/queries"
import type { ProductPhotosDoc } from "@/types"
import { getLang } from "@/lib/translations"
import { buildGalleryPhotos } from "@/lib/product-photos"

export const metadata: Metadata = {
  title: "Konfigurátor pergol | KONSTANTA – hliníkové ploty, brány a pergoly",
  description:
    "Nakonfigurujte si bioklimatickou pergolu, zimní zahradu nebo přístřešek na míru a vyžádejte si nezávaznou kalkulaci zdarma.",
  alternates: { canonical: "/konf/pergoly" },
}

export default async function KonfPergolyPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const [{ lang: langParam }, photoDocs] = await Promise.all([
    searchParams,
    sanityFetch<ProductPhotosDoc[] | null>({ query: PRODUCT_PHOTOS_QUERY }).catch((error) => {
      console.error("Nepodařilo se načíst fotky produktových variant pergol ze Sanity:", error)
      return null
    }),
  ])
  const lang = getLang(langParam)
  const photos = buildGalleryPhotos(photoDocs)

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <PergolaConfigurator photos={photos} lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
