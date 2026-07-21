"use client"

import Image from "next/image"
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { formControlsContent, type Lang } from "@/lib/translations"

/** Malý native checkbox použitý pro doplňkové volby (pohon, zámek, …) uvnitř polí formuláře. */
export const InlineCheckbox = forwardRef<HTMLInputElement, { label: string } & ComponentPropsWithoutRef<"input">>(
  ({ label, className, id, ...props }, ref) => (
    <label htmlFor={id} className={cn("flex cursor-pointer items-center gap-2 text-sm text-foreground/80", className)}>
      <span className="relative flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-input has-[:checked]:border-foreground has-[:checked]:bg-foreground">
        <input ref={ref} id={id} type="checkbox" className="peer absolute inset-0 size-full cursor-pointer opacity-0" {...props} />
        <Check className="pointer-events-none size-3 text-background opacity-0 peer-checked:opacity-100" />
      </span>
      {label}
    </label>
  ),
)
InlineCheckbox.displayName = "InlineCheckbox"

/** Karta pro rychlé odmítnutí produktu ("Nechci bránu/branku") — vlastní vzhled, ne z formuláře. */
export function DeclineCard({
  label,
  active,
  onClick,
}: {
  label: string
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl border border-dashed border-border bg-transparent px-5 py-4 text-left text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground",
        active && "border-solid border-foreground bg-foreground text-background hover:border-foreground",
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border border-current",
          active && "bg-brand border-brand text-brand-foreground",
        )}
      >
        {active ? <Check className="size-3.5" /> : null}
      </span>
      {label}
    </button>
  )
}

/**
 * Mřížka barevných vzorků navázaná na string pole (barva, barvaTvarnice, …) přes value/onValueChange.
 * `value` na položce je stabilní (česká, malými písmeny) hodnota, kterou dostane backend/e-mail
 * bez ohledu na jazyk webu; `color` je jen zobrazený, přeložený popisek.
 */
export function ColorSwatchGroup({
  value,
  onChange,
  colors,
}: {
  value: string
  onChange: (value: string) => void
  colors: { code: string; color: string; value?: string }[]
}) {
  return (
    <RadioGroup value={value} onValueChange={(v) => onChange(v as string)} className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
      {colors.map((c) => {
        // Žádné id/htmlFor: base-ui Radio je <span> s vnořeným skrytým <input>,
        // který není nativně "labelovatelný" – klik funguje jen přes vnoření do <label>.
        return (
          <label
            key={c.color}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-transparent p-2 text-center transition-colors hover:border-border"
          >
            <span
              className="size-12 rounded-full border border-border shadow-sm"
              style={{ backgroundColor: c.code }}
            />
            <span className="flex items-center gap-1.5 text-xs font-medium">
              <RadioGroupItem value={c.value ?? c.color.toLowerCase()} />
              {c.color}
            </span>
          </label>
        )
      })}
    </RadioGroup>
  )
}

/** Mřížka voleb s obrázkem (motiv oplocení, materiál sloupků / dílců). */
export function ImageRadioGrid({
  value,
  onChange,
  options,
  lang = "cs",
}: {
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string; image: string | null }[]
  lang?: Lang
}) {
  const t = formControlsContent[lang] ?? formControlsContent.cs
  return (
    <RadioGroup value={value} onValueChange={(v) => onChange(v as string)} className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <label
            key={opt.value}
            className={cn(
              "flex cursor-pointer flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-colors hover:border-foreground/40",
              active && "border-foreground",
            )}
          >
            {opt.image ? (
              <Image src={opt.image} alt={opt.label} width={140} height={140} className="aspect-square w-full max-w-[140px] rounded-xl border border-border bg-background object-contain p-2" />
            ) : (
              <span className="flex aspect-square w-full max-w-[140px] items-center justify-center rounded-xl border border-dashed border-border text-xs text-muted-foreground">
                {t.customSolution}
              </span>
            )}
            <span className="flex items-center gap-1.5 text-sm font-semibold">
              <RadioGroupItem value={opt.value} />
              {opt.label}
            </span>
          </label>
        )
      })}
    </RadioGroup>
  )
}

export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
