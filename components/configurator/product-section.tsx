"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, ThumbsUp } from "lucide-react"
import toast from "react-hot-toast"
import { useFormContext, type Path } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotoItem, ProductInfo } from "@/types"
import { photoGalleryContent, productSelectContent, type Lang } from "@/lib/translations"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InlineCheckbox } from "./form-controls"
import { PhotoLightbox, PhotoThumbs } from "./photo-lightbox"
import { ProductInfoLink } from "./product-info-dialog"

export type ExtraToggle = { name: string; label: string }

const numberFieldOptions = { setValueAs: (v: unknown) => (v === "" ? undefined : Number(v)) }

/**
 * Jedna opakovatelná produktová položka konfigurátoru: brána, branka nebo plotový dílec.
 * Sdílí stejný tvar polí (`enabled` bool + `count` number + pole rozměrů) napříč všemi
 * typy bran i brankou/dílci, takže přidání dalšího produktu = jeden nový záznam
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
        // Vybraná karta zůstává bílá — výběr signalizuje oranžový rámeček a oranžově
        // podbarvená spodní část s rozměry, ne plná oranžová přes celou kartu.
        "flex flex-col overflow-hidden rounded-2xl border bg-card transition-colors",
        selected ? "border-brand" : "border-border",
      )}
    >
      <div className="flex flex-col items-center gap-4 p-5">
        {image ? (
          <Image
            src={image}
            alt={imageAlt ?? title}
            width={400}
            height={400}
            /* Modely mají bílé (neprůhledné) pozadí — `mix-blend-multiply` ho schová
               bez ořezávání zdrojových obrázků. */
            className="h-28 w-full object-contain mix-blend-multiply sm:h-32 lg:h-36"
          />
        ) : null}

        <PhotoThumbs photos={photos} title={title} label={gt.viewPhotosOf} onOpen={() => setLightboxOpen(true)} />

        <div className="flex flex-col items-center gap-1">
          <span className="text-center font-heading text-lg font-bold sm:text-xl">{title}</span>
          <ProductInfoLink info={info} fallbackTitle={title} lang={lang} />
        </div>

        {/* Výběr produktu — jeden checkbox, žádné +/- počítadlo. */}
        {/* `max-w-sm`: u samostatné karty (branka, dílce) přes celou šířku formuláře
            by z checkboxu jinak byl nepřiměřeně široký pruh.
            Tlačítko je oranžové vždy (i nevybrané) — je to hlavní akce karty;
            vybraný stav se pozná podle bílé výplně checkboxu. */}
        <label className="flex w-full max-w-sm cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-brand bg-brand px-4 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90">
          <span
            className={cn(
              "flex size-5 shrink-0 items-center justify-center rounded-[6px] border transition-colors",
              selected ? "border-brand-foreground bg-brand-foreground text-brand" : "border-brand-foreground/60 bg-brand-foreground/15",
            )}
          >
            {selected ? <Check className="size-3.5" /> : null}
          </span>
          <input type="checkbox" className="sr-only" checked={selected} onChange={toggleSelected} />
          {selected ? <ThumbsUp className="size-4 text-white shrink-0" /> : null}
          {selected ? st.selected : st.select}
        </label>
      </div>

      {selected ? (
        /* Spodní část (rozměry + doplňky) je jediná oranžová plocha karty, a to
           v jemném odstínu — plná brand oranžová by ve formulářových polích rušila. */
        <div className="flex flex-col gap-4 border-t border-brand/25 bg-brand/10 p-5">
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
                  <Input type="number" min={0} className="border-brand/20 bg-background text-foreground" {...register(`${String(arrayField)}.${i}.vyska` as Path<ConfiguratorType>, numberFieldOptions)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>{dimensionLabels.delka}</Label>
                  <Input type="number" min={0} className="border-brand/20 bg-background text-foreground" {...register(`${String(arrayField)}.${i}.delka` as Path<ConfiguratorType>, numberFieldOptions)} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label>{dimensionLabels.pocet}</Label>
                  <Input type="number" min={0} className="border-brand/20 bg-background text-foreground" {...register(`${String(arrayField)}.${i}.pocet` as Path<ConfiguratorType>, numberFieldOptions)} />
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
