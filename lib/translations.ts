/**
 * Statický obsah webu ve třech jazycích (cs/sk/de). Žádná i18n knihovna —
 * jazyk se čte server-side z URL parametru `?lang=` na úrovni `page.tsx`
 * a posílá se dolů jako prop `lang` do komponent. V komponentě se pak text
 * vybírá stylem:
 *
 *   const t = heroContent[lang as keyof typeof heroContent] ?? heroContent.cs
 *
 * Struktura: jeden `export const` objekt na sekci/komponentu, klíčovaný cs/sk/de.
 */

export type Lang = "cs" | "sk" | "de"

export const LANGS: Lang[] = ["cs", "sk", "de"]

export function getLang(value?: string | string[]): Lang {
  const v = Array.isArray(value) ? value[0] : value
  return v === "sk" || v === "de" ? v : "cs"
}

/**
 * Appends `?lang=` to an internal href so cross-page links (nav, footer, CTAs)
 * keep the current language instead of silently falling back to cs. `cs` is
 * the default, so it's left off. Handles hrefs that already carry a `#hash`
 * or a `?query`.
 */
export function withLang(href: string, lang: Lang): string {
  if (lang === "cs") return href
  const hashIndex = href.indexOf("#")
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex)
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex)
  const separator = path.includes("?") ? "&" : "?"
  return `${path}${separator}lang=${lang}${hash}`
}

export const langNames: Record<Lang, { label: string; short: string }> = {
  cs: { label: "Čeština", short: "CZ" },
  sk: { label: "Slovenčina", short: "SK" },
  de: { label: "Deutsch", short: "DE" },
}

export const langSelectorContent = {
  cs: { aria: "Vyberte jazyk" },
  sk: { aria: "Vyberte jazyk" },
  de: { aria: "Sprache wählen" },
}

// ---------------------------------------------------------------------------
// NAV (site-header.tsx + nav/nav-data.ts)
// ---------------------------------------------------------------------------

export type NavLeafContent = { label: string; desc: string }
export type NavContent = {
  jsmeKonstanta: string
  jsmeKonstantaChildren: NavLeafContent[]
  coNabizime: string
  coNabizimeChildren: NavLeafContent[]
  realizace: string
  konfigurator: string
  proFirmy: string
  kontakty: string
  cta: string
  ctaShort: string
  openMenu: string
  closeMenu: string
  mainMenu: string
  menu: string
}

export const navContent: Record<Lang, NavContent> = {
  cs: {
    jsmeKonstanta: "Jsme Konstanta",
    jsmeKonstantaChildren: [
      { label: "Jsme Konstanta", desc: "Kdo jsme a čemu věříme" },
      { label: "Síla Konstanty", desc: "10 pilířů naší práce" },
      { label: "Co oceníte", desc: "Nejdůležitější v kostce" },
      { label: "Jak to u nás probíhá", desc: "Postup od zaměření po montáž" },
      { label: "Certifikáty a patenty", desc: "Patent, materiály, ocenění" },
      { label: "FAQ", desc: "Časté dotazy a odpovědi" },
    ],
    coNabizime: "Co nabízíme",
    coNabizimeChildren: [
      { label: "Ploty", desc: "Hliníkové ploty na míru" },
      { label: "Brány a branky", desc: "Posuvné, křídlové, s pohonem" },
      { label: "Pergoly", desc: "Bioklimatické s lamelami" },
      { label: "Přípravné práce", desc: "Základy a podezdívky" },
      { label: "Chytrá řešení", desc: "Automatizace a technologie" },
      { label: "Subdodávky", desc: "Pro firmy a partnery" },
    ],
    realizace: "Realizace",
    konfigurator: "Konfigurátor",
    proFirmy: "Pro firmy",
    kontakty: "Kontakty",
    cta: "Poptat řešení",
    ctaShort: "Poptat",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    mainMenu: "Hlavní menu",
    menu: "Menu",
  },
  sk: {
    jsmeKonstanta: "Sme Konstanta",
    jsmeKonstantaChildren: [
      { label: "Sme Konstanta", desc: "Kto sme a čomu veríme" },
      { label: "Sila Konstanty", desc: "10 pilierov našej práce" },
      { label: "Čo oceníte", desc: "Najdôležitejšie v skratke" },
      { label: "Ako to u nás prebieha", desc: "Postup od zamerania po montáž" },
      { label: "Certifikáty a patenty", desc: "Patent, materiály, ocenenia" },
      { label: "FAQ", desc: "Časté otázky a odpovede" },
    ],
    coNabizime: "Čo ponúkame",
    coNabizimeChildren: [
      { label: "Ploty", desc: "Hliníkové ploty na mieru" },
      { label: "Brány a bránky", desc: "Posuvné, krídlové, s pohonom" },
      { label: "Pergoly", desc: "Bioklimatické s lamelami" },
      { label: "Prípravné práce", desc: "Základy a podmurovky" },
      { label: "Inteligentné riešenia", desc: "Automatizácia a technológie" },
      { label: "Subdodávky", desc: "Pre firmy a partnerov" },
    ],
    realizace: "Realizácie",
    konfigurator: "Konfigurátor",
    proFirmy: "Pre firmy",
    kontakty: "Kontakty",
    cta: "Dopytovať riešenie",
    ctaShort: "Dopytovať",
    openMenu: "Otvoriť menu",
    closeMenu: "Zavrieť menu",
    mainMenu: "Hlavné menu",
    menu: "Menu",
  },
  de: {
    jsmeKonstanta: "Wir sind Konstanta",
    jsmeKonstantaChildren: [
      { label: "Wir sind Konstanta", desc: "Wer wir sind und woran wir glauben" },
      { label: "Die Stärke von Konstanta", desc: "10 Grundsätze unserer Arbeit" },
      { label: "Das schätzen Sie", desc: "Das Wichtigste auf einen Blick" },
      { label: "Ablauf bei uns", desc: "Vom Aufmaß bis zur Montage" },
      { label: "Zertifikate und Patente", desc: "Patent, Materialien, Auszeichnungen" },
      { label: "FAQ", desc: "Häufige Fragen und Antworten" },
    ],
    coNabizime: "Unser Angebot",
    coNabizimeChildren: [
      { label: "Zäune", desc: "Maßgefertigte Aluminiumzäune" },
      { label: "Tore und Türen", desc: "Schiebe-, Flügeltore, mit Antrieb" },
      { label: "Pergolen", desc: "Bioklimatisch mit Lamellen" },
      { label: "Vorbereitende Arbeiten", desc: "Fundamente und Sockelmauern" },
      { label: "Smarte Lösungen", desc: "Automatisierung und Technik" },
      { label: "Zulieferungen", desc: "Für Firmen und Partner" },
    ],
    realizace: "Referenzen",
    konfigurator: "Konfigurator",
    proFirmy: "Für Firmen",
    kontakty: "Kontakt",
    cta: "Angebot anfragen",
    ctaShort: "Anfragen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    mainMenu: "Hauptmenü",
    menu: "Menü",
  },
}

// ---------------------------------------------------------------------------
// FOOTER (site-footer.tsx)
// ---------------------------------------------------------------------------

export const footerContent = {
  cs: {
    tagline: "Výroba a montáž moderních hliníkových plotů, bran, branek a pergol na míru po celé České republice.",
    coNabizime: "Co nabízíme",
    jsmeKonstanta: "Jsme Konstanta",
    kontakt: "Kontakt",
    fakturacniUdaje: "Fakturační údaje",
    productLinks: ["Ploty", "Brány a branky", "Pergoly", "Přípravné práce", "Chytrá řešení", "Subdodávky"],
    companyLinks: [
      "Jsme Konstanta",
      "Síla Konstanty",
      "Co oceníte",
      "Jak to u nás probíhá",
      "Certifikáty a patenty",
      "FAQ",
      "Realizace",
      "Pro firmy",
      "Kontakty",
    ],
    contactGroups: [
      { title: "Zaměření a obchod" },
      { title: "Fakturace, kalkulace, nabídky" },
      { title: "Výroba a technické řešení" },
    ],
    sidlo: "Sídlo:",
    rights: "Všechna práva vyhrazena.",
    bottomTagline: "Hliníkové ploty na míru",
  },
  sk: {
    tagline: "Výroba a montáž moderných hliníkových plotov, brán, bránok a pergol na mieru po celom Česku.",
    coNabizime: "Čo ponúkame",
    jsmeKonstanta: "Sme Konstanta",
    kontakt: "Kontakt",
    fakturacniUdaje: "Fakturačné údaje",
    productLinks: ["Ploty", "Brány a bránky", "Pergoly", "Prípravné práce", "Inteligentné riešenia", "Subdodávky"],
    companyLinks: [
      "Sme Konstanta",
      "Sila Konstanty",
      "Čo oceníte",
      "Ako to u nás prebieha",
      "Certifikáty a patenty",
      "FAQ",
      "Realizácie",
      "Pre firmy",
      "Kontakty",
    ],
    contactGroups: [
      { title: "Zameranie a obchod" },
      { title: "Fakturácia, kalkulácie, ponuky" },
      { title: "Výroba a technické riešenia" },
    ],
    sidlo: "Sídlo:",
    rights: "Všetky práva vyhradené.",
    bottomTagline: "Hliníkové ploty na mieru",
  },
  de: {
    tagline:
      "Herstellung und Montage moderner, maßgefertigter Aluminiumzäune, Tore, Türen und Pergolen in ganz Tschechien.",
    coNabizime: "Unser Angebot",
    jsmeKonstanta: "Wir sind Konstanta",
    kontakt: "Kontakt",
    fakturacniUdaje: "Rechnungsangaben",
    productLinks: ["Zäune", "Tore und Türen", "Pergolen", "Vorbereitende Arbeiten", "Smarte Lösungen", "Zulieferungen"],
    companyLinks: [
      "Wir sind Konstanta",
      "Die Stärke von Konstanta",
      "Das schätzen Sie",
      "Ablauf bei uns",
      "Zertifikate und Patente",
      "FAQ",
      "Referenzen",
      "Für Firmen",
      "Kontakt",
    ],
    contactGroups: [
      { title: "Aufmaß und Vertrieb" },
      { title: "Rechnungsstellung, Kalkulation, Angebote" },
      { title: "Fertigung und technische Lösungen" },
    ],
    sidlo: "Sitz:",
    rights: "Alle Rechte vorbehalten.",
    bottomTagline: "Maßgefertigte Aluminiumzäune",
  },
}

// ---------------------------------------------------------------------------
// HERO (hero.tsx) + HorizontalGallery.tsx (sdílí highlights/metaLeft/subtitle)
// ---------------------------------------------------------------------------

