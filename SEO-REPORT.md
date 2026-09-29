# SEO — konstantahp.cz

Stav k 29. 9. 2026. Audity z 16. 9. a 29. 9. jsou zapracované (obrázky, hero, JSON-LD, titulky, sitemapa, úklid `public/`, favicony; 29. 9. přesměrování starých URL, `/zpracovani-os-udaju`, vlastní 404, `og:url` přes `pageOpenGraph()` v `lib/site.ts`, WebPage JSON-LD na konfigurátorech, `geo` v LocalBusiness, zkrácené popisy). Tenhle soubor drží jen to, co **zbývá**, a rozhodnutí, která platí.

Úpravy do 23. 9. jsou na produkci; změny z 29. 9. čekají na nasazení.

## Rozhodnutí, která platí

- **SK/DE beze změny** (16. 9.): `?lang=sk` / `?lang=de` dál vrací český `<title>`, `lang="cs"` a canonical na CS, zatímco sitemapa deklaruje hreflang — Google si to odporuje a SK/DE neindexuje. Je to vědomě odložené. Až se bude řešit: buď prefixy `/sk/…`, `/de/…` s vlastními metadaty a `alternates.languages`, nebo smazat `alternates.languages` ze `sitemap.ts` a dát `?lang=` `noindex` (jak je to u Aerorozvědky, `langRobots()` v `lib/seo.ts` tam).
- **H1 homepage** (23. 9.): homepage dlouho neměla `h1` vůbec — nadpis „Ploty, které vydrží." se nikde nevykresloval a hero galerie má čtyři rovnocenné `h2` (Ploty / Brány / …). Doplněn vizuálně skrytý `h1` (`sr-only`) v `components/HorizontalGallery.tsx`, text v `galleryContent[lang].h1` pro cs/sk/de. Znění „Hliníkové ploty, brány a pergoly na míru" je **pracovní** — finální formulace je v briefu pro p. Líbala a mění se na jednom místě v `lib/translations.ts`.

- **Staré URL** (29. 9.): `/produkty`, `/kontakt`, `/pergKonf` přesměrovává `next.config.mjs`. `/blog` a `/blog/*` záměrně vracejí 404 (Studio nemá žádné články); až vznikne Rádce, přesměrovat tam.
- **`/zpracovani-os-udaju`** (29. 9.): text převzatý 1:1 ze starého webu (`lib/privacy-content.ts`), jen opravené překlepy. Odkaz je v patičce a za souhlasem u všech formulářů.

## Zbývá — v kódu

| # | Co | Poznámka |
|---|---|---|
| A | **Realizace po kategoriích** | `/realizace?filter=…` vykreslí jen jednu kategorii a canonical všech variant je `/realizace` → Google vidí jen fotky plotů. Buď všechny kategorie v HTML, nebo `/realizace/brany` atd. Odloženo (29. 9.). |
| B | **H1 podstránek jsou slogany** | „Váš design, vaše pravidla“, „Detaily, které dělají rozdíl“… — klíčová slova jen v `<title>`. Znění s p. Líbalem. |
| C | **Otevírací doba v LocalBusiness** | `openingHoursSpecification` chybí, protože ji web nikde neuvádí — dodá klient. |

## Zbývá — mimo kód / od klienta

Podklady pro obsah jsou v briefu pro p. Líbala (PR, marketing): **https://claude.ai/artifact/QJDqwNsbpkDNDaSgxGey1q** — které fotky, texty a popisky, do jakých sekcí, v jakém pořadí.

| # | Co | Kdo | Poznámka |
|---|---|---|---|
| 1 | **Reálné fotky místo stocku** — `public/proces-1..5.jpg`, `public/team.png` (homepage Proč my + O nás Příběh), `public/og-image.jpg` | klient / Líbal | generované stock fotky; bod 1 briefu |
| 2 | **Realizace ve Studiu** — pergoly 0 fotek, plaňky/kapka/lamela bez fotek, popisy u tří produktů prázdné, popisky (alt) u 4 snímků hero jen „Ploty/Brány/…" | Líbal | Studio → Fotky produktových variant, Fotky v hlavní sekci |
| 3 | **5 produktových stránek** (`/hlinikove-ploty`, `/hlinikove-brany`, `/hlinikove-branky`, `/bioklimaticke-pergoly`, `/hlinikove-zabradli`) | texty Líbal, kód Adam | 500–900 slov, cena od, FAQ, `Product`/`Service` schéma; dnes všechna produktová slova vedou do konfigurátoru, který je formulář |
| 4 | **Rádce** (`/radce/…`) | texty Líbal, kód Adam | Studio má typ `article` (Články), web nemá route; první článek „Kolik stojí hliníkový plot" |
| 5 | **Detaily realizací** (`/realizace/[slug]`) | Adam, až budou u fotek údaje (obec, motiv, barva) | cíl „hliníkový plot + město" |
| 6 | **Google Business Profile + Firmy.cz** | klient | stejné NAP jako patička (Maleč 36, 582 76), kategorie „Výrobce plotů", texty v briefu |
| 7 | **Loga zákazníků** | klient | sekce `customers.tsx` je hotová, bez log se nezobrazí (0 ve Studiu) |
| 8 | **Zásady ochrany osobních údajů — aktuálnost + cookie lišta** | klient | text je ze starého webu a zmiňuje Sklik, Facebook, Google Ads a „souhlas s cookies“; web ale nemá cookie lištu a GTM se načítá hned. Ověřit, které nástroje v GTM opravdu běží, a doplnit consent (Consent Mode v2). |

## Po nasazení zkontrolovat

- PageSpeed Insights homepage (mobil): LCP by mělo spadnout pod 2,5 s — hero má `fetchpriority="high"` jen na prvním snímku, ostatní lazy.
- Search Console: Rich results pro `LocalBusiness`, `FAQPage` (`/o-nas`), `BreadcrumbList`.
- Favicony v záložce a na iOS ploše — nové jsou z plotového znaku loga na černém podkladu (`public/apple-icon.png`, `icon-*-32x32.png`); pokud má klient raději oranžové, je to změna barvy v generátoru.
