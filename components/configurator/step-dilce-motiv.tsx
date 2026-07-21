"use client"

import { useFormContext } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotos } from "@/types"
import { motivy } from "@/lib/konf-content"
import { DeclineCard, ImageRadioGrid } from "./form-controls"
import { ProductSection } from "./product-section"
import { motivLabels, stepDilceMotivContent, type Lang } from "@/lib/translations"

export function StepDilceMotiv({ onNext, photos, lang = "cs" }: { onNext: () => void; photos: ConfPhotos; lang?: Lang }) {
  const { watch, setValue } = useFormContext<ConfiguratorType>()
  const motiv = watch("motiv")
  const typSloupku = watch("typSloupku")
  const dilce = watch("dilce")
  const t = stepDilceMotivContent[lang] ?? stepDilceMotivContent.cs
  const motivT = motivLabels[lang] ?? motivLabels.cs

  const motivOptions = [
    ...motivy.map((m) => ({ value: m.src, label: motivT[m.src] ?? m.motiv, image: `/modely/motivy/${m.imgSrc}.png` })),
    { value: "vlastní kombinace", label: motivT["vlastní kombinace"] ?? "Vlastní kombinace", image: null },
  ]

  const panelImage = typSloupku === "hliníkové" ? "/modely/dilce/hlinikove.png" : "/modely/dilce/betonove.png"

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title1}</h2>
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
        enabledField="dilce"
        countField="celkemDilcu"
        arrayField="rozmeryDilcu"
        dimensionLabels={t.dimensionLabels}
      />

      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title2}</h2>
        <p className="mt-1 mb-4 text-muted-foreground">{t.desc2}</p>
        <ImageRadioGrid
          value={motiv ?? ""}
          onChange={(v) => {
            setValue("motiv", v)
            onNext()
          }}
          options={motivOptions}
          lang={lang}
        />
      </div>
    </div>
  )
}
