"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import type { ZabradliConfType } from "@/lib/schemas"
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import { barvyOplocení, zabradliImage, zabradliMaterialOptions } from "@/lib/konf-content"
import { ColorSwatchGroup, ImageRadioGrid } from "./form-controls"
import { ProductSection } from "./product-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  colorLabels,
  stepBarvaContent,
  stepZabradliContent,
  zabradliConfContent,
  zabradliMaterialLabels,
  type Lang,
} from "@/lib/translations"
import { StepTitle } from "./step-title"

/**
 * 1. krok konfigurátoru zábradlí: rozměry, výplň (sklo/hliník) a barva rámu.
 * Odstín skla ani motiv se tady nevybírají — mají vlastní krok (`ZabStepMotiv`),
 * protože jsou to dvě varianty téže volby a na jednom kroku by se přepínaly.
 */
export function ZabStepZabradli({
  photos,
  info = {},
  onNext,
  lang = "cs",
}: {
  photos?: ConfPhotosWithMotiv
  info?: ConfProductInfo
  /**
   * Posun na další krok po výběru hotové barvy. Produktová karta ho vědomě
   * nedostává — po zaškrtnutí zábradlí zbývá na kroku ještě výplň a barva,
   * takže tlačítko „Pokračovat" přímo v kartě by vedlo jen do validační hlášky.
   */
  onNext?: () => void
  lang?: Lang
}) {
  const { watch, setValue } = useFormContext<ZabradliConfType>()
  const zabradliMaterial = watch("zabradliMaterial")
  const barva = watch("barva")
  const [ralCode, setRalCode] = useState("")

  const t = zabradliConfContent[lang] ?? zabradliConfContent.cs
  const zt = stepZabradliContent[lang] ?? stepZabradliContent.cs
  const bt = stepBarvaContent[lang] ?? stepBarvaContent.cs
  const colorT = colorLabels[lang] ?? colorLabels.cs
  const materialT = zabradliMaterialLabels[lang] ?? zabradliMaterialLabels.cs

  const colors = barvyOplocení.map((c) => ({ code: c.code, value: c.color.toLowerCase(), color: colorT[c.color] ?? c.color }))
  const isCustom = barva !== undefined && barva !== "" && !barvyOplocení.some((c) => c.color.toLowerCase() === barva)

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
        galleryPhotos={photos?.ploty}
        info={info.ploty}
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

      <div className="flex flex-col gap-6">
        <div>
          <StepTitle pre={t.barvaTitlePre} accent={t.barvaTitleAccent} post={t.barvaTitlePost} />
          <p className="mt-1 text-muted-foreground">{bt.desc}</p>
        </div>

        <ColorSwatchGroup
          value={isCustom ? "" : (barva ?? "")}
          onChange={(v) => {
            setValue("barva", v)
            onNext?.()
          }}
          colors={colors}
        />

        <div className="flex max-w-xs flex-col gap-1.5">
          <Label htmlFor="ral">{bt.ralLabel}</Label>
          <Input
            id="ral"
            placeholder={bt.ralPlaceholder}
            value={ralCode}
            onChange={(e) => {
              setRalCode(e.target.value)
              setValue("barva", e.target.value)
            }}
          />
        </div>
      </div>
    </div>
  )
}
