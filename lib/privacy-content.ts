import type { Lang } from "@/lib/translations"

/**
 * Zásady ochrany osobních údajů (`/zpracovani-os-udaju`). Text je převzatý
 * ze starého webu (`~/NEXTJS/konstantahp/components/zpracovaniUdaju.tsx`) —
 * dodal ho klient, proto se tu mění jen po domluvě s ním. Firemní údaje musí
 * sedět s patičkou a `lib/json-ld.ts`.
 */

/** Adresa převzatá ze starého webu, aby staré odkazy dál fungovaly. */
export const PRIVACY_PATH = "/zpracovani-os-udaju"

export type PrivacyBlock =
  | { type: "p"; text: string }
  | { type: "list"; intro?: string; items: string[] }

export type PrivacySection = { heading: string; blocks: PrivacyBlock[] }

export type PrivacyContent = {
  /** Odkaz v patičce a za souhlasem u formulářů. */
  linkLabel: string
  kicker: string
  heading: string
  subtitle: string
  sections: PrivacySection[]
}

export const privacyContent: Record<Lang, PrivacyContent> = {
  cs: {
    linkLabel: "Ochrana osobních údajů",
    kicker: "GDPR",
    heading: "Ochrana osobních údajů",
    subtitle:
      "Dovolte, abychom Vás informovali o ochraně Vašich osobních údajů, zejména v souvislosti s Vámi uzavřenou kupní smlouvou.",
    sections: [
      {
        heading: "Úvod",
        blocks: [
          {
            type: "p",
            text: "Ochrana Vašeho soukromí a Vašich údajů je pro nás zcela zásadní, a proto dbáme jak na bezpečnost našich interních systémů, tak na výběr našich partnerů, a to v souladu s nařízením Evropského parlamentu a Rady (EU) č. 2016/679 o ochraně fyzických osob v souvislosti se zpracováním osobních údajů a o volném pohybu těchto údajů (dále jen „Nařízení GDPR“).",
          },
        ],
      },
      {
        heading: "Kdo je správcem Vašich osobních údajů",
        blocks: [
          {
            type: "p",
            text: "Správcem Vašich osobních údajů je KONSTANTA – hliníkové ploty s.r.o., se sídlem Maleč 36, 582 76 Maleč, Česká republika. Naše IČO je 21827150 a jsme zapsáni v obchodním rejstříku Krajského soudu v Hradci Králové.",
          },
        ],
      },
      {
        heading: "Jaké osobní údaje zpracováváme",
        blocks: [
          {
            type: "p",
            text: "Pro uzavření obchodní smlouvy zpracováváme Vaše osobní údaje, jako jsou jméno, příjmení, adresa bydliště, telefonní číslo a e-mailová adresa. Jedná se o nezbytné identifikační a kontaktní údaje. Jako primární identifikační údaj je pro nás vždy e-mailová adresa.",
          },
          {
            type: "p",
            text: "Kdykoli navštívíte naše webové stránky, zaznamenávají se z bezpečnostních důvodů na náš server identifikační data (například IP adresa) a další informace (datum, čas, zhlédnutá stránka).",
          },
        ],
      },
      {
        heading: "Cookies",
        blocks: [
          {
            type: "list",
            intro:
              "Naše stránky používají cookies. Soubory cookie používané na našich stránkách využíváme především pro analytiku a behaviorální cílení. Ve většině případů využíváme dlouhodobé cookies, tedy ty, které zůstávají uloženy ve vašem zařízení delší dobu nebo dokud je ručně neodstraníte. Jedná se o tyto typy:",
            items: [
              "analytické a remarketingové (pro zlepšení vašeho zážitku z webu, personalizaci obsahu a reklamy)",
              "konverzní a trackingové (pro sledování výkonu jednotlivých reklamních kanálů)",
            ],
          },
          {
            type: "list",
            intro: "Uživatelská data a cookies mohou být použity k personalizaci reklam.",
            items: [
              "Google Ads a Sklik – tracking, remarketing",
              "Facebook – tracking, remarketing",
              "Google Analytics – analytika, konverze",
            ],
          },
        ],
      },
      {
        heading: "Odmítnutí cookies",
        blocks: [
          {
            type: "p",
            text: "Samozřejmě akceptujeme vaše rozhodnutí, že si nepřejete personalizovanou nabídku. Používání cookies lze nastavit pomocí vašeho internetového prohlížeče. Většina prohlížečů soubory cookie automaticky přijímá již ve výchozím nastavení. Cookies lze odmítnout nebo nastavit dle vašich potřeb. Informace o způsobu nastavení předvoleb pro cookies najdete v nápovědě svého prohlížeče (Chrome, Firefox, Safari, Edge, Android). Odmítnutí lze provést také prostřednictvím stránek http://www.youronlinechoices.com/cz/.",
          },
        ],
      },
      {
        heading: "Kdo má přístup k údajům",
        blocks: [
          {
            type: "p",
            text: "V prvé řadě jsou osobní údaje zpracovávány společností KONSTANTA – hliníkové ploty s.r.o. a jejími pracovníky. Všechny osoby mající přístup k osobním údajům jsou zavázány k mlčenlivosti, a tento závazek trvá i po skončení jejich spolupráce.",
          },
          {
            type: "p",
            text: "KONSTANTA – hliníkové ploty s.r.o. dále jako správce pověřuje zpracováním osobních údajů další subjekty, tzv. zpracovatele. Zpracovatelem se rozumí každý subjekt, který má k osobním údajům přístup v rámci spolupráce s námi. Zpracovatelům předáváme pouze údaje, které nezbytně potřebují k zajištění svých služeb.",
          },
          {
            type: "list",
            intro:
              "Mezi největší zpracovatele, které KONSTANTA – hliníkové ploty s.r.o. využívá, patří (data jsou jim předávána jen v případech, kdy je to nutné):",
            items: [
              "Seznam Sklik (Seznam.cz, a.s.), Radlická 3294/10, Praha 5, 150 00, IČO: 26168685",
              "Google, Google Analytics (Google Czech Republic, s.r.o.), Stroupežnického 3191/17, Praha 5, 150 00, IČO: 27604977",
              "Facebook Ireland Limited, se sídlem 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, D02 X525, Irsko",
            ],
          },
          {
            type: "list",
            intro:
              "Vaše osobní údaje můžeme předávat také dalším subjektům, které se nacházejí v roli správce, ale pouze za předpokladu vašeho odsouhlasení marketingových cookies ve vašem prohlížeči:",
            items: ["Google Ireland Limited (registrační číslo: 368047), se sídlem Gordon House, Barrow Street, Dublin 4, Irsko"],
          },
          {
            type: "p",
            text: "Na webu využíváme měření konverzí pomocí Google Ads, který obsahuje funkcionalitu rozšířené konverze na zvýšení přesnosti naměřených konverzí. Společnosti Google se předávají marketingová data o návštěvnících našeho webu, abychom ještě více vylepšili relevantnost měření konverzí. Ještě před odesláním jsou tato data zašifrovaná, aby byla maximálně chráněna. Společnost Google je může spárovat se svou databází, a to právě pro účely zpřesnění měření konverzí. Informace o návštěvnících našeho webu, které takto společnosti Google předáváme, jsou údaje, které vložíte do formulářů na našem webu, jako např. objednávkový či kontaktní formulář.",
          },
          {
            type: "p",
            text: "Pro přesnější personalizaci reklam používáme signály Google. Při udělování souhlasu se zpracováním cookies se automaticky zapíná i tato funkcionalita.",
          },
          {
            type: "p",
            text: "Při předávání osobních údajů se ze společnosti Google stává další správce, v ostatních případech jde o našeho zpracovatele. Veškeré informace ke zpracování osobních údajů ze strany společnosti Google najdete zde: https://policies.google.com/technologies/ads, https://policies.google.com/privacy a https://business.safety.google/privacy/ nebo prostřednictvím vašich vlastních uživatelských účtů.",
          },
        ],
      },
      {
        heading: "Účely zpracování osobních údajů",
        blocks: [
          {
            type: "p",
            text: "Vaše osobní údaje potřebujeme pro splnění naší právní povinnosti při uzavření kupní smlouvy. Vaše údaje můžeme dále zpracovávat pro marketingové analýzy nebo zasílání newsletterů.",
          },
        ],
      },
      {
        heading: "Co když osobní údaje odmítnete poskytnout",
        blocks: [{ type: "p", text: "Pokud odmítnete osobní údaje poskytnout, nemůžeme bohužel uzavřít kupní smlouvu." }],
      },
      {
        heading: "Po jakou dobu osobní údaje zpracováváme",
        blocks: [
          {
            type: "p",
            text: "Jsme oprávněni uchovávat vaše osobní údaje po dobu 5 let, poté jsou vaše osobní údaje zlikvidovány. Některé údaje jsou uchovávány na základě zákonných archivačních povinností, zejména dle daňových a účetních předpisů (lhůta 10 let).",
          },
        ],
      },
      {
        heading: "Jaká jsou Vaše práva",
        blocks: [
          {
            type: "list",
            intro:
              "V souvislosti se zpracováním osobních údajů se můžete obrátit na KONSTANTA – hliníkové ploty s.r.o. a požadovat:",
            items: [
              "Informace ohledně osobních údajů, které KONSTANTA – hliníkové ploty s.r.o. zpracovává, ohledně účelu a povahy zpracování osobních údajů, včetně informace o případných příjemcích osobních údajů mimo KONSTANTA – hliníkové ploty s.r.o. Obecné informace o činnostech zpracování osobních údajů jsou obsaženy v těchto pravidlech.",
              "Přístup k údajům, které jste poskytli KONSTANTA – hliníkové ploty s.r.o., ať již v průběhu registrace nebo vytvoření objednávky. V případě uplatnění tohoto práva Vám KONSTANTA – hliníkové ploty s.r.o. potvrdí, zda a jaké konkrétní osobní údaje jsou zpracovávány, a případně Vám budou tyto údaje zpřístupněny společně s informacemi o jejich zpracování.",
              "Opravu osobních údajů, pokud jsou jakkoli nepřesné nebo neúplné. Pouze v případě aktuálních údajů může KONSTANTA – hliníkové ploty s.r.o. správně vyřídit Vaši objednávku.",
              "Vysvětlení a odstranění závadného stavu (např. blokaci, opravu, doplnění či likvidaci osobních údajů), jestliže se domníváte, že KONSTANTA – hliníkové ploty s.r.o. zpracovává osobní údaje v rozporu s ochranou Vašeho osobního a soukromého života nebo v rozporu s právními předpisy.",
              "Výmaz osobních údajů (tzv. právo být zapomenut) nebo jejich omezené zpracování, pokud již nejsou potřebné pro uvedené účely, nebo pokud již KONSTANTA – hliníkové ploty s.r.o. nemá zákonný důvod osobní údaje zpracovávat, včetně případů, kdy s jejich dalším zpracováním nesouhlasíte. V rámci splnění uvedených podmínek KONSTANTA – hliníkové ploty s.r.o. Vaše údaje zcela nebo částečně zlikviduje.",
              "Přenesení automatizovaně zpracovávaných osobních údajů získaných na základě Vašeho souhlasu od KONSTANTA – hliníkové ploty s.r.o. k jinému subjektu, kdy KONSTANTA – hliníkové ploty s.r.o. předá Vaše osobní údaje v běžně používaném formátu Vám nebo jinému správci podle Vašeho přání.",
              "Dále mohou zákazníci KONSTANTA – hliníkové ploty s.r.o. vznést námitku proti zpracování osobních údajů v případě zasílání obchodních sdělení nebo vyhodnocování nákupních preferencí, na jejímž základě KONSTANTA – hliníkové ploty s.r.o. neprodleně ukončí zpracování osobních údajů pro tyto účely.",
            ],
          },
          { type: "p", text: "V případě jakýchkoli dotazů ohledně vašich práv se na nás obraťte na kontaktech níže." },
        ],
      },
      {
        heading: "Bezpečnost",
        blocks: [
          {
            type: "p",
            text: "Vaše osobní údaje, které nám poskytnete, ukládáme na servery našeho interního systému a webu. Přijali jsme technická opatření, která zajišťují zabezpečení osobních údajů šifrováním přenosu dat na webu www.konstantahp.cz pomocí HTTPS protokolu, a zabezpečili vaše osobní údaje v souladu s čl. 32 GDPR.",
          },
          {
            type: "p",
            text: "Veškeré osobní údaje v elektronické formě jsou uloženy v databázích a systémech, k nimž mají přístup pouze osoby, které potřebují s osobními údaji bezprostředně nakládat pro účely uvedené v těchto pravidlech, a to pouze v nezbytném rozsahu. Přístup k těmto osobním údajům je chráněn heslem a firewallem. Zabezpečení osobních údajů je ze strany KONSTANTA – hliníkové ploty s.r.o. pravidelně testováno a ochranu průběžně vylepšujeme.",
          },
        ],
      },
      {
        heading: "Kontakt",
        blocks: [
          {
            type: "p",
            text: "S jakýmikoli připomínkami ohledně zpracování osobních údajů nebo v případě uplatnění svých práv se můžete obracet na společnost KONSTANTA – hliníkové ploty s.r.o. e-mailem na adresu info@konstantahp.cz, nebo doporučeným dopisem na adresu: KONSTANTA – hliníkové ploty s.r.o., Maleč 36, 582 76 Maleč, Česká republika.",
          },
        ],
      },
    ],
  },
  sk: {
    linkLabel: "Ochrana osobných údajov",
    kicker: "GDPR",
    heading: "Ochrana osobných údajov",
    subtitle:
      "Dovoľte nám informovať Vás o ochrane Vašich osobných údajov, najmä v súvislosti s uzatvorenou kúpnou zmluvou.",
    sections: [
      {
        heading: "Úvod",
        blocks: [
          {
            type: "p",
            text: "Ochrana Vašich údajov a súkromia je pre nás kľúčová. Dbáme preto na bezpečnosť našich interných systémov i výber partnerov, v súlade s nariadením Európskeho parlamentu a Rady (EÚ) č. 2016/679 o ochrane fyzických osôb pri spracúvaní osobných údajov (GDPR).",
          },
        ],
      },
      {
        heading: "Kto je správcom Vašich údajov",
        blocks: [
          {
            type: "p",
            text: "Správcom je KONSTANTA – hliníkové ploty s.r.o., sídlo Maleč 36, 582 76 Maleč, Česká republika. IČO: 21827150. Spoločnosť je zapísaná v obchodnom registri Krajského súdu v Hradci Králové.",
          },
        ],
      },
      {
        heading: "Aké osobné údaje spracúvame",
        blocks: [
          {
            type: "p",
            text: "Na uzavretie zmluvy spracúvame meno, priezvisko, adresu, telefón a e-mail. E-mail je náš primárny identifikátor. Pri návšteve webu zaznamenávame IP adresu a ďalšie bezpečnostné dáta (čas, navštívená stránka).",
          },
        ],
      },
      {
        heading: "Cookies",
        blocks: [
          {
            type: "list",
            intro: "Na našom webe používame cookies, najmä pre analytické a marketingové účely. Väčšinou ide o dlhodobé cookies:",
            items: [
              "analytické a remarketingové (na zlepšenie webu, obsah, reklamy)",
              "konverzné a trackingové (sledovanie výkonu reklám)",
            ],
          },
          {
            type: "list",
            intro: "Údaje môžu byť použité na personalizáciu reklamy.",
            items: [
              "Google Ads a Sklik – tracking, remarketing",
              "Facebook – tracking, remarketing",
              "Google Analytics – analytika, konverzie",
            ],
          },
        ],
      },
      {
        heading: "Odmietnutie cookies",
        blocks: [
          {
            type: "p",
            text: "Ak nechcete personalizovaný obsah, cookies môžete odmietnuť cez nastavenia prehliadača (Chrome, Firefox, Safari, Edge, Android). Odmietnuť ich možno aj cez http://www.youronlinechoices.com/sk/.",
          },
        ],
      },
      {
        heading: "Kto má prístup k údajom",
        blocks: [
          {
            type: "p",
            text: "Údaje spracúva KONSTANTA – hliníkové ploty s.r.o. a jej pracovníci. Všetci sú viazaní mlčanlivosťou. Údaje odovzdávame len nevyhnutným spracovateľom.",
          },
          {
            type: "list",
            intro: "Najčastejší spracovatelia (iba ak je to potrebné):",
            items: [
              "Seznam Sklik (Seznam.cz, a.s.)",
              "Google, Google Analytics (Google Czech Republic, s.r.o.)",
              "Facebook Ireland Limited",
            ],
          },
          {
            type: "list",
            intro: "Marketingové cookies (s Vaším súhlasom) môžu byť odovzdané aj iným správcom:",
            items: ["Google Ireland Limited"],
          },
          {
            type: "p",
            text: "Používame pokročilé konverzie v Google Ads – šifrované dáta z formulárov sú bezpečne prenášané za účelom zlepšenia konverzného merania.",
          },
          { type: "p", text: "Používame Google Signály pre personalizáciu reklám – aktivujú sa pri udelení súhlasu s cookies." },
          {
            type: "p",
            text: "Google môže byť v niektorých prípadoch správcom. Viac informácií: https://policies.google.com/technologies/ads, https://policies.google.com/privacy a https://business.safety.google/privacy/.",
          },
        ],
      },
      {
        heading: "Účely spracovania",
        blocks: [
          { type: "p", text: "Údaje potrebujeme na uzavretie zmluvy. Používame ich aj pre marketing alebo zasielanie newsletterov." },
        ],
      },
      {
        heading: "Čo ak odmietnete údaje poskytnúť",
        blocks: [{ type: "p", text: "Bez týchto údajov nie je možné uzatvoriť kúpnu zmluvu." }],
      },
      {
        heading: "Doba uchovávania údajov",
        blocks: [{ type: "p", text: "Vaše údaje uchovávame 5 rokov, niektoré až 10 rokov (podľa daňových predpisov)." }],
      },
      {
        heading: "Vaše práva",
        blocks: [
          {
            type: "list",
            intro: "Môžete nás požiadať o:",
            items: [
              "Informácie o spracúvaní a príjemcoch údajov",
              "Prístup k svojim údajom",
              "Opravu nepresných údajov",
              "Výmaz alebo obmedzenie spracúvania údajov",
              "Prenositeľnosť údajov",
              "Námietku proti marketingovému spracúvaniu",
            ],
          },
          { type: "p", text: "V prípade otázok nás kontaktujte na kontaktoch nižšie." },
        ],
      },
      {
        heading: "Bezpečnosť",
        blocks: [
          {
            type: "p",
            text: "Údaje uchovávame na vlastných serveroch, s prenosom cez HTTPS. Prístup je chránený heslom a firewallom. Ochranu priebežne vylepšujeme.",
          },
        ],
      },
      {
        heading: "Kontakt",
        blocks: [
          {
            type: "p",
            text: "Kontaktujte nás e-mailom na info@konstantahp.cz alebo poštou na adresu: KONSTANTA – hliníkové ploty s.r.o., Maleč 36, 582 76 Maleč, Česká republika.",
          },
        ],
      },
    ],
  },
  de: {
    linkLabel: "Datenschutz",
    kicker: "DSGVO",
    heading: "Datenschutz",
    subtitle:
      "Wir informieren Sie über den Schutz Ihrer personenbezogenen Daten im Zusammenhang mit dem Kaufvertrag.",
    sections: [
      {
        heading: "Einleitung",
        blocks: [
          {
            type: "p",
            text: "Der Schutz Ihrer Daten und Ihrer Privatsphäre ist uns sehr wichtig. Wir achten auf die Sicherheit unserer Systeme und die Auswahl unserer Partner – gemäß der Datenschutz-Grundverordnung (EU) 2016/679 (DSGVO).",
          },
        ],
      },
      {
        heading: "Wer ist für Ihre Daten verantwortlich",
        blocks: [
          {
            type: "p",
            text: "Verantwortlich ist KONSTANTA – hliníkové ploty s.r.o., Maleč 36, 582 76 Maleč, Tschechische Republik. Identifikationsnummer (IČO): 21827150.",
          },
        ],
      },
      {
        heading: "Welche Daten verarbeiten wir",
        blocks: [
          {
            type: "p",
            text: "Wir verarbeiten Name, Adresse, Telefonnummer und E-Mail zur Vertragserfüllung. Ihre E-Mail ist unser Hauptidentifikator. Beim Besuch der Webseite erfassen wir IP-Adresse, Zeit und besuchte Seiten zu Sicherheitszwecken.",
          },
        ],
      },
      {
        heading: "Cookies",
        blocks: [
          {
            type: "list",
            intro: "Unsere Webseite verwendet Cookies für Analyse und Marketing. In der Regel setzen wir langfristige Cookies ein:",
            items: ["Analyse- und Remarketing-Cookies", "Konversions- und Tracking-Cookies"],
          },
          {
            type: "list",
            intro: "Ihre Daten können für personalisierte Werbung verwendet werden:",
            items: [
              "Google Ads und Sklik – Tracking, Remarketing",
              "Facebook – Tracking, Remarketing",
              "Google Analytics – Analyse, Conversion",
            ],
          },
        ],
      },
      {
        heading: "Ablehnung von Cookies",
        blocks: [
          {
            type: "p",
            text: "Sie können Cookies jederzeit in Ihrem Browser deaktivieren (Chrome, Firefox, Safari, Edge, Android) oder unter http://www.youronlinechoices.com/de/ ablehnen.",
          },
        ],
      },
      {
        heading: "Wer hat Zugang zu den Daten",
        blocks: [
          {
            type: "p",
            text: "Zugriff haben nur autorisierte Mitarbeiter und beauftragte Verarbeiter (Partnerunternehmen). Alle sind zur Verschwiegenheit verpflichtet.",
          },
          {
            type: "list",
            intro: "Wichtigste Verarbeiter (wenn nötig):",
            items: [
              "Seznam Sklik (Seznam.cz, a.s.)",
              "Google, Google Analytics (Google Czech Republic, s.r.o.)",
              "Facebook Ireland Limited",
            ],
          },
          {
            type: "list",
            intro: "Marketingdaten (mit Ihrer Zustimmung) können auch an andere Verantwortliche übergeben werden:",
            items: ["Google Ireland Limited"],
          },
          {
            type: "p",
            text: "Wir nutzen Google Ads Konversionstracking inkl. erweiterter Konversionen – verschlüsselte Formulardaten werden sicher übertragen und helfen, die Messgenauigkeit zu verbessern.",
          },
          { type: "p", text: "Zur besseren Personalisierung verwenden wir Google Signals – aktiviert bei Zustimmung zu Cookies." },
          {
            type: "p",
            text: "Google kann teilweise als Verantwortlicher agieren. Mehr: https://policies.google.com/technologies/ads, https://policies.google.com/privacy, https://business.safety.google/privacy/.",
          },
        ],
      },
      {
        heading: "Zweck der Datenverarbeitung",
        blocks: [
          { type: "p", text: "Wir verarbeiten Ihre Daten zur Vertragserfüllung und für Marketingzwecke (Newsletter usw.)." },
        ],
      },
      {
        heading: "Was passiert bei Verweigerung",
        blocks: [{ type: "p", text: "Ohne diese Daten können wir leider keinen Kaufvertrag abschließen." }],
      },
      {
        heading: "Speicherdauer",
        blocks: [
          { type: "p", text: "Daten werden 5 Jahre gespeichert, manche (z. B. Rechnungen) laut Gesetz 10 Jahre." },
        ],
      },
      {
        heading: "Ihre Rechte",
        blocks: [
          {
            type: "list",
            intro: "Sie haben das Recht auf:",
            items: [
              "Information über die Verarbeitung",
              "Zugang zu Ihren Daten",
              "Berichtigung ungenauer Daten",
              "Löschung („Recht auf Vergessenwerden“)",
              "Datenübertragbarkeit",
              "Widerspruch gegen Direktmarketing",
            ],
          },
          { type: "p", text: "Bei Fragen kontaktieren Sie uns bitte über die unten stehenden Kontakte." },
        ],
      },
      {
        heading: "Sicherheit",
        blocks: [
          {
            type: "p",
            text: "Ihre Daten sind auf unseren Servern gespeichert und werden per HTTPS verschlüsselt übertragen. Zugriff haben nur berechtigte Personen, geschützt durch Passwort und Firewall. Wir prüfen und verbessern unsere Sicherheitsmaßnahmen regelmäßig.",
          },
        ],
      },
      {
        heading: "Kontakt",
        blocks: [
          {
            type: "p",
            text: "Bei Fragen schreiben Sie an info@konstantahp.cz oder per Post an: KONSTANTA – hliníkové ploty s.r.o., Maleč 36, 582 76 Maleč, Tschechische Republik.",
          },
        ],
      },
    ],
  },
}
