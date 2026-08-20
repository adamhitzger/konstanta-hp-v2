"use client"

import { useFormContext } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import { motivImage, motivy } from "@/lib/konf-content"
import { DeclineCard, ImageRadioGrid } from "./form-controls"
import { ProductSection } from "./product-section"
import { formControlsContent, motivLabels, stepDilceMotivContent, type Lang } from "@/lib/translations"
import { StepTitle } from "./step-title"

export function StepDilceMotiv({ photos, info = {}, lang = "cs" }: { photos: ConfPhotosWithMotiv; info?: ConfProductInfo; lang?: Lang }) {
  const { watch, setValue } = useFormContext<ConfiguratorType>()
  const motiv = watch("motiv")
  const typSloupku = watch("typSloupku")
  const dilce = watch("dilce")
  const t = stepDilceMotivContent[lang] ?? stepDilceMotivContent.cs
  const motivT = motivLabels[lang] ?? motivLabels.cs
  const fc = formControlsContent[lang] ?? formControlsContent.cs

  const motivOptions = [
    ...motivy.map((m) => ({ value: m.src, label: motivT[m.src] ?? m.motiv, image: motivImage(m), placeholder: fc.noPreview })),
    { value: "vlastní kombinace", label: motivT["vlastní kombinace"] ?? "Vlastní kombinace", image: null },
  ]

  const panelImage = typSloupku === "hliníkové" ? "/modely/dilce/hlinikove.webp" : "/modely/dilce/betonove.webp"

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
        <ImageRadioGrid value={motiv ?? ""} onChange={(v) => setValue("motiv", v)} options={motivOptions} lang={lang} />
      </div>
    </div>
  )
}
