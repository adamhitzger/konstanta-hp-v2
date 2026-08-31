"use client"

import { useRef, useState, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { Loader2, MoveRight, MoveLeft } from "lucide-react"
import toast from "react-hot-toast"
import { zabradliSchema, type ZabradliConfType } from "@/lib/schemas"
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import { Button } from "@/components/ui/button"
import { KonfProgress } from "./konf-progress"
import { KonfSuccess } from "./konf-success"
import { KonfPending } from "./konf-pending"
import { RailingIcon, PanelMotifIcon, ContactIcon } from "./konf-icons"
import { Slide } from "./slide"
import { ZabStepZabradli } from "./zab-step-zabradli"
import { ZabStepMotiv } from "./zab-step-motiv"
import { StepKontakt } from "./step-kontakt"
import { zabradliConfContent, type Lang } from "@/lib/translations"
import { sendZabradliConf } from "@/lib/actions"
import { sendGTMEvent } from "@next/third-parties/google"
import { sendKonfStep, sendUserDataToGTM } from "@/lib/gtm"

const LAST_STEP = zabradliConfContent.cs.steps.length - 1

/** Názvy kroků do GTM — vždy česky, ať se události netříští podle `?lang=`. */
const GTM_FORM = "Zábradlí" as const
const GTM_STEPS = zabradliConfContent.cs.steps

// Pořadí musí odpovídat `zabradliConfContent.<lang>.steps` (Zábradlí, Motiv, Kontakt).
const stepIcons = [RailingIcon, PanelMotifIcon, ContactIcon]

const emptyPhotos: ConfPhotosWithMotiv = {
  jednokridla: [],
  dvoukridla: [],
  samonosna: [],
  poKolejnici: [],
  telPoj: [],
  telSam: [],
  atypicka: [],
  sikma: [],
  skladaci: [],
  sekcni: [],
  branka: [],
  ploty: [],
  pristresek: [],
  bioklimaticka: [],
  zahrada: [],
}

type SizeRow = { vyska?: number; delka?: number; pocet?: number }

/** U zábradlí musí mít *každá* sada rozměrů vyplněnou výšku, šířku i počet — viz `configurator.tsx`. */
const hasCompleteSizes = (count: number, rows: unknown): boolean => {
  if (!(count > 0)) return true
  const list = Array.isArray(rows) ? (rows as SizeRow[]) : []
  for (let i = 0; i < count; i++) {
    const row = list[i]
    if (!row) return false
    if (!(Number(row.vyska) > 0) || !(Number(row.delka) > 0) || !(Number(row.pocet) > 0)) return false
  }
  return true
}

/**
 * Konfigurátor zábradlí — samostatná poptávka o třech krocích (zábradlí, motiv, kontakt).
 *
 * Zatím bez server action a bez e-mailu: `onValid` data jen vypíše do konzole,
 * odesílání se dodělá, až budou ceny a react-email šablona.
 */
export function ZabradliConfigurator({
  photos = emptyPhotos,
  info = {},
  lang = "cs",
}: {
  photos?: ConfPhotosWithMotiv
  info?: ConfProductInfo
  lang?: Lang
}) {
  const t = zabradliConfContent[lang] ?? zabradliConfContent.cs
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()
  const topRef = useRef<HTMLDivElement>(null)

  const methods = useForm<ZabradliConfType>({
    resolver: zodResolver(zabradliSchema),
    shouldUnregister: false,
    mode: "all",
  })
  const { handleSubmit, reset, getValues } = methods

  const scrollToTop = () => {
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80)
  }

  const checkStepRequirement = (currentStep: number): string | null => {
    const values = getValues()
    switch (currentStep) {
      case 0: {
        const count = Number(values.celkemZabradli ?? 0)
        if (!(count > 0)) return t.validation.zabradli
        if (!hasCompleteSizes(count, values.rozmeryZabradli)) return t.validation.rozmery
        if (!values.zabradliMaterial) return t.validation.material
        return null
      }
      case 1: {
        if (values.zabradliMaterial === "sklo" && !values.zabradliSklo) return t.validation.sklo
        if (values.zabradliMaterial === "hliník" && !values.zabradliMotiv) return t.validation.motiv
        return null
      }
      default:
        return null
    }
  }

  const goNext = () => {
    const problem = checkStepRequirement(step)
    if (problem) {
      toast.error(problem)
      return
    }
    sendKonfStep(GTM_FORM, step, GTM_STEPS[step])
    setDirection(1)
    setStep((prev) => Math.min(LAST_STEP, prev + 1))
    scrollToTop()
  }

  const goBack = () => {
    setDirection(-1)
    setStep((prev) => Math.max(0, prev - 1))
    scrollToTop()
  }

  const onValid = (data: ZabradliConfType) => {
    startTransition(async () => {
      const res = await sendZabradliConf(data, lang)
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      sendUserDataToGTM({
        email: data.email,
        phone: data.phoneNumber,
        fullName: data.fullname,
        city: data.obec,
        zip: data.zip,
        state: lang,
      })
      sendKonfStep(GTM_FORM, LAST_STEP, GTM_STEPS[LAST_STEP])
      sendGTMEvent({
        event: "generate_lead",
        form_type: "kalkulace",
        inquired_product: "zábradlí",
      })
      setSent(true)
      scrollToTop()
    })
  }

  /** Návrat z potvrzení na prázdný formulář — „Odeslat další poptávku". */
  const startOver = () => {
    reset()
    setStep(0)
    setDirection(1)
    setSent(false)
    scrollToTop()
  }

  const onInvalid = (errors: Record<string, { message?: string } | undefined>) => {
    if (errors.zabradliMaterial) toast.error(t.validation.material)
    if (errors.zabradliSklo) toast.error(t.validation.sklo)
    if (errors.zabradliMotiv) toast.error(t.validation.motiv)
    if (errors.fullname || errors.email || errors.phoneNumber || errors.zip || errors.address || errors.obec) {
      toast.error(t.validation.invalidContact)
    }
  }

  if (isPending) {
    return (
      <section id="zabkonf" ref={topRef} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <KonfPending lang={lang} />
      </section>
    )
  }

  if (sent) {
    return (
      <section id="zabkonf" ref={topRef} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <KonfSuccess lang={lang} onReset={startOver} />
      </section>
    )
  }

  return (
    <section id="zabkonf" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{t.heading}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">{t.subheading}</p>
      </div>

      {/* Bez `gap` a bez paddingu na wrapperu — viz komentář v `configurator.tsx`. */}
      <div ref={topRef} className="scroll-mt-24 rounded-3xl border border-border bg-card sm:grid sm:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <KonfProgress step={step} steps={t.steps} icons={stepIcons} lang={lang} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex min-w-0 flex-col gap-10 p-5 sm:p-8">
            <div className="relative overflow-hidden py-8">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {step === 0 && (
                  <Slide key="zabradli" direction={direction}>
                    <ZabStepZabradli photos={photos} info={info} lang={lang} />
                  </Slide>
                )}
                {step === 1 && (
                  <Slide key="motiv" direction={direction}>
                    <ZabStepMotiv onNext={goNext} lang={lang} />
                  </Slide>
                )}
                {step === 2 && (
                  <Slide key="kontakt" direction={direction}>
                    <StepKontakt lang={lang} />
                  </Slide>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-row-reverse items-center justify-between gap-4 border-t border-border pt-8">
              {step < LAST_STEP ? (
                <Button type="button" onClick={goNext}>
                  {t.next}
                  <MoveRight />
                </Button>
              ) : (
                <Button type="submit" disabled={isPending}>
                  {isPending ? <Loader2 className="animate-spin" /> : <>{t.sendText}<MoveRight /></>}
                </Button>
              )}
              {step > 0 ? (
                <Button type="button" variant="outline" onClick={goBack}>
                  <MoveLeft />
                  {t.back}
                </Button>
              ) : (
                <span />
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  )
}
