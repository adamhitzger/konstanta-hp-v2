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
import { StepTitle } from "./step-title"
import { cn } from "@/lib/utils"

/**
 * Karta způsobu upevnění pergoly. Vizuálně i strukturou kopíruje `ProductSection`
 * z konfigurátoru oplocení (bílá karta s oranžovým rámečkem při výběru, oranžově
 * podbarvená spodní část s rozměry).
 *
 * Upevnění je výlučné — jedna pergola stojí buď samostatně, nebo u stěny, nebo
 * v rohu. Karty jsou proto zaškrtávátka jen vizuálně; výběr jedné odznačí ostatní.
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

  /**
   * Přepnutí výběru. Rozměry odznačeného upevnění se musí zahodit — `shouldUnregister`
   * je `false`, takže by v hodnotách formuláře zůstaly i po odškrtnutí a při novém
   * zaškrtnutí by se vynořila stará čísla. Do e-mailu se sice nedostanou (`PergMail`
   * si hlídá i příznak), ale jedou v příloze `data.json` a mate obsluhu.
   */
  const select = (next: boolean) => {
    for (const opt of mountOptions) {
      const isThis = opt.field === field
      setValue(opt.field, isThis ? next : false)
      if (!isThis || !next) setValue(opt.rozmeryField, undefined)
    }
  }

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
              checked ? "border-brand bg-brand" : "bg-black",
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
                checked ? "border-brand-foreground bg-brand-foreground text-brand" : "border-brand-foreground/60 bg-brand-foreground",
              )}
            >
              {checked ? <Check className="size-3.5 text-brand" /> : null}
            </span>
            <input
              type="checkbox"
              className="sr-only"
              checked={checked}
              onChange={(e) => select(e.target.checked)}
            />
            {checked ? <ThumbsUp className="size-4 shrink-0 text-white" /> : null}
            {checked ? st.selected : st.select}
          </label>
        </div>
      </div>

      {checked ? (
        <div className="flex flex-col gap-4 border-t border-brand/25 bg-brand/25 p-5">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <Label>{dimensionLabels.sirka}</Label>
              <Input type="number" min={0} className="border-brand/20 bg-white text-foreground" {...register(`${rozmeryField}.sirka`, { valueAsNumber: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{dimensionLabels.hloubka}</Label>
              <Input type="number" min={0} className="border-brand/20 bg-white text-foreground" {...register(`${rozmeryField}.hloubka`, { valueAsNumber: true })} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>{dimensionLabels.delka}</Label>
              <Input type="number" min={0} className="border-brand/20 bg-white text-foreground" {...register(`${rozmeryField}.delka`, { valueAsNumber: true })} />
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
        <StepTitle pre={t.titlePre} accent={t.titleAccent} post={t.titlePost} />
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
