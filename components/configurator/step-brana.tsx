"use client"

import { useFormContext } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotos } from "@/types"
import { gateProducts } from "@/lib/konf-content"
import { DeclineCard } from "./form-controls"
import { ProductSection } from "./product-section"
import { gateLabels, gateExtrasLabels, stepBranaContent, konfContent, type Lang } from "@/lib/translations"

export function StepBrana({ onNext, photos, lang = "cs" }: { onNext: () => void; photos: ConfPhotos; lang?: Lang }) {
  const { watch, setValue } = useFormContext<ConfiguratorType>()
  const brana = watch("brana")
  const t = stepBranaContent[lang] ?? stepBranaContent.cs
  const labels = gateLabels[lang] ?? gateLabels.cs
  const extrasT = gateExtrasLabels[lang] ?? gateExtrasLabels.cs
  const dimensionLabels = (konfContent[lang] ?? konfContent.cs).dimensionLabels
  const gateExtras = [
    { name: "pohon", label: extrasT.pohon },
    { name: "tahoma", label: extrasT.tahoma },
    { name: "ovladac", label: extrasT.ovladac },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title}</h2>
        <p className="mt-1 text-muted-foreground">
          {t.desc}
        </p>
      </div>

      <DeclineCard
        label={t.decline}
        active={brana === true}
        onClick={() => {
          setValue("brana", true)
          onNext()
        }}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {gateProducts.map((gate) => (
          <ProductSection
            key={gate.id}
            title={labels[gate.id] ?? gate.label}
            image={gate.image}
            imageAlt={labels[gate.id] ?? gate.label}
            galleryPhotos={photos[gate.photosKey]}
            enabledField={gate.enabledField}
            countField={gate.countField}
            arrayField={gate.arrayField}
            extraToggles={gateExtras}
            dimensionLabels={dimensionLabels}
            onFirstEnable={() => setValue("brana", false)}
          />
        ))}
      </div>
    </div>
  )
}
