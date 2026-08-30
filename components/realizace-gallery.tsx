"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Expand } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { PhotoLightbox } from "@/components/configurator/photo-lightbox"
import { motivLabels, realizacePageContent, type Lang } from "@/lib/translations"
import type { RealizaceCat, RealizaceGroup } from "@/types"
import { cn } from "@/lib/utils"

/** Kolik fotek se ukáže po načtení; zbytek se dolistuje tlačítkem. */
const PAGE_SIZE = 12

/**
 * Galerie realizací rozdělená do záložek (ploty / brány a branky / pergoly / zábradlí).
 * Data přicházejí už poskládaná z `lib/realizace.ts` ze Sanity (`productPhotos`).
 *
 * Klik na fotku otevře sdílený `<PhotoLightbox />` z konfigurátoru — přebírá se z něj
 * prosklouzávání, šipky i klávesnice. Filtr motivů si tady drží grid (viz `lightboxPhotos`).
 */
export function RealizaceGallery({
  groups,
  initialCat,
  lang = "cs",
}: {
  groups: RealizaceGroup[]
  /** Záložka předvybraná z `?filter=` — sem míří odkazy z menu, patičky a produktových karet. */
  initialCat?: RealizaceCat
  lang?: Lang
}) {
  const t = realizacePageContent[lang] ?? realizacePageContent.cs
  const ml = motivLabels[lang] ?? motivLabels.cs

  const [activeCat, setActiveCat] = useState<RealizaceCat | null>(
    (initialCat && groups.some((g) => g.cat === initialCat) ? initialCat : groups[0]?.cat) ?? null,
  )
  const [activeMotiv, setActiveMotiv] = useState<string | null>(null)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const group = groups.find((g) => g.cat === activeCat) ?? groups[0]

  /** Motivy dostupné uvnitř aktivní kategorie + kolik na každý připadá fotek. */
  const motivs = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of group?.photos ?? []) {
      if (!p.motiv) continue
      counts.set(p.motiv, (counts.get(p.motiv) ?? 0) + 1)
    }
    return [...counts.entries()]
  }, [group])

  const photos = useMemo(
    () => (activeMotiv ? (group?.photos ?? []).filter((p) => p.motiv === activeMotiv) : (group?.photos ?? [])),
    [group, activeMotiv],
  )

  /**
   * Lightbox si při otevření sám zapne filtr podle prvního motivu, který ve fotkách najde —
   * `initialIndex` z gridu by pak ukazoval do jiného seznamu. Filtr motivů tady vlastní grid,
   * takže se lightboxu posílají fotky bez `motiv` a jeho vlastní sidebar se nezobrazí.
   */
  const lightboxPhotos = useMemo(() => photos.map((p) => ({ url: p.url })), [photos])

  const selectCat = (cat: RealizaceCat) => {
    setActiveCat(cat)
    setActiveMotiv(null)
    setVisible(PAGE_SIZE)
    /* URL se drží v souladu se záložkou, aby šel odkaz na kategorii sdílet a fungovalo
       tlačítko zpět. `replaceState` místo routeru: přepnutí je čistě klientské, přes
       router by se zbytečně přepočítala celá server komponenta i s fetchem ze Sanity.
       Stavíme na aktuálním `search`, takže `?lang=` v URL zůstane. */
    if (typeof window === "undefined") return
    const params = new URLSearchParams(window.location.search)
    params.set("filter", cat)
    window.history.replaceState(null, "", `${window.location.pathname}?${params}`)
  }

  const selectMotiv = (motiv: string | null) => {
    setActiveMotiv(motiv)
    setVisible(PAGE_SIZE)
  }

  if (groups.length === 0) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <p className="rounded-2xl border border-dashed border-border px-6 py-16 text-center text-base text-muted-foreground">
          {t.emptyAll}
        </p>
      </section>
    )
  }

  const cat = t.cats[group.cat]
  const shown = photos.slice(0, visible)
  /* Když má kategorie jediný motiv (pergoly mají v Sanity všechno pod „vlastní kombinace"),
     nemá cenu ho vypisovat na každé fotce ani nabízet filtr — nic by nefiltroval. */
  const showMotivs = motivs.length > 1

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      {/* Záložky kategorií */}
      <div
        role="tablist"
        aria-label={t.kicker}
        className="flex flex-wrap gap-2 border-b border-border pb-6"
      >
        {groups.map((g) => (
          <button
            key={g.cat}
            role="tab"
            type="button"
            aria-selected={g.cat === group.cat}
            onClick={() => selectCat(g.cat)}
            className={cn(
              "rounded-full border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300",
              g.cat === group.cat
                ? "border-brand bg-brand text-brand-foreground"
                : "border-border text-muted-foreground hover:border-brand/50 hover:text-foreground",
            )}
          >
            {t.cats[g.cat].tab}
            <span className="ml-2 tabular-nums opacity-60">{g.photos.length}</span>
          </button>
        ))}
      </div>

      {/* Text kategorie */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <h2 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-balance sm:text-4xl">
          {cat.heading}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground text-pretty">{cat.text}</p>
      </div>

      {/* Filtr motivů — jen když je z čeho vybírat */}
      {showMotivs ? (
        <div className="mt-10 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => selectMotiv(null)}
            className={cn(
              "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
              activeMotiv === null
                ? "border-brand bg-brand/12 text-brand"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {t.cats[group.cat].tab}
            <span className="ml-2 font-mono text-xs tabular-nums opacity-70">{group.photos.length}</span>
          </button>
          {motivs.map(([id, count]) => (
            <button
              key={id}
              type="button"
              onClick={() => selectMotiv(id)}
              className={cn(
                "rounded-xl border px-3 py-2 text-sm font-medium transition-colors",
                activeMotiv === id
                  ? "border-brand bg-brand/12 text-brand"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {ml[id] ?? id}
              <span className="ml-2 font-mono text-xs tabular-nums opacity-70">{count}</span>
            </button>
          ))}
        </div>
      ) : null}

      {/* Grid fotek */}
      {shown.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border px-6 py-16 text-center text-base text-muted-foreground">
          {t.empty}
        </p>
      ) : (
        <>
          <Reveal
            key={`${group.cat}-${activeMotiv ?? "all"}`}
            variant="up"
            childSelector="[data-photo]"
            stagger={0.05}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {shown.map((photo, i) => (
              <button
                data-photo
                key={`${photo.url}-${i}`}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`${t.openGallery}: ${cat.heading}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-muted"
              >
                <Image
                  src={photo.url}
                  alt={`${cat.heading} — ${photo.motiv ? (ml[photo.motiv] ?? photo.motiv) : cat.tab}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <span className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/35" />
                <span className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Expand className="size-4" />
                </span>
                {showMotivs && photo.motiv ? (
                  <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground">
                    {ml[photo.motiv] ?? photo.motiv}
                  </span>
                ) : null}
              </button>
            ))}
          </Reveal>

          {visible < photos.length ? (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="rounded-full border border-border px-8 py-4 font-mono text-[12px] uppercase tracking-[0.14em] transition-colors duration-300 hover:bg-foreground hover:text-background"
              >
                {t.loadMore(photos.length - visible)}
              </button>
            </div>
          ) : null}
        </>
      )}

      <PhotoLightbox
        photos={lightboxPhotos}
        title={cat.heading}
        open={lightbox !== null}
        onOpenChange={(open) => setLightbox(open ? (lightbox ?? 0) : null)}
        initialIndex={lightbox ?? 0}
        lang={lang}
      />
    </section>
  )
}
