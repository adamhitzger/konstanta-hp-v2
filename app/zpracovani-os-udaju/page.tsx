import type { Metadata } from "next"
import { pageOpenGraph } from "@/lib/site"
import { SmoothScroll } from "@/components/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { PageHero } from "@/components/subpages/page-hero"
import { getLang } from "@/lib/translations"
import { PRIVACY_PATH, privacyContent } from "@/lib/privacy-content"
import { JsonLd } from "@/components/json-ld"
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld"

const PATH = PRIVACY_PATH

export const metadata: Metadata = {
  title: "Ochrana osobních údajů (GDPR) | KONSTANTA",
  description:
    "Jak KONSTANTA – hliníkové ploty s.r.o. zpracovává osobní údaje z poptávek a konfigurátorů, jaké používá cookies a jaká máte práva podle GDPR.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph(PATH),
}

export default async function ZpracovaniOsUdajuPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang: langParam } = await searchParams
  const lang = getLang(langParam)
  const t = privacyContent[lang] ?? privacyContent.cs

  return (
    <>
      <JsonLd
        data={webPageJsonLd({
          path: PATH,
          name: metadata.title as string,
          description: metadata.description as string,
        })}
      />
      <JsonLd data={breadcrumbJsonLd([{ name: "Ochrana osobních údajů", path: PATH }])} />
      <SmoothScroll lang={lang}>
        <div className="flex min-h-screen flex-col">
          <SiteHeader lang={lang} />
          <main className="flex-1">
            <PageHero kicker={t.kicker} heading={t.heading} subtitle={t.subtitle} />

            <article className="mx-auto flex max-w-3xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
              {t.sections.map((section) => (
                <section key={section.heading} className="flex flex-col gap-4">
                  <h2 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">{section.heading}</h2>
                  {section.blocks.map((block, i) =>
                    block.type === "p" ? (
                      <p key={i} className="text-base leading-relaxed text-muted-foreground text-pretty">
                        {block.text}
                      </p>
                    ) : (
                      <div key={i} className="flex flex-col gap-2">
                        {block.intro ? (
                          <p className="text-base leading-relaxed text-muted-foreground text-pretty">{block.intro}</p>
                        ) : null}
                        <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-muted-foreground marker:text-brand">
                          {block.items.map((item) => (
                            <li key={item} className="text-pretty">{item}</li>
                          ))}
                        </ul>
                      </div>
                    ),
                  )}
                </section>
              ))}
            </article>
          </main>
          <SiteFooter lang={lang} />
        </div>
      </SmoothScroll>
    </>
  )
}
