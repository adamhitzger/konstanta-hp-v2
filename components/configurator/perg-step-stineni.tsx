"use client"

import Image from "next/image"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import { stineniOptions, stranyOptions, strechaMaterialOptions } from "@/lib/perg-content"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckboxCard } from "./form-controls"
import { pergStepStineniContent, stineniLabels, stranyLabels, strechaMaterialLabels, type Lang } from "@/lib/translations"
import { StepTitle } from "./step-title"
import { cn } from "@/lib/utils"

/**
 * Samostatný krok výběru stínění (dřív byl součástí prvního kroku s typem pergoly).
 *
 * U přístřešku se stínění neřeší — místo něj se vybírá materiál střechy, proto
 * má krok dvě podoby a v postranním přehledu i jiný název („Střešní krytina",
 * viz `pergContent.<lang>.stepRoof` v `pergola-configurator.tsx`).
 */
export function PergStepStineni({ lang = "cs" }: { lang?: Lang }) {
  const { watch, setValue, register } = useFormContext<PergolaConfType>()
  const pergola = watch("pergola")
  const stineni = watch("stineni")
  const material = watch("material")
  const t = pergStepStineniContent[lang] ?? pergStepStineniContent.cs
  const stineniT = stineniLabels[lang] ?? stineniLabels.cs
  const materialT = strechaMaterialLabels[lang] ?? strechaMaterialLabels.cs
  const stranyT = stranyLabels[lang] ?? stranyLabels.cs

  const isPristresek = pergola === "pristresek"
  const isZimniZahrada = pergola === "zimni_zahrada"

  if (isPristresek) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <StepTitle pre={t.roofTitlePre} accent={t.roofTitleAccent} post={t.roofTitlePost} />
          <p className="mt-1 text-muted-foreground">{t.roofDesc}</p>
        </div>

        <RadioGroup value={material ?? ""} onValueChange={(v) => setValue("material", v as string)} className="grid grid-cols-2 gap-4 sm:max-w-md">
          {strechaMaterialOptions.map((opt) => (
            <label
              key={opt.value}
              className={cn("flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 bg-card p-4 text-center transition-colors hover:border-brand/40", material === opt.value ? "border-brand" : "border-border")}
            >
              <Image src={opt.image} alt={materialT[opt.value] ?? opt.label} width={160} height={160} className="aspect-square w-full max-w-[140px] rounded-xl bg-background object-contain p-3" />
              <span className="flex items-center gap-1.5 text-sm font-semibold">
                <RadioGroupItem value={opt.value} />
                {materialT[opt.value] ?? opt.label}
              </span>
            </label>
          ))}
        </RadioGroup>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <StepTitle pre={t.shadeTitlePre} accent={t.shadeTitleAccent} post={t.shadeTitlePost} />
        <p className="mt-1 text-muted-foreground">{t.shadeDesc}</p>
      </div>

      <div>
        <RadioGroup value={stineni ?? ""} onValueChange={(v) => setValue("stineni", v as string)} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {stineniOptions
            .filter((o) => !o.onlyNonZimniZahrada || !isZimniZahrada)
            .map((opt) => (
              <label
                key={opt.value}
                className={cn("flex cursor-pointer flex-col items-center gap-2 rounded-2xl border-2 bg-card p-4 text-center transition-colors hover:border-brand/40", stineni === opt.value ? "border-brand" : "border-border")}
              >
                {opt.image ? (
                  <Image src={opt.image} alt={stineniT[opt.value] ?? opt.label} width={220} height={220} className="aspect-square w-full max-w-[220px] rounded-xl bg-background object-contain p-3" />
                ) : (
                  <span className="flex aspect-square w-full max-w-[220px] items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                    {t.noShade}
                  </span>
                )}
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <RadioGroupItem value={opt.value} />
                  {stineniT[opt.value] ?? opt.label}
                </span>
              </label>
            ))}
        </RadioGroup>
      </div>

      <div>
        <h2 className="font-heading text-xl font-bold">{t.sidesTitle}</h2>
        <p className="mt-1 mb-3 text-muted-foreground">{t.sidesDesc}</p>
        {/* Karty, ne drobné inline zaškrtávátko — strany stínění jsou plnohodnotná
            volba kroku a mají vypadat jako ostatní výběry v konfigurátoru. */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stranyOptions.map((s) => (
            <CheckboxCard key={s.name} id={`perg-strana-${s.name}`} label={stranyT[s.name] ?? s.label} {...register(s.name)} />
          ))}
        </div>
      </div>
    </div>
  )
}
