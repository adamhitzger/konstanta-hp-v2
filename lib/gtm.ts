import { sendGTMEvent } from "@next/third-parties/google"

/**
 * Události konfigurátorů a formulářů pro Google Tag Manager.
 *
 * Předloha je starý projekt `konstantahp`: vedle `generate_lead` při odeslání
 * posílal na každém kroku `konfiguratorSteps` a k dokončené poptávce ještě
 * `user_data` pro rozšířené konverze. Tady je to na jednom místě, ať se
 * pojmenování událostí a parametrů nerozjede mezi třemi konfigurátory.
 */

/** Název formuláře v GTM. Vždy česky a natvrdo — jinak by se statistiky roztříštily po jazycích. */
export type KonfFormName = "Oplocení" | "Pergoly" | "Zábradlí"

/**
 * Průchod krokem konfigurátoru. Volá se až po úspěšné validaci, takže událost
 * znamená „krok dokončen", ne „uživatel klikl na Další krok".
 *
 * `stepIndex` je nula-based index dokončeného kroku; do GTM jde jedničkovaný,
 * stejně jako to posílal starý web (`step: step + 1`).
 */
export function sendKonfStep(formName: KonfFormName, stepIndex: number, stepName: string) {
  sendGTMEvent({
    event: "konfiguratorSteps",
    formName,
    step: stepIndex + 1,
    stepName,
  })
}

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
