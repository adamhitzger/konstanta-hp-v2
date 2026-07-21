"use client"

import Image from "next/image"
import { Expand } from "lucide-react"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import type { ConfPhotos } from "@/types"
import { pergolaTypeOptions, stineniOptions, stranyOptions, strechaMaterialOptions } from "@/lib/perg-content"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InlineCheckbox } from "./form-controls"
import { pergolaTypeLabels, stineniLabels, strechaMaterialLabels, pergStepTypContent, type Lang } from "@/lib/translations"

/**
 * Dlaždice typu pergoly s náhledem, který lze rozkliknout na galerii reálných realizací.
 *
 * Nejde o `<label>` obalující radio i dialogové tlačítko — prohlížeč by tichým
 * "label pro první labelovatelný prvek" pravidlem asocioval label s tlačítkem
 * dialogu (je v DOM první), takže by klik na text vždy otevřel galerii místo
 * výběru dlaždice. Výběr proto řeší explicitní `onClick` na celé dlaždici.
 */
function PergolaTypeTile({
  value,
  label,
  image,
  active,
  galleryPhotos,
  onSelect,
}: {
  value: string
  label: string
  image: string
  active: boolean
  galleryPhotos?: string[]
  onSelect: () => void
}) {
  const photos = galleryPhotos?.filter(Boolean).slice(0, 4) ?? []

  return (
    <div
      onClick={onSelect}
      className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-foreground/40 ${active ? "border-foreground" : ""}`}
    >
      <div className="group relative aspect-square w-full max-w-[180px] overflow-hidden rounded-xl border border-border bg-background">
        <Image src={image} alt={label} width={180} height={180} className="size-full object-contain p-3" />
        <Dialog>
          <DialogTrigger
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors hover:bg-foreground/40"
            aria-label={`Zobrazit fotografie: ${label}`}
          >
            <Expand className="size-5 text-background opacity-0 transition-opacity group-hover:opacity-100" />
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{label}</DialogTitle>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <div className="aspect-square overflow-hidden rounded-xl border border-border bg-background">
                  <Image src={image} alt={`${label} — 3D model`} width={400} height={400} className="size-full object-contain p-3" />
                </div>
                <span className="text-center text-xs text-muted-foreground">3D model</span>
              </div>
              {photos.map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-background">
                  <Image src={src} alt={`${label} — realizace ${i + 1}`} width={400} height={400} className="size-full object-cover" unoptimized />
                </div>
              ))}
            </div>
            {photos.length === 0 ? <p className="text-sm text-muted-foreground">Fotky z realizací pro tento typ zatím doplňujeme.</p> : null}
          </DialogContent>
        </Dialog>
      </div>
      <span className="flex items-center gap-1.5 text-sm font-semibold">
        <RadioGroupItem value={value} onClick={(e) => e.stopPropagation()} tabIndex={-1} />
        {label}
      </span>
    </div>
  )
}

export function PergStepTyp({ photos, lang = "cs" }: { photos: ConfPhotos; lang?: Lang }) {
  const { watch, setValue, register } = useFormContext<PergolaConfType>()
  const pergola = watch("pergola")
  const stineni = watch("stineni")
  const material = watch("material")
  const t = pergStepTypContent[lang] ?? pergStepTypContent.cs
  const typeT = pergolaTypeLabels[lang] ?? pergolaTypeLabels.cs
  const stineniT = stineniLabels[lang] ?? stineniLabels.cs
  const materialT = strechaMaterialLabels[lang] ?? strechaMaterialLabels.cs

  const isPristresek = pergola === "pristresek"
  const isZimniZahrada = pergola === "zimni_zahrada"

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t.title1}</h2>
        <p className="mt-1 text-muted-foreground">{t.desc1}</p>
      </div>

      <RadioGroup value={pergola ?? ""} onValueChange={(v) => setValue("pergola", v as string)} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {pergolaTypeOptions.map((opt) => (
          <PergolaTypeTile
            key={opt.value}
            value={opt.value}
            label={typeT[opt.value] ?? opt.label}
            image={opt.image}
            active={pergola === opt.value}
            galleryPhotos={photos[opt.photosKey]}
            onSelect={() => setValue("pergola", opt.value)}
          />
        ))}
      </RadioGroup>

      {isPristresek ? (
        <div>
          <h2 className="font-heading text-xl font-bold">{t.roofTitle}</h2>
          <p className="mt-1 mb-3 text-muted-foreground">{t.roofDesc}</p>
          <RadioGroup value={material ?? ""} onValueChange={(v) => setValue("material", v as string)} className="grid grid-cols-2 gap-4 sm:max-w-md">
            {strechaMaterialOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-foreground/40 ${material === opt.value ? "border-foreground" : ""}`}
              >
                <Image src={opt.image} alt={materialT[opt.value] ?? opt.label} width={160} height={160} className="aspect-square w-full max-w-[140px] rounded-xl border border-border bg-background object-contain p-3" />
                <span className="flex items-center gap-1.5 text-sm font-semibold">
                  <RadioGroupItem value={opt.value} />
                  {materialT[opt.value] ?? opt.label}
                </span>
              </label>
            ))}
          </RadioGroup>
        </div>
      ) : (
        <>
          <div>
            <h2 className="font-heading text-xl font-bold">{t.shadeTitle}</h2>
            <p className="mt-1 mb-3 text-muted-foreground">{t.shadeDesc}</p>
            <RadioGroup value={stineni ?? ""} onValueChange={(v) => setValue("stineni", v as string)} className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {stineniOptions
                .filter((o) => !o.onlyNonZimniZahrada || !isZimniZahrada)
                .map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-foreground/40 ${stineni === opt.value ? "border-foreground" : ""}`}
                  >
                    {opt.image ? (
                      <Image src={opt.image} alt={stineniT[opt.value] ?? opt.label} width={160} height={160} className="aspect-square w-full max-w-[140px] rounded-xl border border-border bg-background object-contain p-3" />
                    ) : (
                      <span className="flex aspect-square w-full max-w-[140px] items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
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
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {stranyOptions.map((s) => (
                <InlineCheckbox key={s.name} label={s.label} {...register(s.name)} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
