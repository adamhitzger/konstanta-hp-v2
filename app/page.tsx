import { SiteHeader } from "@/components/site-header"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Products } from "@/components/products"
import { Process } from "@/components/process"
import { WhyUs } from "@/components/why-us"
import { Realizace } from "@/components/realizace"
import { Testimonials } from "@/components/testimonials"
import { Social } from "@/components/social"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import HorizontalGallery from "@/components/HorizontalGallery"
import { getLang } from "@/lib/translations"
import { sanityFetch } from "@/sanity/lib/client"
import { IG_FEED, REALIZACE_BANNERS_QUERY } from "@/sanity/lib/queries"
import { buildRealizaceTeaser } from "@/lib/realizace"
import type { IgPost } from "@/types"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const [{ lang: langParam }, igPosts, realizaceDocs] = await Promise.all([
    searchParams,
    sanityFetch<IgPost[] | null>({ query: IG_FEED }).catch((error) => {
      console.error("Nepodařilo se načíst Instagram feed ze Sanity:", error)
      return null
    }),
    sanityFetch<{ cat?: string; banner?: string }[] | null>({
      query: REALIZACE_BANNERS_QUERY,
    }).catch((error) => {
      console.error("Nepodařilo se načíst úvodní fotky realizací ze Sanity:", error)
      return null
    }),
  ])
  const lang = getLang(langParam)
  const realizace = buildRealizaceTeaser(realizaceDocs)

  return (
    <SmoothScroll lang={lang}>
      <div className="flex min-h-screen flex-col">
        <SiteHeader lang={lang} />
        <main className="flex-1">
          <HorizontalGallery lang={lang} />

          <Stats lang={lang} />
          <Products lang={lang} />
          <Process lang={lang} />
          <WhyUs lang={lang} />
          <Realizace items={realizace} lang={lang} />
          <Testimonials lang={lang} />
          <Social posts={igPosts ?? []} lang={lang} />
          <Contact lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
