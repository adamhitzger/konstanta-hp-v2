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

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)

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
          <Realizace lang={lang} />
          <Testimonials lang={lang} />
          <Social lang={lang} />
          <Contact lang={lang} />
        </main>
        <SiteFooter lang={lang} />
      </div>
    </SmoothScroll>
  )
}
