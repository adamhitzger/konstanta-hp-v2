"use client"

import { useState } from "react"
import Image from "next/image"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import type { ConfPhotoItem, ConfPhotosWithMotiv, ConfProductInfo, ProductInfo } from "@/types"
import { pergolaTypeOptions, stineniOptions, stranyOptions, strechaMaterialOptions } from "@/lib/perg-content"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PhotoLightbox, PhotoThumbs } from "./photo-lightbox"
import { ProductInfoLink } from "./product-info-dialog"
import { InlineCheckbox } from "./form-controls"
import { pergolaTypeLabels, stineniLabels, strechaMaterialLabels, pergStepTypContent, photoGalleryContent, type Lang } from "@/lib/translations"
import { cn } from "@/lib/utils"

/**
 * Dlaždice typu pergoly — model + reálné fotky realizací (stejný vzor jako karty
 * bran/branek v `ProductSection`, jen bez počitadla kusů).
 *
 * Nejde o `<label>` obalující radio i tlačítka galerie — prohlížeč by tichým
 * "label pro první labelovatelný prvek" pravidlem asocioval label s prvním
 * tlačítkem, takže by klik na text vždy otevřel galerii místo výběru dlaždice.
 * Výběr proto řeší explicitní `onClick` na celé dlaždici a `stopPropagation`
 * na tlačítkách galerie.
 */
function PergolaTypeTile({
  value,
  label,
  image,
  active,
  galleryPhotos,
  info,
  onSelect,
  lang = "cs",
}: {
  value: string
  label: string
  image: string
  active: boolean
  galleryPhotos?: ConfPhotoItem[]
  info?: ProductInfo
  onSelect: () => void
  lang?: Lang
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const photos = galleryPhotos?.filter((p) => p.url) ?? []
  const gt = photoGalleryContent[lang] ?? photoGalleryContent.cs

  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer flex-col gap-6 rounded-2xl border p-5 text-left transition-colors",
        active ? "border-brand/60 bg-brand/8" : "border-border bg-card",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        <Image
          src={image}
          alt={label}
          width={400}
          height={400}
          /* Viz `product-section.tsx` — bílé pozadí modelu schová `mix-blend-multiply`. */
          className="h-28 w-full object-contain mix-blend-multiply sm:h-32 lg:h-36"
        />

        <PhotoThumbs photos={photos} title={label} label={gt.viewPhotosOf} onOpen={() => setLightboxOpen(true)} />

        <div className="flex flex-col items-center gap-1">
          <span className="flex items-center gap-1.5 text-center font-heading text-lg font-bold sm:text-xl">
            <RadioGroupItem value={value} onClick={(e) => e.stopPropagation()} tabIndex={-1} />
            {label}
          </span>
          <ProductInfoLink info={info} fallbackTitle={label} lang={lang} />
        </div>
      </div>

      {photos.length > 0 ? (
        <PhotoLightbox photos={photos} title={label} open={lightboxOpen} onOpenChange={setLightboxOpen} lang={lang} />
      ) : null}
    </div>
  )
}

export function PergStepTyp({
  photos,
  info = {},
  lang = "cs",
}: {
  photos: ConfPhotosWithMotiv
  info?: ConfProductInfo
  lang?: Lang
}) {
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

      <RadioGroup value={pergola ?? ""} onValueChange={(v) => setValue("pergola", v as string)} className="grid grid-cols-1 gap-4 2xl:grid-cols-3">
        {pergolaTypeOptions.map((opt) => (
          <PergolaTypeTile
            key={opt.value}
            value={opt.value}
            label={typeT[opt.value] ?? opt.label}
            image={opt.image}
            active={pergola === opt.value}
            galleryPhotos={photos[opt.photosKey]}
            info={info[opt.photosKey]}
            onSelect={() => setValue("pergola", opt.value)}
            lang={lang}
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
                <Image src={opt.image} alt={materialT[opt.value] ?? opt.label} width={160} height={160} className="aspect-square w-full max-w-[140px] rounded-xl bg-background object-contain p-3" />
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
            <RadioGroup value={stineni ?? ""} onValueChange={(v) => setValue("stineni", v as string)} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {stineniOptions
                .filter((o) => !o.onlyNonZimniZahrada || !isZimniZahrada)
                .map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-foreground/40 ${stineni === opt.value ? "border-foreground" : ""}`}
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
