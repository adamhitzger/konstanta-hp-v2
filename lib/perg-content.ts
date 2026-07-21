/**
 * Textový a datový obsah konfigurátoru pergol. Analogie k `lib/konf-content.ts`,
 * ale pro `pergolaSchema` / `PergolaConfType` a jeho vlastní produktovou nabídku.
 */

export const pergCopy = {
  heading: "Nakonfigurujte si pergolu",
  subheading:
    "Bioklimatická pergola, zimní zahrada nebo přístřešek — projděte pár kroků a na konci vám pošleme nezávaznou kalkulaci.",
  next: "Další krok",
  back: "Zpět",
  sendText: "Odeslat poptávku",
} as const

export const pergSteps = ["Typ a stínění", "Upevnění", "Barva", "Kontakt"] as const

export const pergolaTypeOptions = [
  { value: "bioklimaticka", label: "Bioklimatická", image: "/modely/pergoly/bioklim.png", photosKey: "bioklimaticka" as const },
  { value: "zimni_zahrada", label: "Zimní zahrada", image: "/modely/pergoly/zimni_zahrada.png", photosKey: "zahrada" as const },
  { value: "pristresek", label: "Přístřešek", image: "/modely/pergoly/pristresek.png", photosKey: "pristresek" as const },
]

export const stineniOptions = [
  { value: "žádné", label: "Žádné", image: null, onlyNonZimniZahrada: false },
  { value: "rolety", label: "Screenové rolety", image: "/modely/pergoly/rolety.png", onlyNonZimniZahrada: false },
  { value: "pevne", label: "Pevné", image: "/modely/pergoly/pevne.png", onlyNonZimniZahrada: true },
  { value: "zaskleni", label: "Zasklení", image: "/modely/pergoly/zaskleni.png", onlyNonZimniZahrada: true },
]

export const stranyOptions = [
  { name: "a" as const, label: "A" },
  { name: "b" as const, label: "B" },
  { name: "c" as const, label: "C" },
  { name: "d" as const, label: "D" },
]

export const strechaMaterialOptions = [
  { value: "sklo", label: "Ze skla", image: "/modely/pergoly/sklo.png" },
  { value: "polykarbonat", label: "Z polykarbonátu", image: "/modely/pergoly/polykarbonat.png" },
]

export const mountOptions = [
  {
    field: "stojici" as const,
    rozmeryField: "rozmeryStojiciP" as const,
    label: "Pergola samostatně stojící",
    image: "/modely/pergoly/samostatna.png",
  },
  {
    field: "keStene" as const,
    rozmeryField: "rozmeryPkStene" as const,
    label: "Pergola přisazená ke stěně",
    image: "/modely/pergoly/kestene.png",
  },
  {
    field: "kRohu" as const,
    rozmeryField: "rozmeryPkRohu" as const,
    label: "Pergola přisazená k rohu",
    image: "/modely/pergoly/kerohu.png",
  },
]

export const mountDimensionLabels = {
  sirka: "A - Délka pergoly (mm)",
  hloubka: "B - Hloubka pergoly (mm)",
  delka: "C - Výška pergoly (mm)",
}

export const barvyPergoly = [
  { code: "#383E42", color: "Antracit" },
  { code: "#8B4512", color: "Hnědá" },
  { code: "#000000", color: "Černá" },
]