export const heroContent = {
  cs: {
    metaLeft: "Konstanta HP · IČO 21827150 · CZ",
    metaRight: "Hliníkové oplocení na míru · Est. 2010",
    titleLines: ["Ploty,", "které", "vydrží."],
    subtitle:
      "Navrhujeme, vyrábíme a montujeme moderní hliníkové oplocení, brány, branky a pergoly přesně na míru vašemu domu. Bez kompromisů.",
    highlights: ["Bezúdržbový hliník", "Výroba na míru", "Montáž po celé ČR"],
    ctaPrimary: "Kalkulace zdarma",
    ctaSecondary: "Prohlédnout produkty",
    prevAlt: "Předchozí fotka",
    nextAlt: "Další fotka",
    goToAlt: (n: number) => `Přejít na fotku ${n}`,
    badgeNumber: "15+",
    badgeText: "let zkušeností",
    slideAlts: [
      "Moderní hliníkový plot před rodinným domem",
      "Hliníková posuvná brána u moderního domu",
      "Hliníkový plot v dekoru dřeva kolem zahrady",
    ],
  },
  sk: {
    metaLeft: "Konstanta HP · IČO 21827150 · CZ",
    metaRight: "Hliníkové oplotenie na mieru · Est. 2010",
    titleLines: ["Ploty,", "ktoré", "vydržia."],
    subtitle:
      "Navrhujeme, vyrábame a montujeme moderné hliníkové oplotenie, brány, bránky a pergoly presne na mieru vášmu domu. Bez kompromisov.",
    highlights: ["Bezúdržbový hliník", "Výroba na mieru", "Montáž po celom Česku"],
    ctaPrimary: "Kalkulácia zadarmo",
    ctaSecondary: "Prezrieť produkty",
    prevAlt: "Predchádzajúca fotka",
    nextAlt: "Ďalšia fotka",
    goToAlt: (n: number) => `Prejsť na fotku ${n}`,
    badgeNumber: "15+",
    badgeText: "rokov skúseností",
    slideAlts: [
      "Moderný hliníkový plot pred rodinným domom",
      "Hliníková posuvná brána pri modernom dome",
      "Hliníkový plot v dekore dreva okolo záhrady",
    ],
  },
  de: {
    metaLeft: "Konstanta HP · IČO 21827150 · CZ",
    metaRight: "Maßgefertigte Aluminiumzäune · Seit 2010",
    titleLines: ["Zäune,", "die", "halten."],
    subtitle:
      "Wir entwerfen, fertigen und montieren moderne Aluminiumzäune, Tore, Türen und Pergolen exakt nach Maß für Ihr Zuhause. Ohne Kompromisse.",
    highlights: ["Wartungsfreies Aluminium", "Maßanfertigung", "Montage in ganz Tschechien"],
    ctaPrimary: "Kostenlose Kalkulation",
    ctaSecondary: "Produkte ansehen",
    prevAlt: "Vorheriges Bild",
    nextAlt: "Nächstes Bild",
    goToAlt: (n: number) => `Zu Bild ${n} wechseln`,
    badgeNumber: "15+",
    badgeText: "Jahre Erfahrung",
    slideAlts: [
      "Moderner Aluminiumzaun vor einem Einfamilienhaus",
      "Aluminium-Schiebetor an einem modernen Haus",
      "Aluminiumzaun in Holzdekor rund um den Garten",
    ],
  },
}

export const galleryContent = {
  cs: {
    titles: ["PLOTY", "BRÁNY", "BRANKY", "PERGOLY"],
    labels: ["Hliníkové ploty", "Hliníkové brány", "Hliníkové branky", "Hliníkové pergoly"],
    kicker: "Hliníkové oplocení na míru",
    cta: "Nezávazná kalkulace",
  },
  sk: {
    titles: ["PLOTY", "BRÁNY", "BRÁNKY", "PERGOLY"],
    labels: ["Hliníkové ploty", "Hliníkové brány", "Hliníkové bránky", "Hliníkové pergoly"],
    kicker: "Hliníkové oplotenie na mieru",
    cta: "Nezáväzná kalkulácia",
  },
  de: {
    titles: ["ZÄUNE", "TORE", "TÜREN", "PERGOLEN"],
    labels: ["Aluminiumzäune", "Aluminiumtore", "Aluminiumtüren", "Aluminiumpergolen"],
    kicker: "Maßgefertigte Aluminiumzäune",
    cta: "Unverbindliche Kalkulation",
  },
}

// ---------------------------------------------------------------------------
// STATS (stats.tsx)
// ---------------------------------------------------------------------------

export const statsContent = {
  cs: [
    { code: "[ 01 ]", title: "Výroba na míru", text: "Každý plot navrhujeme přesně podle vašeho pozemku a domu." },
    { code: "[ 02 ]", title: "Bezúdržbový hliník", text: "Nereziví, nehnije a barva drží roky bez nátěrů." },
    { code: "[ 03 ]", title: "Montáž po celé ČR", text: "Zaměření, doprava i montáž zajistíme kompletně sami." },
    { code: "[ 04 ]", title: "Vlastní realizace", text: "Vše máme plně v naší režii – od základů po finální montáž." },
  ],
  sk: [
    { code: "[ 01 ]", title: "Výroba na mieru", text: "Každý plot navrhujeme presne podľa vášho pozemku a domu." },
    { code: "[ 02 ]", title: "Bezúdržbový hliník", text: "Nehrdzavie, nehnije a farba vydrží roky bez náterov." },
    { code: "[ 03 ]", title: "Montáž po celom Česku", text: "Zameranie, dopravu aj montáž zabezpečíme kompletne sami." },
    { code: "[ 04 ]", title: "Vlastná realizácia", text: "Všetko máme plne vo vlastnej réžii – od základov po finálnu montáž." },
  ],
  de: [
    { code: "[ 01 ]", title: "Maßanfertigung", text: "Jeden Zaun planen wir exakt nach Ihrem Grundstück und Haus." },
    { code: "[ 02 ]", title: "Wartungsfreies Aluminium", text: "Rostet nicht, verrottet nicht, die Farbe hält jahrelang ohne Anstrich." },
    { code: "[ 03 ]", title: "Montage in ganz Tschechien", text: "Aufmaß, Transport und Montage übernehmen wir komplett selbst." },
    { code: "[ 04 ]", title: "Eigene Umsetzung", text: "Alles liegt vollständig in unserer eigenen Hand – vom Fundament bis zur finalen Montage." },
  ],
}

// ---------------------------------------------------------------------------
// PRODUCTS (products.tsx)
// ---------------------------------------------------------------------------

export const productsContent = {
  cs: {
    heading: "Kompletní hliníkové oplocení na míru",
    badge: "4 produktové řady",
    cta: "Poptat",
    items: [
      { title: "Hliníkové ploty", tags: ["Bezúdržbové", "Moderní vzhled", "Odolnost"], text: "Horizontální i vertikální profily v široké škále barev RAL." },
      { title: "Brány", tags: ["Posuvné", "Křídlové", "S pohonem"], text: "Posuvné i křídlové brány s elektrickým pohonem na dálkové ovládání." },
      { title: "Branky", tags: ["Na míru", "Elektrozámek", "Design"], text: "Vstupní branky sladěné s plotem i bránou do jednoho celku." },
      { title: "Pergoly", tags: ["Bioklimatické", "Lamely", "Stínění"], text: "Hliníkové pergoly s nastavitelnými lamelami pro příjemný stín." },
    ],
  },
  sk: {
    heading: "Kompletné hliníkové oplotenie na mieru",
    badge: "4 produktové rady",
    cta: "Dopytovať",
    items: [
      { title: "Hliníkové ploty", tags: ["Bezúdržbové", "Moderný vzhľad", "Odolnosť"], text: "Horizontálne aj vertikálne profily v širokej škále farieb RAL." },
      { title: "Brány", tags: ["Posuvné", "Krídlové", "S pohonom"], text: "Posuvné aj krídlové brány s elektrickým pohonom na diaľkové ovládanie." },
      { title: "Bránky", tags: ["Na mieru", "Elektrozámok", "Dizajn"], text: "Vstupné bránky zladené s plotom aj bránou do jedného celku." },
      { title: "Pergoly", tags: ["Bioklimatické", "Lamely", "Tienenie"], text: "Hliníkové pergoly s nastaviteľnými lamelami pre príjemný tieň." },
    ],
  },
  de: {
    heading: "Komplette Aluminiumzäune nach Maß",
    badge: "4 Produktreihen",
    cta: "Anfragen",
    items: [
      { title: "Aluminiumzäune", tags: ["Wartungsfrei", "Modernes Design", "Langlebig"], text: "Horizontale und vertikale Profile in einer breiten Palette an RAL-Farben." },
      { title: "Tore", tags: ["Schiebetore", "Flügeltore", "Mit Antrieb"], text: "Schiebe- und Flügeltore mit elektrischem Antrieb und Fernbedienung." },
      { title: "Türen", tags: ["Nach Maß", "Elektroschloss", "Design"], text: "Eingangstüren, die perfekt auf Zaun und Tor abgestimmt sind." },
      { title: "Pergolen", tags: ["Bioklimatisch", "Lamellen", "Beschattung"], text: "Aluminiumpergolen mit verstellbaren Lamellen für angenehmen Schatten." },
    ],
  },
}

// ---------------------------------------------------------------------------
// PROCESS (process.tsx)
// ---------------------------------------------------------------------------

export const processContent = {
  cs: {
    heading: "Průběh realizace krok za krokem",
    steps: [
      { num: "01", title: "Zaměření a kalkulace", text: "První schůzku, zaměření i kalkulaci máte zcela zdarma. Projdeme si vaše představy, doporučíme vhodné řešení a navrhneme přesný rozpočet." },
      { num: "02", title: "Příprava základů", text: "Připravíme a vybetonujeme základy pro pevné a rovné osazení konstrukce, aby plot dokonale držel po celá desetiletí." },
      { num: "03", title: "Zdění", text: "Vyzdíme podezdívku a sloupky tak, aby šlo vše jednoduše a milimetrově přesně smontovat a výsledek působil čistě." },
      { num: "04", title: "Montáž", text: "Hliníkové dílce, brány a branky odborně sestavíme a osadíme přímo na místě. Dbáme na detail a perfektní funkci." },
      { num: "05", title: "Spokojený zákazník", text: "Spokojený zákazník je pro nás tou nejlepší odměnou a nejlepší referencí. Předáme hotové dílo a jsme tu i nadále k dispozici." },
    ],
  },
  sk: {
    heading: "Priebeh realizácie krok za krokom",
    steps: [
      { num: "01", title: "Zameranie a kalkulácia", text: "Prvé stretnutie, zameranie aj kalkuláciu máte úplne zadarmo. Prejdeme si vaše predstavy, odporučíme vhodné riešenie a navrhneme presný rozpočet." },
      { num: "02", title: "Príprava základov", text: "Pripravíme a vybetónujeme základy pre pevné a rovné osadenie konštrukcie, aby plot dokonale vydržal celé desaťročia." },
      { num: "03", title: "Murovanie", text: "Vymurujeme podmurovku a stĺpiky tak, aby sa dalo všetko jednoducho a milimetrovo presne zmontovať a výsledok pôsobil čisto." },
      { num: "04", title: "Montáž", text: "Hliníkové dielce, brány a bránky odborne zostavíme a osadíme priamo na mieste. Dbáme na detail a bezchybnú funkciu." },
      { num: "05", title: "Spokojný zákazník", text: "Spokojný zákazník je pre nás tou najlepšou odmenou a najlepšou referenciou. Odovzdáme hotové dielo a sme naďalej k dispozícii." },
    ],
  },
  de: {
    heading: "Der Ablauf Schritt für Schritt",
    steps: [
      { num: "01", title: "Aufmaß und Kalkulation", text: "Das erste Treffen, Aufmaß und Kalkulation sind für Sie völlig kostenlos. Wir besprechen Ihre Vorstellungen, empfehlen die passende Lösung und erstellen ein genaues Angebot." },
      { num: "02", title: "Fundament vorbereiten", text: "Wir bereiten das Fundament vor und betonieren es, damit die Konstruktion fest und gerade steht und der Zaun jahrzehntelang hält." },
      { num: "03", title: "Mauerarbeiten", text: "Wir mauern Sockel und Pfeiler so, dass sich alles einfach und millimetergenau montieren lässt und das Ergebnis sauber wirkt." },
      { num: "04", title: "Montage", text: "Aluminiumelemente, Tore und Türen bauen wir fachgerecht zusammen und montieren sie direkt vor Ort. Wir achten auf jedes Detail und perfekte Funktion." },
      { num: "05", title: "Zufriedener Kunde", text: "Ein zufriedener Kunde ist für uns die beste Belohnung und beste Referenz. Wir übergeben das fertige Werk und stehen auch danach zur Verfügung." },
    ],
  },
}

