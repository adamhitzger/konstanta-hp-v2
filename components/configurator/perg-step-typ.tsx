"use client"

import { useEffect, useState, type ReactNode } from "react"
import Image from "next/image"
import { Check, MoveRight, ThumbsUp } from "lucide-react"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import type { ConfPhotoItem, ConfPhotosWithMotiv, ConfProductInfo, ProductInfo } from "@/types"
import { pergolaTypeOptions } from "@/lib/perg-content"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CheckboxCard } from "./form-controls"
import { PhotoLightbox, PhotoThumbs } from "./photo-lightbox"
import { ProductInfoLink } from "./product-info-dialog"
import { pergolaTypeLabels, pergStepTypContent, photoGalleryContent, productSelectContent, type Lang } from "@/lib/translations"
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
  extras,
  lang = "cs",
}: {
  value: string
  label: string
  image: string
  active: boolean
  galleryPhotos?: ConfPhotoItem[]
  info?: ProductInfo
  onSelect: () => void
  /** Doplňky, které se po výběru rozbalí ve spodní oranžové části karty (u bioklimatické LED světla). */
  extras?: ReactNode
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
        // Padding drží vnitřní obal, ne karta — spodní blok doplňků tak jde přes celou šířku.
        "flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-card text-left transition-colors",
        active ? "border-brand" : "border-border",
      )}
    >
      <div className="flex flex-1 flex-col p-5">
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

      {/* Oranžově podbarvená patka zvolené karty — stejná jako rozměry u karet upevnění.
          `stopPropagation`, aby klik na zaškrtávátko nebo tlačítko nespustil `onSelect` karty. */}
      {active && extras ? (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex cursor-default flex-col gap-4 border-t border-brand/25 bg-brand/25 p-5"
        >
          {extras}
        </div>
      ) : null}
    </div>
  )
}

export function PergStepTyp({
  photos,
  info = {},
  onNext,
  lang = "cs",
}: {
  photos: ConfPhotosWithMotiv
  info?: ConfProductInfo
  /** Zkratka na další krok přímo z rozbalené karty — viz `product-section.tsx`. */
  onNext?: () => void
  lang?: Lang
}) {
  const { watch, setValue, register } = useFormContext<PergolaConfType>()
  const pergola = watch("pergola")
  const t = pergStepTypContent[lang] ?? pergStepTypContent.cs
  const typeT = pergolaTypeLabels[lang] ?? pergolaTypeLabels.cs
  const st = productSelectContent[lang] ?? productSelectContent.cs

  // LED se montuje do lamel, takže dává smysl jen u bioklimatické pergoly — u ostatních
  // typů se sekce neukazuje a případná dřívější volba se ruší, ať se nepošle v poptávce.
  const isBioklimaticka = pergola === "bioklimaticka"
  useEffect(() => {
    if (!isBioklimaticka) setValue("ledSvetla", false)
  }, [isBioklimaticka, setValue])

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
            extras={
              opt.value === "bioklimaticka" ? (
                <>
                  <div>
                    <h3 className="font-heading text-lg font-bold">{t.ledTitle}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{t.ledDesc}</p>
                  </div>
                  <CheckboxCard
                    id="perg-led"
                    className="border-brand/20 bg-white"
                    label={t.ledLabel}
                    desc={t.ledHint}
                    {...register("ledSvetla")}
                  />
                  {onNext ? (
                    <Button type="button" size="lg" className="self-end" onClick={onNext}>
                      {st.continueStep}
                      <MoveRight />
                    </Button>
                  ) : null}
                </>
              ) : undefined
            }
            lang={lang}
          />
        ))}
      </RadioGroup>
    </div>
  )
}
