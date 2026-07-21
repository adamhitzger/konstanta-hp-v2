import * as z from "zod"

const phoneRegex = new RegExp(/^(\+?420\s?)?(\d\s?){9}$/)
const pscRegex = new RegExp(/^\d{3}\s?\d{2}$/)
export const contactSchema = z.object({
    name: z.string().min(3, {message: "Jméno je moc krátké"}),
    email: z.string().email(),
    tel: z.string().min(1,{message: "Pole je povinné"}).regex(phoneRegex, {message: "Zadali jste číslo ve špatném formátu"}),
    company: z.string().optional(),
    msg: z.string().max(100, {message: "Zpráva je moc dlouhá"}),
})

export const productSchema = z.object({
    name: z.string().min(3, {message: "Jméno je moc krátké"}),
    email: z.string().email(),
    tel: z.string().min(1,{message: "Pole je povinné"}).regex(phoneRegex, {message: "Zadali jste číslo ve špatném formátu"}),
    company: z.string().optional(),
    pocet: z.number().min(1, {message: "Zadejte počet"}),
    delka: z.number().min(1, {message: "Zadejte délku"}),
    barva: z.string().min(1, {message: "Zadejte bravu"}),
    address: z.string().min(1,{message: "Adresa je povinná"}),
    obec: z.string().min(1, {message:"Obec je povinná"}),
    msg: z.string().max(100, {message: "Zpráva je moc dlouhá"}),
    zip: z.string().regex(pscRegex, {
        message: "Zadali jste PSČ v nesprávném formátu"
    }).min(5,{message: "PSČ je povinné"}),
    produkt: z.string()
})

const numberFromInput = z.preprocess(
  val => {
    if (typeof val === "string" && val.trim() !== "") {
      const n = Number(val);
      if (!isNaN(n)) return n;
    }
    if (typeof val === "number") return val;
    return undefined; // default() se použije potom
  },
  z.number().default(0)
);


// rozměry objektu, který je optional, ale fieldy uvnitř jsou povinné
const rozmeryObjekt = z.object({
  sirka: numberFromInput,
  delka: numberFromInput,
  hloubka: numberFromInput,
}).optional(); // celý objekt může chybět

export const pergolaSchema = z.object({
  pergola: z.string().optional(),
  material: z.string().optional(),
  stojici: z.boolean().optional(),
  rozmeryStojiciP: rozmeryObjekt,
  keStene: z.boolean().optional(),
  rozmeryPkStene: rozmeryObjekt,
  kRohu: z.boolean().optional(),
  rozmeryPkRohu: rozmeryObjekt,
  stineni: z.string().optional(),
  barva: z.string(),
  a: z.boolean(),
  b: z.boolean(),
  c: z.boolean(),
  d: z.boolean(),
  fullname: z.string()
      .min(6, { message: "Krátké jméno" })
      .max(40, { message: "Jméno je moc dlouhé" }),
  email: z.string().email({ message: "Nesprávný formát e-mailu" }),
  company: z.string().optional(),
  phoneNumber: z.string().regex(phoneRegex, {
      message: "Nesprávný formát tel. čísla",
  }),
  address: z.string().min(1, { message: "Adresa je povinná" }),
  obec: z.string().min(1, { message: "Obec je povinná" }),
  zip: z.string().regex(pscRegex, {
        message: "Zadali jste PSČ v nesprávném formátu"
    }).min(5,{message: "PSČ je povinné"}),
  message: z.string().optional(),
  file: z.any().optional(),
});

// Rozměry jednoho kusu brány/branky/dílce v rámci konfigurátoru oplocení.
const branaRozmery = z.object({
    delka: z.number().optional(),
    vyska: z.number().optional(),
    pocet: z.number().optional(),
    pohon: z.boolean().optional(),
    tahoma: z.boolean().optional(),
    ovladac: z.boolean().optional()
})

