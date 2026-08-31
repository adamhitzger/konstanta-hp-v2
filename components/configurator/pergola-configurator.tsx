"use client"

import { useMemo, useRef, useState, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { Loader2, MoveRight, MoveLeft } from "lucide-react"
import toast from "react-hot-toast"
import { sendGTMEvent } from "@next/third-parties/google"
import { sendKonfStep, sendUserDataToGTM } from "@/lib/gtm"
import { pergolaSchema, type PergolaConfType, type PergolaFormInput } from "@/lib/schemas"
import { sendPergConf } from "@/lib/actions"
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import { Button } from "@/components/ui/button"
import { KonfProgress } from "./konf-progress"
import { KonfSuccess } from "./konf-success"
import { KonfPending } from "./konf-pending"
import { PergolaTypeIcon, MountIcon, ShadeIcon, PaintIcon, ContactIcon } from "./konf-icons"
import { Slide } from "./slide"
import { PergStepTyp } from "./perg-step-typ"
import { PergStepUpevneni } from "./perg-step-upevneni"
import { PergStepStineni } from "./perg-step-stineni"
import { PergStepBarva } from "./perg-step-barva"
import { PergStepKontakt } from "./perg-step-kontakt"
import { mountOptions } from "@/lib/perg-content"
import { mountLabels, pergContent, type Lang } from "@/lib/translations"

const LAST_STEP = pergContent.cs.steps.length - 1

/** Názvy kroků do GTM — vždy česky, ať se události netříští podle `?lang=`. */
const GTM_FORM = "Pergoly" as const
const GTM_STEPS = pergContent.cs.steps

// Pořadí musí odpovídat `pergContent.<lang>.steps` (Typ, Upevnění, Stínění, Barva, Kontakt).
const stepIcons = [PergolaTypeIcon, MountIcon, ShadeIcon, PaintIcon, ContactIcon]

/** Zvolený způsob upevnění musí mít vyplněnou šířku, hloubku i délku — jinak poptávka nic neříká. */
const hasCompleteRozmery = (rozmery: unknown): boolean => {
  const r = rozmery as { sirka?: number; hloubka?: number; delka?: number } | undefined
  if (!r) return false
  return Number(r.sirka) > 0 && Number(r.hloubka) > 0 && Number(r.delka) > 0
}

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

export function PergolaConfigurator({
  photos = emptyPhotos,
  info = {},
  lang = "cs",
}: {
  photos?: ConfPhotosWithMotiv
  info?: ConfProductInfo
  lang?: Lang
}) {
  const t = pergContent[lang] ?? pergContent.cs
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [sent, setSent] = useState(false)
  const [isPending, startTransition] = useTransition()
  const topRef = useRef<HTMLDivElement>(null)

  // `useForm`'s 3 generics (input/context/output) are needed here because `rozmeryObjekt`
  // in `pergolaSchema` uses z.preprocess — its parsed output type differs from the raw
  // field values react-hook-form holds before validation runs.
  const methods = useForm<PergolaFormInput, unknown, PergolaConfType>({
    resolver: zodResolver(pergolaSchema),
    shouldUnregister: false,
    mode: "all",
    defaultValues: { a: false, b: false, c: false, d: false },
  })
  const { handleSubmit, reset, getValues, watch } = methods

  // Přístřešek nemá stínění, ale střešní krytinu — 3. krok se podle typu jen přejmenuje.
  const pergolaTyp = watch("pergola")
  const steps = useMemo(
    () => t.steps.map((label, i) => (i === 2 && pergolaTyp === "pristresek" ? t.stepRoof : label)),
    [t, pergolaTyp],
  )

  const scrollToTop = () => {
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80)
  }

  const checkStepRequirement = (currentStep: number): string | null => {
    const values = getValues()
    switch (currentStep) {
      case 0: {
        if (!values.pergola) return t.validation.pergola
        if (values.pergola === "bioklimaticka" && values.ledSvetla && !(Number(values.ledPocet) > 0)) {
          return t.validation.ledPocet
        }
        return null
      }
      case 1: {
        if (!values.stojici && !values.keStene && !values.kRohu) return t.validation.upevneni
        const mountT = mountLabels[lang] ?? mountLabels.cs
        for (const opt of mountOptions) {
          if (!values[opt.field]) continue
          if (!hasCompleteRozmery(values[opt.rozmeryField])) {
            return t.validation.rozmery.replace("{product}", mountT[opt.field] ?? opt.label)
          }
        }
        return null
      }
      case 2: {
        // U přístřešku je z tohoto kroku „Střešní krytina" — stínění se tam neřeší.
        if (values.pergola === "pristresek") {
          if (!values.material) return t.validation.material
        } else if (!values.stineni) {
          return t.validation.stineni
        }
        return null
      }
      case 3: {
        if (!values.barva) return t.validation.barva
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

  const onValid = (data: PergolaConfType) => {
    startTransition(async () => {
      const res = await sendPergConf(data, lang)
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
        form_type: "poptávka",
        inquired_product: "pergoly",
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
    if (errors.barva) toast.error(t.validation.invalidBarva)
    if (errors.fullname || errors.email || errors.phoneNumber || errors.zip || errors.address || errors.obec) {
      toast.error(t.validation.invalidContact)
    }
  }

  if (isPending) {
    return (
      <section id="pergkonf" ref={topRef} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <KonfPending lang={lang} />
      </section>
    )
  }

  if (sent) {
    return (
      <section id="pergkonf" ref={topRef} className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8">
        <KonfSuccess lang={lang} onReset={startOver} />
      </section>
    )
  }

  return (
    <section id="pergkonf" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{t.heading}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">{t.subheading}</p>
      </div>

      {/* Bez `gap` a bez paddingu na wrapperu — viz komentář v `configurator.tsx`. */}
      <div ref={topRef} className="scroll-mt-24 rounded-3xl border border-border bg-card sm:grid sm:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
        <KonfProgress step={step} steps={steps} icons={stepIcons} lang={lang} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex min-w-0 flex-col gap-10 p-5 sm:p-8">
            <div className="relative overflow-hidden py-8">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {step === 0 && (
                  <Slide key="typ" direction={direction}>
                    <PergStepTyp photos={photos} info={info} onNext={goNext} lang={lang} />
                  </Slide>
                )}
                {step === 1 && (
                  <Slide key="upevneni" direction={direction}>
                    <PergStepUpevneni onNext={goNext} lang={lang} />
                  </Slide>
                )}
                {step === 2 && (
                  <Slide key="stineni" direction={direction}>
                    <PergStepStineni lang={lang} />
                  </Slide>
                )}
                {step === 3 && (
                  <Slide key="barva" direction={direction}>
                    <PergStepBarva onNext={goNext} lang={lang} />
                  </Slide>
                )}
                {step === 4 && (
                  <Slide key="kontakt" direction={direction}>
                    <PergStepKontakt lang={lang} />
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
