"use client"

import { useRef, useState, useTransition } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AnimatePresence } from "framer-motion"
import { Loader2, MoveRight, MoveLeft } from "lucide-react"
import toast from "react-hot-toast"
import { sendGTMEvent } from "@next/third-parties/google"
import { confSchema, type ConfiguratorType } from "@/lib/schemas"
import { gateProducts } from "@/lib/konf-content"
import { sendConf } from "@/lib/actions"
import type { ConfPhotos } from "@/types"
import { Button } from "@/components/ui/button"
import { KonfProgress } from "./konf-progress"
import { Slide } from "./slide"
import { StepBrana } from "./step-brana"
import { StepBranka } from "./step-branka"
import { StepSloupky } from "./step-sloupky"
import { StepDilceMotiv } from "./step-dilce-motiv"
import { StepBarva } from "./step-barva"
import { StepKontakt } from "./step-kontakt"
import { konfContent, type Lang } from "@/lib/translations"

const LAST_STEP = konfContent.cs.steps.length - 1

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

export function Configurator({ photos = emptyPhotos, lang = "cs" }: { photos?: ConfPhotos; lang?: Lang }) {
  const t = konfContent[lang] ?? konfContent.cs
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPending, startTransition] = useTransition()
  const topRef = useRef<HTMLDivElement>(null)

  const methods = useForm<ConfiguratorType>({
    resolver: zodResolver(confSchema),
    shouldUnregister: false,
    mode: "all",
  })
  const { handleSubmit, reset, getValues } = methods

  const scrollToTop = () => {
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80)
  }

  /** Než pustíme uživatele dál, ověříme, že u dané kapitoly padlo alespoň nějaké rozhodnutí. */
  const checkStepRequirement = (currentStep: number): string | null => {
    const values = getValues()
    switch (currentStep) {
      case 0: {
        const anyGate = gateProducts.some((g) => Number(values[g.countField as keyof ConfiguratorType] ?? 0) > 0)
        if (values.brana === true || anyGate) return null
        return t.validation.brana
      }
      case 1: {
        if (values.branka !== undefined) return null
        return t.validation.branka
      }
      case 2: {
        if (values.typSloupku) return null
        return t.validation.sloupky
      }
      case 3: {
        if (values.dilce === undefined) return t.validation.dilce
        if (!values.motiv) return t.validation.motiv
        return null
      }
      case 4: {
        if (values.barva) return null
        return t.validation.barva
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

  const onValid = (data: ConfiguratorType) => {
    startTransition(async () => {
      const res = await sendConf(data)
      if (!res.success) {
        toast.error(res.message)
        return
      }
      toast.success(res.message)
      sendGTMEvent({
        event: "generate_lead",
        form_type: "kalkulace",
        inquired_product: "oplocení",
      })
      setStep(0)
      reset()
    })
  }

  const onInvalid = (errors: Record<string, { message?: string } | undefined>) => {
    if (errors.barva) toast.error(t.validation.invalidBarva)
    if (errors.motiv) toast.error(t.validation.invalidMotiv)
    if (errors.typSloupku) toast.error(t.validation.invalidSloupky)
    if (errors.fullname || errors.email || errors.phoneNumber || errors.zip || errors.address || errors.obec) {
      toast.error(t.validation.invalidContact)
    }
  }

  return (
    <section id="konf" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
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
                  <Slide key="brana" direction={direction}>
                    <StepBrana onNext={goNext} photos={photos} lang={lang} />
                  </Slide>
                )}
                {step === 1 && (
                  <Slide key="branka" direction={direction}>
                    <StepBranka onNext={goNext} photos={photos} lang={lang} />
                  </Slide>
                )}
                {step === 2 && (
                  <Slide key="sloupky" direction={direction}>
                    <StepSloupky lang={lang} />
                  </Slide>
                )}
                {step === 3 && (
                  <Slide key="dilce" direction={direction}>
                    <StepDilceMotiv onNext={goNext} photos={photos} lang={lang} />
                  </Slide>
                )}
                {step === 4 && (
                  <Slide key="barva" direction={direction}>
                    <StepBarva lang={lang} />
                  </Slide>
                )}
                {step === 5 && (
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
