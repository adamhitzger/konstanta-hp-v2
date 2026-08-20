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
import type { ConfPhotosWithMotiv, ConfProductInfo } from "@/types"
import { Button } from "@/components/ui/button"
import { KonfProgress } from "./konf-progress"
import { GateIcon, WicketIcon, PostsIcon, PanelMotifIcon, PaintIcon, ContactIcon } from "./konf-icons"
import { Slide } from "./slide"
import { StepBrana } from "./step-brana"
import { StepBranka } from "./step-branka"
import { StepSloupky } from "./step-sloupky"
import { StepDilceMotiv } from "./step-dilce-motiv"
import { StepBarva } from "./step-barva"
import { StepKontakt } from "./step-kontakt"
import { konfContent, gateLabels, stepBrankaContent, stepDilceMotivContent, type Lang } from "@/lib/translations"

const LAST_STEP = konfContent.cs.steps.length - 1

type SizeRow = { vyska?: number; delka?: number; pocet?: number }

/**
 * Vybraný produkt musí mít u *každé* sady rozměrů vyplněnou výšku, šířku i počet.
 * `count` je počet sad (zaškrtnutí = 1, „Přidat další rozměr" ho zvyšuje), takže
 * kontrolujeme přesně prvních `count` položek pole — delší pole může zůstat po
 * odebrání sady, kratší (nebo díra v něm) znamená nevyplněný formulář.
 */
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

// Pořadí musí odpovídat `konfContent.<lang>.steps` (Brána, Branka, Sloupky, Dílce a motiv, Barva, Kontakt).
const stepIcons = [GateIcon, WicketIcon, PostsIcon, PanelMotifIcon, PaintIcon, ContactIcon]

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

export function Configurator({
  photos = emptyPhotos,
  info = {},
  lang = "cs",
}: {
  photos?: ConfPhotosWithMotiv
  info?: ConfProductInfo
  lang?: Lang
}) {
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

  /**
   * Než pustíme uživatele dál, ověříme, že u dané kapitoly padlo alespoň nějaké
   * rozhodnutí — a u vybraných produktů i to, že má vyplněné rozměry.
   */
  const checkStepRequirement = (currentStep: number): string | null => {
    const values = getValues()
    const missingSizes = (product: string) => t.validation.rozmery.replace("{product}", product)

    switch (currentStep) {
      case 0: {
        // `brana === true` = uživatel bránu odmítl kartou „Nechci bránu"; rozměry
        // případně rozvybrané dřív pak nemá smysl vymáhat.
        if (values.brana === true) return null
        const anyGate = gateProducts.some((g) => Number(values[g.countField as keyof ConfiguratorType] ?? 0) > 0)
        if (!anyGate) return t.validation.brana
        const labels = gateLabels[lang] ?? gateLabels.cs
        for (const g of gateProducts) {
          const count = Number(values[g.countField as keyof ConfiguratorType] ?? 0)
          if (!hasCompleteSizes(count, values[g.arrayField as keyof ConfiguratorType])) {
            return missingSizes(labels[g.id] ?? g.label)
          }
        }
        return null
      }
      case 1: {
        if (values.branka === undefined) return t.validation.branka
        if (!hasCompleteSizes(Number(values.celkemBranek ?? 0), values.rozmeryBranek)) {
          return missingSizes((stepBrankaContent[lang] ?? stepBrankaContent.cs).productTitle)
        }
        return null
      }
      case 2: {
        if (values.typSloupku) return null
        return t.validation.sloupky
      }
      case 3: {
        if (values.dilce === undefined) return t.validation.dilce
        if (!hasCompleteSizes(Number(values.celkemDilcu ?? 0), values.rozmeryDilcu)) {
          return missingSizes((stepDilceMotivContent[lang] ?? stepDilceMotivContent.cs).productTitle)
        }
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
    <section id="konf" className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-balance sm:text-4xl">{t.heading}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground text-pretty">{t.subheading}</p>
      </div>

      {/* Bez `gap` a bez paddingu na wrapperu: bílá „záložka“ aktivního kroku v šedém
          pruhu tak navazuje přímo na bílou plochu formuláře. */}
      <div ref={topRef} className="scroll-mt-24 rounded-3xl border border-border bg-card sm:grid sm:grid-cols-[240px_1fr] lg:grid-cols-[300px_1fr]">
        <KonfProgress step={step} steps={t.steps} icons={stepIcons} lang={lang} />

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onValid, onInvalid)} className="flex min-w-0 flex-col gap-10 p-5 sm:p-8">
            <div className="relative overflow-hidden py-8">
              <AnimatePresence mode="wait" custom={direction} initial={false}>
                {step === 0 && (
                  <Slide key="brana" direction={direction}>
                    <StepBrana onNext={goNext} photos={photos} info={info} lang={lang} />
                  </Slide>
                )}
                {step === 1 && (
                  <Slide key="branka" direction={direction}>
                    <StepBranka onNext={goNext} onBack={goBack} photos={photos} info={info} lang={lang} />
                  </Slide>
                )}
                {step === 2 && (
                  <Slide key="sloupky" direction={direction}>
                    <StepSloupky lang={lang} />
                  </Slide>
                )}
                {step === 3 && (
                  <Slide key="dilce" direction={direction}>
                    <StepDilceMotiv onNext={goNext} photos={photos} info={info} lang={lang} />
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
