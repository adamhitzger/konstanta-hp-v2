"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ThumbsUp } from "lucide-react"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import type { ConfPhotoItem, ConfPhotosWithMotiv, ConfProductInfo, ProductInfo } from "@/types"
import { pergolaTypeOptions, stineniOptions, stranyOptions, strechaMaterialOptions } from "@/lib/perg-content"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PhotoLightbox, PhotoThumbs } from "./photo-lightbox"
import { ProductInfoLink } from "./product-info-dialog"
import { CheckboxCard } from "./form-controls"
import { pergolaTypeLabels, stineniLabels, stranyLabels, strechaMaterialLabels, pergStepTypContent, photoGalleryContent, productSelectContent, type Lang } from "@/lib/translations"
import { StepTitle } from "./step-title"
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
  const st = productSelectContent[lang] ?? productSelectContent.cs

  return (
    <div
      onClick={onSelect}
      className={cn(
        // Shodné s `ProductSection`: karta zůstává bílá, výběr nese jen oranžový rámeček.
        "flex cursor-pointer flex-col rounded-2xl border-2 bg-card p-5 text-left transition-colors",
        active ? "border-brand" : "border-border",
      )}
    >
      {/* Stejná skladba jako produktová karta v `product-section.tsx`: model a fotky
          nahoře roztažené přes `flex-1`, dole název a tlačítko výběru — dlaždice v řadě
          tak končí ve stejné rovině i s různým počtem fotek realizací. */}
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-4">
        <Image
          src={image}
          alt={label}
          width={400}
          height={400}
          /* Viz `product-section.tsx` — bílé pozadí modelu schová `mix-blend-multiply`. */
          className="h-28 w-full object-contain mix-blend-multiply sm:h-32 lg:h-36"
        />

        <PhotoThumbs photos={photos} title={label} label={gt.viewPhotosOf} onOpen={() => setLightboxOpen(true)} lang={lang} />
      </div>

      <div className="mt-4 flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-1">
          <span className="text-center font-heading text-lg font-bold sm:text-xl">{label}</span>
          <ProductInfoLink info={info} fallbackTitle={label} lang={lang} />
        </div>

        {/* Výběr typu je výlučný (radio), ale vizuálně je to totéž tlačítko jako u
            produktových karet oplocení/zábradlí: černé dokud zvoleno není, po výběru
            brand oranžové s bílým zaškrtávátkem. Samotné `RadioGroupItem` je `sr-only` —
            drží stav skupiny a přístupnost, kreslí se ručně, aby na černé ploše nebyl
            oranžový puntík z výchozího vzhledu. */}
        <span
          className={cn(
            "flex w-full max-w-sm items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold text-brand-foreground transition-colors",
            active ? "bg-brand" : "bg-black",
          )}
        >
          <span
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
              active ? "border-brand-foreground bg-brand-foreground text-brand" : "border-brand-foreground/60 bg-brand-foreground",
            )}
          >
            {active ? <Check className="size-3.5 text-brand" /> : null}
          </span>
          <RadioGroupItem value={value} className="sr-only" onClick={(e) => e.stopPropagation()} tabIndex={-1} />
          {active ? <ThumbsUp className="size-4 shrink-0 text-white" /> : null}
          {active ? st.selected : st.select}
        </span>
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
  const stranyT = stranyLabels[lang] ?? stranyLabels.cs

  const isPristresek = pergola === "pristresek"
  const isZimniZahrada = pergola === "zimni_zahrada"

  return (
    <div className="flex flex-col gap-8">
      <div>
        <StepTitle pre={t.title1Pre} accent={t.title1Accent} post={t.title1Post} />
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
      ) : (
        <>
          <div>
            <StepTitle pre={t.shadeTitlePre} accent={t.shadeTitleAccent} post={t.shadeTitlePost} className="text-xl sm:text-xl" />
            <p className="mt-1 mb-3 text-muted-foreground">{t.shadeDesc}</p>
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
        </>
      )}
    </div>
  )
}
