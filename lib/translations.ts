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
    subtitle: "Vyberte si oplocení, pergolu nebo zábradlí — projdete pár kroků a na konci vám pošleme nezávaznou kalkulaci.",
    cards: [
      { title: "Oplocení", description: "Brána, branka, sloupky, dílce a motiv na míru vašemu pozemku." },
      { title: "Pergoly", description: "Bioklimatická pergola, zimní zahrada nebo přístřešek se stíněním." },
      { title: "Zábradlí", description: "Skleněné nebo hliníkové zábradlí k terase, balkonu i schodišti." },
    ],
    cta: "Spustit konfigurátor",
  },
  sk: {
    eyebrow: "Konfigurátor zadarmo",
    heading: "Čo si nakonfigurujeme?",
    subtitle: "Vyberte si oplotenie, pergolu alebo zábradlie — prejdete pár krokmi a na konci vám pošleme nezáväznú kalkuláciu.",
    cards: [
      { title: "Oplotenie", description: "Brána, bránka, stĺpiky, dielce a motív na mieru vášmu pozemku." },
      { title: "Pergoly", description: "Bioklimatická pergola, zimná záhrada alebo prístrešok so tienením." },
      { title: "Zábradlie", description: "Sklenené alebo hliníkové zábradlie k terase, balkónu aj schodisku." },
    ],
    cta: "Spustiť konfigurátor",
  },
  de: {
    eyebrow: "Kostenloser Konfigurator",
    heading: "Was möchten Sie konfigurieren?",
    subtitle: "Wählen Sie Zaun, Pergola oder Geländer — durchlaufen Sie ein paar Schritte, und am Ende senden wir Ihnen eine unverbindliche Kalkulation.",
    cards: [
      { title: "Zaun", description: "Tor, Tür, Pfosten, Elemente und Motiv nach Maß für Ihr Grundstück." },
      { title: "Pergolen", description: "Bioklimatische Pergola, Wintergarten oder überdachter Unterstand mit Beschattung." },
      { title: "Geländer", description: "Glas- oder Aluminiumgeländer für Terrasse, Balkon und Treppe." },
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
      /** `{product}` se nahradí názvem vybraného produktu s nevyplněnými rozměry. */
      rozmery: "Vyplňte prosím všechny rozměry u produktu: {product}",
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
      rozmery: "Vyplňte, prosím, všetky rozmery pri produkte: {product}",
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
      rozmery: "Bitte füllen Sie alle Maße beim Produkt aus: {product}",
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
    skladaci: "Falttor",
    sekcni: "Sektionaltor",
  },
}

// `tyc` (výztužná tyč křídla) se přidává jen ke křídlovým bránám — viz `kridlova`
// v `gateProducts` a `step-brana.tsx`.
export const gateExtrasLabels: Record<Lang, { pohon: string; tahoma: string; ovladac: string; tyc: string }> = {
  cs: { pohon: "Automatický pohon", tahoma: "Tahoma Switch", ovladac: "Ovladač", tyc: "Tyč pro zpevnění křídla" },
  sk: { pohon: "Automatický pohon", tahoma: "Tahoma Switch", ovladac: "Ovládač", tyc: "Tyč na spevnenie krídla" },
  de: { pohon: "Automatischer Antrieb", tahoma: "Tahoma Switch", ovladac: "Fernbedienung", tyc: "Verstärkungsstange für Torflügel" },
}

export const brankaExtrasLabels: Record<Lang, { zamek: string; schranka: string; zvonek: string }> = {
  cs: { zamek: "El. zámek", schranka: "Integrovaná schránka", zvonek: "Videozvonek" },
  sk: { zamek: "El. zámok", schranka: "Integrovaná schránka", zvonek: "Videozvonok" },
  de: { zamek: "Elektroschloss", schranka: "Integrierter Briefkasten", zvonek: "Video-Türklingel" },
}

/**
 * Kování branky. `title` je popisek skupiny, `options` jsou klíčované hodnotami
 * z `brankaKovaniOptions` — vybrat lze vždy jen jednu (radio).
 */
export const brankaKovaniLabels: Record<Lang, { title: string; options: Record<string, string> }> = {
  cs: {
    title: "Kování",
    options: {
      "kliky-mt": "Kliky M&T",
      "madlo-300": "Madlo 300 mm",
      "madlo-225": "Madlo 225 mm",
      "madlo-1250": "Madlo 1250 mm",
    },
  },
  sk: {
    title: "Kovanie",
    options: {
      "kliky-mt": "Kľučky M&T",
      "madlo-300": "Madlo 300 mm",
      "madlo-225": "Madlo 225 mm",
      "madlo-1250": "Madlo 1250 mm",
    },
  },
  de: {
    title: "Beschlag",
    options: {
      "kliky-mt": "Drückergarnitur M&T",
      "madlo-300": "Stoßgriff 300 mm",
      "madlo-225": "Stoßgriff 225 mm",
      "madlo-1250": "Stoßgriff 1250 mm",
    },
  },
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
    "lamela-105": "Lamela Z",
    vypaleni: "Vypálení plochy",
    "vlastní kombinace": "Vlastní kombinace",
    drevodekor: "Dřevodekor",
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
    "lamela-105": "Lamela Z",
    vypaleni: "Vypálenie plochy",
    "vlastní kombinace": "Vlastná kombinácia",
    drevodekor: "Drevodekor",
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
    "lamela-105": "Jalousielamelle Z",
    vypaleni: "Flächenausschnitt",
    "vlastní kombinace": "Eigene Kombination",
    drevodekor: "Holzdekor",
  },
}

/** UI texty galerie reálných fotek (ProductSection, PergolaTypeTile, PhotoLightbox). */
export const photoGalleryContent: Record<
  Lang,
  {
    openGallery: string
    viewPhotosOf: string
    photoSingular: string
    photoPlural: string
    morePhotos: string
    motivHeading: string
    prevPhoto: string
    nextPhoto: string
    photoAt: string
    /** Slovo v `alt` fotky realizace: „<název produktu> — realizace 3“. */
    realization: string
  }
> = {
  cs: {
    openGallery: "Prohlédnout galerii",
    viewPhotosOf: "Zobrazit fotografie realizací",
    photoSingular: "fotka",
    photoPlural: "fotek",
    morePhotos: "dalších fotek",
    motivHeading: "Motiv",
    prevPhoto: "Předchozí fotka",
    nextPhoto: "Další fotka",
    photoAt: "Fotka",
    realization: "realizace",
  },
  sk: {
    openGallery: "Pozrieť galériu",
    viewPhotosOf: "Zobraziť fotografie realizácií",
    photoSingular: "fotka",
    photoPlural: "fotiek",
    morePhotos: "ďalších fotiek",
    motivHeading: "Motív",
    prevPhoto: "Predchádzajúca fotka",
    nextPhoto: "Ďalšia fotka",
    photoAt: "Fotka",
    realization: "realizácia",
  },
  de: {
    openGallery: "Galerie ansehen",
    viewPhotosOf: "Fotos der Umsetzungen ansehen",
    photoSingular: "Foto",
    photoPlural: "Fotos",
    morePhotos: "weitere Fotos",
    motivHeading: "Motiv",
    prevPhoto: "Vorheriges Foto",
    nextPhoto: "Nächstes Foto",
    photoAt: "Foto",
    realization: "Umsetzung",
  },
}

