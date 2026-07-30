"use client"

import { useState, type MouseEvent } from "react"
import Image from "next/image"
import { Expand, Images } from "lucide-react"
import { useFormContext } from "react-hook-form"
import type { PergolaConfType } from "@/lib/schemas"
import type { ConfPhotoItem, ConfPhotosWithMotiv } from "@/types"
import { pergolaTypeOptions, stineniOptions, stranyOptions, strechaMaterialOptions } from "@/lib/perg-content"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { PhotoLightbox } from "./photo-lightbox"
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
  onSelect,
  lang = "cs",
}: {
  value: string
  label: string
  image: string
  active: boolean
  galleryPhotos?: ConfPhotoItem[]
  onSelect: () => void
  lang?: Lang
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const photos = galleryPhotos?.filter((p) => p.url) ?? []
  const [coverPhoto, ...restPhotos] = photos
  const gt = photoGalleryContent[lang] ?? photoGalleryContent.cs

  const openGallery = (e: MouseEvent) => {
    e.stopPropagation()
    setLightboxOpen(true)
  }

  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex cursor-pointer flex-col gap-6 rounded-2xl border p-5 text-left transition-colors",
        active ? "border-brand/30 bg-brand/3" : "border-border bg-card",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Model + reálná fotka realizace vedle sebe, jako dvojice na středu dlaždice. */}
        <div className="flex items-center justify-center gap-4">
          <Image src={image} alt={label} width={400} height={400} className="rounded-3xl object-contain p-3" />

          {coverPhoto ? (
            <div className="hidden w-30 shrink-0 flex-col gap-2 sm:w-28 lg:flex lg:w-32">
              <button
                type="button"
                onClick={openGallery}
                className="group relative aspect-square w-full overflow-hidden rounded-xl bg-background"
                aria-label={`${gt.viewPhotosOf}: ${label}`}
              >
                <Image src={coverPhoto.url} alt={`${label} — realizace`} fill sizes="10vw" className="rounded-xl object-cover" unoptimized />
                <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-foreground/0 transition-colors group-hover:bg-foreground/40">
                  <Expand className="size-5 text-background opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>

              {/* PC: počet dalších fotek pod reálnou fotkou. */}
              {restPhotos.length > 0 ? (
                <button
                  type="button"
                  onClick={openGallery}
                  className="hidden w-fit items-center gap-1.5 text-xs font-medium text-brand hover:underline lg:flex"
                >
                  <Images className="size-3.5" />+{restPhotos.length} {gt.morePhotos}
                </button>
              ) : null}
            </div>
          ) : null}
        </div>

        <span className="flex items-center gap-1.5 text-center font-heading text-lg font-bold sm:text-xl">
          <RadioGroupItem value={value} onClick={(e) => e.stopPropagation()} tabIndex={-1} />
          {label}
        </span>

        {/* Mobil/tablet: textový odkaz na galerii pod názvem. */}
        {photos.length > 0 ? (
          <button
            type="button"
            onClick={openGallery}
            className="flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-brand lg:hidden"
          >
            <Images className="size-3.5" />
            {gt.openGallery} ({photos.length} {photos.length === 1 ? gt.photoSingular : gt.photoPlural})
          </button>
        ) : null}
      </div>

      {photos.length > 0 ? (
        <PhotoLightbox photos={photos} title={label} open={lightboxOpen} onOpenChange={setLightboxOpen} lang={lang} />
      ) : null}
    </div>
  )
}

export function PergStepTyp({ photos, lang = "cs" }: { photos: ConfPhotosWithMotiv; lang?: Lang }) {
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