// ---------------------------------------------------------------------------
// WHY US (why-us.tsx)
// ---------------------------------------------------------------------------

export const whyUsContent = {
  cs: {
    heading: "Česká firma, která upřednostňuje kvalitu před kvantitou",
    paragraph:
      "Jsme Konstanta HP – tým, který bere každou zakázku osobně. Veškeré produkty máme plně ve vlastní režii, a proto můžeme garantovat kvalitu i dlouhou životnost každého plotu.",
    reasons: [
      "Vyrábíme i montujeme vše ve vlastní režii",
      "Garance kvality a maximální spokojenosti",
      "Hliník bez nutnosti údržby a nátěrů",
      "Řešení na míru i pro atypické pozemky",
    ],
    ctaAbout: "O Konstantě",
    ctaContact: "Nezávazná kalkulace",
  },
  sk: {
    heading: "Česká firma, ktorá uprednostňuje kvalitu pred kvantitou",
    paragraph:
      "Sme Konstanta HP – tím, ktorý berie každú zákazku osobne. Všetky produkty máme plne vo vlastnej réžii, a preto môžeme garantovať kvalitu aj dlhú životnosť každého plota.",
    reasons: [
      "Vyrábame aj montujeme všetko vo vlastnej réžii",
      "Garancia kvality a maximálnej spokojnosti",
      "Hliník bez nutnosti údržby a náterov",
      "Riešenia na mieru aj pre atypické pozemky",
    ],
    ctaAbout: "O Konstante",
    ctaContact: "Nezáväzná kalkulácia",
  },
  de: {
    heading: "Ein tschechisches Unternehmen, das Qualität vor Quantität stellt",
    paragraph:
      "Wir sind Konstanta HP – ein Team, dem jeder Auftrag persönlich am Herzen liegt. Alle Produkte fertigen wir vollständig in Eigenregie und garantieren so Qualität und lange Lebensdauer jedes Zauns.",
    reasons: [
      "Wir fertigen und montieren alles in Eigenregie",
      "Garantierte Qualität und höchste Zufriedenheit",
      "Aluminium ganz ohne Wartung und Anstrich",
      "Maßlösungen auch für ungewöhnliche Grundstücke",
    ],
    ctaAbout: "Über Konstanta",
    ctaContact: "Unverbindliche Kalkulation",
  },
}

// ---------------------------------------------------------------------------
// REALIZACE (realizace.tsx)
// ---------------------------------------------------------------------------

export const realizaceContent = {
  cs: {
    heading: "Naše realizace",
    cta: "Všechny realizace",
    items: [
      { title: "Hliníkový plot", place: "Rodinný dům, Brno", motif: "Tahokov" },
      { title: "Plot s posuvnou bránou", place: "Novostavba, Praha-západ", motif: "Plaňka 90" },
      { title: "Plot v dekoru dřeva", place: "Vila, Olomouc", motif: "Okenice standard" },
    ],
  },
  sk: {
    heading: "Naše realizácie",
    cta: "Všetky realizácie",
    items: [
      { title: "Hliníkový plot", place: "Rodinný dom, Brno", motif: "Ťahokov" },
      { title: "Plot s posuvnou bránou", place: "Novostavba, Praha-západ", motif: "Latka 90" },
      { title: "Plot v dekore dreva", place: "Vila, Olomouc", motif: "Okenica štandard" },
    ],
  },
  de: {
    heading: "Unsere Referenzen",
    cta: "Alle Referenzen",
    items: [
      { title: "Aluminiumzaun", place: "Einfamilienhaus, Brünn", motif: "Streckmetall" },
      { title: "Zaun mit Schiebetor", place: "Neubau, Prag-West", motif: "Lamelle 90" },
      { title: "Zaun in Holzdekor", place: "Villa, Olmütz", motif: "Fensterladen Standard" },
    ],
  },
}

// ---------------------------------------------------------------------------
// TESTIMONIALS (testimonials.tsx) — jména necháváme, překládá se jen text
// ---------------------------------------------------------------------------

export const testimonialsContent = {
  cs: {
    heading: "Hodnocení od našich klientů",
    reviews: [
      { name: "Petr Novák", place: "Brno", text: "Naprostá spokojenost. Plot i brána vypadají skvěle a montáž proběhla rychle a čistě. Doporučuji.", project: "Hliníkový plot" },
      { name: "Jana Dvořáková", place: "Praha", text: "Profesionální přístup od zaměření až po montáž. Konečně plot, o který se nemusíme starat.", project: "Plot s posuvnou bránou" },
      { name: "Martin Svoboda", place: "Olomouc", text: "Skvělá komunikace a férová cena. Pergola s lamelami předčila naše očekávání.", project: "Bioklimatická pergola" },
    ],
  },
  sk: {
    heading: "Hodnotenia od našich klientov",
    reviews: [
      { name: "Petr Novák", place: "Brno", text: "Absolútna spokojnosť. Plot aj brána vyzerajú skvele a montáž prebehla rýchlo a čisto. Odporúčam.", project: "Hliníkový plot" },
      { name: "Jana Dvořáková", place: "Praha", text: "Profesionálny prístup od zamerania až po montáž. Konečne plot, o ktorý sa nemusíme starať.", project: "Plot s posuvnou bránou" },
      { name: "Martin Svoboda", place: "Olomouc", text: "Skvelá komunikácia a férová cena. Pergola s lamelami prekonala naše očakávania.", project: "Bioklimatická pergola" },
    ],
  },
  de: {
    heading: "Bewertungen unserer Kunden",
    reviews: [
      { name: "Petr Novák", place: "Brünn", text: "Absolut zufrieden. Zaun und Tor sehen großartig aus, die Montage verlief schnell und sauber. Empfehlenswert.", project: "Aluminiumzaun" },
      { name: "Jana Dvořáková", place: "Prag", text: "Professionelles Vorgehen vom Aufmaß bis zur Montage. Endlich ein Zaun, um den wir uns nicht kümmern müssen.", project: "Zaun mit Schiebetor" },
      { name: "Martin Svoboda", place: "Olmütz", text: "Großartige Kommunikation und ein fairer Preis. Die Lamellenpergola hat unsere Erwartungen übertroffen.", project: "Bioklimatische Pergola" },
    ],
  },
}

// ---------------------------------------------------------------------------
// SOCIAL (social.tsx)
// ---------------------------------------------------------------------------

export const socialContent = {
  cs: {
    heading: "Jsme i na sociálních sítích",
    subtitle: "Podívejte se na naše nejnovější realizace, novinky a inspiraci na hliníkové ploty, brány a pergoly.",
    emailLabel: "E-mail",
    igAriaPrefix: "Otevřít příspěvek na Instagramu:",
    galleryAlts: [
      "Hliníkový plot s vodorovnými lamelami",
      "Posuvná hliníková brána",
      "Detail hliníkových lamel",
      "Hliníková branka",
      "Hliníková pergola",
      "Plot s imitací dřeva",
      "Plot s integrovanou schránkou",
      "Montáž plotu",
      "Dům s osvětleným plotem",
    ],
  },
  sk: {
    heading: "Sme aj na sociálnych sieťach",
    subtitle: "Pozrite si naše najnovšie realizácie, novinky a inšpiráciu na hliníkové ploty, brány a pergoly.",
    emailLabel: "E-mail",
    igAriaPrefix: "Otvoriť príspevok na Instagrame:",
    galleryAlts: [
      "Hliníkový plot s vodorovnými lamelami",
      "Posuvná hliníková brána",
      "Detail hliníkových lamel",
      "Hliníková bránka",
      "Hliníková pergola",
      "Plot s imitáciou dreva",
      "Plot s integrovanou schránkou",
      "Montáž plota",
      "Dom s osvetleným plotom",
    ],
  },
  de: {
    heading: "Wir sind auch in sozialen Netzwerken",
    subtitle:
      "Entdecken Sie unsere neuesten Projekte, Neuigkeiten und Inspiration rund um Aluminiumzäune, Tore und Pergolen.",
    emailLabel: "E-Mail",
    igAriaPrefix: "Instagram-Beitrag öffnen:",
    galleryAlts: [
      "Aluminiumzaun mit horizontalen Lamellen",
      "Aluminium-Schiebetor",
      "Detailansicht der Aluminiumlamellen",
      "Aluminiumtür",
      "Aluminiumpergola",
      "Zaun in Holzoptik",
      "Zaun mit integriertem Briefkasten",
      "Zaunmontage",
      "Haus mit beleuchtetem Zaun",
    ],
  },
}

// ---------------------------------------------------------------------------
// CONTACT (contact.tsx)
// ---------------------------------------------------------------------------

export const contactContent = {
  cs: {
    heading: "Pojďme naplánovat váš nový plot",
    paragraph: "Vyplňte formulář a my se vám ozveme s nezávaznou kalkulací zdarma. Zaměření i návrh řešení je u nás samozřejmostí.",
    groups: [
      { title: "Zaměření a obchod" },
      { title: "Fakturace, kalkulace, nabídky" },
      { title: "Výroba a technické řešení" },
    ],
    fakturacniUdaje: "Fakturační údaje",
    sidlo: "Sídlo:",
    successTitle: "Děkujeme!",
    successText: "Vaši poptávku jsme přijali. Brzy se vám ozveme.",
    labels: { name: "Jméno a příjmení", phone: "Telefon", email: "E-mail", company: "Firma", message: "Co potřebujete?" },
    placeholders: { name: "Jan Novák", phone: "+420 000 000 000", email: "jan@email.cz", company: "Konstanta HP s.r.o", message: "Mám zájem o plot a posuvnou bránu..." },
    submit: "Odeslat poptávku",
    consent: "Odesláním souhlasíte se zpracováním osobních údajů za účelem vyřízení poptávky.",
    mapTitle: "Mapa - KONSTANTA hliníkové ploty, Maleč 36",
  },
  sk: {
    heading: "Poďme naplánovať váš nový plot",
    paragraph: "Vyplňte formulár a my sa vám ozveme s nezáväznou kalkuláciou zadarmo. Zameranie aj návrh riešenia je u nás samozrejmosťou.",
    groups: [
      { title: "Zameranie a obchod" },
      { title: "Fakturácia, kalkulácie, ponuky" },
      { title: "Výroba a technické riešenia" },
    ],
    fakturacniUdaje: "Fakturačné údaje",
    sidlo: "Sídlo:",
    successTitle: "Ďakujeme!",
    successText: "Váš dopyt sme prijali. Čoskoro sa vám ozveme.",
    labels: { name: "Meno a priezvisko", phone: "Telefón", email: "E-mail", company: "Firma", message: "Čo potrebujete?" },
    placeholders: { name: "Ján Novák", phone: "+420 000 000 000", email: "jan@email.sk", company: "Konstanta HP s.r.o", message: "Mám záujem o plot a posuvnú bránu..." },
    submit: "Odoslať dopyt",
    consent: "Odoslaním súhlasíte so spracovaním osobných údajov na účely vybavenia dopytu.",
    mapTitle: "Mapa - KONSTANTA hliníkové ploty, Maleč 36",
  },
  de: {
    heading: "Lassen Sie uns Ihren neuen Zaun planen",
    paragraph:
      "Füllen Sie das Formular aus, und wir melden uns bei Ihnen mit einer kostenlosen, unverbindlichen Kalkulation. Aufmaß und Lösungsvorschlag sind bei uns selbstverständlich.",
    groups: [
      { title: "Aufmaß und Vertrieb" },
      { title: "Rechnungsstellung, Kalkulation, Angebote" },
      { title: "Fertigung und technische Lösungen" },
    ],
    fakturacniUdaje: "Rechnungsangaben",
    sidlo: "Sitz:",
    successTitle: "Vielen Dank!",
    successText: "Ihre Anfrage ist bei uns eingegangen. Wir melden uns in Kürze bei Ihnen.",
    labels: { name: "Vor- und Nachname", phone: "Telefon", email: "E-Mail", company: "Firma", message: "Was benötigen Sie?" },
    placeholders: { name: "Max Mustermann", phone: "+420 000 000 000", email: "max@email.de", company: "Konstanta HP s.r.o", message: "Ich interessiere mich für einen Zaun und ein Schiebetor..." },
    submit: "Anfrage senden",
    consent: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer personenbezogenen Daten zur Bearbeitung der Anfrage zu.",
    mapTitle: "Karte – KONSTANTA hliníkové ploty, Maleč 36",
  },
}

