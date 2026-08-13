"use client"

import Image from "next/image"
import { Check, MoveRight, ThumbsUp } from "lucide-react"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import { mountOptions } from "@/lib/perg-content"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mountLabels, mountDimensionLabelsContent, pergStepUpevneniContent, productSelectContent, type Lang } from "@/lib/translations"
import { cn } from "@/lib/utils"

/**
 * Karta způsobu upevnění pergoly. Vizuálně i strukturou kopíruje `ProductSection`
 * z konfigurátoru oplocení (bílá karta s oranžovým rámečkem při výběru, oranžově
 * podbarvená spodní část s rozměry), jen místo počtu sad rozměrů drží jedno
 * zaškrtnutí — způsobů upevnění se dá zvolit víc, ale každý jen jednou.
 */
function MountOption({
  field,
  rozmeryField,
  label,
  image,
  dimensionLabels,
  onNext,
  lang,
}: (typeof mountOptions)[number] & {
  dimensionLabels: { sirka: string; hloubka: string; delka: string }
  onNext?: () => void
  lang: Lang
}) {
  const { register, watch, setValue } = useFormContext<PergolaConfType>()
  const checked = Boolean(watch(field))
  const st = productSelectContent[lang] ?? productSelectContent.cs

  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border-2 bg-card transition-colors",
        checked ? "border-brand" : "border-border",
      )}
    >
      {/* Na širokém řádku (karty jsou pod sebou přes celou šířku formuláře) je model
          vlevo a název s výběrem vpravo; na mobilu se to složí pod sebe jako u karet bran. */}
      <div className="flex flex-col items-center gap-4 p-5 sm:flex-row sm:gap-6">
        <Image
          src={image}
          alt={label}
          width={400}
          height={400}
          className="size-32 shrink-0 rounded-xl bg-background object-contain p-1.5 sm:size-40 lg:size-48"
        />

        <div className="flex w-full flex-1 flex-col items-center gap-3 sm:items-start">
          <span className="text-center font-heading text-lg font-bold text-balance sm:text-left sm:text-xl">{label}</span>

          {/* Stejné tlačítko výběru jako na produktové kartě oplocení: černé dokud
              zvoleno není, oranžové po zaškrtnutí. */}
          <label
            className={cn(
              "flex w-full max-w-sm cursor-pointer items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold text-brand-foreground transition-colors",
              checked ? "border-brand bg-brand hover:bg-brand/90" : "bg-black",
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
                checked ? "border-brand-foreground bg-brand-foreground text-brand" : "border-brand-foreground/60 bg-brand-foreground/15",
              )}
            >
              {checked ? <Check className="size-3.5" /> : null}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={(e) => setValue(field, e.target.checked)}
            />
            {checked ? <ThumbsUp className="size-4 shrink-0 text-white" /> : null}
            {checked ? st.selected : st.select}
          </label>
        </div>
      </div>

      {checked ? (
        <div className="flex flex-col gap-4 border-t border-brand/25 bg-brand/10 p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label>{dimensionLabels.sirka}</Label>
              <Input type="number" min={0} className="border-brand/20 bg-background text-foreground" {...register(`${rozmeryField}.sirka`, { valueAsNumber: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{dimensionLabels.hloubka}</Label>
              <Input type="number" min={0} className="border-brand/20 bg-background text-foreground" {...register(`${rozmeryField}.hloubka`, { valueAsNumber: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{dimensionLabels.delka}</Label>
              <Input type="number" min={0} className="border-brand/20 bg-background text-foreground" {...register(`${rozmeryField}.delka`, { valueAsNumber: true })} />
            </div>
          </div>

          {/* Zkratka na další krok přímo z karty — viz `product-section.tsx`. */}
          {onNext ? (
            <Button type="button" size="lg" className="self-end" onClick={onNext}>
              {st.continueStep}
              <MoveRight />
            </Button>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

export function PergStepUpevneni({ onNext, lang = "cs" }: { onNext?: () => void; lang?: Lang }) {
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
          <MountOption
            key={opt.field}
            {...opt}
            label={mountT[opt.field] ?? opt.label}
            dimensionLabels={dimensionLabels}
            onNext={onNext}
            lang={lang}
          />
        ))}
      </div>
    </div>
  )
}
