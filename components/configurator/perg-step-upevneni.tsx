"use client"

import Image from "next/image"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import { mountOptions } from "@/lib/perg-content"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InlineCheckbox } from "./form-controls"
import { mountLabels, mountDimensionLabelsContent, pergStepUpevneniContent, type Lang } from "@/lib/translations"

function MountOption({
  field,
  rozmeryField,
  label,
  image,
  dimensionLabels,
}: (typeof mountOptions)[number] & { dimensionLabels: { sirka: string; hloubka: string; delka: string } }) {
  const { register, watch, setValue } = useFormContext<PergolaConfType>()
  const checked = Boolean(watch(field))

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center gap-4">
        <Image src={image} alt={label} width={80} height={80} className="size-16 shrink-0 rounded-xl border border-border bg-background object-contain p-1.5 sm:size-20" />
        <div className="flex-1">
          <InlineCheckbox
            label={label}
            className="text-base font-semibold text-foreground"
            checked={checked}
            onChange={(e) => setValue(field, e.target.checked)}
          />
        </div>
      </div>

      {checked ? (
        <div className="grid grid-cols-2 gap-3 border-t border-border pt-4 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <Label>{dimensionLabels.sirka}</Label>
            <Input type="number" min={0} {...register(`${rozmeryField}.sirka`, { valueAsNumber: true })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{dimensionLabels.hloubka}</Label>
            <Input type="number" min={0} {...register(`${rozmeryField}.hloubka`, { valueAsNumber: true })} />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>{dimensionLabels.delka}</Label>
            <Input type="number" min={0} {...register(`${rozmeryField}.delka`, { valueAsNumber: true })} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function PergStepUpevneni({ lang = "cs" }: { lang?: Lang }) {
  const t = pergStepUpevneniContent[lang] ?? pergStepUpevneniContent.cs
  const mountT = mountLabels[lang] ?? mountLabels.cs
  const dimensionLabels = mountDimensionLabelsContent[lang] ?? mountDimensionLabelsContent.cs

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title}</h2>
        <p className="mt-1 text-muted-foreground">{t.desc}</p>
      </div>

      <div className="flex flex-col gap-4">
        {mountOptions.map((opt) => (
          <MountOption key={opt.field} {...opt} label={mountT[opt.field] ?? opt.label} dimensionLabels={dimensionLabels} />
        ))}
      </div>
    </div>
  )
}
