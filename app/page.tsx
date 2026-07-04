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

export default function Page() {
  return (
    <SmoothScroll>
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <HorizontalGallery/>
          
          <Stats />
          <Products />
          <Process />
          <WhyUs />
          <Realizace />
          <Testimonials />
          <Social />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
