"use client"

import { useCallback, useRef } from "react"
import { sendGTMEvent } from "@next/third-parties/google"

/**
 * Události konfigurátorů a formulářů pro Google Tag Manager.
 *
 * Všechno, co jde do dataLayeru, se posílá odsud — jména událostí i hodnoty
 * parametrů tak drží pohromadě a nerozjedou se mezi čtyřmi formuláři.
 * Hodnoty jsou vždy česky a natvrdo; kdyby se odvozovaly z překladů, rozpadly
 * by se statistiky po jazycích.
 *
 * Přehled toho, co web posílá:
 *
 *   událost            | kde                                   | parametry
 *   -------------------|---------------------------------------|-----------------------------------------
 *   konfiguratorStep   | 3 konfigurátory, po každém kroku vpřed | formName, step (1-based), stepName
 *   generate_lead      | 5 formulářů, po úspěšném odeslání      | form_type, inquired_product (nepovinný)
 *   (user_data)        | 5 formulářů, před generate_lead        | em, ph, ln, fn, ct, zp, st
 */

// ---------------------------------------------------------------------------
// konfiguratorStep
// ---------------------------------------------------------------------------

/** `formName` — který konfigurátor. */
export type KonfFormName = "Oplocení" | "Pergoly" | "Zábradlí"

/**
 * Měření průchodu konfigurátorem. Vrací `trackStep`, které se volá až po
 * úspěšné validaci kroku — událost tedy znamená „krok dokončen", ne „uživatel
 * klikl na Další krok".
 *
 * `step` jde do GTM jedničkované (`step: 1` = první krok), `stepName` je název
 * kroku vždy v češtině (`*.cs.steps`), ať se název nemění podle `?lang=`.
 *
 * Hlídáme jen postup vpřed: `highest` drží nejvyšší už odeslaný krok, takže
 * návrat zpět a opětovný průchod událost nepošle podruhé. `resetSteps` to
 * vynuluje po odeslání poptávky, kdy konfigurátor začíná nanovo („Odeslat
 * další poptávku") — to je nový průchod, ne návrat v tom stávajícím.
 */
export function useKonfSteps(formName: KonfFormName, stepNames: readonly string[]) {
  const highest = useRef(-1)

  const trackStep = useCallback(
    (stepIndex: number) => {
      if (stepIndex <= highest.current) return
      highest.current = stepIndex
      sendGTMEvent({
        event: "konfiguratorStep",
        formName,
        step: stepIndex + 1,
        stepName: stepNames[stepIndex] ?? "",
      })
    },
    [formName, stepNames],
  )

  const resetSteps = useCallback(() => {
    highest.current = -1
  }, [])

  return { trackStep, resetSteps }
}

// ---------------------------------------------------------------------------
// generate_lead
// ---------------------------------------------------------------------------

/**
 * `form_type` — druh formuláře, ne produkt:
 *  - "kalkulace" … konfigurátory a poptávka stavební přípravy (zákazník chce cenu),
 *  - "kontakt"   … obecný kontaktní formulář na homepage.
 */
export type LeadFormType = "kalkulace" | "kontakt"

/** `inquired_product` — poptávaný produkt. U obecného kontaktu se vynechává. */
export type LeadProduct = "oplocení" | "pergoly" | "zábradlí" | "stavební příprava"

/**
 * Dokončená poptávka. `product` se vynechává schválně u formulářů, které se
 * k žádnému konkrétnímu produktu neváží — parametr pak v dataLayeru vůbec
 * není, místo aby nesl zavádějící hodnotu.
 */
export function sendGenerateLead(formType: LeadFormType, product?: LeadProduct) {
  sendGTMEvent({
    event: "generate_lead",
    form_type: formType,
    ...(product ? { inquired_product: product } : {}),
  })
}

// ---------------------------------------------------------------------------
// user_data (rozšířené konverze)
// ---------------------------------------------------------------------------

/** „Jan Novák Starší" → { firstName: "Jan", lastName: "Novák Starší" }. */
function splitFullName(fullName: string) {
  const parts = (fullName ?? "").trim().replace(/\s+/g, " ").split(" ")
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  }
}

/**
 * Údaje zákazníka k dokončené poptávce (rozšířené konverze). Klíče `em`/`ph`/`fn`…
 * jsou dané GTM šablonou, nepřejmenovávat.
 */
export function sendUserDataToGTM(data: {
  email: string
  phone: string
  fullName: string
  city: string
  zip: string
  /** Jazyk poptávky — starý web sem posílal `lang`, tag ho čte jako `st`. */
  state: string
}) {
  const { firstName, lastName } = splitFullName(data.fullName)
  sendGTMEvent({
    user_data: {
      em: String(data.email ?? ""),
      ph: String(data.phone ?? ""),
      ln: String(lastName),
      fn: String(firstName),
      ct: String(data.city ?? ""),
      zp: String(data.zip ?? ""),
      st: String(data.state ?? ""),
    },
  })
}
