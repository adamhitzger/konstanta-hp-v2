"use client"

import { useFormContext } from "react-hook-form"
import type { ZabradliConfType } from "@/lib/schemas"
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import { zabradliImage, zabradliMaterialOptions } from "@/lib/konf-content"
import { ImageRadioGrid } from "./form-controls"
import { ProductSection } from "./product-section"
import { Label } from "@/components/ui/label"
import {
  stepZabradliContent,
  zabradliConfContent,
  zabradliMaterialLabels,
  type Lang,
} from "@/lib/translations"
import { StepTitle } from "./step-title"

/**
 * 1. krok konfigurátoru zábradlí: rozměry a výplň (sklo/hliník). Barva rámu se
 * u zábradlí neřeší. Odstín skla ani motiv se tady nevybírají — mají vlastní krok
 * (`ZabStepMotiv`), protože jsou to dvě varianty téže volby a na jednom kroku by
 * se přepínaly.
 */
export function ZabStepZabradli({
  photos,
  info = {},
  lang = "cs",
}: {
  photos?: ConfPhotosWithMotiv
  info?: ConfProductInfo
  lang?: Lang
}) {
  const { watch, setValue } = useFormContext<ZabradliConfType>()
  const zabradliMaterial = watch("zabradliMaterial")

  const t = zabradliConfContent[lang] ?? zabradliConfContent.cs
  const zt = stepZabradliContent[lang] ?? stepZabradliContent.cs
  const materialT = zabradliMaterialLabels[lang] ?? zabradliMaterialLabels.cs

  const materialOptions = zabradliMaterialOptions.map((o) => ({
    value: o.value,
    label: materialT[o.value] ?? o.label,
    image: o.image,
  }))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <StepTitle pre={zt.titlePre} accent={zt.titleAccent} post={zt.titlePost} />
        <p className="mt-1 text-muted-foreground">{t.stepDesc}</p>
      </div>

      <ProductSection
        title={zt.productTitle}
        image={zabradliImage}
        imageAlt={zt.productTitle}
        galleryPhotos={photos?.zabradli}
        info={info.zabradli}
        enabledField="zabradli"
        countField="celkemZabradli"
        arrayField="rozmeryZabradli"
        dimensionLabels={zt.dimensionLabels}
        lang={lang}
      />

      <div>
        <Label className="mb-3 font-heading text-lg font-bold">{zt.materialLabel}</Label>
        <ImageRadioGrid
          value={zabradliMaterial ?? ""}
          onChange={(v) => {
            setValue("zabradliMaterial", v)
            // Výplň má vlastní volbu podle materiálu — při přepnutí zahodíme tu druhou,
            // ať v poptávce nezůstane odstín skla u hliníkového zábradlí.
            if (v === "sklo") setValue("zabradliMotiv", undefined)
            if (v === "hliník") setValue("zabradliSklo", undefined)
          }}
          options={materialOptions}
          lang={lang}
        />
      </div>
    </div>
  )
}
