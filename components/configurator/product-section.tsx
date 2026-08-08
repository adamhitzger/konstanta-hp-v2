"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, Images, Expand } from "lucide-react"
import toast from "react-hot-toast"
import { useFormContext, type Path } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotoItem, ProductInfo } from "@/types"
import { photoGalleryContent, productSelectContent, type Lang } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InlineCheckbox } from "./form-controls"
import { PhotoLightbox } from "./photo-lightbox"
import { ProductInfoLink } from "./product-info-dialog"

export type ExtraToggle = { name: string; label: string }

const numberFieldOptions = { setValueAs: (v: unknown) => (v === "" ? undefined : Number(v)) }

/**
 * Jedna opakovatelná produktová položka konfigurátoru: brána, branka nebo plotový dílec.
 * Sdílí stejný tvar polí (`enabled` bool + `count` number + pole rozměrů) napříč všemi
 * deseti typy bran i brankou/dílci, takže přidání dalšího produktu = jeden nový záznam
 * v `lib/konf-content.ts`, žádný nový komponent.
 *
 * Výběr se dělá jedním checkboxem (ne +/- počítadlem) — `count` je tím pádem počet
 * *sad rozměrů*: zaškrtnutí = 1, odškrtnutí = 0 a další sady se přidávají odkazem
 * „Přidat další rozměr“ pod formulářem.
 */
export function ProductSection({
  title,
  image,
  imageAlt,
  galleryPhotos,
  info,
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
  /** Lokalizovaný popis + fotky pro popup „Podrobnější informace“ pod názvem. */
  info?: ProductInfo
  enabledField: keyof ConfiguratorType
  countField: keyof ConfiguratorType
  arrayField: keyof ConfiguratorType
  extraToggles?: ExtraToggle[]
  dimensionLabels?: { vyska: string; delka: string; pocet: string }
  onFirstEnable?: () => void
  lang?: Lang
}) {
  const { register, watch, setValue, getValues } = useFormContext<ConfiguratorType>()
  const count = (watch(countField as Path<ConfiguratorType>) as number | undefined) ?? 0
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const gt = photoGalleryContent[lang] ?? photoGalleryContent.cs
  const st = productSelectContent[lang] ?? productSelectContent.cs

  const photos = galleryPhotos?.filter((p) => p.url) ?? []
  const [coverPhoto, ...restPhotos] = photos
  const selected = count > 0

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

  const toggleSelected = () => {
    if (selected) {
      setCount(0)
      return
    }
    setCount(1)
    toast.success(`${title} — ${st.addedToast}`)
  }

  /** Odebírá se vždy poslední sada rozměrů, aby se nemusely přeindexovat registrovaná pole. */
  const removeLastSize = () => {
    const current = getValues(arrayField as Path<ConfiguratorType>) as unknown[] | undefined
    if (Array.isArray(current)) {
      setValue(arrayField as Path<ConfiguratorType>, current.slice(0, count - 1) as never)
    }
    setCount(count - 1)
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-5 rounded-2xl border p-5 transition-colors",
        selected ? "border-brand/60 bg-brand/8" : "border-border bg-card",
      )}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Model vlevo (roztáhne se do zbylého místa), reálná fotka realizace vpravo jako čtvercový náhled. */}
        <div className="flex w-full items-center justify-center gap-4">
          {image ? (
            <Image
              src={image}
              alt={imageAlt ?? title}
              width={400}
              height={400}
              /* Modely mají bílé pozadí — `mix-blend-multiply` ho schová i na oranžově
                 podbarvené (vybrané) kartě, bez nutnosti ořezávat zdrojové obrázky. */
              className="h-28 min-w-0 flex-1 object-contain mix-blend-multiply sm:h-32 lg:h-36"
            />
          ) : null}

          {coverPhoto ? (
            <div className="flex w-[38%] max-w-36 min-w-20 shrink-0 flex-col gap-1.5">
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="group relative aspect-square w-full overflow-hidden rounded-xl bg-background"
                aria-label={`${gt.viewPhotosOf}: ${title}`}
              >
                <Image src={coverPhoto.url} alt={`${title} — realizace`} fill sizes="15vw" className="object-cover" unoptimized />
                <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/40">
                  <Expand className="size-5 text-background opacity-0 transition-opacity group-hover:opacity-100" />
                </span>
              </button>

              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                className="flex items-center gap-1 text-left text-[11px] leading-tight font-medium text-brand hover:underline"
              >
                <Images className="size-3 shrink-0" />
                {restPhotos.length > 0
                  ? `+${restPhotos.length} ${gt.morePhotos}`
                  : `${photos.length} ${photos.length === 1 ? gt.photoSingular : gt.photoPlural}`}
              </button>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="text-center font-heading text-lg font-bold sm:text-xl">{title}</span>
          <ProductInfoLink info={info} fallbackTitle={title} lang={lang} />
        </div>

        {/* Výběr produktu — jeden checkbox, žádné +/- počítadlo. */}
        <label
          className={cn(
            // `max-w-sm`: u samostatné karty (branka, dílce) přes celou šířku formuláře
            // by z checkboxu jinak byl nepřiměřeně široký pruh.
            "flex w-full max-w-sm cursor-pointer items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
            selected
              ? "border-brand bg-brand/15 text-brand"
              : "border-border bg-background text-foreground hover:border-foreground/40",
          )}
        >
          <span
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
              selected ? "border-brand bg-brand text-brand-foreground" : "border-input bg-card",
            )}
          >
            {selected ? <Check className="size-3.5" /> : null}
          </span>
          <input type="checkbox" className="sr-only" checked={selected} onChange={toggleSelected} />
          {selected ? st.selected : st.select}
        </label>
      </div>

      {selected ? (
        <div className="flex flex-col gap-4 border-t border-brand/25 pt-4">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2">
              {count > 1 ? (
                <span className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                  {st.sizeLabel} {i + 1}
                </span>
              ) : null}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
            </div>
          ))}

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={() => setCount(count + 1)}
              className="text-xs font-semibold text-brand hover:underline"
            >
              + {st.addSize}
            </button>
            {count > 1 ? (
              <button
                type="button"
                onClick={removeLastSize}
                className="text-xs font-medium text-muted-foreground hover:text-foreground"
              >
                {st.removeLast}
              </button>
            ) : null}
          </div>
        </div>
      ) : null}

      {photos.length > 0 ? (
        <PhotoLightbox photos={photos} title={imageAlt ?? title} open={lightboxOpen} onOpenChange={setLightboxOpen} lang={lang} />
      ) : null}
    </div>
  )
}