// ---------------------------------------------------------------------------
// O NÁS — profile-hero.tsx
// ---------------------------------------------------------------------------

export const profileHeroContent = {
  cs: {
    kicker: "O nás",
    titleLines: ["Jsme", "Konstanta"],
    subtitle: "Váš parťák pro precizní ploty, brány a pergoly. Sázíme na kvalitu, která přežije generace.",
    stats: [
      { yearPrefix: "od ", label: "rok vzniku" },
      { suffix: " h", label: "montáž do" },
      { suffix: "×", label: "patentovaný systém" },
    ],
    cta: "Poptat řešení",
    captionLeft: "Hliníkový plot na míru",
    captionRight: "Komorové profily · hliník EN-AW",
  },
  sk: {
    kicker: "O nás",
    titleLines: ["Sme", "Konstanta"],
    subtitle: "Váš parťák pre precízne ploty, brány a pergoly. Staviame na kvalite, ktorá prežije generácie.",
    stats: [
      { yearPrefix: "od ", label: "rok vzniku" },
      { suffix: " h", label: "montáž do" },
      { suffix: "×", label: "patentovaný systém" },
    ],
    cta: "Dopytovať riešenie",
    captionLeft: "Hliníkový plot na mieru",
    captionRight: "Komorové profily · hliník EN-AW",
  },
  de: {
    kicker: "Über uns",
    titleLines: ["Wir sind", "Konstanta"],
    subtitle: "Ihr Partner für präzise Zäune, Tore und Pergolen. Wir setzen auf Qualität, die Generationen überdauert.",
    stats: [
      { yearPrefix: "seit ", label: "Gründungsjahr" },
      { suffix: " Std.", label: "Montage in" },
      { suffix: "×", label: "patentiertes System" },
    ],
    cta: "Angebot anfragen",
    captionLeft: "Maßgefertigter Aluminiumzaun",
    captionRight: "Kammerprofile · Aluminium EN-AW",
  },
}

export const storyContent = {
  cs: {
    kicker: "Náš příběh",
    heading: "Konstanta = stabilita a spolehlivost",
    paragraphs: [
      "KONSTANTA – rodinná firma, kterou jsme založili v roce 2022. Začínali jsme v celkem divoké době, ale poctivé řemeslo si cestu vždycky najde. Měli jsme jasný plán a chuť dělat věci pořádně a jinak. Dnes máme za sebou přes stovky hotových projektů, a hlavně čisté svědomí, že za námi zůstává dobrá práce, která přežije generace.",
      "Název KONSTANTA nevznikl náhodou. Je to symbol stability a spolehlivosti. A přesně tím chceme být pro naše zákazníky. Naše věci navrhujeme a montujeme tak, aby vydržely – bez kompromisů. Nehoníme se za rekordy v počtu zakázek, svou práci děláme precizně a kvalita je u nás vždy na prvním místě.",
      "A přesně takové jsou naše ploty, brány a pergoly – prostě drží, nesesypou se po první zimě a budou vám dělat radost spoustu let.",
      "Pokud chcete parťáky, kteří se s vámi lidsky domluví, drží slovo a udělají precizní práci, jsme tu pro vás.",
    ],
    badgeYear: "2022",
    badgeLabel: "rodinná firma",
  },
  sk: {
    kicker: "Náš príbeh",
    heading: "Konstanta = stabilita a spoľahlivosť",
    paragraphs: [
      "KONSTANTA – rodinná firma, ktorú sme založili v roku 2022. Začínali sme v pomerne divokej dobe, ale poctivé remeslo si cestu vždy nájde. Mali sme jasný plán a chuť robiť veci poriadne a inak. Dnes máme za sebou stovky hotových projektov, a hlavne čisté svedomie, že za nami zostáva dobrá práca, ktorá prežije generácie.",
      "Názov KONSTANTA nevznikol náhodou. Je to symbol stability a spoľahlivosti. A presne tým chceme byť pre našich zákazníkov. Naše výrobky navrhujeme a montujeme tak, aby vydržali – bez kompromisov. Nehoníme sa za rekordami v počte zákaziek, svoju prácu robíme precízne a kvalita je u nás vždy na prvom mieste.",
      "A presne také sú naše ploty, brány a pergoly – jednoducho vydržia, nezrútia sa po prvej zime a budú vám robiť radosť veľa rokov.",
      "Ak chcete partnerov, ktorí sa s vami ľudsky dohodnú, dodržia slovo a odvedú precíznu prácu, sme tu pre vás.",
    ],
    badgeYear: "2022",
    badgeLabel: "rodinná firma",
  },
  de: {
    kicker: "Unsere Geschichte",
    heading: "Konstanta = Stabilität und Zuverlässigkeit",
    paragraphs: [
      "KONSTANTA – ein Familienunternehmen, das wir 2022 gegründet haben. Wir haben in einer ziemlich turbulenten Zeit angefangen, aber ehrliches Handwerk setzt sich immer durch. Wir hatten einen klaren Plan und Lust, die Dinge gründlich und anders zu machen. Heute haben wir Hunderte abgeschlossene Projekte hinter uns – und vor allem ein reines Gewissen, dass von uns gute Arbeit bleibt, die Generationen überdauert.",
      "Der Name KONSTANTA ist kein Zufall. Er ist ein Symbol für Stabilität und Zuverlässigkeit. Und genau das wollen wir für unsere Kunden sein. Wir entwerfen und montieren unsere Produkte so, dass sie halten – ohne Kompromisse. Wir jagen keinen Auftragsrekorden hinterher, sondern arbeiten präzise, und Qualität steht bei uns immer an erster Stelle.",
      "Und genau so sind unsere Zäune, Tore und Pergolen – sie halten einfach, fallen nicht nach dem ersten Winter auseinander und werden Ihnen viele Jahre lang Freude bereiten.",
      "Wenn Sie Partner suchen, die sich menschlich mit Ihnen verständigen, ihr Wort halten und präzise Arbeit leisten, sind wir für Sie da.",
    ],
    badgeYear: "2022",
    badgeLabel: "Familienunternehmen",
  },
}

export const sectionNavContent = {
  cs: { links: ["Jsme Konstanta", "Síla Konstanty", "Co oceníte", "Jak to probíhá", "Certifikáty", "FAQ"] },
  sk: { links: ["Sme Konstanta", "Sila Konstanty", "Čo oceníte", "Ako to prebieha", "Certifikáty", "FAQ"] },
  de: { links: ["Wir sind Konstanta", "Die Stärke von Konstanta", "Das schätzen Sie", "Wie es abläuft", "Zertifikate", "FAQ"] },
}

export const silaKonstantyContent = {
  cs: {
    kicker: "Proč my",
    headingLines: ["Síla", "Konstanty"],
    points: [
      { t: "Komplexní řešení bez starostí", d: "Zajistíme celý proces od návrhu až po montáž. Nemusíte řešit žádné koordinace mezi firmami." },
      { t: "Vždy myslíme dopředu", d: "Už při návrhu počítáme s budoucím využitím a návazností na další prvky jako pergoly, garáže, brány nebo technologie." },
      { t: "Promyšlená atypická řešení", d: "Umíme pracovat se svažitým terénem, omezeným prostorem i nestandardními požadavky. Každý projekt hledá vlastní řešení." },
      { t: "Vlastní patentovaný systém", d: "Používáme vlastní konstrukční systém založený na komorových profilech, který zvyšuje pevnost a stabilitu." },
      { t: "Bezkonkurenčně kvalitní materiály", d: "Pracujeme s hliníkovými systémy od ověřeného španělského dodavatele. Levné kompromisy nepoužíváme." },
      { t: "Mimořádný důraz na detail", d: "Čisté spoje, nerezové prvky a lakování v barvě konstrukce. Věci, které nejsou na první pohled vidět, rozhodují nejvíc." },
      { t: "Důsledná kontrola kvality", d: "Každý díl prochází kontrolou ještě před montáží. Co nesplní nároky, se dál nepouští." },
      { t: "Montáž v rekordním čase do 24 hodin", d: "Díky přípravě a sehranému týmu zvládáme většinu zakázek dokončit během jednoho dne." },
      { t: "Snadný servis i po letech", d: "Konstrukce jsou navržené tak, aby šly snadno rozebrat a opravit po částech." },
      { t: "Normální lidský přístup", d: "Zakládáme si na dlouhodobé spolupráci a odpovědnosti za odvedenou práci." },
    ],
  },
  sk: {
    kicker: "Prečo my",
    headingLines: ["Sila", "Konstanty"],
    points: [
      { t: "Komplexné riešenie bez starostí", d: "Zabezpečíme celý proces od návrhu až po montáž. Nemusíte riešiť žiadnu koordináciu medzi firmami." },
      { t: "Vždy myslíme dopredu", d: "Už pri návrhu počítame s budúcim využitím a nadväznosťou na ďalšie prvky ako pergoly, garáže, brány alebo technológie." },
      { t: "Premyslené atypické riešenia", d: "Vieme pracovať so svahovitým terénom, obmedzeným priestorom aj neštandardnými požiadavkami. Pre každý projekt hľadáme vlastné riešenie." },
      { t: "Vlastný patentovaný systém", d: "Používame vlastný konštrukčný systém založený na komorových profiloch, ktorý zvyšuje pevnosť a stabilitu." },
      { t: "Bezkonkurenčne kvalitné materiály", d: "Pracujeme s hliníkovými systémami od overeného španielskeho dodávateľa. Lacné kompromisy nepoužívame." },
      { t: "Mimoriadny dôraz na detail", d: "Čisté spoje, nerezové prvky a lakovanie vo farbe konštrukcie. Veci, ktoré nie sú na prvý pohľad vidieť, rozhodujú najviac." },
      { t: "Dôsledná kontrola kvality", d: "Každý diel prechádza kontrolou ešte pred montážou. Čo nespĺňa nároky, sa ďalej nepoužije." },
      { t: "Montáž v rekordnom čase do 24 hodín", d: "Vďaka príprave a zohratému tímu zvládame väčšinu zákaziek dokončiť počas jedného dňa." },
      { t: "Jednoduchý servis aj po rokoch", d: "Konštrukcie sú navrhnuté tak, aby sa dali jednoducho rozobrať a opraviť po častiach." },
      { t: "Normálny ľudský prístup", d: "Zakladáme si na dlhodobej spolupráci a zodpovednosti za odvedenú prácu." },
    ],
  },
  de: {
    kicker: "Warum wir",
    headingLines: ["Die Stärke", "von Konstanta"],
    points: [
      { t: "Komplettlösung ohne Aufwand für Sie", d: "Wir übernehmen den gesamten Prozess vom Entwurf bis zur Montage. Sie müssen keine Koordination zwischen mehreren Firmen übernehmen." },
      { t: "Wir denken immer voraus", d: "Schon beim Entwurf berücksichtigen wir die künftige Nutzung und den Anschluss an weitere Elemente wie Pergolen, Garagen, Tore oder Technik." },
      { t: "Durchdachte Speziallösungen", d: "Wir arbeiten mit Hanglagen, begrenztem Platz und ungewöhnlichen Anforderungen. Für jedes Projekt finden wir eine eigene Lösung." },
      { t: "Eigenes patentiertes System", d: "Wir verwenden ein eigenes Konstruktionssystem auf Basis von Kammerprofilen, das Festigkeit und Stabilität erhöht." },
      { t: "Unschlagbar hochwertige Materialien", d: "Wir arbeiten mit Aluminiumsystemen eines bewährten spanischen Lieferanten. Auf billige Kompromisse verzichten wir." },
      { t: "Außergewöhnlicher Blick fürs Detail", d: "Saubere Verbindungen, Edelstahlelemente und Lackierung im Farbton der Konstruktion. Details, die man nicht sofort sieht, entscheiden am meisten." },
      { t: "Konsequente Qualitätskontrolle", d: "Jedes Teil wird noch vor der Montage geprüft. Was den Anforderungen nicht entspricht, wird nicht verbaut." },
      { t: "Montage in Rekordzeit – innerhalb von 24 Stunden", d: "Dank guter Vorbereitung und eines eingespielten Teams schaffen wir die meisten Aufträge an einem Tag." },
      { t: "Einfacher Service auch nach Jahren", d: "Die Konstruktionen sind so konzipiert, dass sie sich leicht zerlegen und teilweise reparieren lassen." },
      { t: "Ganz normaler menschlicher Umgang", d: "Uns ist langfristige Zusammenarbeit und Verantwortung für die geleistete Arbeit wichtig." },
    ],
  },
}

