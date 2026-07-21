import type { ConfiguratorType } from "@/lib/schemas"
import type { ConfPhotos } from "@/types"

/**
 * Textový a datový obsah konfigurátoru oplocení. Držet odděleně od komponent,
 * aby šlo přidat/upravit produkt (bránu, motiv, barvu…) bez zásahu do UI kódu.
 */

export const konfCopy = {
  heading: "Nakonfigurujte si své oplocení",
  subheading:
    "Projděte pár kroků a sestavte si bránu, branku, sloupky i motiv plotu přesně podle sebe. Na konci vám pošleme nezávaznou kalkulaci.",
  next: "Další krok",
  back: "Zpět",
  sendText: "Odeslat poptávku",
  dimensionLabels: {
    vyska: "Výška (mm)",
    delka: "Šířka průjezdu (mm)",
    pocet: "Počet (ks)",
  },
} as const

export type GateFieldKey = keyof ConfiguratorType

/** Klíče trojice polí, kterými se v `confSchema` popisuje jeden typ brány. */
export type GateProductConfig = {
  id: string
  label: string
  image: string
  enabledField: GateFieldKey
  countField: GateFieldKey
  arrayField: GateFieldKey
  /** Klíč v `ConfPhotos` (Sanity) se skutečnými fotkami realizací tohoto typu. */
  photosKey: keyof ConfPhotos
}

// Deset typů vjezdových bran — přesně názvy polí ze stávajícího confSchema,
// aby formulář zůstal kompatibilní s existující akcí `sendConf`.
export const gateProducts: GateProductConfig[] = [
  {
    id: "dvoukridla",
    label: "Otočná brána dvoukřídlá",
    image: "/modely/brany/dvoukridla.png",
    enabledField: "dvoukridla",
    countField: "celkem2K",
    arrayField: "rozmery2KBran",
    photosKey: "dvoukridla",
  },
  {
    id: "jednokridla",
    label: "Otočná brána jednokřídlá",
    image: "/modely/brany/jednokridla.png",
    enabledField: "jednokridla",
    countField: "celkemK",
    arrayField: "rozmeryKBran",
    photosKey: "jednokridla",
  },
  {
    id: "samonosna",
    label: "Samonosná posuvná brána",
    image: "/modely/brany/samonosna.png",
    enabledField: "samonosna",
    countField: "celkemS",
    arrayField: "rozmerySBran",
    photosKey: "samonosna",
  },
  {
    id: "posuvna",
    label: "Brána posuvná po kolejnici",
    image: "/modely/brany/posuvna.png",
    enabledField: "posuvna",
    countField: "celkemP",
    arrayField: "rozmeryPBran",
    photosKey: "poKolejnici",
  },
  {
    id: "telSam",
    label: "Brána teleskopická samonosná",
    image: "/modely/brany/telSam.png",
    enabledField: "telSam",
    countField: "celkemTS",
    arrayField: "rozmeryTSBran",
    photosKey: "telSam",
  },
  {
    id: "telPoj",
    label: "Brána teleskopická pojízdná",
    image: "/modely/brany/telPoj.png",
    enabledField: "telPoj",
    countField: "celkemTP",
    arrayField: "rozmeryTPBran",
    photosKey: "telPoj",
  },
  {
    id: "atypicka",
    label: "Brána atypická",
    image: "/modely/brany/atypicka.png",
    enabledField: "atypicka",
    countField: "celkemA",
    arrayField: "rozmeryABran",
    photosKey: "atypicka",
  },
  {
    id: "sikma",
    label: "Brána šikmá",
    image: "/modely/brany/sikma.png",
    enabledField: "sikma",
    countField: "celkemSik",
    arrayField: "rozmerySikBran",
    photosKey: "sikma",
  },
  {
    id: "skladaci",
    label: "Brána skládací",
    image: "/modely/brany/skladaci.png",
    enabledField: "skladaci",
    countField: "celkemSkl",
    arrayField: "rozmerySklBran",
    photosKey: "skladaci",
  },
  {
    id: "sekcni",
    label: "Brána sekční",
    image: "/modely/brany/sekcni.png",
    enabledField: "sekcni",
    countField: "celkemSek",
    arrayField: "rozmerySekBran",
    photosKey: "sekcni",
  },
]

export const sloupkyOptions = [
  { value: "vlastni", label: "Mám své", image: null },
  { value: "hliníkové", label: "Hliníkové", image: "/modely/sloupky/hlinikove.png" },
  { value: "betonové", label: "Betonové", image: "/modely/sloupky/betonove.png" },
] as const

export const povrchTvarniceOptions = [
  { value: "standard", label: "Standard" },
  { value: "stipany", label: "Štípaný" },
] as const

export const barvyTvarniceStandard = [
  { code: "#b5beb9", color: "Přírodní" },
  { code: "#800020", color: "Červená" },
  { code: "#AF6E4D", color: "Karamelová" },
  { code: "#C2B280", color: "Písková" },
  { code: "#CC7722", color: "Okrová" },
  { code: "#8B4512", color: "Hnědá" },
  { code: "#000000", color: "Černá" },
]

export const barvyTvarniceStipany = [
  { code: "#b5beb9", color: "Melír Přírodní" },
  { code: "#F5EBDD", color: "Melír Latte" },
  { code: "#F6EFD9", color: "Melír Písková" },
  { code: "#B4B4B4", color: "Melír Marmo" },
  { code: "#D4BFA3", color: "Melír Scatola" },
]

export const dilceMaterialImage: Record<string, string> = {
  "hliníkové": "/modely/dilce/hlinikove.png",
  "betonové": "/modely/dilce/betonove.png",
  vlastni: "/modely/dilce/hlinikove.png",
}

export const motivy = [
  { src: "o-standart", motiv: "Okenice standard", imgSrc: "standart" },
  { src: "kapka", motiv: "Okenice kapka", imgSrc: "kapka" },
  { src: "kapka-mini", motiv: "Okenice kapka mini", imgSrc: "kapka-mini" },
  { src: "planka-60", motiv: "Plaňka 60", imgSrc: "p60" },
  { src: "plaka-90", motiv: "Plaňka 90", imgSrc: "p90" },
  { src: "planka-120", motiv: "Plaňka 120", imgSrc: "p120" },
  { src: "planka-150", motiv: "Plaňka 150", imgSrc: "p150" },
  { src: "tycka", motiv: "Tyčka", imgSrc: "tycka" },
  { src: "tahokov", motiv: "Tahokov", imgSrc: "tahokov" },
]

export const barvyOplocení = [
  { code: "#50d71e", color: "Zelená" },
  { code: "#b5beb9", color: "Šedá" },
  { code: "#FFFFFF", color: "Bílá" },
  { code: "#383E42", color: "Antracit" },
  { code: "#8B4512", color: "Dřevodekor" },
  { code: "#000000", color: "Černá" },
]

export const konfSteps = ["Brána", "Branka", "Sloupky", "Dílce a motiv", "Barva", "Kontakt"] as const