export const confSchema = z.object({
    brana: z.boolean().optional(),
    dvoukridla: z.boolean().optional(),
    rozmery2KBran: branaRozmery.array().optional(),
    celkem2K: z.number().optional(),
    jednokridla: z.boolean().optional(),
    rozmeryKBran: branaRozmery.array().optional(),
    celkemK: z.number().optional(),
    samonosna: z.boolean().optional(),
    rozmerySBran: branaRozmery.array().optional(),
    celkemS: z.number().optional(),
    posuvna: z.boolean().optional(),
    rozmeryPBran: branaRozmery.array().optional(),
    celkemP: z.number().optional(),
    telSam: z.boolean().optional(),
    rozmeryTSBran: branaRozmery.array().optional(),
    celkemTS: z.number().optional(),
    telPoj: z.boolean().optional(),
    rozmeryTPBran: branaRozmery.array().optional(),
    celkemTP: z.number().optional(),
    atypicka: z.boolean().optional(),
    rozmeryABran: branaRozmery.array().optional(),
    celkemA: z.number().optional(),
    sikma: z.boolean().optional(),
    rozmerySikBran: branaRozmery.array().optional(),
    celkemSik: z.number().optional(),
    skladaci: z.boolean().optional(),
    rozmerySklBran: branaRozmery.array().optional(),
    celkemSkl: z.number().optional(),
    sekcni: z.boolean().optional(),
    rozmerySekBran: branaRozmery.array().optional(),
    celkemSek: z.number().optional(),
    branka: z.boolean().optional(),
    rozmeryBranek: z.object({
        delka: z.number().optional(),
        vyska: z.number().optional(),
        pocet: z.number().optional(),
        zamek: z.boolean().optional(),
        schranka: z.boolean().optional(),
        zvonek: z.boolean().optional(),
    }).array().optional(),
    celkemBranek: z.number().optional(),
    sloupky: z.boolean().optional(),
    typSloupku: z.string(),
    barvaTvarnice: z.string().optional(),
    povrchTvarnice: z.string().optional(),
    tvarnice: z.string().optional(),
    dilce: z.boolean().optional(),
    celkemDilcu: z.number().optional(),
    rozmeryDilcu: z.object({
        delka: z.number().optional(),
        vyska: z.number().optional(),
        pocet: z.number().optional(),
    }).array().optional(),
    yesA: z.boolean().optional(),
    yesB: z.boolean().optional(),
    yesC: z.boolean().optional(),
    yesD: z.boolean().optional(),
    widthA: z.number().optional(),
    heightA: z.number().optional(),
    widthB: z.number().optional(),
    heightB: z.number().optional(),
    widthC: z.number().optional(),
    heightC: z.number().optional(),
    widthD: z.number().optional(),
    heightD: z.number().optional(),
    motiv: z.string(),
    barva: z.string(),
    fullname: z.string()
        .min(6, {message: "Krátké jméno"})
        .max(40, {message: "Jméno je moc dlouhé"}),
    email: z.string().email({message: "Nesprávný formát e-mailu"}),
    company: z.string().optional(),
    phoneNumber: z.string().regex(phoneRegex, {
        message: "Nesprávný formát tel. čísla",
    }),
    zip: z.string().regex(pscRegex, {
        message: "Zadali jste PSČ v nesprávném formátu"
    }).min(5,{message: "PSČ je povinné"}),
    address: z.string().min(1,{message: "Adresa je povinná"}),
    obec: z.string().min(1, {message:"Obec je povinná"}),
    message: z.string().optional(),
    file: z
        .any()
        .optional(),

});

export type ConfiguratorType = z.infer<typeof confSchema>
export type PergolaConfType = z.infer<typeof pergolaSchema>
// `rozmeryObjekt` uses z.preprocess, so its parsed (output) shape differs from what
// react-hook-form holds before validation runs — useForm needs the input shape too.
export type PergolaFormInput = z.input<typeof pergolaSchema>