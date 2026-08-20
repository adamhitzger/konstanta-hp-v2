"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import {
  barvyOplocení,
  motivImage,
  motivy,
  zabradliImage,
  zabradliMaterialOptions,
  zabradliSkloOptions,
} from "@/lib/konf-content"
import { ColorSwatchGroup, ImageRadioGrid } from "./form-controls"
import { ProductSection } from "./product-section"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  colorLabels,
  formControlsContent,
  motivLabels,
  stepBarvaContent,
  stepZabradliContent,
  zabradliMaterialLabels,
  zabradliSkloLabels,
  type Lang,
} from "@/lib/translations"
import { StepTitle } from "./step-title"

export function StepBarva({
  photos,
  info = {},
  onBack,
  lang = "cs",
}: {
  photos?: ConfPhotosWithMotiv
  info?: ConfProductInfo
  onBack?: () => void
  lang?: Lang
}) {
  const { watch, setValue } = useFormContext<ConfiguratorType>()
  const barva = watch("barva")
  const zabradli = watch("zabradli")
  const zabradliMaterial = watch("zabradliMaterial")
  const zabradliSklo = watch("zabradliSklo")
  const zabradliMotiv = watch("zabradliMotiv")
  const [ralCode, setRalCode] = useState("")
  const t = stepBarvaContent[lang] ?? stepBarvaContent.cs
  const zt = stepZabradliContent[lang] ?? stepZabradliContent.cs
  const colorT = colorLabels[lang] ?? colorLabels.cs
  const motivT = motivLabels[lang] ?? motivLabels.cs
  const fc = formControlsContent[lang] ?? formControlsContent.cs
  const materialT = zabradliMaterialLabels[lang] ?? zabradliMaterialLabels.cs
  const skloT = zabradliSkloLabels[lang] ?? zabradliSkloLabels.cs
  const colors = barvyOplocení.map((c) => ({ code: c.code, value: c.color.toLowerCase(), color: colorT[c.color] ?? c.color }))

  const isCustom = barva !== undefined && barva !== "" && !barvyOplocení.some((c) => c.color.toLowerCase() === barva)

  const materialOptions = zabradliMaterialOptions.map((o) => ({
    value: o.value,
    label: materialT[o.value] ?? o.label,
    image: o.image,
  }))
  const skloColors = zabradliSkloOptions.map((c) => ({
    code: c.code,
    value: c.color.toLowerCase(),
    color: skloT[c.color] ?? c.color,
  }))
  // Hliníková výplň zábradlí nabízí stejné motivy jako plotové dílce.
  const motivOptions = motivy.map((m) => ({
    value: m.src,
    label: motivT[m.src] ?? m.motiv,
    image: motivImage(m),
    placeholder: fc.noPreview,
  }))

  return (
    <div className="flex flex-col gap-8">
      {/* Zábradlí je doplněk k oplocení, ne samostatný krok — stojí proto nad
          výběrem barvy, kterou pak sdílí se zbytkem konfigurace. */}
      <div className="flex flex-col gap-6">
        <div>
          <StepTitle pre={zt.titlePre} accent={zt.titleAccent} post={zt.titlePost} />
          <p className="mt-1 text-muted-foreground">{zt.desc}</p>
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
          onBack={onBack}
          lang={lang}
        />

        {zabradli ? (
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5">
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

            {zabradliMaterial === "sklo" ? (
              <div>
                <Label className="font-heading text-lg font-bold">{zt.skloLabel}</Label>
                <div className="mt-3">
                  <ColorSwatchGroup value={zabradliSklo ?? ""} onChange={(v) => setValue("zabradliSklo", v)} colors={skloColors} />
                </div>
              </div>
            ) : null}

            {zabradliMaterial === "hliník" ? (
              <div>
                <Label className="mb-3 font-heading text-lg font-bold">{zt.motivLabel}</Label>
                <ImageRadioGrid
                  value={zabradliMotiv ?? ""}
                  onChange={(v) => setValue("zabradliMotiv", v)}
                  options={motivOptions}
                  lang={lang}
                />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <StepTitle pre={t.titlePre} accent={t.titleAccent} post={t.titlePost} />
          <p className="mt-1 text-muted-foreground">{t.desc}</p>
        </div>

        <ColorSwatchGroup value={isCustom ? "" : (barva ?? "")} onChange={(v) => setValue("barva", v)} colors={colors} />

        <div className="flex max-w-xs flex-col gap-1.5">
          <Label htmlFor="ral">{t.ralLabel}</Label>
          <Input
            id="ral"
            placeholder={t.ralPlaceholder}
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
