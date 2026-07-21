"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function KonfProgress({ step, steps }: { step: number; steps: readonly string[] }) {
  return (
    <div className="no-scrollbar flex items-center gap-2 overflow-x-auto border-b border-border pb-6">
      {steps.map((label, i) => {
        const status = i < step ? "done" : i === step ? "active" : "upcoming"
        return (
          <div key={label} className="flex shrink-0 items-center gap-2">
            <div
              className={cn(
                "flex size-8 items-center justify-center rounded-full font-heading text-sm font-bold transition-colors",
                status === "done" && "bg-brand text-brand-foreground",
                status === "active" && "bg-foreground text-background",
                status === "upcoming" && "bg-muted text-muted-foreground",
              )}
            >
              {status === "done" ? <Check className="size-4" /> : i + 1}
            </div>
            <span className={cn("text-sm font-medium whitespace-nowrap", status === "upcoming" ? "text-muted-foreground" : "text-foreground")}>
              {label}
            </span>
            {i < steps.length - 1 ? <div className="h-px w-6 shrink-0 bg-border" /> : null}
          </div>
        )
      })}
    </div>
  )
}