export const coOceniteContent = {
  cs: {
    kicker: "Co oceníte",
    heading: "Nejdůležitější v kostce",
    benefits: [
      { title: "Montáž do 24 h", text: "Většinu zakázek dokončíme během jednoho dne." },
      { title: "Patentovaný komorový systém", text: "Vlastní konstrukce pro vyšší pevnost a stabilitu." },
      { title: "Španělský hliník bez kompromisů", text: "Ověřený dodavatel, žádné levné náhražky." },
      { title: "Servis i po letech", text: "Rozebíratelné konstrukce, opravitelné po částech." },
    ],
  },
  sk: {
    kicker: "Čo oceníte",
    heading: "Najdôležitejšie v skratke",
    benefits: [
      { title: "Montáž do 24 h", text: "Väčšinu zákaziek dokončíme počas jedného dňa." },
      { title: "Patentovaný komorový systém", text: "Vlastná konštrukcia pre vyššiu pevnosť a stabilitu." },
      { title: "Španielsky hliník bez kompromisov", text: "Overený dodávateľ, žiadne lacné náhrady." },
      { title: "Servis aj po rokoch", text: "Rozoberateľné konštrukcie, opraviteľné po častiach." },
    ],
  },
  de: {
    kicker: "Das schätzen Sie",
    heading: "Das Wichtigste auf einen Blick",
    benefits: [
      { title: "Montage innerhalb von 24 h", text: "Die meisten Aufträge schließen wir innerhalb eines Tages ab." },
      { title: "Patentiertes Kammersystem", text: "Eigene Konstruktion für höhere Festigkeit und Stabilität." },
      { title: "Spanisches Aluminium ohne Kompromisse", text: "Bewährter Lieferant, keine billigen Ersatzstoffe." },
      { title: "Service auch nach Jahren", text: "Zerlegbare Konstruktionen, teilweise reparierbar." },
    ],
  },
}

export const procesFlowContent = {
  cs: {
    kicker: "Postup",
    heading: "Jak to u nás probíhá",
    krokLabel: (n: string) => `Krok ${n}`,
    steps: [
      { title: "Komunikace + zaměření", text: "Sejdeme se, projdeme vaše představy a přesně zaměříme pozemek." },
      { title: "Návrh a poptávka řešení", text: "Navrhneme řešení na míru a připravíme jasnou nabídku bez skrytých položek." },
      { title: "Příprava základů", text: "Připravíme pevné a rovné základy pro dlouhou životnost konstrukce." },
      { title: "Výroba a kontrola kvality", text: "Díly vyrobíme z komorových profilů a každý zkontrolujeme ještě před montáží." },
      { title: "Montáž do 24 hodin", text: "Sehraný tým osadí většinu zakázek během jednoho dne, čistě a přesně." },
      { title: "Hotovo a servis", text: "Předáme hotové dílo a zůstáváme k dispozici i po letech." },
    ],
  },
  sk: {
    kicker: "Postup",
    heading: "Ako to u nás prebieha",
    krokLabel: (n: string) => `Krok ${n}`,
    steps: [
      { title: "Komunikácia a zameranie", text: "Stretneme sa, prejdeme vaše predstavy a presne zameriame pozemok." },
      { title: "Návrh a ponuka riešenia", text: "Navrhneme riešenie na mieru a pripravíme jasnú ponuku bez skrytých položiek." },
      { title: "Príprava základov", text: "Pripravíme pevné a rovné základy pre dlhú životnosť konštrukcie." },
      { title: "Výroba a kontrola kvality", text: "Diely vyrobíme z komorových profilov a každý skontrolujeme ešte pred montážou." },
      { title: "Montáž do 24 hodín", text: "Zohratý tím osadí väčšinu zákaziek počas jedného dňa, čisto a presne." },
      { title: "Hotovo a servis", text: "Odovzdáme hotové dielo a zostávame k dispozícii aj po rokoch." },
    ],
  },
  de: {
    kicker: "Ablauf",
    heading: "Wie es bei uns abläuft",
    krokLabel: (n: string) => `Schritt ${n}`,
    steps: [
      { title: "Kommunikation und Aufmaß", text: "Wir treffen uns, besprechen Ihre Vorstellungen und vermessen das Grundstück genau." },
      { title: "Entwurf und Angebot", text: "Wir entwerfen eine Lösung nach Maß und erstellen ein klares Angebot ohne versteckte Posten." },
      { title: "Fundament vorbereiten", text: "Wir bereiten ein festes, gerades Fundament für eine lange Lebensdauer der Konstruktion vor." },
      { title: "Fertigung und Qualitätskontrolle", text: "Die Teile fertigen wir aus Kammerprofilen und prüfen jedes einzelne vor der Montage." },
      { title: "Montage innerhalb von 24 Stunden", text: "Unser eingespieltes Team montiert die meisten Aufträge an einem Tag, sauber und präzise." },
      { title: "Fertig und Service", text: "Wir übergeben das fertige Werk und stehen auch nach Jahren zur Verfügung." },
    ],
  },
}

export const certifikatyContent = {
  cs: {
    kicker: "Certifikáty a patenty",
    heading: "Za kvalitou stojíme papírově",
    items: [
      { title: "Patentovaný komorový systém", note: "Vlastní chráněná konstrukce" },
      { title: "Certifikovaný hliník EN-AW", note: "Ověřený španělský dodavatel" },
      { title: "Firma roku", note: "Ocenění za odvedenou práci" },
      { title: "Záruka a doklady", note: "Vše písemně a bez hvězdiček" },
    ],
  },
  sk: {
    kicker: "Certifikáty a patenty",
    heading: "Za kvalitou si stojíme aj papierovo",
    items: [
      { title: "Patentovaný komorový systém", note: "Vlastná chránená konštrukcia" },
      { title: "Certifikovaný hliník EN-AW", note: "Overený španielsky dodávateľ" },
      { title: "Firma roka", note: "Ocenenie za odvedenú prácu" },
      { title: "Záruka a doklady", note: "Všetko písomne a bez hviezdičiek" },
    ],
  },
  de: {
    kicker: "Zertifikate und Patente",
    heading: "Unsere Qualität ist auch schriftlich belegt",
    items: [
      { title: "Patentiertes Kammersystem", note: "Eigene geschützte Konstruktion" },
      { title: "Zertifiziertes Aluminium EN-AW", note: "Bewährter spanischer Lieferant" },
      { title: "Firma des Jahres", note: "Auszeichnung für geleistete Arbeit" },
      { title: "Garantie und Unterlagen", note: "Alles schriftlich, ohne Kleingedrucktes" },
    ],
  },
}

