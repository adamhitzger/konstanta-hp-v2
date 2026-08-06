"use client"

import type { ComponentType, SVGProps } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

type StepIcon = ComponentType<SVGProps<SVGSVGElement>>

function StepTile({
  Icon,
  status,
  size,
}: {
  Icon: StepIcon
  status: "done" | "active" | "upcoming"
  size: "sm" | "lg"
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center rounded-2xl border transition-colors",
        size === "lg" ? "size-16" : "size-12",
        status === "active" && "border-brand bg-brand text-brand-foreground",
        status === "done" && "border-brand/30 bg-brand/12 text-brand",
        status === "upcoming" && "border-border bg-muted text-muted-foreground",
      )}
    >
      <Icon className={size === "lg" ? "size-8" : "size-6"} />
      {status === "done" ? (
        <span className="absolute -right-1 -bottom-1 flex size-5 items-center justify-center rounded-full bg-brand text-brand-foreground ring-2 ring-background">
          <Check className="size-3" />
        </span>
      ) : null}
    </div>
  )
}

export function KonfProgress({
  step,
  steps,
  icons,
}: {
  step: number
  steps: readonly string[]
  /** Ikona pro každý krok (stejné pořadí a délka jako `steps`). */
  icons: readonly StepIcon[]
}) {
  return (
    <>
      {/* Mobil: pevně přilepený (sticky) vodorovný pruh nahoře nad obsahem. */}
      <div className=" no-scrollbar sticky top-0 z-20 -mx-5 -mt-5 flex items-center gap-3 overflow-x-auto rounded-t-3xl bg-card/95 px-5 pt-5 pb-6 backdrop-blur-sm sm:hidden">
        {steps.map((label, i) => {
          const status = i < step ? "done" : i === step ? "active" : "upcoming"
          const Icon = icons[i]
          return (
            <div key={label} className="flex shrink-0 items-center gap-2">
              <StepTile Icon={Icon} status={status} size="sm" />
              <span className={cn("text-sm font-medium whitespace-nowrap", status === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
                {label}
              </span>
              {i < steps.length - 1 ? <div className="h-px w-5 shrink-0 bg-border" /> : null}
            </div>
          )
        })}
      </div>

      {/* Tablet a výše: pevný levý sidebar, viditelný už od `sm`. */}
      <nav className="hidden shrink-0 flex-col sm:sticky sm:top-24 sm:flex sm:self-start" aria-label="Průběh konfigurace">
        {steps.map((label, i) => {
          const status = i < step ? "done" : i === step ? "active" : "upcoming"
          const Icon = icons[i]
          return (
            <div key={label} className="flex items-stretch gap-4">
              <div className="flex flex-col items-center">
                <StepTile Icon={Icon} status={status} size="lg" />
                {i < steps.length - 1 ? (
                  <div className={cn("my-2.5 w-px flex-1 bg-border", status === "done" && "bg-brand/40")} />
                ) : null}
              </div>
              <span
                className={cn(
                  "pt-4 pb-20 text-sm font-semibold text-pretty",
                  status === "upcoming" ? "text-muted-foreground" : "text-foreground",
                )}
              >
                {label}
              </span>
            </div>
          )
        })}
      </nav>
    </>
  )
}
