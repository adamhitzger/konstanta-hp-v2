import type { Metadata } from "next"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PergolaConfigurator } from "@/components/configurator/pergola-configurator"
import { sanityFetch } from "@/sanity/lib/client"
import { PERG_IMGS_QUERY } from "@/sanity/lib/queries"
import type { ConfPhotos } from "@/types"
import { getLang } from "@/lib/translations"

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
  const [{ lang: langParam }, photos] = await Promise.all([
    searchParams,
    sanityFetch<ConfPhotos | null>({ query: PERG_IMGS_QUERY }).catch((error) => {
      console.error("Nepodařilo se načíst fotky konfigurátoru pergol ze Sanity:", error)
      return null
    }),
  ])
  const lang = getLang(langParam)

  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <PergolaConfigurator photos={photos ?? undefined} lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
