"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Images, Expand } from "lucide-react"
import { useFormContext, type Path } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotoItem } from "@/types"
import { photoGalleryContent, type Lang } from "@/lib/translations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InlineCheckbox } from "./form-controls"
import { PhotoLightbox } from "./photo-lightbox"

export type ExtraToggle = { name: string; label: string }

const numberFieldOptions = { setValueAs: (v: unknown) => (v === "" ? undefined : Number(v)) }

/**
 * Jedna opakovatelná produktová položka konfigurátoru: brána, branka nebo plotový dílec.
 * Sdílí stejný tvar polí (`enabled` bool + `count` number + pole rozměrů) napříč všemi
 * deseti typy bran i brankou/dílci, takže přidání dalšího produktu = jeden nový záznam
 * v `lib/konf-content.ts`, žádný nový komponent.
 */
export function ProductSection({
  title,
  image,
  imageAlt,
  galleryPhotos,
  enabledField,
  countField,
  arrayField,
  extraToggles,
  dimensionLabels = { vyska: "Výška (mm)", delka: "Šířka průjezdu (mm)", pocet: "Počet (ks)" },
  onFirstEnable,
  lang = "cs",
}: {
  title: string
  image: string | null
  imageAlt?: string
  /** Reálné fotky realizací z Sanity — náhled na kartě + velký slide popup s filtrem podle motivu. */
  galleryPhotos?: ConfPhotoItem[]
  enabledField: keyof ConfiguratorType
  countField: keyof ConfiguratorType
  arrayField: keyof ConfiguratorType
  extraToggles?: ExtraToggle[]
  dimensionLabels?: { vyska: string; delka: string; pocet: string }
  onFirstEnable?: () => void
  lang?: Lang
}) {
  const { register, watch, setValue } = useFormContext<ConfiguratorType>()
  const count = (watch(countField as Path<ConfiguratorType>) as number | undefined) ?? 0
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const gt = photoGalleryContent[lang] ?? photoGalleryContent.cs

  const photos = galleryPhotos?.filter((p) => p.url) ?? []
  const [coverPhoto, ...restPhotos] = photos

  const setCount = (next: number) => {
    const clamped = Math.max(0, next)
    const wasZero = count === 0
    setValue(countField as Path<ConfiguratorType>, clamped as never)
    setValue(enabledField as Path<ConfiguratorType>, (clamped > 0) as never)
    if (clamped === 0) {
      setValue(arrayField as Path<ConfiguratorType>, undefined as never)
    }
    if (wasZero && clamped > 0) onFirstEnable?.()
  }

  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-5 transition-colors has-data-[active=true]:border-foreground/30" data-active={count > 0}>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-12">
        {image ? (
          <div className="mx-auto w-full max-w-xs shrink-0 lg:mx-0 lg:w-1/2 lg:max-w-none">
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-background">
              <Image src={image} alt={imageAlt ?? title} width={480} height={480} className="size-full object-contain p-4" />
            </div>
          </div>
        ) : null}

        <div className="flex flex-1 flex-col items-end gap-3">
          <span className="font-heading text-lg font-bold sm:text-xl">{title}</span>

          {photos.length > 0 ? (
            <>
              {/* Dokud se karta neskládá do řádku (foto vedle modelu), foto by viselo pod
                  modelem — místo něj proto necháme jen textový odkaz na galerii až do `lg`. */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="flex w-fit items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-medium text-brand lg:hidden"
              >
                <Images className="size-3.5" />
                {gt.openGallery} ({photos.length} {photos.length === 1 ? gt.photoSingular : gt.photoPlural})
              </button>

              {/* lg+: reálná fotka realizace, zmenšená na polovinu, s hover náznakem rozkliknutí. */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group relative hidden aspect-[4/3] w-1/2 overflow-hidden rounded-xl bg-background lg:block"
                aria-label={`${gt.viewPhotosOf}: ${title}`}
              >
                <Image src={coverPhoto.url} alt={`${title} — realizace`} fill sizes="15vw" className="object-cover" unoptimized />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/40">
                  <Expand className="size-5 text-background opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>

              {restPhotos.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="hidden w-fit items-center gap-1.5 text-xs font-medium text-brand hover:underline lg:flex"
                >
                  <Images className="size-3.5" />+{restPhotos.length} {gt.morePhotos}
                </button>
              ) : null}
            </>
          ) : null}

          <div className="mt-1 flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon-sm"
              onClick={() => setCount(count - 1)}
              disabled={count === 0}
              aria-label={`Ubrat ${title}`}
            >
              <Minus />
            </Button>
            <span className="w-5 text-center font-mono text-sm tabular-nums">{count}</span>
            <Button type="button" size="icon-sm" onClick={() => setCount(count + 1)} aria-label={`Přidat ${title}`}>
              <Plus />
            </Button>
          </div>
        </div>
      </div>

      {count > 0 ? (
        <div className="flex flex-col gap-4 border-t border-border pt-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="flex flex-col gap-1.5">
                <Label>{dimensionLabels.vyska}</Label>
                <Input type="number" min={0} {...register(`${String(arrayField)}.${i}.vyska` as Path<ConfiguratorType>, numberFieldOptions)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>{dimensionLabels.delka}</Label>
                <Input type="number" min={0} {...register(`${String(arrayField)}.${i}.delka` as Path<ConfiguratorType>, numberFieldOptions)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label>{dimensionLabels.pocet}</Label>
                <Input type="number" min={0} {...register(`${String(arrayField)}.${i}.pocet` as Path<ConfiguratorType>, numberFieldOptions)} />
              </div>
              {extraToggles && extraToggles.length > 0 ? (
                <div className="col-span-2 flex flex-wrap gap-x-5 gap-y-2 sm:col-span-3">
                  {extraToggles.map((t) => (
                    <InlineCheckbox
                      key={t.name}
                      label={t.label}
                      {...register(`${String(arrayField)}.${i}.${t.name}` as Path<ConfiguratorType>)}
                    />
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {photos.length > 0 ? (
        <PhotoLightbox photos={photos} title={imageAlt ?? title} open={lightboxOpen} onOpenChange={setLightboxOpen} lang={lang} />
      ) : null}
    </div>
  )
}