export const faqContent = {
  cs: {
    kicker: "FAQ",
    heading: "Časté dotazy",
    intro: "Nenašli jste odpověď? Napište nebo zavolejte, rádi to probereme lidsky.",
    faqs: [
      { q: "Jakou dáváte záruku?", a: "Na konstrukci i montáž dáváme písemnou záruku a stojíme si za ní. A když se něco přihodí i po jejím vypršení, ozvěte se – k odvedené práci se hlásíme." },
      { q: "Za jak dlouho zvládnete montáž?", a: "Většinu zakázek osadíme během jednoho dne, tedy do 24 hodin. Přesný termín potvrdíme podle přípravy základů a rozsahu projektu." },
      { q: "Zvládnete i atypický nebo svažitý terén?", a: "Ano. Svažitý terén, omezený prostor i nestandardní požadavky jsou pro nás běžná práce – každý projekt řešíme individuálně a hledáme pro něj vlastní řešení." },
      { q: "Poradíte si se servisem po letech?", a: "Konstrukce navrhujeme jako rozebíratelné, takže je jde snadno opravit po částech. Nemusíte kvůli jednomu detailu měnit celý plot." },
      { q: "Z jakého materiálu ploty vyrábíte?", a: "Pracujeme s hliníkovými systémy od ověřeného španělského dodavatele a s vlastním patentovaným komorovým profilem. Levné kompromisy nepoužíváme." },
      { q: "Kde působíte?", a: "Realizujeme zakázky po celé České republice. Napište nám lokalitu a domluvíme se na termínu zaměření." },
    ],
  },
  sk: {
    kicker: "FAQ",
    heading: "Časté otázky",
    intro: "Nenašli ste odpoveď? Napíšte alebo zavolajte, radi to preberieme osobne.",
    faqs: [
      { q: "Akú dávate záruku?", a: "Na konštrukciu aj montáž dávame písomnú záruku a stojíme si za ňou. A keď sa niečo prihodí aj po jej uplynutí, ozvite sa – k odvedenej práci sa hlásime." },
      { q: "Za ako dlho zvládnete montáž?", a: "Väčšinu zákaziek osadíme počas jedného dňa, teda do 24 hodín. Presný termín potvrdíme podľa prípravy základov a rozsahu projektu." },
      { q: "Zvládnete aj atypický alebo svahovitý terén?", a: "Áno. Svahovitý terén, obmedzený priestor aj neštandardné požiadavky sú pre nás bežná práca – každý projekt riešime individuálne a hľadáme preň vlastné riešenie." },
      { q: "Poradíte si so servisom aj po rokoch?", a: "Konštrukcie navrhujeme ako rozoberateľné, takže sa dajú jednoducho opraviť po častiach. Nemusíte kvôli jednému detailu meniť celý plot." },
      { q: "Z akého materiálu ploty vyrábiate?", a: "Pracujeme s hliníkovými systémami od overeného španielskeho dodávateľa a s vlastným patentovaným komorovým profilom. Lacné kompromisy nepoužívame." },
      { q: "Kde pôsobíte?", a: "Realizujeme zákazky po celom Česku. Napíšte nám lokalitu a dohodneme sa na termíne zamerania." },
    ],
  },
  de: {
    kicker: "FAQ",
    heading: "Häufige Fragen",
    intro: "Keine passende Antwort gefunden? Schreiben oder rufen Sie an, wir besprechen es gerne persönlich.",
    faqs: [
      { q: "Welche Garantie geben Sie?", a: "Auf Konstruktion und Montage geben wir eine schriftliche Garantie, zu der wir stehen. Und sollte auch nach Ablauf etwas passieren, melden Sie sich – wir stehen zu unserer Arbeit." },
      { q: "Wie lange dauert die Montage?", a: "Die meisten Aufträge montieren wir innerhalb eines Tages, also 24 Stunden. Den genauen Termin bestätigen wir je nach Fundamentvorbereitung und Projektumfang." },
      { q: "Schaffen Sie auch untypisches oder abschüssiges Gelände?", a: "Ja. Hanglagen, begrenzter Platz und untypische Anforderungen sind für uns Alltag – jedes Projekt behandeln wir individuell und finden dafür eine eigene Lösung." },
      { q: "Kümmern Sie sich auch nach Jahren um den Service?", a: "Wir konzipieren die Konstruktionen zerlegbar, sodass sie sich leicht in Teilen reparieren lassen. Sie müssen wegen eines Details nicht den ganzen Zaun austauschen." },
      { q: "Aus welchem Material fertigen Sie die Zäune?", a: "Wir arbeiten mit Aluminiumsystemen eines bewährten spanischen Lieferanten und einem eigenen patentierten Kammerprofil. Auf billige Kompromisse verzichten wir." },
      { q: "Wo sind Sie tätig?", a: "Wir realisieren Aufträge in ganz Tschechien. Schreiben Sie uns Ihren Standort, und wir vereinbaren einen Termin für das Aufmaß." },
    ],
  },
}

export const zaverCtaContent = {
  cs: {
    heading: "Uděláme to pořádně. Ozvěte se.",
    paragraph: "Parťáci, kteří se s vámi lidsky domluví, drží slovo a udělají precizní práci.",
    ctaSolution: "Poptat řešení",
    ctaCall: "Zavolat",
  },
  sk: {
    heading: "Urobíme to poriadne. Ozvite sa.",
    paragraph: "Partneri, ktorí sa s vami ľudsky dohodnú, dodržia slovo a odvedú precíznu prácu.",
    ctaSolution: "Dopytovať riešenie",
    ctaCall: "Zavolať",
  },
  de: {
    heading: "Wir machen es richtig. Melden Sie sich.",
    paragraph: "Partner, die sich menschlich mit Ihnen verständigen, ihr Wort halten und präzise Arbeit leisten.",
    ctaSolution: "Angebot anfragen",
    ctaCall: "Anrufen",
  },
}

// ---------------------------------------------------------------------------
// KONFIGURÁTOR — picker (app/konf/page.tsx)
// ---------------------------------------------------------------------------

export const konfPickerContent = {
  cs: {
    eyebrow: "Konfigurátor zdarma",
    heading: "Co si nakonfigurujeme?",
    subtitle: "Vyberte si oplocení nebo pergolu — projdete pár kroků a na konci vám pošleme nezávaznou kalkulaci.",
    cards: [
      { title: "Oplocení", description: "Brána, branka, sloupky, dílce a motiv na míru vašemu pozemku." },
      { title: "Pergoly", description: "Bioklimatická pergola, zimní zahrada nebo přístřešek se stíněním." },
    ],
    cta: "Spustit konfigurátor",
  },
  sk: {
    eyebrow: "Konfigurátor zadarmo",
    heading: "Čo si nakonfigurujeme?",
    subtitle: "Vyberte si oplotenie alebo pergolu — prejdete pár krokmi a na konci vám pošleme nezáväznú kalkuláciu.",
    cards: [
      { title: "Oplotenie", description: "Brána, bránka, stĺpiky, dielce a motív na mieru vášmu pozemku." },
      { title: "Pergoly", description: "Bioklimatická pergola, zimná záhrada alebo prístrešok so tienením." },
    ],
    cta: "Spustiť konfigurátor",
  },
  de: {
    eyebrow: "Kostenloser Konfigurator",
    heading: "Was möchten Sie konfigurieren?",
    subtitle: "Wählen Sie Zaun oder Pergola — durchlaufen Sie ein paar Schritte, und am Ende senden wir Ihnen eine unverbindliche Kalkulation.",
    cards: [
      { title: "Zaun", description: "Tor, Tür, Pfosten, Elemente und Motiv nach Maß für Ihr Grundstück." },
      { title: "Pergolen", description: "Bioklimatische Pergola, Wintergarten oder überdachter Unterstand mit Beschattung." },
    ],
    cta: "Konfigurator starten",
  },
}

// ---------------------------------------------------------------------------
// KONFIGURÁTOR OPLOCENÍ — konfCopy / konfSteps / validace
// ---------------------------------------------------------------------------

export const konfContent = {
  cs: {
    heading: "Nakonfigurujte si své oplocení",
    subheading: "Projděte pár kroků a sestavte si bránu, branku, sloupky i motiv plotu přesně podle sebe. Na konci vám pošleme nezávaznou kalkulaci.",
    next: "Další krok",
    back: "Zpět",
    sendText: "Odeslat poptávku",
    dimensionLabels: { vyska: "Výška (mm)", delka: "Šířka průjezdu (mm)", pocet: "Počet (ks)" },
    steps: ["Brána", "Branka", "Sloupky", "Dílce a motiv", "Barva", "Kontakt"],
    validation: {
      brana: "Zvolte typ brány, nebo zaškrtněte, že vjezdovou bránu nechcete.",
      branka: "Zvolte, zda chcete v plotu branku, nebo zaškrtněte, že ji nechcete.",
      sloupky: "Vyberte, zda máte vlastní sloupky, nebo je chcete od nás.",
      dilce: "Zvolte, zda chcete plotové dílce, nebo zaškrtněte, že je nechcete.",
      motiv: "Vyberte motiv oplocení.",
      barva: "Vyberte barvu oplocení.",
      invalidBarva: "Nezadali jste barvu oplocení",
      invalidMotiv: "Nevybrali jste motiv oplocení",
      invalidSloupky: "Nevybrali jste, zda máte vlastní sloupky, nebo je chcete od nás",
      invalidContact: "Zkontrolujte prosím kontaktní údaje",
    },
  },
  sk: {
    heading: "Nakonfigurujte si svoje oplotenie",
    subheading: "Prejdite pár krokmi a zostavte si bránu, bránku, stĺpiky aj motív plota presne podľa seba. Na konci vám pošleme nezáväznú kalkuláciu.",
    next: "Ďalší krok",
    back: "Späť",
    sendText: "Odoslať dopyt",
    dimensionLabels: { vyska: "Výška (mm)", delka: "Šírka prejazdu (mm)", pocet: "Počet (ks)" },
    steps: ["Brána", "Bránka", "Stĺpiky", "Dielce a motív", "Farba", "Kontakt"],
    validation: {
      brana: "Zvoľte typ brány, alebo zaškrtnite, že vjazdovú bránu nechcete.",
      branka: "Zvoľte, či chcete v plote bránku, alebo zaškrtnite, že ju nechcete.",
      sloupky: "Vyberte, či máte vlastné stĺpiky, alebo ich chcete od nás.",
      dilce: "Zvoľte, či chcete plotové dielce, alebo zaškrtnite, že ich nechcete.",
      motiv: "Vyberte motív oplotenia.",
      barva: "Vyberte farbu oplotenia.",
      invalidBarva: "Nezadali ste farbu oplotenia",
      invalidMotiv: "Nevybrali ste motív oplotenia",
      invalidSloupky: "Nevybrali ste, či máte vlastné stĺpiky, alebo ich chcete od nás",
      invalidContact: "Skontrolujte, prosím, kontaktné údaje",
    },
  },
  de: {
    heading: "Konfigurieren Sie Ihren Zaun",
    subheading: "Durchlaufen Sie ein paar Schritte und stellen Sie sich Tor, Tür, Pfosten und Zaunmotiv genau nach Ihren Wünschen zusammen. Am Ende senden wir Ihnen eine unverbindliche Kalkulation.",
    next: "Nächster Schritt",
    back: "Zurück",
    sendText: "Anfrage senden",
    dimensionLabels: { vyska: "Höhe (mm)", delka: "Durchfahrtsbreite (mm)", pocet: "Anzahl (Stk.)" },
    steps: ["Tor", "Tür", "Pfosten", "Elemente und Motiv", "Farbe", "Kontakt"],
    validation: {
      brana: "Wählen Sie einen Tortyp oder markieren Sie, dass Sie kein Einfahrtstor möchten.",
      branka: "Wählen Sie, ob Sie eine Tür im Zaun möchten, oder markieren Sie, dass Sie keine möchten.",
      sloupky: "Wählen Sie, ob Sie eigene Pfosten haben oder sie von uns möchten.",
      dilce: "Wählen Sie, ob Sie Zaunelemente möchten, oder markieren Sie, dass Sie keine möchten.",
      motiv: "Wählen Sie das Zaunmotiv.",
      barva: "Wählen Sie die Zaunfarbe.",
      invalidBarva: "Sie haben keine Zaunfarbe angegeben",
      invalidMotiv: "Sie haben kein Zaunmotiv ausgewählt",
      invalidSloupky: "Sie haben nicht angegeben, ob Sie eigene Pfosten haben oder sie von uns möchten",
      invalidContact: "Bitte überprüfen Sie Ihre Kontaktdaten",
    },
  },
}

// gate/product labels — klíčované podle `gate.id` z lib/konf-content.ts
export const gateLabels: Record<Lang, Record<string, string>> = {
  cs: {
    dvoukridla: "Otočná brána dvoukřídlá",
    jednokridla: "Otočná brána jednokřídlá",
    samonosna: "Samonosná posuvná brána",
    posuvna: "Brána posuvná po kolejnici",
    telSam: "Brána teleskopická samonosná",
    telPoj: "Brána teleskopická pojízdná",
    atypicka: "Brána atypická",
    sikma: "Brána šikmá",
    skladaci: "Brána skládací",
    sekcni: "Brána sekční",
  },
  sk: {
    dvoukridla: "Otváracia brána dvojkrídlová",
    jednokridla: "Otváracia brána jednokrídlová",
    samonosna: "Samonosná posuvná brána",
    posuvna: "Brána posuvná po koľajnici",
    telSam: "Brána teleskopická samonosná",
    telPoj: "Brána teleskopická pojazdná",
    atypicka: "Brána atypická",
    sikma: "Brána šikmá",
    skladaci: "Brána skladacia",
    sekcni: "Brána sekčná",
  },
  de: {
    dvoukridla: "Drehflügeltor zweiflügelig",
    jednokridla: "Drehflügeltor einflügelig",
    samonosna: "Freitragendes Schiebetor",
    posuvna: "Schiebetor mit Laufschiene",
    telSam: "Teleskoptor freitragend",
    telPoj: "Teleskoptor fahrbar",
    atypicka: "Sonderanfertigung Tor",
    sikma: "Schrägtor",
    skladaci: "Falttor",
    sekcni: "Sektionaltor",
  },
}