/** UI texty odkazu a popupu „Podrobnější informace“ (ProductInfoDialog). */
export const productInfoContent: Record<Lang, { trigger: string; close: string; photosAlt: string }> = {
  cs: {
    trigger: "Podrobnější informace",
    close: "Zavřít",
    photosAlt: "fotka produktu",
  },
  sk: {
    trigger: "Podrobnejšie informácie",
    close: "Zavrieť",
    photosAlt: "fotka produktu",
  },
  de: {
    trigger: "Ausführlichere Informationen",
    close: "Schließen",
    photosAlt: "Produktfoto",
  },
}

/** UI texty výběrového checkboxu na produktové kartě (ProductSection). */
export const productSelectContent: Record<
  Lang,
  {
    select: string
    selected: string
    addedToast: string
    sizeLabel: string
    addSize: string
    removeLast: string
    /** Tlačítko pod vyplněnými rozměry, které posune uživatele na další krok konfigurátoru. */
    continueStep: string
  }
> = {
  cs: {
    select: "Vybrat",
    selected: "Máte zvoleno",
    addedToast: "přidáno do výběru",
    sizeLabel: "Rozměr",
    addSize: "Přidat další rozměr",
    removeLast: "Odebrat poslední",
    continueStep: "Pokračovat na další krok",
  },
  sk: {
    select: "Vybrať",
    selected: "Máte zvolené",
    addedToast: "pridané do výberu",
    sizeLabel: "Rozmer",
    addSize: "Pridať ďalší rozmer",
    removeLast: "Odobrať posledný",
    continueStep: "Pokračovať na ďalší krok",
  },
  de: {
    select: "Auswählen",
    selected: "Ausgewählt",
    addedToast: "zur Auswahl hinzugefügt",
    sizeLabel: "Maß",
    addSize: "Weiteres Maß hinzufügen",
    removeLast: "Letztes entfernen",
    continueStep: "Weiter zum nächsten Schritt",
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
  cs: { customSolution: "Vlastní řešení", noPreview: "Náhled připravujeme" },
  sk: { customSolution: "Vlastné riešenie", noPreview: "Náhľad pripravujeme" },
  de: { customSolution: "Eigene Lösung", noPreview: "Vorschau in Vorbereitung" },
}

/**
 * Texty sdílené oběma konfigurátory (oplocení i pergoly), které nejsou vázané
 * na konkrétní krok — postranní přehled kroků a zavírání popupů.
 */
export const konfCommonContent: Record<Lang, { progressLabel: string; close: string }> = {
  cs: { progressLabel: "Průběh konfigurace", close: "Zavřít" },
  sk: { progressLabel: "Priebeh konfigurácie", close: "Zavrieť" },
  de: { progressLabel: "Konfigurationsfortschritt", close: "Schließen" },
}

export const stepBranaContent = {
  cs: { titlePre: "Chcete ", titleAccent: "vjezdovou bránu", titlePost: "?", desc: "Vyberte jeden nebo víc typů bran, které vás zajímají, a doplňte rozměry. Klidně jich zvolte i víc najednou.", decline: "Nechci vjezdovou bránu" },
  sk: { titlePre: "Chcete ", titleAccent: "vjazdovú bránu", titlePost: "?", desc: "Vyberte jeden alebo viac typov brán, ktoré vás zaujímajú, a doplňte rozmery. Pokojne ich zvoľte aj viac naraz.", decline: "Nechcem vjazdovú bránu" },
  de: { titlePre: "Möchten Sie ein ", titleAccent: "Einfahrtstor", titlePost: "?", desc: "Wählen Sie einen oder mehrere Tortypen, die Sie interessieren, und ergänzen Sie die Maße. Sie können auch mehrere gleichzeitig auswählen.", decline: "Ich möchte kein Einfahrtstor" },
}

export const stepBrankaContent = {
  cs: { titlePre: "Chcete v plotu ", titleAccent: "branku", titlePost: "?", desc: "Branka pro pěší vstup na pozemek, samostatně od vjezdové brány.", decline: "Nechci v plotu branku", productTitle: "Branka v oplocení", dimensionLabels: { vyska: "Výška branky (mm)", delka: "Šířka branky (mm)", pocet: "Počet branek (ks)" } },
  sk: { titlePre: "Chcete v plote ", titleAccent: "bránku", titlePost: "?", desc: "Bránka pre peší vstup na pozemok, samostatne od vjazdovej brány.", decline: "Nechcem v plote bránku", productTitle: "Bránka v oplotení", dimensionLabels: { vyska: "Výška bránky (mm)", delka: "Šírka bránky (mm)", pocet: "Počet bránok (ks)" } },
  de: { titlePre: "Möchten Sie eine ", titleAccent: "Tür im Zaun", titlePost: "?", desc: "Tür für den Fußgängerzugang zum Grundstück, unabhängig vom Einfahrtstor.", decline: "Ich möchte keine Tür im Zaun", productTitle: "Tür im Zaun", dimensionLabels: { vyska: "Türhöhe (mm)", delka: "Türbreite (mm)", pocet: "Anzahl Türen (Stk.)" } },
}

export const stepSloupkyContent = {
  cs: {
    titlePre: "Chcete ",
    titleAccent: "sloupky",
    titlePost: "?",
    desc: "Vlastní, hliníkové, nebo betonovou tvárnici s výběrem barvy a povrchu.",
    povrchLabel: "Povrch tvárnice",
    barvaLabel: "Barva tvárnice",
    uchyceniTitlePre: "Spodní ",
    uchyceniTitleAccent: "uchycení sloupků",
    uchyceniTitlePost: "",
    uchyceniDesc: "Způsob, jakým se sloupky ukotví do země. Zaměření je vždy na nás.",
    provedeniLabel: "Provedení",
    rozmerLabel: "Rozměr sloupku",
  },
  sk: {
    titlePre: "Chcete ",
    titleAccent: "stĺpiky",
    titlePost: "?",
    desc: "Vlastné, hliníkové, alebo betónovú tvárnicu s výberom farby a povrchu.",
    povrchLabel: "Povrch tvárnice",
    barvaLabel: "Farba tvárnice",
    uchyceniTitlePre: "Spodné ",
    uchyceniTitleAccent: "uchytenie stĺpikov",
    uchyceniTitlePost: "",
    uchyceniDesc: "Spôsob, akým sa stĺpiky ukotvia do zeme. Zameranie je vždy na nás.",
    provedeniLabel: "Prevedenie",
    rozmerLabel: "Rozmer stĺpika",
  },
  de: {
    titlePre: "Möchten Sie ",
    titleAccent: "Pfosten",
    titlePost: "?",
    desc: "Eigene, Aluminium- oder Betonpfosten mit Auswahl von Farbe und Oberfläche.",
    povrchLabel: "Oberfläche des Pfostens",
    barvaLabel: "Farbe des Pfostens",
    uchyceniTitlePre: "Untere ",
    uchyceniTitleAccent: "Pfostenbefestigung",
    uchyceniTitlePost: "",
    uchyceniDesc: "Art der Verankerung der Pfosten im Boden. Das Aufmaß übernehmen immer wir.",
    provedeniLabel: "Ausführung",
    rozmerLabel: "Pfostenmaß",
  },
}

/** Popisky tří způsobů spodního uchycení sloupků (`uchyceniSloupkuOptions`). */
export const uchyceniSloupkuLabels: Record<Lang, Record<string, { label: string; desc: string }>> = {
  cs: {
    nabetonovani: { label: "Nabetonování sloupku", desc: "Sloupek se osadí a zabetonuje přímo do země." },
    patka: { label: "Sloupek na patce", desc: "Sloupek se přišroubuje na kotevní patku — na hotovou betonovou plochu." },
    zdena: { label: "Kompletně zděná část plotů včetně sloupků", desc: "Zděná podezdívka i sloupky, včetně zaměření." },
  },
  sk: {
    nabetonovani: { label: "Nabetónovanie stĺpika", desc: "Stĺpik sa osadí a zabetónuje priamo do zeme." },
    patka: { label: "Stĺpik na pätke", desc: "Stĺpik sa priskrutkuje na kotviacu pätku — na hotovú betónovú plochu." },
    zdena: { label: "Kompletne murovaná časť plotov vrátane stĺpikov", desc: "Murovaná podmurovka aj stĺpiky, vrátane zamerania." },
  },
  de: {
    nabetonovani: { label: "Einbetonieren des Pfostens", desc: "Der Pfosten wird gesetzt und direkt im Boden einbetoniert." },
    patka: { label: "Pfosten auf Fußplatte", desc: "Der Pfosten wird auf eine Ankerplatte geschraubt — auf fertige Betonfläche." },
    zdena: { label: "Komplett gemauerter Zaunsockel inklusive Pfosten", desc: "Gemauerter Sockel und Pfosten, inklusive Aufmaß." },
  },
}

/**
 * Přepínač „uděláme my / svépomocí“. Sloveso se liší podle volby — u nabetonování
 * jde o betonování, u zděné části o zdění — proto dvě sady popisků, ne jedna.
 */
export const provedeniLabels: Record<Lang, Record<string, { vcetne: string; svepomoci: string }>> = {
  cs: {
    nabetonovani: { vcetne: "Včetně betonování", svepomoci: "Betonování svépomocí" },
    zdena: { vcetne: "Včetně zdění", svepomoci: "Zdění svépomocí" },
  },
  sk: {
    nabetonovani: { vcetne: "Vrátane betónovania", svepomoci: "Betónovanie svojpomocne" },
    zdena: { vcetne: "Vrátane murovania", svepomoci: "Murovanie svojpomocne" },
  },
  de: {
    nabetonovani: { vcetne: "Inklusive Betonieren", svepomoci: "Betonieren in Eigenleistung" },
    zdena: { vcetne: "Inklusive Mauern", svepomoci: "Mauern in Eigenleistung" },
  },
}

export const stepDilceMotivContent = {
  cs: { title1Pre: "Chcete ", title1Accent: "plotové dílce", title1Post: "?", desc1: "Vyplňte rozměry dílců, pokud je chcete objednat spolu s bránou.", decline: "Nechci plotové dílce", productTitle: "Plotové dílce", dimensionLabels: { vyska: "Výška dílců (mm)", delka: "Délka dílců (mm)", pocet: "Počet dílců (ks)" }, title2Pre: "Zvolte ", title2Accent: "motiv oplocení", title2Post: "", desc2: "Motiv určuje tvar výplně plotových dílců." },
  sk: { title1Pre: "Chcete ", title1Accent: "plotové dielce", title1Post: "?", desc1: "Vyplňte rozmery dielcov, ak ich chcete objednať spolu s bránou.", decline: "Nechcem plotové dielce", productTitle: "Plotové dielce", dimensionLabels: { vyska: "Výška dielcov (mm)", delka: "Dĺžka dielcov (mm)", pocet: "Počet dielcov (ks)" }, title2Pre: "Zvoľte ", title2Accent: "motív oplotenia", title2Post: "", desc2: "Motív určuje tvar výplne plotových dielcov." },
  de: { title1Pre: "Möchten Sie ", title1Accent: "Zaunelemente", title1Post: "?", desc1: "Geben Sie die Maße der Elemente an, wenn Sie sie zusammen mit dem Tor bestellen möchten.", decline: "Ich möchte keine Zaunelemente", productTitle: "Zaunelemente", dimensionLabels: { vyska: "Höhe der Elemente (mm)", delka: "Länge der Elemente (mm)", pocet: "Anzahl Elemente (Stk.)" }, title2Pre: "Wählen Sie das ", title2Accent: "Zaunmotiv", title2Post: "", desc2: "Das Motiv bestimmt die Form der Füllung der Zaunelemente." },
}

export const stepBarvaContent = {
  cs: {
    titlePre: "Jakou si přejete ",
    titleAccent: "barvu",
    titlePost: "?",
    desc: "Vyberte jednu z běžných barev, nebo zadejte vlastní RAL kód.",
    ralLabel: "Vlastní RAL kód",
    ralPlaceholder: "např. RAL 7016",
  },
  sk: {
    titlePre: "Akú ",
    titleAccent: "farbu",
    titlePost: " si želáte?",
    desc: "Vyberte jednu z bežných farieb, alebo zadajte vlastný RAL kód.",
    ralLabel: "Vlastný RAL kód",
    ralPlaceholder: "napr. RAL 7016",
  },
  de: {
    titlePre: "Welche ",
    titleAccent: "Farbe",
    titlePost: " wünschen Sie?",
    desc: "Wählen Sie eine der gängigen Farben oder geben Sie einen eigenen RAL-Code ein.",
    ralLabel: "Eigener RAL-Code",
    ralPlaceholder: "z. B. RAL 7016",
  },
}

/** Zábradlí — produktová část 1. kroku konfigurátoru zábradlí (/konf/zabradli). */
export const stepZabradliContent = {
  cs: {
    titlePre: "Chcete ",
    titleAccent: "zábradlí",
    titlePost: "?",
    productTitle: "Zábradlí",
    dimensionLabels: { vyska: "Výška zábradlí (mm)", delka: "Šířka zábradlí (mm)", pocet: "Počet (ks)" },
    materialLabel: "Výplň zábradlí",
  },
  sk: {
    titlePre: "Chcete ",
    titleAccent: "zábradlie",
    titlePost: "?",
    productTitle: "Zábradlie",
    dimensionLabels: { vyska: "Výška zábradlia (mm)", delka: "Šírka zábradlia (mm)", pocet: "Počet (ks)" },
    materialLabel: "Výplň zábradlia",
  },
  de: {
    titlePre: "Möchten Sie ein ",
    titleAccent: "Geländer",
    titlePost: "?",
    productTitle: "Geländer",
    dimensionLabels: { vyska: "Höhe des Geländers (mm)", delka: "Breite des Geländers (mm)", pocet: "Anzahl (Stk.)" },
    materialLabel: "Geländerfüllung",
  },
}

export const zabradliMaterialLabels: Record<Lang, Record<string, string>> = {
  cs: { sklo: "Sklo", "hliník": "Hliník" },
  sk: { sklo: "Sklo", "hliník": "Hliník" },
  de: { sklo: "Glas", "hliník": "Aluminium" },
}

export const zabradliSkloLabels: Record<Lang, Record<string, string>> = {
  cs: { "Čiré": "Čiré", "Matné": "Matné", Antracit: "Antracit" },
  sk: { "Čiré": "Číre", "Matné": "Matné", Antracit: "Antracit" },
  de: { "Čiré": "Klar", "Matné": "Satiniert", Antracit: "Anthrazit" },
}

/**
 * Potvrzení po úspěšném odeslání — sdílí ho všechny tři konfigurátory.
 * Záměrně bez rozpisu dalších kroků („poptávka přijata → zpracování → …"):
 * poptávky nikde neukládáme, takže bychom stav nemohli nijak posouvat.
 */
export const konfSuccessContent = {
  cs: {
    eyebrow: "Máme to",
    heading: "Poptávka byla úspěšně odeslána",
    desc: "Vaše poptávka dorazila našim specialistům. Projdou si zadání a ozvou se vám na uvedený e-mail nebo telefon — zpravidla do dvou pracovních dnů.",
    note: "Kopii poptávky jsme vám poslali na e-mail. Kdyby vás mezitím něco napadlo, stačí odpovědět na něj, nebo nám zavolat.",
    home: "Zpět na hlavní stránku",
    again: "Odeslat další poptávku",
  },
  sk: {
    eyebrow: "Máme to",
    heading: "Dopyt bol úspešne odoslaný",
    desc: "Váš dopyt dorazil našim špecialistom. Prejdú si zadanie a ozvú sa vám na uvedený e-mail alebo telefón — spravidla do dvoch pracovných dní.",
    note: "Kópiu dopytu sme vám poslali na e-mail. Ak vás medzitým niečo napadne, stačí naň odpovedať, alebo nám zavolať.",
    home: "Späť na hlavnú stránku",
    again: "Odoslať ďalší dopyt",
  },
  de: {
    eyebrow: "Angekommen",
    heading: "Die Anfrage wurde erfolgreich gesendet",
    desc: "Ihre Anfrage ist bei unseren Spezialisten eingegangen. Sie sehen sich Ihre Angaben an und melden sich per E-Mail oder Telefon — in der Regel innerhalb von zwei Werktagen.",
    note: "Eine Kopie der Anfrage haben wir Ihnen per E-Mail geschickt. Falls Ihnen noch etwas einfällt, antworten Sie einfach darauf oder rufen Sie uns an.",
    home: "Zurück zur Startseite",
    again: "Weitere Anfrage senden",
  },
}

// ---------------------------------------------------------------------------
// KONFIGURÁTOR ZÁBRADLÍ (/konf/zabradli) — samostatná poptávka o třech krocích.
// Popisky produktu (název, rozměry, výplň) sdílí se `stepZabradliContent` výše,
// tady je jen to, co je specifické pro samostatnou stránku.
// ---------------------------------------------------------------------------

export const zabradliConfContent = {
  cs: {
    heading: "Nakonfigurujte si zábradlí",
    subheading: "Skleněné nebo hliníkové zábradlí k terase, balkonu i schodišti. Projděte tři kroky a na konci vám pošleme nezávaznou kalkulaci.",
    next: "Další krok",
    back: "Zpět",
    sendText: "Odeslat poptávku",
    steps: ["Zábradlí", "Motiv", "Kontakt"],
    /** Dokud není hotová server action, odeslání jen vypíše data do konzole. */
    submitPlaceholder: "Konfigurace zatím jen do konzole — odesílání se teprve dodělává.",
    stepDesc: "Vyplňte rozměry zábradlí a vyberte výplň.",
    motivTitlePre: "Zvolte ",
    motivTitleAccent: "motiv výplně",
    motivTitlePost: "",
    motivDesc: "Motiv určuje tvar hliníkové výplně zábradlí.",
    skloTitlePre: "Zvolte ",
    skloTitleAccent: "odstín skla",
    skloTitlePost: "",
    skloDesc: "Odstín výplně skleněného zábradlí.",
    materialTitlePre: "Chybí ",
    materialTitleAccent: "výplň zábradlí",
    materialTitlePost: "",
    materialHint: "Nejdřív si na předchozím kroku vyberte výplň zábradlí — sklo, nebo hliník.",
    validation: {
      zabradli: "Vyberte zábradlí a vyplňte jeho rozměry.",
      rozmery: "Vyplňte prosím u zábradlí všechny rozměry.",
      material: "Vyberte výplň zábradlí — sklo, nebo hliník.",
      sklo: "Vyberte odstín skla.",
      motiv: "Vyberte motiv výplně zábradlí.",
      invalidContact: "Zkontrolujte prosím kontaktní údaje",
    },
  },
  sk: {
    heading: "Nakonfigurujte si zábradlie",
    subheading: "Sklenené alebo hliníkové zábradlie k terase, balkónu aj schodisku. Prejdite tri kroky a na konci vám pošleme nezáväznú kalkuláciu.",
    next: "Ďalší krok",
    back: "Späť",
    sendText: "Odoslať dopyt",
    steps: ["Zábradlie", "Motív", "Kontakt"],
    submitPlaceholder: "Konfigurácia zatiaľ len do konzoly — odosielanie sa ešte dorába.",
    stepDesc: "Vyplňte rozmery zábradlia a vyberte výplň.",
    motivTitlePre: "Zvoľte ",
    motivTitleAccent: "motív výplne",
    motivTitlePost: "",
    motivDesc: "Motív určuje tvar hliníkovej výplne zábradlia.",
    skloTitlePre: "Zvoľte ",
    skloTitleAccent: "odtieň skla",
    skloTitlePost: "",
    skloDesc: "Odtieň výplne skleneného zábradlia.",
    materialTitlePre: "Chýba ",
    materialTitleAccent: "výplň zábradlia",
    materialTitlePost: "",
    materialHint: "Najprv si na predchádzajúcom kroku vyberte výplň zábradlia — sklo, alebo hliník.",
    validation: {
      zabradli: "Vyberte zábradlie a vyplňte jeho rozmery.",
      rozmery: "Vyplňte, prosím, pri zábradlí všetky rozmery.",
      material: "Vyberte výplň zábradlia — sklo, alebo hliník.",
      sklo: "Vyberte odtieň skla.",
      motiv: "Vyberte motív výplne zábradlia.",
      invalidContact: "Skontrolujte, prosím, kontaktné údaje",
    },
  },
  de: {
    heading: "Konfigurieren Sie Ihr Geländer",
    subheading: "Glas- oder Aluminiumgeländer für Terrasse, Balkon und Treppe. Durchlaufen Sie drei Schritte, und am Ende senden wir Ihnen eine unverbindliche Kalkulation.",
    next: "Nächster Schritt",
    back: "Zurück",
    sendText: "Anfrage senden",
    steps: ["Geländer", "Motiv", "Kontakt"],
    submitPlaceholder: "Konfiguration vorerst nur in der Konsole — der Versand wird noch fertiggestellt.",
    stepDesc: "Geben Sie die Maße des Geländers an und wählen Sie die Füllung.",
    motivTitlePre: "Wählen Sie das ",
    motivTitleAccent: "Motiv der Füllung",
    motivTitlePost: "",
    motivDesc: "Das Motiv bestimmt die Form der Aluminiumfüllung des Geländers.",
    skloTitlePre: "Wählen Sie den ",
    skloTitleAccent: "Glaston",
    skloTitlePost: "",
    skloDesc: "Der Ton der Füllung des Glasgeländers.",
    materialTitlePre: "Es fehlt die ",
    materialTitleAccent: "Geländerfüllung",
    materialTitlePost: "",
    materialHint: "Wählen Sie zuerst im vorherigen Schritt die Geländerfüllung — Glas oder Aluminium.",
    validation: {
      zabradli: "Wählen Sie das Geländer und geben Sie seine Maße an.",
      rozmery: "Bitte füllen Sie alle Maße des Geländers aus.",
      material: "Wählen Sie die Geländerfüllung — Glas oder Aluminium.",
      sklo: "Wählen Sie den Glaston.",
      motiv: "Wählen Sie das Motiv der Geländerfüllung.",
      invalidContact: "Bitte überprüfen Sie Ihre Kontaktdaten",
    },
  },
}

// Sdílený obsah kontaktního kroku pro OBA konfigurátory (step-kontakt.tsx i perg-step-kontakt.tsx)
export const kontaktStepContent = {
  cs: {
    titlePre: "Vyplňte ",
    titleAccent: "osobní údaje",
    titlePost: "",
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
    titlePre: "Vyplňte ",
    titleAccent: "osobné údaje",
    titlePost: "",
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
    titlePre: "Geben Sie Ihre ",
    titleAccent: "persönlichen Daten",
    titlePost: " ein",
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

/** Strany pergoly k zastínění. Klíče `a`–`d` odpovídají polím v `pergolaSchema`. */
export const stranyLabels: Record<Lang, Record<string, string>> = {
  cs: { a: "Přední (vchodové)", b: "Zadní", c: "Levé", d: "Pravé" },
  sk: { a: "Predné (vchodové)", b: "Zadné", c: "Ľavé", d: "Pravé" },
  de: { a: "Vorne (Eingangsseite)", b: "Hinten", c: "Links", d: "Rechts" },
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
    title1Pre: "Zvolte ",
    title1Accent: "typ pergoly",
    title1Post: "",
    desc1: "Bioklimatická pergola s lamelami, zasklená zimní zahrada, nebo jednoduchý přístřešek.",
    roofTitle: "Střešní krytina",
    roofDesc: "Materiál střechy přístřešku.",
    shadeTitlePre: "Chcete ",
    shadeTitleAccent: "stínění",
    shadeTitlePost: "?",
    shadeDesc: "Screenové rolety chrání před sluncem i pohledy, pevné stínění a zasklení jde kombinovat s lamelami.",
    noShade: "Bez stínění",
    sidesTitle: "Strany stínění",
    sidesDesc: "Označte strany pergoly, které chcete zastínit.",
  },
  sk: {
    title1Pre: "Zvoľte ",
    title1Accent: "typ pergoly",
    title1Post: "",
    desc1: "Bioklimatická pergola s lamelami, zasklená zimná záhrada, alebo jednoduchý prístrešok.",
    roofTitle: "Strešná krytina",
    roofDesc: "Materiál strechy prístrešku.",
    shadeTitlePre: "Chcete ",
    shadeTitleAccent: "tienenie",
    shadeTitlePost: "?",
    shadeDesc: "Screenové rolety chránia pred slnkom aj pohľadmi, pevné tienenie a zasklenie sa dá kombinovať s lamelami.",
    noShade: "Bez tienenia",
    sidesTitle: "Strany tienenia",
    sidesDesc: "Označte strany pergoly, ktoré chcete zatieniť.",
  },
  de: {
    title1Pre: "Wählen Sie den ",
    title1Accent: "Pergola-Typ",
    title1Post: "",
    desc1: "Bioklimatische Pergola mit Lamellen, verglaster Wintergarten oder einfacher Unterstand.",
    roofTitle: "Dacheindeckung",
    roofDesc: "Material des Unterstanddachs.",
    shadeTitlePre: "Möchten Sie eine ",
    shadeTitleAccent: "Beschattung",
    shadeTitlePost: "?",
    shadeDesc: "Screen-Rollos schützen vor Sonne und Blicken, feste Beschattung und Verglasung lassen sich mit Lamellen kombinieren.",
    noShade: "Ohne Beschattung",
    sidesTitle: "Beschattete Seiten",
    sidesDesc: "Markieren Sie die Seiten der Pergola, die beschattet werden sollen.",
  },
}

export const pergStepUpevneniContent = {
  cs: { titlePre: "Jak chcete upevnit ", titleAccent: "pergolu", titlePost: "?", desc: "Vyberte jeden nebo víc způsobů uchycení a doplňte rozměry." },
  sk: { titlePre: "Ako chcete ", titleAccent: "pergolu", titlePost: " upevniť?", desc: "Vyberte jeden alebo viac spôsobov uchytenia a doplňte rozmery." },
  de: { titlePre: "Wie möchten Sie die ", titleAccent: "Pergola", titlePost: " befestigen?", desc: "Wählen Sie eine oder mehrere Befestigungsarten und ergänzen Sie die Maße." },
}

// ---------------------------------------------------------------------------
// POTVRZOVACÍ E-MAILY, PDF NABÍDKA A XLSX KALKULACE
// (components/ConfMail.tsx, components/PergMail.tsx, lib/actions.ts)
//
// Jazyk se sem dostává jako druhý argument server actions `sendConf` /
// `sendPergConf` — konfigurátor ho posílá ze stejné prop `lang`, jakou dostal
// z `?lang=`. Hodnotové slovníky (barvy, motivy, typy bran, kování, stínění…)
// se nedublují — bere se to, co už používá UI konfigurátoru.
// ---------------------------------------------------------------------------

/** Datum a čísla se formátují podle jazyka příjemce. Měna zůstává CZK. */
export const localeTags: Record<Lang, string> = { cs: "cs-CZ", sk: "sk-SK", de: "de-DE" }

/**
 * Společný „obal" obou potvrzovacích e-mailů (hlavička, patička, blok
 * s údaji zákazníka). ConfMail i PergMail z něj berou úplně stejné texty.
 */
export type MailChromeContent = {
  preview: string
  logoAlt: string
  /** Mono „kicker" nad nadpisem v hlavičce e-mailu. */
  eyebrow: string
  /** Velký kondenzovaný nadpis v hlavičce e-mailu. */
  headline: string
  /** Nadpis sekce s fotkami vybraných produktů. */
  productsHeading: string
  /** Oslovení bez jména — komponenta skládá `${salutation} ${jméno},`. */
  salutation: string
  intro: string
  intro2: string
  companyHeading: string
  country: string
  ico: string
  phone: string
  email: string
  web: string
  yourInfoHeading: string
  fullName: string
  emailLabel: string
  phoneLabel: string
  addressLabel: string
  companyLabel: string
  messageLabel: string
  dateLabel: string
  support: string
  rights: string
}

export const mailContent: Record<Lang, MailChromeContent> = {
  cs: {
    preview: "Děkujeme za vytvoření konfigurace s Konstanta HP",
    logoAlt: "Konstanta HP — hliníkové ploty",
    eyebrow: "Nová poptávka z konfigurátoru",
    headline: "Konfigurace oplocení",
    productsHeading: "Vybrané produkty",
    salutation: "Vážený/á",
    intro:
      "Děkujeme, že jste si vybrali Konstanta HP pro vytvoření vaší konfigurace! Jsme potěšeni, že vás můžeme přivítat mezi našimi váženými zákazníky. Vaše důvěra v naše produkty a služby pro nás znamená vše a zavazujeme se poskytnout vám zážitek nejvyšší kvality.",
    intro2:
      "Vaše konfigurace byla přijata a je zpracovávána s maximální péčí. Cenovou kalkulaci naleznete v přiloženém souboru. Vážíme si vašeho zájmu a těšíme se na další spolupráci.",
    companyHeading: "Informace o společnosti",
    country: "Česká republika",
    ico: "IČO",
    phone: "Telefon",
    email: "E-mail",
    web: "Web",
    yourInfoHeading: "Vaše informace",
    fullName: "Celé jméno zákazníka",
    emailLabel: "E-mail",
    phoneLabel: "Telefonní číslo",
    addressLabel: "Adresa",
    companyLabel: "Firma",
    messageLabel: "Zpráva",
    dateLabel: "Datum",
    support:
      "Pokud máte jakékoli dotazy nebo připomínky, neváhejte kontaktovat náš tým zákaznické podpory. Jsme tu, abychom vám pomohli!",
    rights: "Všechna práva vyhrazena.",
  },
  sk: {
    preview: "Ďakujeme za vytvorenie konfigurácie s Konstanta HP",
    logoAlt: "Konstanta HP — hliníkové ploty",
    eyebrow: "Nová poptávka z konfigurátora",
    headline: "Konfigurácia oplotenia",
    productsHeading: "Vybrané produkty",
    salutation: "Vážený/á",
    intro:
      "Ďakujeme, že ste si vybrali Konstanta HP na vytvorenie vašej konfigurácie! Teší nás, že vás môžeme privítať medzi našimi váženými zákazníkmi. Vaša dôvera v naše produkty a služby pre nás znamená všetko a zaväzujeme sa poskytnúť vám zážitok najvyššej kvality.",
    intro2:
      "Vaša konfigurácia bola prijatá a spracúva sa s maximálnou starostlivosťou. Cenovú kalkuláciu nájdete v priloženom súbore. Vážime si váš záujem a tešíme sa na ďalšiu spoluprácu.",
    companyHeading: "Informácie o spoločnosti",
    country: "Česká republika",
    ico: "IČO",
    phone: "Telefón",
    email: "E-mail",
    web: "Web",
    yourInfoHeading: "Vaše informácie",
    fullName: "Celé meno zákazníka",
    emailLabel: "E-mail",
    phoneLabel: "Telefónne číslo",
    addressLabel: "Adresa",
    companyLabel: "Firma",
    messageLabel: "Správa",
    dateLabel: "Dátum",
    support:
      "Ak máte akékoľvek otázky alebo pripomienky, neváhajte kontaktovať náš tím zákazníckej podpory. Sme tu, aby sme vám pomohli!",
    rights: "Všetky práva vyhradené.",
  },
  de: {
    preview: "Vielen Dank für Ihre Konfiguration bei Konstanta HP",
    logoAlt: "Konstanta HP — Aluminiumzäune",
    eyebrow: "Neue Anfrage aus dem Konfigurator",
    headline: "Zaunkonfiguration",
    productsHeading: "Ausgewählte Produkte",
    salutation: "Guten Tag",
    intro:
      "vielen Dank, dass Sie sich für Konstanta HP entschieden haben! Wir freuen uns, Sie unter unseren geschätzten Kunden begrüßen zu dürfen. Ihr Vertrauen in unsere Produkte und Leistungen bedeutet uns alles und wir verpflichten uns, Ihnen ein Erlebnis von höchster Qualität zu bieten.",
    intro2:
      "Ihre Konfiguration ist bei uns eingegangen und wird mit größter Sorgfalt bearbeitet. Die Preiskalkulation finden Sie in der angehängten Datei. Wir schätzen Ihr Interesse und freuen uns auf die weitere Zusammenarbeit.",
    companyHeading: "Angaben zum Unternehmen",
    country: "Tschechische Republik",
    ico: "Firmennummer",
    phone: "Telefon",
    email: "E-Mail",
    web: "Web",
    yourInfoHeading: "Ihre Angaben",
    fullName: "Vollständiger Name",
    emailLabel: "E-Mail",
    phoneLabel: "Telefonnummer",
    addressLabel: "Adresse",
    companyLabel: "Firma",
    messageLabel: "Nachricht",
    dateLabel: "Datum",
    support:
      "Wenn Sie Fragen oder Anmerkungen haben, wenden Sie sich bitte jederzeit an unseren Kundenservice. Wir sind gerne für Sie da!",
    rights: "Alle Rechte vorbehalten.",
  },
}

/** Tabulka konfigurace pergoly v PergMail — typy a hodnoty berou `mountLabels`, `stineniLabels` atd. */
export type PergMailContent = {
  /** Velký kondenzovaný nadpis v hlavičce e-mailu (obdoba `MailChromeContent.headline`). */
  headline: string
  /** Nadpis sekce s rozměry a parametry pergoly. */
  configHeading: string
  typeHeading: string
  pergolaLabel: string
  notSpecified: string
  width: string
  length: string
  depth: string
  cornerA: string
  cornerB: string
  cornerC: string
  moreHeading: string
  shading: string
  sidesAlt: string
  sides: string
  material: string
  color: string
  autoGenerated: string
}

export const pergMailContent: Record<Lang, PergMailContent> = {
  cs: {
    headline: "Konfigurace pergoly",
    configHeading: "Parametry pergoly",
    typeHeading: "Typ pergoly",
    pergolaLabel: "Pergola",
    notSpecified: "Neuvedeno",
    width: "Šířka",
    length: "Délka",
    depth: "Hloubka",
    cornerA: "A – Délka",
    cornerB: "B – Hloubka",
    cornerC: "C – Výška",
    moreHeading: "Další informace",
    shading: "Stínění",
    sidesAlt: "Strany stínění",
    sides: "Strany",
    material: "Materiál",
    color: "Barva",
    autoGenerated: "Tento e-mail byl automaticky vygenerován.",
  },
  sk: {
    headline: "Konfigurácia pergoly",
    configHeading: "Parametre pergoly",
    typeHeading: "Typ pergoly",
    pergolaLabel: "Pergola",
    notSpecified: "Neuvedené",
    width: "Šírka",
    length: "Dĺžka",
    depth: "Hĺbka",
    cornerA: "A – Dĺžka",
    cornerB: "B – Hĺbka",
    cornerC: "C – Výška",
    moreHeading: "Ďalšie informácie",
    shading: "Tienenie",
    sidesAlt: "Strany tienenia",
    sides: "Strany",
    material: "Materiál",
    color: "Farba",
    autoGenerated: "Tento e-mail bol automaticky vygenerovaný.",
  },
  de: {
    headline: "Pergola-Konfiguration",
    configHeading: "Pergola-Parameter",
    typeHeading: "Pergola-Typ",
    pergolaLabel: "Pergola",
    notSpecified: "Nicht angegeben",
    width: "Breite",
    length: "Länge",
    depth: "Tiefe",
    cornerA: "A – Länge",
    cornerB: "B – Tiefe",
    cornerC: "C – Höhe",
    moreHeading: "Weitere Angaben",
    shading: "Beschattung",
    sidesAlt: "Beschattete Seiten",
    sides: "Seiten",
    material: "Material",
    color: "Farbe",
    autoGenerated: "Diese E-Mail wurde automatisch generiert.",
  },
}

/**
 * Texty PDF cenové nabídky (`htmlToPdf` v lib/actions.ts). Položky v `termsPersonalItems`
 * a `termsCompanyItems` a texty `termText` / `depositText` obsahují inline HTML
 * (`<b>`, `<strong>`) — vkládají se do šablony bez escapování.
 */
export type QuoteContent = {
  docTitle: string
  numberPrefix: string
  metaNumber: string
  metaIssued: string
  metaValid: string
  supplier: string
  customer: string
  country: string
  ico: string
  phone: string
  email: string
  web: string
  company: string
  configHeading: string
  itemsHeading: string
  itemsCont: string
  thItem: string
  thQty: string
  thNoVat: string
  thVat: string
  thWithVat: string
  specsHeading: string
  noteHeading: string
  termHeading: string
  termBadge: string
  termText: string
  depositHeading: string
  depositBadge: string
  depositText: string
  termsHeading: string
  termsPersonal: string
  termsPersonalItems: string[]
  termsPersonalNote: string
  termsCompany: string
  termsCompanyItems: string[]
  termsCompanyNote: string
  disclaimer: string
  validUntil: string
}

export const quoteContent: Record<Lang, QuoteContent> = {
  cs: {
    docTitle: "Cenová nabídka",
    numberPrefix: "č.",
    metaNumber: "Nabídka č.",
    metaIssued: "Datum vystavení",
    metaValid: "Platnost nabídky do",
    supplier: "Dodavatel",
    customer: "Odběratel",
    country: "Česká republika",
    ico: "IČO",
    phone: "Telefon",
    email: "E-mail",
    web: "Web",
    company: "Firma",
    configHeading: "Konfigurace",
    itemsHeading: "Položky nabídky",
    itemsCont: "Položky nabídky — pokračování",
    thItem: "Položka",
    thQty: "Množství",
    thNoVat: "Cena bez DPH",
    thVat: "DPH",
    thWithVat: "Cena s DPH",
    specsHeading: "Specifikace",
    noteHeading: "Poznámka zákazníka",
    termHeading: "Termín realizace",
    termBadge: "8–14 týdnů",
    termText:
      "Realizace zakázky proběhne v rozmezí <strong>8–14 týdnů</strong> od podpisu smlouvy a uhrazení zálohy.",
    depositHeading: "Záloha",
    depositBadge: "70 %",
    depositText:
      "Před zahájením realizace je požadována záloha ve výši <strong>70 % z celkové ceny zakázky</strong>. Doplatek bude uhrazen v den montáže po předání díla.",
    termsHeading: "Obchodní podmínky",
    termsPersonal: "Fyzické osoby",
    termsPersonalItems: [
      "Záruka na materiál: <b>10 let</b>",
      "Záruka na pohon: <b>3 roky</b>",
      "Záruka na montážní práce: <b>2 roky</b>",
    ],
    termsPersonalNote:
      "Záruka se vztahuje na vady materiálu, funkčnost pohonu a kvalitu provedených montážních prací.",
    termsCompany: "Firmy",
    termsCompanyItems: [
      "Splatnost faktur: <b>30 dnů</b>",
      "Pozastávky: <b>10 % / 8 % / 2 %</b>",
      "Zařízení staveniště / vícepráce: <b>0 %</b>",
      "Záruka výrobků / pohonů / montáže: <b>55 / 36 / 24 měsíců</b>",
    ],
    termsCompanyNote: "Realizace zakázky proběhne v dohodnutý termín s objednatelem.",
    disclaimer:
      "Nabídka je nezávazná a vychází z údajů zadaných v konfigurátoru na konstantahp.cz. Konečná cena bude potvrzena po zaměření na místě.",
    validUntil: "Platnost nabídky do",
  },
  sk: {
    docTitle: "Cenová ponuka",
    numberPrefix: "č.",
    metaNumber: "Ponuka č.",
    metaIssued: "Dátum vystavenia",
    metaValid: "Platnosť ponuky do",
    supplier: "Dodávateľ",
    customer: "Odberateľ",
    country: "Česká republika",
    ico: "IČO",
    phone: "Telefón",
    email: "E-mail",
    web: "Web",
    company: "Firma",
    configHeading: "Konfigurácia",
    itemsHeading: "Položky ponuky",
    itemsCont: "Položky ponuky — pokračovanie",
    thItem: "Položka",
    thQty: "Množstvo",
    thNoVat: "Cena bez DPH",
    thVat: "DPH",
    thWithVat: "Cena s DPH",
    specsHeading: "Špecifikácia",
    noteHeading: "Poznámka zákazníka",
    termHeading: "Termín realizácie",
    termBadge: "8–14 týždňov",
    termText:
      "Realizácia zákazky prebehne v rozmedzí <strong>8–14 týždňov</strong> od podpisu zmluvy a uhradenia zálohy.",
    depositHeading: "Záloha",
    depositBadge: "70 %",
    depositText:
      "Pred začatím realizácie je požadovaná záloha vo výške <strong>70 % z celkovej ceny zákazky</strong>. Doplatok bude uhradený v deň montáže po odovzdaní diela.",
    termsHeading: "Obchodné podmienky",
    termsPersonal: "Fyzické osoby",
    termsPersonalItems: [
      "Záruka na materiál: <b>10 rokov</b>",
      "Záruka na pohon: <b>3 roky</b>",
      "Záruka na montážne práce: <b>2 roky</b>",
    ],
    termsPersonalNote:
      "Záruka sa vzťahuje na vady materiálu, funkčnosť pohonu a kvalitu vykonaných montážnych prác.",
    termsCompany: "Firmy",
    termsCompanyItems: [
      "Splatnosť faktúr: <b>30 dní</b>",
      "Zádržné: <b>10 % / 8 % / 2 %</b>",
      "Zariadenie staveniska / práce navyše: <b>0 %</b>",
      "Záruka na výrobky / pohony / montáž: <b>55 / 36 / 24 mesiacov</b>",
    ],
    termsCompanyNote: "Realizácia zákazky prebehne v dohodnutom termíne s objednávateľom.",
    disclaimer:
      "Ponuka je nezáväzná a vychádza z údajov zadaných v konfigurátore na konstantahp.cz. Konečná cena bude potvrdená po zameraní na mieste.",
    validUntil: "Platnosť ponuky do",
  },
  de: {
    docTitle: "Preisangebot",
    numberPrefix: "Nr.",
    metaNumber: "Angebot Nr.",
    metaIssued: "Ausstellungsdatum",
    metaValid: "Angebot gültig bis",
    supplier: "Lieferant",
    customer: "Kunde",
    country: "Tschechische Republik",
    ico: "Firmennummer",
    phone: "Telefon",
    email: "E-Mail",
    web: "Web",
    company: "Firma",
    configHeading: "Konfiguration",
    itemsHeading: "Angebotspositionen",
    itemsCont: "Angebotspositionen — Fortsetzung",
    thItem: "Position",
    thQty: "Menge",
    thNoVat: "Preis netto",
    thVat: "MwSt.",
    thWithVat: "Preis brutto",
    specsHeading: "Spezifikation",
    noteHeading: "Anmerkung des Kunden",
    termHeading: "Realisierungstermin",
    termBadge: "8–14 Wochen",
    termText:
      "Die Ausführung des Auftrags erfolgt innerhalb von <strong>8–14 Wochen</strong> nach Vertragsunterzeichnung und Zahlung der Anzahlung.",
    depositHeading: "Anzahlung",
    depositBadge: "70 %",
    depositText:
      "Vor Beginn der Ausführung wird eine Anzahlung in Höhe von <strong>70 % des Gesamtauftragswerts</strong> verlangt. Die Restzahlung erfolgt am Montagetag nach Übergabe des Werks.",
    termsHeading: "Geschäftsbedingungen",
    termsPersonal: "Privatpersonen",
    termsPersonalItems: [
      "Garantie auf Material: <b>10 Jahre</b>",
      "Garantie auf den Antrieb: <b>3 Jahre</b>",
      "Garantie auf Montagearbeiten: <b>2 Jahre</b>",
    ],
    termsPersonalNote:
      "Die Garantie gilt für Materialfehler, die Funktion des Antriebs und die Qualität der ausgeführten Montagearbeiten.",
    termsCompany: "Firmen",
    termsCompanyItems: [
      "Zahlungsziel der Rechnungen: <b>30 Tage</b>",
      "Einbehalte: <b>10 % / 8 % / 2 %</b>",
      "Baustelleneinrichtung / Mehrleistungen: <b>0 %</b>",
      "Garantie auf Produkte / Antriebe / Montage: <b>55 / 36 / 24 Monate</b>",
    ],
    termsCompanyNote: "Die Ausführung des Auftrags erfolgt zum mit dem Auftraggeber vereinbarten Termin.",
    disclaimer:
      "Das Angebot ist unverbindlich und basiert auf den im Konfigurator auf konstantahp.cz eingegebenen Angaben. Der endgültige Preis wird nach dem Aufmaß vor Ort bestätigt.",
    validUntil: "Angebot gültig bis",
  },
}

/**
 * Názvy řádků kalkulace — sdílí je XLSX (`createXlsx`) i tabulka v PDF, aby
 * obě přílohy mluvily stejně. Ceny se nepřepočítávají, měna zůstává Kč.
 */
export type QuoteItemsContent = {
  sheetName: string
  currency: string
  header: { produkt: string; mnozstvi: string; bezDph: string; dph: string; sDph: string }
  tyc: string
  pohon: string
  zastrc: string
  tahoma: string
  ovladac: string
  montazBrany: string
  branka: string
  zamek: string
  schranka: string
  zvonek: string
  /** Klíče odpovídají `brankaKovaniOptions`; `fallback` pro nevyplněnou volbu. */
  kovani: Record<string, string>
  kovaniFallback: string
  montazBranky: string
  dilce: string
  montazDilcu: string
  typSloupku: string
  cenaBm: string
  cenaCepicky: string
  povrchTvarnice: string
  barvaTvarnice: string
  barvaDilcu: string
  motiv: string
  celkem: string
}

export const quoteItemsContent: Record<Lang, QuoteItemsContent> = {
  cs: {
    sheetName: "Kalkulace",
    currency: "Kč",
    header: { produkt: "Produkt", mnozstvi: "Množství", bezDph: "Cena bez DPH", dph: "DPH", sDph: "Cena s DPH" },
    tyc: "Tyč pro zpevnění křídla brány",
    pohon:
      "1x Somfy Elixo500 3S io – pohon s řídicí jednotkou a rádiovým přijímačem, 1x Somfy Master Pro Bitech – bezpečnostní fotobuňky (1 pár) dosah 10 m, 2x Odblokovací klíč (použití při výpadku proudu)",
    zastrc: "Zástrč brány",
    tahoma:
      "Somfy TaHoma switch je centrální jednotka pro chytrou domácnost, která umožňuje ovládat a automatizovat různá zařízení v domě, jako jsou rolety, žaluzie, brány, osvětlení, topení a další",
    ovladac: "1x Somfy Keygo io – dálkový ovladač",
    montazBrany: "Montáž brány",
    branka: "Branka",
    zamek: "El. zámek napětí 9 – 12 V AC/DC, s posuvnou zarážkou a mechanickým odblokováním",
    schranka: "Poštovní schránka zapuštěná do lamely",
    zvonek: "Domovní videotelefon Somfy V500 PRO io",
    kovani: {
      "kliky-mt": "Kování branky nerez — kliky M&T (klika/klika – koule/klika)",
      "madlo-300": "Kování branky nerez — madlo 300 mm",
      "madlo-225": "Kování branky nerez — madlo 225 mm",
      "madlo-1250": "Kování branky nerez — madlo 1250 mm",
    },
    kovaniFallback: "Kování branky nerez (klika/klika – koule/klika)",
    montazBranky: "Montáž branky",
    dilce: "Plotové dílce",
    montazDilcu: "Montáž dílců",
    typSloupku: "Typ sloupků",
    cenaBm: "Cena za bm",
    cenaCepicky: "Cena čepičky za kus",
    povrchTvarnice: "Povrch tvárnice",
    barvaTvarnice: "Barva tvárnice",
    barvaDilcu: "Barva dílců",
    motiv: "Motiv",
    celkem: "Celkem:",
  },
  sk: {
    sheetName: "Kalkulácia",
    currency: "Kč",
    header: { produkt: "Produkt", mnozstvi: "Množstvo", bezDph: "Cena bez DPH", dph: "DPH", sDph: "Cena s DPH" },
    tyc: "Tyč na spevnenie krídla brány",
    pohon:
      "1x Somfy Elixo500 3S io – pohon s riadiacou jednotkou a rádiovým prijímačom, 1x Somfy Master Pro Bitech – bezpečnostné fotobunky (1 pár) dosah 10 m, 2x Odblokovací kľúč (použitie pri výpadku prúdu)",
    zastrc: "Zástrč brány",
    tahoma:
      "Somfy TaHoma switch je centrálna jednotka pre inteligentnú domácnosť, ktorá umožňuje ovládať a automatizovať rôzne zariadenia v dome, ako sú rolety, žalúzie, brány, osvetlenie, kúrenie a ďalšie",
    ovladac: "1x Somfy Keygo io – diaľkový ovládač",
    montazBrany: "Montáž brány",
    branka: "Bránka",
    zamek: "El. zámok napätie 9 – 12 V AC/DC, s posuvnou zarážkou a mechanickým odblokovaním",
    schranka: "Poštová schránka zapustená do lamely",
    zvonek: "Domový videotelefón Somfy V500 PRO io",
    kovani: {
      "kliky-mt": "Kovanie bránky nerez — kľučky M&T (kľučka/kľučka – guľa/kľučka)",
      "madlo-300": "Kovanie bránky nerez — madlo 300 mm",
      "madlo-225": "Kovanie bránky nerez — madlo 225 mm",
      "madlo-1250": "Kovanie bránky nerez — madlo 1250 mm",
    },
    kovaniFallback: "Kovanie bránky nerez (kľučka/kľučka – guľa/kľučka)",
    montazBranky: "Montáž bránky",
    dilce: "Plotové dielce",
    montazDilcu: "Montáž dielcov",
    typSloupku: "Typ stĺpikov",
    cenaBm: "Cena za bm",
    cenaCepicky: "Cena čiapočky za kus",
    povrchTvarnice: "Povrch tvárnice",
    barvaTvarnice: "Farba tvárnice",
    barvaDilcu: "Farba dielcov",
    motiv: "Motív",
    celkem: "Spolu:",
  },
  de: {
    sheetName: "Kalkulation",
    currency: "CZK",
    header: { produkt: "Produkt", mnozstvi: "Menge", bezDph: "Preis netto", dph: "MwSt.", sDph: "Preis brutto" },
    tyc: "Verstärkungsstange für den Torflügel",
    pohon:
      "1x Somfy Elixo500 3S io – Antrieb mit Steuereinheit und Funkempfänger, 1x Somfy Master Pro Bitech – Sicherheitslichtschranke (1 Paar), Reichweite 10 m, 2x Entriegelungsschlüssel (bei Stromausfall)",
    zastrc: "Torriegel",
    tahoma:
      "Somfy TaHoma Switch ist die Zentraleinheit für das Smart Home und ermöglicht die Steuerung und Automatisierung verschiedener Geräte im Haus wie Rollläden, Jalousien, Tore, Beleuchtung, Heizung und weitere",
    ovladac: "1x Somfy Keygo io – Handsender",
    montazBrany: "Montage des Tors",
    branka: "Gartentür",
    zamek: "Elektroschloss 9 – 12 V AC/DC, mit Schiebefalle und mechanischer Entriegelung",
    schranka: "In die Lamelle eingelassener Briefkasten",
    zvonek: "Video-Türsprechanlage Somfy V500 PRO io",
    kovani: {
      "kliky-mt": "Beschlag Gartentür Edelstahl — Drückergarnitur M&T (Drücker/Drücker – Knauf/Drücker)",
      "madlo-300": "Beschlag Gartentür Edelstahl — Stoßgriff 300 mm",
      "madlo-225": "Beschlag Gartentür Edelstahl — Stoßgriff 225 mm",
      "madlo-1250": "Beschlag Gartentür Edelstahl — Stoßgriff 1250 mm",
    },
    kovaniFallback: "Beschlag Gartentür Edelstahl (Drücker/Drücker – Knauf/Drücker)",
    montazBranky: "Montage der Gartentür",
    dilce: "Zaunelemente",
    montazDilcu: "Montage der Zaunelemente",
    typSloupku: "Pfostentyp",
    cenaBm: "Preis pro lfm",
    cenaCepicky: "Preis der Abdeckkappe pro Stück",
    povrchTvarnice: "Oberfläche der Zaunsteine",
    barvaTvarnice: "Farbe der Zaunsteine",
    barvaDilcu: "Farbe der Elemente",
    motiv: "Motiv",
    celkem: "Gesamt:",
  },
}
