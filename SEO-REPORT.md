# SEO — konstantahp.cz

Stav k 17. 9. 2026. Audit z 16. 9. je zapracovaný (obrázky, hero, JSON-LD, titulky, sitemapa, úklid `public/`, favicony); tenhle soubor drží jen to, co **zbývá**, a rozhodnutí, která platí. Hotové věci jsou vidět v kódu (`lib/json-ld.ts`, `components/json-ld.tsx`, `next.config.mjs`, `components/HorizontalGallery.tsx`).

**Nic z toho není nasazené** — produkce má stále `images.unoptimized`, 38 MB obrázků na homepage a favicony s logem v0. Nasadit = commit + push.

## Rozhodnutí, která platí

- **SK/DE beze změny** (16. 9.): `?lang=sk` / `?lang=de` dál vrací český `<title>`, `lang="cs"` a canonical na CS, zatímco sitemapa deklaruje hreflang — Google si to odporuje a SK/DE neindexuje. Je to vědomě odložené. Až se bude řešit: buď prefixy `/sk/…`, `/de/…` s vlastními metadaty a `alternates.languages`, nebo smazat `alternates.languages` ze `sitemap.ts` a dát `?lang=` `noindex` (jak je to u Aerorozvědky, `langRobots()` v `lib/seo.ts` tam).
- **H1 homepage** (23. 9.): homepage dlouho neměla `h1` vůbec — nadpis „Ploty, které vydrží." se nikde nevykresloval a hero galerie má čtyři rovnocenné `h2` (Ploty / Brány / …). Doplněn vizuálně skrytý `h1` (`sr-only`) v `components/HorizontalGallery.tsx`, text v `galleryContent[lang].h1` pro cs/sk/de. Znění „Hliníkové ploty, brány a pergoly na míru" je **pracovní** — finální formulace je v briefu pro p. Líbala a mění se na jednom místě v `lib/translations.ts`.

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
| 8 | **`public/chromium-pack.tar` (66 MB)** | Adam, potřebuje Vercel Blob token | `lib/actions.ts:106` ho stahuje z `konstantahp.cz/chromium-pack.tar` pro PDF nabídku; má být na Blob/S3, ne veřejně v `public/`. SEO neovlivní, jen hygiena |

## Po nasazení zkontrolovat

- PageSpeed Insights homepage (mobil): LCP by mělo spadnout pod 2,5 s — hero má `fetchpriority="high"` jen na prvním snímku, ostatní lazy.
- Search Console: Rich results pro `LocalBusiness`, `FAQPage` (`/o-nas`), `BreadcrumbList`.
- Favicony v záložce a na iOS ploše — nové jsou z plotového znaku loga na černém podkladu (`public/apple-icon.png`, `icon-*-32x32.png`); pokud má klient raději oranžové, je to změna barvy v generátoru.