export const gateExtrasLabels: Record<Lang, { pohon: string; tahoma: string; ovladac: string }> = {
  cs: { pohon: "Automatický pohon", tahoma: "Tahoma Switch", ovladac: "Ovladač" },
  sk: { pohon: "Automatický pohon", tahoma: "Tahoma Switch", ovladac: "Ovládač" },
  de: { pohon: "Automatischer Antrieb", tahoma: "Tahoma Switch", ovladac: "Fernbedienung" },
}

export const brankaExtrasLabels: Record<Lang, { zamek: string; schranka: string; zvonek: string }> = {
  cs: { zamek: "El. zámek", schranka: "Integrovaná schránka", zvonek: "Videozvonek" },
  sk: { zamek: "El. zámok", schranka: "Integrovaná schránka", zvonek: "Videozvonok" },
  de: { zamek: "Elektroschloss", schranka: "Integrierter Briefkasten", zvonek: "Video-Türklingel" },
}

// barvy — sdílený slovník napříč konfigurátory, klíčovaný podle CS názvu (kanonický klíč)
export const colorLabels: Record<Lang, Record<string, string>> = {
  cs: {
    "Přírodní": "Přírodní",
    "Červená": "Červená",
    "Karamelová": "Karamelová",
    "Písková": "Písková",
    "Okrová": "Okrová",
    "Hnědá": "Hnědá",
    "Černá": "Černá",
    "Melír Přírodní": "Melír Přírodní",
    "Melír Latte": "Melír Latte",
    "Melír Písková": "Melír Písková",
    "Melír Marmo": "Melír Marmo",
    "Melír Scatola": "Melír Scatola",
    "Zelená": "Zelená",
    "Šedá": "Šedá",
    "Bílá": "Bílá",
    "Antracit": "Antracit",
    "Dřevodekor": "Dřevodekor",
  },
  sk: {
    "Přírodní": "Prírodná",
    "Červená": "Červená",
    "Karamelová": "Karamelová",
    "Písková": "Piesková",
    "Okrová": "Okrová",
    "Hnědá": "Hnedá",
    "Černá": "Čierna",
    "Melír Přírodní": "Melír Prírodná",
    "Melír Latte": "Melír Latte",
    "Melír Písková": "Melír Pieskový",
    "Melír Marmo": "Melír Marmo",
    "Melír Scatola": "Melír Scatola",
    "Zelená": "Zelená",
    "Šedá": "Sivá",
    "Bílá": "Biela",
    "Antracit": "Antracit",
    "Dřevodekor": "Dekor dreva",
  },
  de: {
    "Přírodní": "Natur",
    "Červená": "Rot",
    "Karamelová": "Karamell",
    "Písková": "Sandfarben",
    "Okrová": "Ocker",
    "Hnědá": "Braun",
    "Černá": "Schwarz",
    "Melír Přírodní": "Melange Natur",
    "Melír Latte": "Melange Latte",
    "Melír Písková": "Melange Sand",
    "Melír Marmo": "Melange Marmo",
    "Melír Scatola": "Melange Scatola",
    "Zelená": "Grün",
    "Šedá": "Grau",
    "Bílá": "Weiß",
    "Antracit": "Anthrazit",
    "Dřevodekor": "Holzdekor",
  },
}

// motivy — klíčované podle `m.src` z lib/konf-content.ts
export const motivLabels: Record<Lang, Record<string, string>> = {
  cs: {
    "o-standart": "Okenice standard",
    kapka: "Okenice kapka",
    "kapka-mini": "Okenice kapka mini",
    "planka-60": "Plaňka 60",
    "plaka-90": "Plaňka 90",
    "planka-120": "Plaňka 120",
    "planka-150": "Plaňka 150",
    tycka: "Tyčka",
    tahokov: "Tahokov",
    "vlastní kombinace": "Vlastní kombinace",
  },
  sk: {
    "o-standart": "Okenica štandard",
    kapka: "Okenica kvapka",
    "kapka-mini": "Okenica kvapka mini",
    "planka-60": "Latka 60",
    "plaka-90": "Latka 90",
    "planka-120": "Latka 120",
    "planka-150": "Latka 150",
    tycka: "Tyčka",
    tahokov: "Ťahokov",
    "vlastní kombinace": "Vlastná kombinácia",
  },
  de: {
    "o-standart": "Fensterladen Standard",
    kapka: "Fensterladen Tropfen",
    "kapka-mini": "Fensterladen Tropfen mini",
    "planka-60": "Lamelle 60",
    "plaka-90": "Lamelle 90",
    "planka-120": "Lamelle 120",
    "planka-150": "Lamelle 150",
    tycka: "Stab",
    tahokov: "Streckmetall",
    "vlastní kombinace": "Eigene Kombination",
  },
}

export const sloupkyLabels: Record<Lang, Record<string, string>> = {
  cs: { vlastni: "Mám své", "hliníkové": "Hliníkové", "betonové": "Betonové" },
  sk: { vlastni: "Mám vlastné", "hliníkové": "Hliníkové", "betonové": "Betónové" },
  de: { vlastni: "Ich habe eigene", "hliníkové": "Aluminium", "betonové": "Beton" },
}

export const povrchLabels: Record<Lang, Record<string, string>> = {
  cs: { standard: "Standard", stipany: "Štípaný" },
  sk: { standard: "Štandard", stipany: "Štiepaný" },
  de: { standard: "Standard", stipany: "Gespalten" },
}

export const formControlsContent = {
  cs: { customSolution: "Vlastní řešení" },
  sk: { customSolution: "Vlastné riešenie" },
  de: { customSolution: "Eigene Lösung" },
}

export const stepBranaContent = {
  cs: { title: "Chcete vjezdovou bránu?", desc: "Vyberte jeden nebo víc typů bran, které vás zajímají, a doplňte rozměry. Klidně jich zvolte i víc najednou.", decline: "Nechci vjezdovou bránu" },
  sk: { title: "Chcete vjazdovú bránu?", desc: "Vyberte jeden alebo viac typov brán, ktoré vás zaujímajú, a doplňte rozmery. Pokojne ich zvoľte aj viac naraz.", decline: "Nechcem vjazdovú bránu" },
  de: { title: "Möchten Sie ein Einfahrtstor?", desc: "Wählen Sie einen oder mehrere Tortypen, die Sie interessieren, und ergänzen Sie die Maße. Sie können auch mehrere gleichzeitig auswählen.", decline: "Ich möchte kein Einfahrtstor" },
}

export const stepBrankaContent = {
  cs: { title: "Chcete v plotu branku?", desc: "Branka pro pěší vstup na pozemek, samostatně od vjezdové brány.", decline: "Nechci v plotu branku", productTitle: "Branka v oplocení", dimensionLabels: { vyska: "Výška branky (mm)", delka: "Šířka branky (mm)", pocet: "Počet branek (ks)" } },
  sk: { title: "Chcete v plote bránku?", desc: "Bránka pre peší vstup na pozemok, samostatne od vjazdovej brány.", decline: "Nechcem v plote bránku", productTitle: "Bránka v oplotení", dimensionLabels: { vyska: "Výška bránky (mm)", delka: "Šírka bránky (mm)", pocet: "Počet bránok (ks)" } },
  de: { title: "Möchten Sie eine Tür im Zaun?", desc: "Tür für den Fußgängerzugang zum Grundstück, unabhängig vom Einfahrtstor.", decline: "Ich möchte keine Tür im Zaun", productTitle: "Tür im Zaun", dimensionLabels: { vyska: "Türhöhe (mm)", delka: "Türbreite (mm)", pocet: "Anzahl Türen (Stk.)" } },
}

export const stepSloupkyContent = {
  cs: { title: "Chcete sloupky?", desc: "Vlastní, hliníkové, nebo betonovou tvárnici s výběrem barvy a povrchu.", povrchLabel: "Povrch tvárnice", barvaLabel: "Barva tvárnice" },
  sk: { title: "Chcete stĺpiky?", desc: "Vlastné, hliníkové, alebo betónovú tvárnicu s výberom farby a povrchu.", povrchLabel: "Povrch tvárnice", barvaLabel: "Farba tvárnice" },
  de: { title: "Möchten Sie Pfosten?", desc: "Eigene, Aluminium- oder Betonpfosten mit Auswahl von Farbe und Oberfläche.", povrchLabel: "Oberfläche des Pfostens", barvaLabel: "Farbe des Pfostens" },
}

export const stepDilceMotivContent = {
  cs: { title1: "Chcete plotové dílce?", desc1: "Vyplňte rozměry dílců, pokud je chcete objednat spolu s bránou.", decline: "Nechci plotové dílce", productTitle: "Plotové dílce", dimensionLabels: { vyska: "Výška dílců (mm)", delka: "Délka dílců (mm)", pocet: "Počet dílců (ks)" }, title2: "Zvolte motiv oplocení", desc2: "Motiv určuje tvar výplně plotových dílců." },
  sk: { title1: "Chcete plotové dielce?", desc1: "Vyplňte rozmery dielcov, ak ich chcete objednať spolu s bránou.", decline: "Nechcem plotové dielce", productTitle: "Plotové dielce", dimensionLabels: { vyska: "Výška dielcov (mm)", delka: "Dĺžka dielcov (mm)", pocet: "Počet dielcov (ks)" }, title2: "Zvoľte motív oplotenia", desc2: "Motív určuje tvar výplne plotových dielcov." },
  de: { title1: "Möchten Sie Zaunelemente?", desc1: "Geben Sie die Maße der Elemente an, wenn Sie sie zusammen mit dem Tor bestellen möchten.", decline: "Ich möchte keine Zaunelemente", productTitle: "Zaunelemente", dimensionLabels: { vyska: "Höhe der Elemente (mm)", delka: "Länge der Elemente (mm)", pocet: "Anzahl Elemente (Stk.)" }, title2: "Wählen Sie das Zaunmotiv", desc2: "Das Motiv bestimmt die Form der Füllung der Zaunelemente." },
}

export const stepBarvaContent = {
  cs: { title: "Jakou si přejete barvu?", desc: "Vyberte jednu z běžných barev, nebo zadejte vlastní RAL kód.", ralLabel: "Vlastní RAL kód", ralPlaceholder: "např. RAL 7016" },
  sk: { title: "Akú farbu si želáte?", desc: "Vyberte jednu z bežných farieb, alebo zadajte vlastný RAL kód.", ralLabel: "Vlastný RAL kód", ralPlaceholder: "napr. RAL 7016" },
  de: { title: "Welche Farbe wünschen Sie?", desc: "Wählen Sie eine der gängigen Farben oder geben Sie einen eigenen RAL-Code ein.", ralLabel: "Eigener RAL-Code", ralPlaceholder: "z. B. RAL 7016" },
}

