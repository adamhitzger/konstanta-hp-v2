"use client"

import Image from "next/image"
import { Expand, Minus, Plus } from "lucide-react"
import { useFormContext, type Path } from "react-hook-form"
import type { ConfiguratorType } from "@/lib/schemas"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { InlineCheckbox } from "./form-controls"

/** Klikací náhled produktu, po kliknutí ukáže model + reálné fotky realizací v dialogu. */
function ProductThumb({
  image,
  title,
  galleryPhotos,
}: {
  image: string
  title: string
  galleryPhotos?: string[]
}) {
  const photos = galleryPhotos?.filter(Boolean).slice(0, 4) ?? []

  return (
    <Dialog>
      <DialogTrigger
        className="group relative size-16 shrink-0 overflow-hidden rounded-xl border border-border bg-background sm:size-20"
        aria-label={`Zobrazit fotografie: ${title}`}
      >
        <Image src={image} alt={title} width={96} height={96} className="size-full object-contain p-1.5" />
        <span className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/40">
          <Expand className="size-4 text-background opacity-0 transition-opacity group-hover:opacity-100" />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <div className="aspect-square overflow-hidden rounded-xl border border-border bg-background">
              <Image src={image} alt={`${title} — 3D model`} width={400} height={400} className="size-full object-contain p-3" />
            </div>
            <span className="text-center text-xs text-muted-foreground">3D model</span>
          </div>
          {photos.map((src, i) => (
            <div key={i} className="aspect-square overflow-hidden rounded-xl border border-border bg-background">
              <Image src={src} alt={`${title} — realizace ${i + 1}`} width={400} height={400} className="size-full object-cover" unoptimized />
            </div>
          ))}
        </div>
        {photos.length === 0 ? (
          <p className="text-sm text-muted-foreground">Fotky z realizací pro tento typ zatím doplňujeme.</p>
        ) : null}
      </DialogContent>
    </Dialog>
  )
}

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
}: {
  title: string
  image: string | null
  imageAlt?: string
  /** Reálné fotky realizací z Sanity (ConfPhotos) — zobrazí se v dialogu po kliknutí na náhled. */
  galleryPhotos?: string[]
  enabledField: keyof ConfiguratorType
  countField: keyof ConfiguratorType
  arrayField: keyof ConfiguratorType
  extraToggles?: ExtraToggle[]
  dimensionLabels?: { vyska: string; delka: string; pocet: string }
  onFirstEnable?: () => void
}) {
  const { register, watch, setValue } = useFormContext<ConfiguratorType>()
  const count = (watch(countField as Path<ConfiguratorType>) as number | undefined) ?? 0

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
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5 transition-colors has-data-[active=true]:border-foreground/30" data-active={count > 0}>
      <div className="flex items-center gap-4">
        {image ? <ProductThumb image={image} title={imageAlt ?? title} galleryPhotos={galleryPhotos} /> : null}
        <div className="flex flex-1 flex-wrap items-center justify-between gap-3">
          <span className="font-heading text-base font-bold sm:text-lg">{title}</span>
          <div className="flex items-center gap-2">
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
    </div>
  )
}
