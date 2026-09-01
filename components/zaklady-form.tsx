"use client"

import { useActionState, useEffect, useRef, useState } from "react"
import { CheckCircle2, Loader2, Paperclip, X } from "lucide-react"
import toast from "react-hot-toast"
import { sendGTMEvent } from "@next/third-parties/google"
import { sendUserDataToGTM } from "@/lib/gtm"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PhoneInput } from "@/components/ui/phone-input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckboxCard } from "@/components/configurator/form-controls"
import { Reveal } from "@/components/reveal"
import { sendZaklady } from "@/lib/actions"
import { zakladyContent, type Lang } from "@/lib/translations"
import type { ZakladyType } from "@/lib/schemas"
import type { ActionResponse } from "@/types"

const initialState: ActionResponse<ZakladyType> = { success: false, message: "" }

const ACCEPT = "image/jpeg,image/png,image/webp,application/pdf"

/** Musí sedět s `MAX_FILES` v lib/actions.ts a s textem `zakladyContent.filesHint`. */
const MAX_FILES = 5

/**
 * Poptávka stavební přípravy. Soubory drží React ve stavu (kvůli náhledu a
 * odebírání), do FormData se před odesláním nasypou zpět přes DataTransfer —
 * server action je pak čte jako `files`.
 */
export function ZakladyForm({ lang = "cs" }: { lang?: Lang }) {
  const t = zakladyContent[lang] ?? zakladyContent.cs
  const [state, action, isPending] = useActionState(sendZaklady, initialState)
  /* Server action vrací u neúspěchu `errors` i `inputs` — chyby vypisujeme u polí
     (jinak zákazník vidí jen obecný toast a neví, co opravit) a hodnoty vracíme
     zpátky do inputů, protože nativní submit jinak formulář vyprázdní. */
  const fieldError = (field: keyof ZakladyType) => state.errors?.[field]?.[0]
  const prev = state.inputs
  const [files, setFiles] = useState<File[]>([])
  /* Viz `contact.tsx` — hodnoty polí po nativním odeslání zmizí, `user_data` se
     proto odchytí při submitu. `misto` je nejbližší ekvivalent města. */
  const submitted = useRef<{ name: string; email: string; tel: string; misto: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!state.message) return
    if (state.success) {
      toast.success(state.message)
      if (submitted.current) {
        sendUserDataToGTM({
          email: submitted.current.email,
          phone: submitted.current.tel,
          fullName: submitted.current.name,
          city: submitted.current.misto,
          zip: "",
          state: lang,
        })
      }
      sendGTMEvent({ event: "generate_lead", form_type: "zaklady", inquired_product: "stavební příprava" })
    } else {
      toast.error(state.message)
    }
  }, [state.success, state.message, lang])

  // Vstup je řízený stavem, ale odesílá se nativně — po každé změně ho srovnáme.
  function syncInput(next: File[]) {
    setFiles(next)
    if (!inputRef.current) return
    const dt = new DataTransfer()
    next.forEach((f) => dt.items.add(f))
    inputRef.current.files = dt.files
  }

  if (state.success) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-border bg-background p-12 text-center">
        <CheckCircle2 className="h-14 w-14 text-primary" />
        <h2 className="font-heading text-2xl font-bold">{t.successTitle}</h2>
        <p className="text-muted-foreground">{t.successText}</p>
      </div>
    )
  }

  return (
    <form
      action={action}
      onSubmit={(e) => {
        const fd = new FormData(e.currentTarget)
        submitted.current = {
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          tel: String(fd.get("tel") ?? ""),
          misto: String(fd.get("misto") ?? ""),
        }
      }}
      className="flex flex-col gap-6 rounded-3xl border border-border bg-background p-6 sm:p-8"
    >
      <input type="hidden" name="lang" value={lang} />

      <div className="flex flex-col gap-2">
        <h2 className="font-heading text-2xl font-extrabold uppercase tracking-tight text-balance">
          {t.formHeading}
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground text-pretty">{t.formIntro}</p>
      </div>

      <Reveal variant="up" childSelector="[data-f]" stagger={0.08} className="flex flex-col gap-5">
        <div data-f className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="zaklady-name">{t.labels.name}</Label>
            <Input id="zaklady-name" name="name" required minLength={3} defaultValue={prev?.name} placeholder={t.placeholders.name} />
            {fieldError("name") ? <p className="text-sm text-destructive">{fieldError("name")}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="zaklady-phone">{t.labels.phone}</Label>
            <PhoneInput id="zaklady-phone" name="tel" required defaultValue={prev?.tel} placeholder={t.placeholders.phone} />
            {fieldError("tel") ? <p className="text-sm text-destructive">{fieldError("tel")}</p> : null}
          </div>
        </div>

        <div data-f className="grid gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="zaklady-email">{t.labels.email}</Label>
            <Input id="zaklady-email" name="email" type="email" required defaultValue={prev?.email} placeholder={t.placeholders.email} />
            {fieldError("email") ? <p className="text-sm text-destructive">{fieldError("email")}</p> : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="zaklady-misto">{t.labels.misto}</Label>
            <Input id="zaklady-misto" name="misto" required minLength={2} defaultValue={prev?.misto} placeholder={t.placeholders.misto} />
            {fieldError("misto") ? <p className="text-sm text-destructive">{fieldError("misto")}</p> : null}
          </div>
        </div>

        {/* Rozsah prací. `name="sluzby"` je stejné u všech čtyř, takže server action
            dostane pole přes `formData.getAll("sluzby")`. */}
        <fieldset data-f className="flex flex-col gap-3">
          <legend className="mb-1 text-sm leading-none font-medium">{t.labels.sluzby}</legend>
          <p className="text-sm text-muted-foreground">{t.sluzbyHint}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.sluzby.map((s) => (
              <CheckboxCard
                key={s.id}
                id={`zaklady-sluzba-${s.id}`}
                name="sluzby"
                value={s.id}
                label={s.label}
                desc={s.desc}
                defaultChecked={prev?.sluzby?.some((v) => v === s.id)}
              />
            ))}
          </div>
          {/* Jediné pole formuláře, které neumí nativní `required` — chybu tedy vypisujeme. */}
          {fieldError("sluzby") ? (
            <p className="text-sm text-destructive">{fieldError("sluzby")}</p>
          ) : null}
        </fieldset>

        <div data-f className="flex flex-col gap-2">
          <Label htmlFor="zaklady-msg">{t.labels.message}</Label>
          {/* `minLength`/`maxLength` musí sedět se `zakladySchema.msg` — bez nich projde
              nativní validací i „Test" a formulář se odmítne až na serveru. */}
          <Textarea
            id="zaklady-msg"
            name="msg"
            rows={6}
            required
            minLength={10}
            maxLength={2000}
            defaultValue={prev?.msg}
            placeholder={t.placeholders.message}
          />
          {fieldError("msg") ? <p className="text-sm text-destructive">{fieldError("msg")}</p> : null}
        </div>

        <div data-f className="flex flex-col gap-3">
          <Label htmlFor="zaklady-files">{t.labels.files}</Label>
          <input
            ref={inputRef}
            id="zaklady-files"
            name="files"
            type="file"
            multiple
            accept={ACCEPT}
            className="sr-only"
            onChange={(e) => syncInput(Array.from(e.target.files ?? []).slice(0, MAX_FILES))}
          />
          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor="zaklady-files"
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-foreground hover:text-background"
            >
              <Paperclip className="h-4 w-4" />
              {t.filesButton}
            </label>
            {files.length === 0 ? (
              <span className="text-sm text-muted-foreground">{t.filesEmpty}</span>
            ) : null}
          </div>

          {files.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {files.map((f, i) => (
                <li
                  key={`${f.name}-${i}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border px-4 py-2.5 text-sm"
                >
                  <span className="truncate">{f.name}</span>
                  <button
                    type="button"
                    aria-label={`${t.filesRemove}: ${f.name}`}
                    onClick={() => syncInput(files.filter((_, index) => index !== i))}
                    className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="text-xs text-muted-foreground">{t.filesHint}</p>
        </div>

        <Button data-f type="submit" size="lg" className="font-semibold transition-transform hover:scale-[1.02]">
          {isPending ? <Loader2 className="animate-spin" /> : t.submit}
        </Button>

        <p data-f className="text-xs text-muted-foreground">
          {t.consent}
        </p>
      </Reveal>
    </form>
  )
}