// Sdílený obsah kontaktního kroku pro OBA konfigurátory (step-kontakt.tsx i perg-step-kontakt.tsx)
export const kontaktStepContent = {
  cs: {
    title: "Vyplňte osobní údaje",
    desc: "Poslední krok — na tyto údaje vám pošleme nezávaznou kalkulaci.",
    fullname: "Celé jméno*",
    fullnamePlaceholder: "Zadejte celé jméno",
    email: "E-mail*",
    emailPlaceholder: "Zadejte e-mail",
    phone: "Telefonní číslo*",
    phonePlaceholder: "Zadejte telefonní číslo",
    company: "Firma",
    companyPlaceholder: "Zadejte název firmy",
    obec: "Obec*",
    obecPlaceholder: "Zadejte obec",
    address: "Ulice*",
    addressPlaceholder: "Zadejte ulici",
    zip: "PSČ*",
    zipPlaceholder: "PSČ",
    file: "Nahrajte soubor (fotky pozemku)",
    message: "Zpráva",
    messagePlaceholder: "Zadejte zprávu",
    consent: "Odesláním souhlasíte se zpracováním osobních údajů za účelem vyřízení poptávky.",
  },
  sk: {
    title: "Vyplňte osobné údaje",
    desc: "Posledný krok — na tieto údaje vám pošleme nezáväznú kalkuláciu.",
    fullname: "Celé meno*",
    fullnamePlaceholder: "Zadajte celé meno",
    email: "E-mail*",
    emailPlaceholder: "Zadajte e-mail",
    phone: "Telefónne číslo*",
    phonePlaceholder: "Zadajte telefónne číslo",
    company: "Firma",
    companyPlaceholder: "Zadajte názov firmy",
    obec: "Obec*",
    obecPlaceholder: "Zadajte obec",
    address: "Ulica*",
    addressPlaceholder: "Zadajte ulicu",
    zip: "PSČ*",
    zipPlaceholder: "PSČ",
    file: "Nahrajte súbor (fotky pozemku)",
    message: "Správa",
    messagePlaceholder: "Zadajte správu",
    consent: "Odoslaním súhlasíte so spracovaním osobných údajov na účely vybavenia dopytu.",
  },
  de: {
    title: "Geben Sie Ihre persönlichen Daten ein",
    desc: "Letzter Schritt — an diese Daten senden wir Ihnen eine unverbindliche Kalkulation.",
    fullname: "Vollständiger Name*",
    fullnamePlaceholder: "Geben Sie Ihren vollständigen Namen ein",
    email: "E-Mail*",
    emailPlaceholder: "Geben Sie Ihre E-Mail ein",
    phone: "Telefonnummer*",
    phonePlaceholder: "Geben Sie Ihre Telefonnummer ein",
    company: "Firma",
    companyPlaceholder: "Geben Sie den Firmennamen ein",
    obec: "Ort*",
    obecPlaceholder: "Geben Sie den Ort ein",
    address: "Straße*",
    addressPlaceholder: "Geben Sie die Straße ein",
    zip: "PLZ*",
    zipPlaceholder: "PLZ",
    file: "Datei hochladen (Fotos des Grundstücks)",
    message: "Nachricht",
    messagePlaceholder: "Geben Sie Ihre Nachricht ein",
    consent: "Mit dem Absenden stimmen Sie der Verarbeitung Ihrer personenbezogenen Daten zur Bearbeitung der Anfrage zu.",
  },
}

// ---------------------------------------------------------------------------
// KONFIGURÁTOR PERGOL — pergCopy / pergSteps / validace
// ---------------------------------------------------------------------------

export const pergContent = {
  cs: {
    heading: "Nakonfigurujte si pergolu",
    subheading: "Bioklimatická pergola, zimní zahrada nebo přístřešek — projděte pár kroků a na konci vám pošleme nezávaznou kalkulaci.",
    next: "Další krok",
    back: "Zpět",
    sendText: "Odeslat poptávku",
    steps: ["Typ a stínění", "Upevnění", "Barva", "Kontakt"],
    validation: {
      pergola: "Zvolte typ pergoly.",
      material: "Vyberte střešní krytinu přístřešku.",
      stineni: "Vyberte, jaké stínění chcete (nebo zvolte Žádné).",
      upevneni: "Vyberte alespoň jeden způsob upevnění pergoly.",
      barva: "Vyberte barvu pergoly.",
      invalidBarva: "Nezadali jste barvu",
      invalidContact: "Zkontrolujte prosím kontaktní údaje",
    },
  },
  sk: {
    heading: "Nakonfigurujte si pergolu",
    subheading: "Bioklimatická pergola, zimná záhrada alebo prístrešok — prejdite pár krokmi a na konci vám pošleme nezáväznú kalkuláciu.",
    next: "Ďalší krok",
    back: "Späť",
    sendText: "Odoslať dopyt",
    steps: ["Typ a tienenie", "Upevnenie", "Farba", "Kontakt"],
    validation: {
      pergola: "Zvoľte typ pergoly.",
      material: "Vyberte strešnú krytinu prístrešku.",
      stineni: "Vyberte, aké tienenie chcete (alebo zvoľte Žiadne).",
      upevneni: "Vyberte aspoň jeden spôsob upevnenia pergoly.",
      barva: "Vyberte farbu pergoly.",
      invalidBarva: "Nezadali ste farbu",
      invalidContact: "Skontrolujte, prosím, kontaktné údaje",
    },
  },
  de: {
    heading: "Konfigurieren Sie Ihre Pergola",
    subheading: "Bioklimatische Pergola, Wintergarten oder Unterstand — durchlaufen Sie ein paar Schritte, und am Ende senden wir Ihnen eine unverbindliche Kalkulation.",
    next: "Nächster Schritt",
    back: "Zurück",
    sendText: "Anfrage senden",
    steps: ["Typ und Beschattung", "Befestigung", "Farbe", "Kontakt"],
    validation: {
      pergola: "Wählen Sie den Pergola-Typ.",
      material: "Wählen Sie die Dacheindeckung des Unterstands.",
      stineni: "Wählen Sie die gewünschte Beschattung (oder „Keine“).",
      upevneni: "Wählen Sie mindestens eine Befestigungsart für die Pergola.",
      barva: "Wählen Sie die Farbe der Pergola.",
      invalidBarva: "Sie haben keine Farbe angegeben",
      invalidContact: "Bitte überprüfen Sie Ihre Kontaktdaten",
    },
  },
}

export const pergolaTypeLabels: Record<Lang, Record<string, string>> = {
  cs: { bioklimaticka: "Bioklimatická", zimni_zahrada: "Zimní zahrada", pristresek: "Přístřešek" },
  sk: { bioklimaticka: "Bioklimatická", zimni_zahrada: "Zimná záhrada", pristresek: "Prístrešok" },
  de: { bioklimaticka: "Bioklimatisch", zimni_zahrada: "Wintergarten", pristresek: "Unterstand" },
}

export const stineniLabels: Record<Lang, Record<string, string>> = {
  cs: { "žádné": "Žádné", rolety: "Screenové rolety", pevne: "Pevné", zaskleni: "Zasklení" },
  sk: { "žádné": "Žiadne", rolety: "Screenové rolety", pevne: "Pevné", zaskleni: "Zasklenie" },
  de: { "žádné": "Keine", rolety: "Screen-Rollos", pevne: "Fest", zaskleni: "Verglasung" },
}

export const strechaMaterialLabels: Record<Lang, Record<string, string>> = {
  cs: { sklo: "Ze skla", polykarbonat: "Z polykarbonátu" },
  sk: { sklo: "Zo skla", polykarbonat: "Z polykarbonátu" },
  de: { sklo: "Aus Glas", polykarbonat: "Aus Polycarbonat" },
}

export const mountLabels: Record<Lang, Record<string, string>> = {
  cs: { stojici: "Pergola samostatně stojící", keStene: "Pergola přisazená ke stěně", kRohu: "Pergola přisazená k rohu" },
  sk: { stojici: "Pergola samostatne stojaca", keStene: "Pergola pristavaná k stene", kRohu: "Pergola pristavaná do rohu" },
  de: { stojici: "Freistehende Pergola", keStene: "Wandanbau-Pergola", kRohu: "Eckanbau-Pergola" },
}

export const mountDimensionLabelsContent = {
  cs: { sirka: "A - Délka pergoly (mm)", hloubka: "B - Hloubka pergoly (mm)", delka: "C - Výška pergoly (mm)" },
  sk: { sirka: "A - Dĺžka pergoly (mm)", hloubka: "B - Hĺbka pergoly (mm)", delka: "C - Výška pergoly (mm)" },
  de: { sirka: "A – Länge der Pergola (mm)", hloubka: "B – Tiefe der Pergola (mm)", delka: "C – Höhe der Pergola (mm)" },
}

export const pergStepTypContent = {
  cs: {
    title1: "Zvolte typ pergoly",
    desc1: "Bioklimatická pergola s lamelami, zasklená zimní zahrada, nebo jednoduchý přístřešek.",
    roofTitle: "Střešní krytina",
    roofDesc: "Materiál střechy přístřešku.",
    shadeTitle: "Chcete stínění?",
    shadeDesc: "Screenové rolety chrání před sluncem i pohledy, pevné stínění a zasklení jde kombinovat s lamelami.",
    noShade: "Bez stínění",
    sidesTitle: "Strany stínění",
    sidesDesc: "Označte strany pergoly, které chcete zastínit.",
  },
  sk: {
    title1: "Zvoľte typ pergoly",
    desc1: "Bioklimatická pergola s lamelami, zasklená zimná záhrada, alebo jednoduchý prístrešok.",
    roofTitle: "Strešná krytina",
    roofDesc: "Materiál strechy prístrešku.",
    shadeTitle: "Chcete tienenie?",
    shadeDesc: "Screenové rolety chránia pred slnkom aj pohľadmi, pevné tienenie a zasklenie sa dá kombinovať s lamelami.",
    noShade: "Bez tienenia",
    sidesTitle: "Strany tienenia",
    sidesDesc: "Označte strany pergoly, ktoré chcete zatieniť.",
  },
  de: {
    title1: "Wählen Sie den Pergola-Typ",
    desc1: "Bioklimatische Pergola mit Lamellen, verglaster Wintergarten oder einfacher Unterstand.",
    roofTitle: "Dacheindeckung",
    roofDesc: "Material des Unterstanddachs.",
    shadeTitle: "Möchten Sie eine Beschattung?",
    shadeDesc: "Screen-Rollos schützen vor Sonne und Blicken, feste Beschattung und Verglasung lassen sich mit Lamellen kombinieren.",
    noShade: "Ohne Beschattung",
    sidesTitle: "Beschattete Seiten",
    sidesDesc: "Markieren Sie die Seiten der Pergola, die beschattet werden sollen.",
  },
}

export const pergStepUpevneniContent = {
  cs: { title: "Jak chcete upevnit pergolu?", desc: "Vyberte jeden nebo víc způsobů uchycení a doplňte rozměry." },
  sk: { title: "Ako chcete pergolu upevniť?", desc: "Vyberte jeden alebo viac spôsobov uchytenia a doplňte rozmery." },
  de: { title: "Wie möchten Sie die Pergola befestigen?", desc: "Wählen Sie eine oder mehrere Befestigungsarten und ergänzen Sie die Maße." },
}
