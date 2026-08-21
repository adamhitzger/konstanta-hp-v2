"use client"

import { useFormContext } from "react-hook-form"
import type { ZabradliConfType } from "@/lib/schemas"
import { motivImage, motivy, zabradliSkloOptions } from "@/lib/konf-content"
import { ColorSwatchGroup, ImageRadioGrid } from "./form-controls"
import {
  formControlsContent,
  motivLabels,
  zabradliConfContent,
  zabradliSkloLabels,
  type Lang,
} from "@/lib/translations"
import { StepTitle } from "./step-title"

/**
 * 2. krok: výplň zábradlí podle materiálu z prvního kroku — u skla odstín,
 * u hliníku motiv (stejná nabídka jako u plotových dílců).
 */
export function ZabStepMotiv({
  onNext,
  lang = "cs",
}: {
  /** Výplň je jediná volba kroku — po kliknutí jdeme rovnou na kontakt. */
  onNext?: () => void
  lang?: Lang
}) {
  const { watch, setValue } = useFormContext<ZabradliConfType>()
  const zabradliMaterial = watch("zabradliMaterial")
  const zabradliSklo = watch("zabradliSklo")
  const zabradliMotiv = watch("zabradliMotiv")

  const t = zabradliConfContent[lang] ?? zabradliConfContent.cs
  const motivT = motivLabels[lang] ?? motivLabels.cs
  const skloT = zabradliSkloLabels[lang] ?? zabradliSkloLabels.cs
  const fc = formControlsContent[lang] ?? formControlsContent.cs

  const skloColors = zabradliSkloOptions.map((c) => ({
    code: c.code,
    value: c.color.toLowerCase(),
    color: skloT[c.color] ?? c.color,
  }))
  const motivOptions = motivy.map((m) => ({
    value: m.src,
    label: motivT[m.src] ?? m.motiv,
    image: motivImage(m),
    placeholder: fc.noPreview,
  }))

  if (zabradliMaterial === "sklo") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <StepTitle pre={t.skloTitlePre} accent={t.skloTitleAccent} post={t.skloTitlePost} />
          <p className="mt-1 text-muted-foreground">{t.skloDesc}</p>
        </div>
        <ColorSwatchGroup
          value={zabradliSklo ?? ""}
          onChange={(v) => {
            setValue("zabradliSklo", v)
            onNext?.()
          }}
          colors={skloColors}
        />
      </div>
    )
  }

  if (zabradliMaterial === "hliník") {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <StepTitle pre={t.motivTitlePre} accent={t.motivTitleAccent} post={t.motivTitlePost} />
          <p className="mt-1 text-muted-foreground">{t.motivDesc}</p>
        </div>
        <ImageRadioGrid
          value={zabradliMotiv ?? ""}
          onChange={(v) => {
            setValue("zabradliMotiv", v)
            onNext?.()
          }}
          options={motivOptions}
          lang={lang}
        />
      </div>
    )
  }

  // Bez zvolené výplně nemáme co nabídnout — na krok se dá dostat jen zpět z kontaktu.
  return (
    <div className="flex flex-col gap-6">
      <div>
        <StepTitle pre={t.materialTitlePre} accent={t.materialTitleAccent} post={t.materialTitlePost} />
        <p className="mt-1 text-muted-foreground">{t.materialHint}</p>
      </div>
    </div>
  )
}
