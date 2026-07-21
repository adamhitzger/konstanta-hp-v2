"use client"

import { useFormContext } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import { barvyTvarniceStandard, barvyTvarniceStipany, povrchTvarniceOptions, sloupkyOptions } from "@/lib/konf-content"
import { ColorSwatchGroup, ImageRadioGrid } from "./form-controls"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { sloupkyLabels, povrchLabels, colorLabels, stepSloupkyContent, type Lang } from "@/lib/translations"

export function StepSloupky({ lang = "cs" }: { lang?: Lang }) {
  const { watch, setValue } = useFormContext<ConfiguratorType>()
  const typSloupku = watch("typSloupku")
  const povrch = watch("povrchTvarnice")
  const barva = watch("barvaTvarnice")
  const t = stepSloupkyContent[lang] ?? stepSloupkyContent.cs
  const sloupkyT = sloupkyLabels[lang] ?? sloupkyLabels.cs
  const povrchT = povrchLabels[lang] ?? povrchLabels.cs
  const colorT = colorLabels[lang] ?? colorLabels.cs

  const barvy = povrch === "stipany" ? barvyTvarniceStipany : barvyTvarniceStandard
  const sloupkyOpts = sloupkyOptions.map((o) => ({ ...o, label: sloupkyT[o.value] ?? o.label }))
  const povrchOpts = povrchTvarniceOptions.map((o) => ({ ...o, label: povrchT[o.value] ?? o.label }))
  const barvyTranslated = barvy.map((c) => ({ code: c.code, value: c.color.toLowerCase(), color: colorT[c.color] ?? c.color }))

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title}</h2>
        <p className="mt-1 text-muted-foreground">{t.desc}</p>
      </div>

      <ImageRadioGrid value={typSloupku ?? ""} onChange={(v) => setValue("typSloupku", v)} options={sloupkyOpts} lang={lang} />

      {typSloupku === "betonové" ? (
        <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5">
          <div>
            <Label className="mb-2 font-heading text-lg font-bold">{t.povrchLabel}</Label>
            <RadioGroup
              value={povrch ?? ""}
              onValueChange={(v) => setValue("povrchTvarnice", v as string)}
              className="mt-2 flex flex-wrap gap-4"
            >
              {povrchOpts.map((o) => (
                <label key={o.value} className="flex cursor-pointer items-center gap-2 text-sm font-medium">
                  <RadioGroupItem value={o.value} />
                  {o.label}
                </label>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="font-heading text-lg font-bold">{t.barvaLabel}</Label>
            <div className="mt-3">
              <ColorSwatchGroup value={barva ?? ""} onChange={(v) => setValue("barvaTvarnice", v)} colors={barvyTranslated} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
