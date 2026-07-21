"use client"

import { useRef, useState, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { Loader2, MoveRight, MoveLeft } from "lucide-react"
import toast from "react-hot-toast"
import { sendGTMEvent } from "@next/third-parties/google"
import { pergolaSchema, type PergolaConfType, type PergolaFormInput } from "@/lib/schemas"
import { sendPergConf } from "@/lib/actions"
import type { ConfPhotos } from "@/types"
import { Button } from "@/components/ui/button"
import { KonfProgress } from "./konf-progress"
import { Slide } from "./slide"
import { PergStepTyp } from "./perg-step-typ"
import { PergStepUpevneni } from "./perg-step-upevneni"
import { PergStepBarva } from "./perg-step-barva"
import { PergStepKontakt } from "./perg-step-kontakt"
import { pergContent, type Lang } from "@/lib/translations"

const LAST_STEP = pergContent.cs.steps.length - 1

const emptyPhotos: ConfPhotos = {
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

export function PergolaConfigurator({ photos = emptyPhotos, lang = "cs" }: { photos?: ConfPhotos; lang?: Lang }) {
  const t = pergContent[lang] ?? pergContent.cs
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
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
  const { handleSubmit, reset, getValues } = methods

  const scrollToTop = () => {
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80)
  }

  const checkStepRequirement = (currentStep: number): string | null => {
    const values = getValues()
    switch (currentStep) {
      case 0: {
        if (!values.pergola) return t.validation.pergola
        if (values.pergola === "pristresek") {
          if (!values.material) return t.validation.material
        } else if (!values.stineni) {
          return t.validation.stineni
        }
        return null
      }
      case 1: {
        if (!values.stojici && !values.keStene && !values.kRohu) return t.validation.upevneni
        return null
      }
      case 2: {
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
      const res = await sendPergConf(data)
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      sendGTMEvent({
        event: "generate_lead",
        form_type: "poptávka",
        inquired_product: "pergoly",
      })
      setStep(0)
      reset()
    })
  }

  const onInvalid = (errors: Record<string, { message?: string } | undefined>) => {
    if (errors.barva) toast.error(t.validation.invalidBarva)
    if (errors.fullname || errors.email || errors.phoneNumber || errors.zip || errors.address || errors.obec) {
      toast.error(t.validation.invalidContact)
    }
  }

  return (
    <section id="pergkonf" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{t.heading}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">{t.subheading}</p>
      </div>

      <div ref={topRef} className="scroll-mt-24 rounded-3xl border border-border bg-card p-5 sm:p-8">
        <KonfProgress step={step} steps={t.steps} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex flex-col gap-10">
            <div className="relative overflow-hidden py-8">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {step === 0 && (
                  <Slide key="typ" direction={direction}>
                    <PergStepTyp photos={photos} lang={lang} />
                  </Slide>
                )}
                {step === 1 && (
                  <Slide key="upevneni" direction={direction}>
                    <PergStepUpevneni lang={lang} />
                  </Slide>
                )}
                {step === 2 && (
                  <Slide key="barva" direction={direction}>
                    <PergStepBarva lang={lang} />
                  </Slide>
                )}
                {step === 3 && (
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
