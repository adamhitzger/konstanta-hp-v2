"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import { motivy } from "@/lib/konf-content"
import { cn } from "@/lib/utils"
import { DeclineCard, ImageRadioGrid, InlineCheckbox } from "./form-controls"
import { PhotoLightbox, PhotoThumbs } from "./photo-lightbox"
import { ProductSection } from "./product-section"
import { motivLabels, photoGalleryContent, stepDilceMotivContent, type Lang } from "@/lib/translations"
import { StepTitle } from "./step-title"

export function StepDilceMotiv({ photos, info = {}, lang = "cs" }: { photos: ConfPhotosWithMotiv; info?: ConfProductInfo; lang?: Lang }) {
  const { watch, setValue } = useFormContext<ConfiguratorType>()
  const motiv = watch("motiv")
  const typSloupku = watch("typSloupku")
  const dilce = watch("dilce")
  const vypaleni = watch("vypaleniPlochy")
  const [vypaleniGalerie, setVypaleniGalerie] = useState(false)
  const t = stepDilceMotivContent[lang] ?? stepDilceMotivContent.cs
  const motivT = motivLabels[lang] ?? motivLabels.cs
  const gt = photoGalleryContent[lang] ?? photoGalleryContent.cs

  const motivOptions = [
    ...motivy.map((m) => ({ value: m.src, label: motivT[m.src] ?? m.motiv, image: `/modely/motivy/${m.imgSrc}.webp` })),
    { value: "vlastní kombinace", label: motivT["vlastní kombinace"] ?? "Vlastní kombinace", image: null },
  ]

  const panelImage = typSloupku === "hliníkové" ? "/modely/dilce/hlinikove.webp" : "/modely/dilce/betonove.webp"
  const vypaleniPhotos = photos.ploty ?? []

  return (
    <div className="flex flex-col gap-8">
      <div>
        <StepTitle pre={t.title1Pre} accent={t.title1Accent} post={t.title1Post} />
        <p className="mt-1 text-muted-foreground">{t.desc1}</p>
      </div>

      <DeclineCard
        label={t.decline}
        active={dilce === false}
        onClick={() => {
          setValue("dilce", false)
          setValue("celkemDilcu", 0)
          setValue("rozmeryDilcu", undefined)
        }}
      />

      <ProductSection
        title={t.productTitle}
        image={panelImage}
        imageAlt={t.productTitle}
        galleryPhotos={photos.ploty}
        info={info.ploty}
        enabledField="dilce"
        countField="celkemDilcu"
        arrayField="rozmeryDilcu"
        dimensionLabels={t.dimensionLabels}
        lang={lang}
      />

      <div>
        <StepTitle pre={t.title2Pre} accent={t.title2Accent} post={t.title2Post} />
        <p className="mt-1 mb-4 text-muted-foreground">{t.desc2}</p>
        {/* Bez automatického posunu na další krok — pod motivy je ještě volba
            vypálení plochy, kterou by přeskočil. */}
        <ImageRadioGrid value={motiv ?? ""} onChange={(v) => setValue("motiv", v)} options={motivOptions} lang={lang} />
      </div>

      <div>
        <StepTitle pre={t.title3Pre} accent={t.title3Accent} post={t.title3Post} className="text-xl sm:text-2xl" />
        <p className="mt-1 mb-4 text-muted-foreground">{t.desc3}</p>

        <div
          className={cn(
            "flex flex-col gap-4 rounded-2xl border-2 bg-card p-5 transition-colors",
            vypaleni ? "border-brand" : "border-border",
          )}
        >
          <InlineCheckbox
            label={t.vypaleniLabel}
            checked={vypaleni === true}
            onChange={(e) => setValue("vypaleniPlochy", e.target.checked)}
            className="text-base font-medium text-foreground"
          />

          {/* Zatím nemáme vlastní fotky vypálení — bubliny jedou na galerii oplocení. */}
          <PhotoThumbs
            photos={vypaleniPhotos}
            title={t.title3Accent}
            label={gt.viewPhotosOf}
            onOpen={() => setVypaleniGalerie(true)}
            lang={lang}
          />
        </div>

        <PhotoLightbox
          photos={vypaleniPhotos}
          title={t.title3Accent}
          open={vypaleniGalerie}
          onOpenChange={setVypaleniGalerie}
          lang={lang}
        />
      </div>
    </div>
  )
}
