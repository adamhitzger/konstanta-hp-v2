"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

/** Kód slevy jako tlačítko — klik ho zkopíruje do schránky (do konfigurátoru / e-mailu). */
export function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(code)
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
        } catch {
          /* Schránka nemusí být dostupná (http, starší prohlížeč) — kód je i tak vidět. */
        }
      }}
      className="group inline-flex items-center gap-4 rounded-2xl border-2 border-dashed border-brand bg-brand/10 px-6 py-4 transition-colors hover:bg-brand/15"
      aria-label={`Zkopírovat kód ${code}`}
    >
      <span className="font-mono text-2xl font-bold tracking-[0.12em] sm:text-3xl">{code}</span>
      <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand">
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Zkopírováno" : "Kopírovat"}
      </span>
    </button>
  )
}
