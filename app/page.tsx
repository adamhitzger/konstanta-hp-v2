import { SiteHeader } from "@/components/site-header"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Stats } from "@/components/stats"
import { Products } from "@/components/products"
import { Process } from "@/components/process"
import { WhyUs } from "@/components/why-us"
import { Testimonials } from "@/components/testimonials"
import { Customers } from "@/components/customers"
import { Social } from "@/components/social"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import HorizontalGallery from "@/components/HorizontalGallery"
import { getLang } from "@/lib/translations"
import { sanityFetch } from "@/sanity/lib/client"
import { BANNER_PHOTOS, CUSTOMERS_QUERY, IG_FEED, REALIZACE_BANNERS_QUERY, REVIEWS_QUERY } from "@/sanity/lib/queries"
import { buildRealizaceTeaser } from "@/lib/realizace"
import { buildGallerySlides } from "@/lib/banner-photos"
import { buildReviews } from "@/lib/reviews"
import { buildCustomers } from "@/lib/customers"
import type { BannerPhotosDoc, CustomerDoc, IgPost, ReviewDoc } from "@/types"
import { JsonLd } from "@/components/json-ld"
import { webPageJsonLd } from "@/lib/json-ld"
import type { Metadata } from "next"
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageOpenGraph } from "@/lib/site"

/** Titulek, popis a canonical dědí z layoutu; tady jen `og:url`. */
export const metadata: Metadata = {
  openGraph: pageOpenGraph("/"),
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const [{ lang: langParam }, bannerDoc, igPosts, realizaceDocs, reviewDocs, customerDocs] = await Promise.all([
    searchParams,
    sanityFetch<BannerPhotosDoc | null>({ query: BANNER_PHOTOS }).catch((error) => {
      console.error("Nepodařilo se načíst fotky hlavní sekce ze Sanity:", error)
      return null
    }),
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
    sanityFetch<ReviewDoc[] | null>({ query: REVIEWS_QUERY }).catch((error) => {
      console.error("Nepodařilo se načíst recenze ze Sanity:", error)
      return null
    }),
    sanityFetch<CustomerDoc[] | null>({ query: CUSTOMERS_QUERY }).catch((error) => {
      console.error("Nepodařilo se načíst loga zákazníků ze Sanity:", error)
      return null
    }),
  ])
  const lang = getLang(langParam)
  const reviews = buildReviews(reviewDocs, lang)
  const customers = buildCustomers(customerDocs)
  const gallerySlides = buildGallerySlides(bannerDoc?.photosUrl, lang)

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: "/",
          name: DEFAULT_TITLE,
          description: DEFAULT_DESCRIPTION,
        })}
      />
      <SmoothScroll lang={lang}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader lang={lang} />
          <main className="flex-1">
            <HorizontalGallery slides={gallerySlides} lang={lang} />

            <Stats lang={lang} />
            <Products lang={lang} />
            <Process lang={lang} />
            <WhyUs lang={lang} />
            <Testimonials reviews={reviews} lang={lang} />
            <Customers customers={customers} lang={lang} />
            <Social posts={igPosts ?? []} lang={lang} />
            <Contact lang={lang} />
          </main>
          <SiteFooter lang={lang} />
        </div>
      </SmoothScroll>
    </>
  )
}
