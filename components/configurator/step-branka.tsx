"use client"

import { useFormContext } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotos } from "@/types"
import { DeclineCard } from "./form-controls"
import { ProductSection } from "./product-section"
import { brankaExtrasLabels, stepBrankaContent, type Lang } from "@/lib/translations"

export function StepBranka({ onNext, photos, lang = "cs" }: { onNext: () => void; photos: ConfPhotos; lang?: Lang }) {
  const { watch, setValue } = useFormContext<ConfiguratorType>()
  const branka = watch("branka")
  const t = stepBrankaContent[lang] ?? stepBrankaContent.cs
  const extrasT = brankaExtrasLabels[lang] ?? brankaExtrasLabels.cs
  const brankaExtras = [
    { name: "zamek", label: extrasT.zamek },
    { name: "schranka", label: extrasT.schranka },
    { name: "zvonek", label: extrasT.zvonek },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title}</h2>
        <p className="mt-1 text-muted-foreground">{t.desc}</p>
      </div>

      <DeclineCard
        label={t.decline}
        active={branka === false}
        onClick={() => {
          setValue("branka", false)
          setValue("celkemBranek", 0)
          setValue("rozmeryBranek", undefined)
          onNext()
        }}
      />

      <ProductSection
        title={t.productTitle}
        image="/modely/branka.png"
        imageAlt={t.productTitle}
        galleryPhotos={photos.branka}
        enabledField="branka"
        countField="celkemBranek"
        arrayField="rozmeryBranek"
        extraToggles={brankaExtras}
        dimensionLabels={t.dimensionLabels}
      />
    </div>
  )
}
