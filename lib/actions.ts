"use server"

import { client, sanityFetch } from "@/sanity/lib/client";
import { ProductPhoto, Produkty, EmailRows } from "@/types";
import { PRODUCTS, COUNT_ALL_PRODUCTS, PRODUCT_PHOTOS_BY_CAT} from "@/sanity/lib/queries"
import { ActionResponse, Contact } from "@/types";
import { contactSchema, confSchema, productSchema, ConfiguratorType, PergolaConfType, pergolaSchema } from "./schemas";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer"
import { InquireProduct } from "@/types";
import { SanityImageAssetDocument } from "next-sanity";
import { render } from "@react-email/render"
import ConfMail from "@/components/ConfMail";
import exceljs from "exceljs"
import path from "path";
import PergMail from "@/components/PergMail";
import os from 'os';
import  fs  from 'fs';
import { ConfPhotos } from "@/types";
import { CONF_IMGS_QUERY, PERG_IMGS_QUERY } from "@/sanity/lib/queries";
import { getLang } from "@/lib/translations";

// Zprávy vracené `sendContact` uživateli (toast) — lokalizované podle skrytého
// pole `lang` z kontaktního formuláře (components/contact.tsx).
const contactActionMessages = {
  cs: {
    invalid: "Některá pole jste nevyplnili dobře",
    mailFailed: "Nepodařilo se odeslat e-mail. Zkuste to znovu",
    success: "Děkujeme za záslání! Co nevidět se Vám ozveme.",
    failed: "Nepovedlo se odeslat Vaše údaje",
  },
  sk: {
    invalid: "Niektoré polia ste nevyplnili správne",
    mailFailed: "Nepodarilo sa odoslať e-mail. Skúste to znova",
    success: "Ďakujeme za odoslanie! Čoskoro sa vám ozveme.",
    failed: "Nepodarilo sa odoslať vaše údaje",
  },
  de: {
    invalid: "Einige Felder wurden nicht korrekt ausgefüllt",
    mailFailed: "Die E-Mail konnte nicht gesendet werden. Versuchen Sie es erneut",
    success: "Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze bei Ihnen.",
    failed: "Ihre Daten konnten nicht gesendet werden",
  },
} as const

let cachedExecutablePath: string | null = null;
let downloadPromise: Promise<string> | null = null;

const CHROMIUM_PACK_URL =
  `https://konstantahp.cz/chromium-pack.tar`

async function getChromiumPath(): Promise<string> {
  if (cachedExecutablePath) return cachedExecutablePath;

  if (!downloadPromise) {
    const chromium = (await import("@sparticuz/chromium-min")).default;
    downloadPromise = chromium.executablePath(CHROMIUM_PACK_URL).then((p) => {
      cachedExecutablePath = p;
      return p;
    });
  }

  return downloadPromise;
}

export async function generatePdf(html: string, outputPath: string) {
  let browser;

  try {
    const isVercel = !!process.env.VERCEL_ENV;

    let puppeteer: any;
    let launchOptions: any = { headless: true };

    if (isVercel) {
      const chromium = (await import("@sparticuz/chromium-min")).default;
      puppeteer = await import("puppeteer-core");

      const executablePath = await getChromiumPath();

      launchOptions = {
        ...launchOptions,
        args: chromium.args,
        executablePath,
      };
    } else {
      puppeteer = await import("puppeteer");
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    const pdf = await page.pdf({
      path: outputPath,
      format: "A4",
      printBackground: true,
      preferCSSPageSize: true,
    });

  } finally {
    if (browser) await browser.close();
  }
}

function colorRow(ws: exceljs.Worksheet, rowNumber: number) {
  const row = ws.getRow(rowNumber);
  row.eachCell((cell,id) => {
    if(id >0){
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: "FFCCCCCC" },
    };
    cell.font = {
      color: { argb: "FFFFFFFF" } // Černá barva textu (výchozí)
    };
    }
  });
}
function smtp(){
  return nodemailer.createTransport({
        host: "smtp.seznam.cz",
        port: 587,
        secure: false,
        auth: {
         user: process.env.FROM_EMAIL!,
         pass: process.env.FROM_EMAIL_PASSWORD!,
        },
        tls: {
         ciphers: "SSLv3"
        }
      });
}

function tableHrRow(): string {
  return `
    <tr>
      <td colspan="4" style="border-top:1px solid #e6e6e6; padding:0; margin:0;"></td>
    </tr>
  `;
}
function buildProductRows( item: string, mnozstvi: number | string,cena: number, dph: number, cenaSDph: number): string {
    return`
      <tr>
        <td style="border:1px solid #ddd;">${item}</td>
        <td style="border:1px solid #ddd;">${mnozstvi} </td>
        <td style="border:1px solid #ddd;">${Number((cena).toFixed(0)).toLocaleString("cs-CZ")} Kč</td>
        <td style="border:1px solid #ddd;">${Number((dph).toFixed(0)).toLocaleString("cs-CZ")} Kč</td>
        <td style="border:1px solid #ddd;">${Number((cenaSDph).toFixed(0)).toLocaleString("cs-CZ")} Kč</td>
      </tr>
    `;
  ;
}
function buildProductRowsString( item: string, mnozstvi: string): string {
    return`
      <tr>
        <td style="border:1px solid #ddd;">${item}</td>
        <td style="border:1px solid #ddd; colspan: 4;">${mnozstvi}</td>
      </tr>
    `;
  ;
}

function htmlToPdf(
  userName: string,
  userEmail: string,
  tel: string,
  address: string,
  city: string,
  photo1: string,
  photo2: string,
  photo3: string,
  productRows: string,
  sazbaDph: number,
  company?: string
): string {

const year = new Date().getFullYear();

return `
<!DOCTYPE html>
<html lang="cs">
<head>
<meta charset="UTF-8"/>

<style>

body{
font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial;
background:#f4f6f8;
margin:0;
padding:20px;
color:#1a1a1a;
}

.container{
max-width:900px;
margin:auto;
background:white;
padding:40px;
border-radius:10px;
box-shadow:0 2px 8px rgba(0,0,0,0.08);
}

.header{
display:flex;
justify-content:space-between;
align-items:center;
margin-bottom:40px;
}

.logo{
height:70px;
}

.title{
font-size:32px;
font-weight:700;
}

.section{
margin-top:40px;
}

.images{
page-break-inside:avoid;
}

.section h2{
font-size:20px;
margin-bottom:10px;
border-bottom:2px solid #eee;
padding-bottom:6px;
}

.customer{
display:grid;
grid-template-columns:1fr 1fr;
gap:40px;
font-size:16px;
line-height:1.6;
margin-top:10px;
}

.customer h3{
margin:0 0 10px 0;
font-size:18px;
}

.images{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:16px;
margin-top:20px;
}

.images img{
width:100%;
height:220px;
object-fit:cover;
border-radius:8px;
border:1px solid #ddd;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th{
background:#f5f5f5;
text-align:left;
padding:10px;
border:1px solid #ddd;
}

td{
padding:10px;
border:1px solid #ddd;
}

.conditions{
font-size:18px;
line-height:1.7;
}

ul{
margin:10px 0;
padding-left:20px;
}

.footer{
text-align:center;
margin-top:50px;
font-size:12px;
color:#777;
}

</style>
</head>

<body>

<div class="container">

<div class="header">

<img class="logo"
src="https://cdn.sanity.io/files/a3wdqcta/production/28aefe7de25e70f91a0f788514e80d75bfd41b40.svg"/>

<div class="title">
Cenová nabídka
</div>

</div>


<div class="section">

<h2>Zákazník</h2>

<div class="customer">

<div>

<h3 style="margin-top:0;">Prodávající</h3>

<strong>Konstanta HP</strong><br>
Maleč 36<br>
582 76 Maleč<br>
Česká republika<br>
<br>
IČO: 21827150<br>
Telefon: +420 770 169 411<br>
Email:
<a href="mailto:Sleekfence@seznam.cz">Sleekfence@seznam.cz</a><br>
Web:
<a href="https://www.konstantahp.cz">www.konstantahp.cz</a>

</div>


<div>

<h3 style="margin-top:0;">Zákazník</h3>

<strong>Jméno:</strong> ${userName}<br>
<strong>Email:</strong> ${userEmail}<br>
<strong>Telefon:</strong> ${tel}<br>
<br>
<strong>Adresa:</strong><br>
${address}<br>
${city}<br>
${company ?? ""}

</div>

</div>

</div>


<div class="section">

<h2>Konfigurace</h2>

<div class="images">
<img src="${photo1}">
<img src="${photo2}">
<img src="${photo3}">
</div>

</div>


<div class="section">

<h2>Cenová nabídka</h2>

<table>

<thead>
<tr>
<th>Produkt</th>
<th>Množství</th>
<th>Cena bez DPH</th>
<th>DPH ${sazbaDph*100}%</th>
<th>Cena s DPH</th>
</tr>
</thead>

<tbody>
${productRows}
</tbody>

</table>

</div>


<div class="section">

<h2>Termín realizace</h2>

<p>
Realizace zakázky proběhne v rozmezí <strong>8–14 týdnů</strong>
od podpisu smlouvy a uhrazení zálohy.
</p>

</div>


<div class="section">

<h2>Záloha</h2>

<p>
Před zahájením realizace je požadována záloha ve výši
<strong>70 % z celkové ceny zakázky</strong>.
Doplatek bude uhrazen v den montáže po předání díla.
</p>

</div>


<div class="section conditions page-break">

<h2>Obchodní podmínky pro fyzické osoby</h2>

<ul>
<li>Záruka na materiál: 10 let</li>
<li>Záruka na pohon: 3 roky</li>
<li>Záruka na montážní práce: 2 roky</li>
</ul>

<p>
Záruka se vztahuje na vady materiálu, funkčnost pohonu a kvalitu provedených
montážních prací.
</p>

<h2>Obchodní podmínky pro firmy</h2>

<ul>
<li>Splatnost faktur: 30 dnů</li>
<li>Pozastávky: 10% / 8% / 2%</li>
<li>Zařízení staveniště: 0%</li>
<li>Vícepráce v ceně / čase: 0% / 0%</li>
<li>Záruka výrobků: 55 měsíců</li>
<li>Záruka pohonů: 36 měsíců</li>
<li>Záruka montáže: 24 měsíců</li>
</ul>

<p>
Realizace zakázky proběhne v dohodnutý termín s objednatelem.
</p>

</div>


<div class="footer">

© ${year} Konstanta HP

</div>

</div>

</body>
</html>
`;
}

function calculateBrana(
  name: string,
  sazbaDph: number,
  ws:exceljs.Worksheet,
  brana?: {
    delka?: number | undefined;
    vyska?: number | undefined;
    pocet?: number | undefined;
    pohon?: boolean | undefined;
    tahoma?: boolean | undefined;
    ovladac?: boolean | undefined;
}[] | undefined,
): {bezDPH: number, html: String}{
let bezDPH: number =0;
  let html = "";
  if(brana  && brana.length > 0){
  brana.forEach((r) => {
    if(r.delka && r.pocet && r.vyska){
      let vzor = 0;
    switch(name){
      case "Brána teleskopická samonosná":
      case "Brána atypická":
      case "Brána šikmá":
      case "Brána sekční":
        vzor = 12000;
        break;
      case "Brána teleskopická pojízdná":
      case "Samonosná brána":
      case "Brána skládací":
        vzor = 10000;
        break;
      case "Dvoukřídlá brána":
      case "Jenokřídlá brána":
      case "Brána posuvná po kolejnici":
        vzor = 7000;
        break;
    }
    const plocha = (r.delka / 1000) * (r.vyska / 1000);
    const zaklad = ((plocha * vzor) * r.pocet);
    const pohonCena = r.pohon ? (name === "Dvoukřídlá brána" || name === "Brána skládací" ? 20000 : 10000) : 1500;
    const tahomaCena = r.tahoma ? r.pocet *5000 : 0;
    const ovladacCena = r.ovladac ? r.pocet *1000 : 0;
    const montazCena = r.pocet * 4500;
    bezDPH += zaklad+pohonCena+tahomaCena+ovladacCena+montazCena
    const headerRow = ws.addRow([`Produkt`,"Množství","Cena bez DPH", "DPH", "Cena s DPH"])
    ws.addRow([`${name}: ${r.delka}x${r.vyska} mm`,r.pocet,zaklad.toFixed(0)+ " Kč",(zaklad*sazbaDph).toFixed(0)+ " Kč", (zaklad*(1+sazbaDph)).toFixed(0)+ " Kč" ]);
    html +=(buildProductRows( name + " \n" + `${r.delka}x${r.vyska} mm`,r.pocet,zaklad,zaklad*sazbaDph, Number((zaklad*(1+sazbaDph)).toFixed(0)) ))
    if(r.pohon){
       ws.addRow(["1x Somfy Elixo500 3S io - pohon s řídicí jednotkou a rádiovým přijímačem, 1x Somfy Master Pro Bitech - bezpečnostní fotobuňky (1 pár) dosah 10 m, 2x Odblokovací klíč (použití při výpadku proudu):", 1,pohonCena.toFixed(0)+ " Kč", (pohonCena*sazbaDph).toFixed(0)+ " Kč", (pohonCena*(1+sazbaDph)).toFixed(0)+ " Kč"]);
      html +=(buildProductRows("1x Somfy Elixo500 3S io - pohon s řídicí jednotkou a rádiovým přijímačem, 1x Somfy Master Pro Bitech - bezpečnostní fotobuňky (1 pár) dosah 10 m, 2x Odblokovací klíč (použití při výpadku proudu):", 1,pohonCena, pohonCena*sazbaDph, Number((pohonCena*(1+sazbaDph)).toFixed(0))))
      }else{
        ws.addRow(["Zástrč brány:", 1,pohonCena.toFixed(0)+ " Kč", (pohonCena*sazbaDph).toFixed(0)+ " Kč", (pohonCena*(1+sazbaDph)).toFixed(0)+ " Kč"]);
        html +=(buildProductRows("Zástrč brány:", 1,pohonCena, pohonCena*sazbaDph, Number((pohonCena*(1+sazbaDph)).toFixed(0))))
      }
    if(r.tahoma) {
      ws.addRow(["Somfy TaHoma switch je centrální jednotka pro chytrou domácnost, která umožňuje ovládat a automatizovat různá zařízení v domě, jako jsou rolety, žaluzie, brány, osvětlení, topení a další",1,tahomaCena.toFixed(0)+ " Kč",(tahomaCena*sazbaDph).toFixed(0)+ " Kč",(tahomaCena*(1+sazbaDph)).toFixed(0)+ " Kč"]);
      html +=(buildProductRows("Somfy TaHoma switch je centrální jednotka pro chytrou domácnost, která umožňuje ovládat a automatizovat různá zařízení v domě, jako jsou rolety, žaluzie, brány, osvětlení, topení a další",1,tahomaCena,tahomaCena*sazbaDph,tahomaCena*(1+sazbaDph)))
    }
    if (r.ovladac){
       ws.addRow(["1x Somfy Keygo io - dálkový ovladač",1, ovladacCena.toFixed(0)+ " Kč", (ovladacCena*sazbaDph).toFixed(0)+ " Kč", (ovladacCena*(1+sazbaDph)).toFixed(0)+ " Kč"]);
      html +=(buildProductRows( "1x Somfy Keygo io - dálkový ovladač", 1,ovladacCena, ovladacCena*sazbaDph, Number((ovladacCena*(1+sazbaDph)).toFixed(0))))
      }
    ws.addRow(["Montáž brány:",1, montazCena.toFixed(0)+ " Kč", (montazCena*sazbaDph).toFixed(0)+ " Kč", (montazCena*(1+sazbaDph)).toFixed(0)+ " Kč"]);
    html +=(buildProductRows( "Montáž brány:",1, montazCena, montazCena*sazbaDph, Number((montazCena*(1+sazbaDph)).toFixed(0))))
    html += tableHrRow();
    colorRow(ws, headerRow.number)
  }});


 }
 return {bezDPH, html}
}
async function createXlsx(data: ConfiguratorType, isCompany: boolean,photo1:string,photo2:string,photo3:string,) {
let celkem:number=0;
let celkovyPocetDilcu: number =0;
const sazbaDph = isCompany ? 0.21 : 0.12
let rows = "";
console.log(celkem)
//Excel workbook
const wb = new exceljs.Workbook();
const ws = wb.addWorksheet("Kalkulace");

if(!data.brana){
  const brany = [
    { name: "Dvoukřídlá brána", data: data.rozmery2KBran },
    { name: "Jenokřídlá brána", data: data.rozmeryKBran },
    { name: "Brána posuvná po kolejnici", data: data.rozmeryPBran },
    { name: "Samonosná brána", data: data.rozmerySBran },
    { name: "Brána teleskopická samonosná", data: data.rozmeryTSBran },
    { name: "Brána teleskopická pojízdná", data: data.rozmeryTPBran },
    { name: "Brána atypická", data: data.rozmeryABran },
    { name: "Brána šikmá", data: data.rozmerySikBran },
    { name: "Brána sekční", data: data.rozmerySekBran },
    { name: "Brána skládací", data: data.rozmerySklBran },
  ];

  brany.forEach((b) => {
    const result = calculateBrana(b.name, sazbaDph, ws, b.data);
    celkem += result.bezDPH;
    rows+=(result.html);
  });
}
if(data.branka && data.rozmeryBranek  && data.rozmeryBranek.length > 0){
  data.rozmeryBranek.forEach((r) => {
    if(r.delka && r.pocet && r.vyska){
    const vzor = 7000;
    const plocha = (r.delka / 1000) * (r.vyska / 1000);
    const zaklad = (vzor * plocha) * r.pocet;
    const zamekCena = r.zamek ? 1500 : 0;
    const schrankaCena = r.schranka ? 5000 : 0;
    const zvonekCena = r.zvonek ? 18000 : 0;
    const montazCena = r.pocet * 1500;
    const klikaCena = 1500;
    const bezDPH = zaklad + zamekCena + schrankaCena + zvonekCena + montazCena + klikaCena;
    celkem += bezDPH;

    ws.addRow([`Branka: ${r.delka}x${r.vyska} mm`, r.pocet,zaklad.toFixed(0) + " Kč", (zaklad*sazbaDph).toFixed(0)+ " Kč", (zaklad*(1+sazbaDph)).toFixed(0)+ " Kč"]);
    rows+=(buildProductRows(`Branka`+ " \n"+`${r.delka}x${r.vyska} mm`,r.pocet,zaklad, zaklad*sazbaDph, zaklad*(1+sazbaDph)))
    if(r.zamek) {
      ws.addRow(["El.zámek napětí 9 - 12 V AC/DC, s posuvnou zarážkou a mechanickým odblokováním.", 1,zamekCena.toFixed(0)+ " Kč", (zamekCena*sazbaDph).toFixed(0)+ " Kč", (zamekCena*(1+sazbaDph)).toFixed(0)+ " Kč"]);
      rows+=(buildProductRows("El.zámek napětí 9 - 12 V AC/DC, s posuvnou zarážkou a mechanickým odblokováním.",1, zamekCena, zamekCena*sazbaDph, zamekCena*(1+sazbaDph)))
    }
    if(r.schranka){
      ws.addRow(["Poštovní schránka zapuštěna do lamely",1,schrankaCena.toFixed(0)+ " Kč",(schrankaCena*sazbaDph).toFixed(0)+ " Kč",(schrankaCena*(1+sazbaDph)).toFixed(0)+ " Kč"])
      rows+=(buildProductRows("Poštovní schránka zapuštěna do lamely",1,schrankaCena,schrankaCena*sazbaDph,schrankaCena*(1+sazbaDph)))
    };
    if(r.zvonek){
      ws.addRow(["Domovní videotelefon Somfy V500 PRO io",1, zvonekCena.toFixed(0)+ " Kč", (zvonekCena*sazbaDph).toFixed(0)+ " Kč", (zvonekCena*(1+sazbaDph)).toFixed(0)+ " Kč"])
      rows+=(buildProductRows("Domovní videotelefon Somfy V500 PRO io",1, zvonekCena, zvonekCena*sazbaDph, zvonekCena*(1+sazbaDph)))
    };
    ws.addRow(["Kovani brány nerez (klika/klika - koule/klika)",1, klikaCena.toFixed(0)+ " Kč", (klikaCena*sazbaDph).toFixed(0)+ " Kč", (klikaCena*(1+sazbaDph)).toFixed(0)+ " Kč"]);
    rows+=(buildProductRows("Kovani brány nerez (klika/klika - koule/klika)",1, klikaCena, klikaCena*sazbaDph,klikaCena*(1+sazbaDph)))
    ws.addRow(["Montáž branky:",1, montazCena.toFixed(0)+ " Kč", (montazCena*sazbaDph).toFixed(0)+ " Kč", (montazCena*(1+sazbaDph)).toFixed(0)]);
    rows+=(buildProductRows("Montáž branky:",1, montazCena, montazCena*sazbaDph, montazCena*(1+sazbaDph)))
    rows+= tableHrRow()
  }});
 }

if(data.dilce && data.rozmeryDilcu  && data.rozmeryDilcu.length > 0){
  data.rozmeryDilcu.forEach((r) => {
    if(r.delka != null && r.pocet != null && r.vyska != null){
      let vzor = 0;
      switch (data.motiv) {
        case "o-standart":
          case "planka-60":
        case "plaka-90":
        case "planka-120":
        case "planka-150":
        case "tycka":
          vzor = 3000;
          break;
        case "kapka":
        case "vlastní kombinace":
          vzor = 4000;
          break;
        case "kapka-mini":
        case "tahokov":
          vzor = 5000;
          break;
    }
    celkovyPocetDilcu += r.pocet;
    const plocha = (r.delka / 1000) * (r.vyska / 1000);
    const zaklad = vzor * plocha * r.pocet;
    const vypln = r.pocet * 500;
    const bezDPH = zaklad+vypln;
    celkem+=bezDPH
    ws.addRow([`Plotové dílce: ${r.delka}x${r.vyska} mm`,r.pocet, zaklad.toFixed(0)+ " Kč", (zaklad*sazbaDph).toFixed(0)+ " Kč",(zaklad*(1+sazbaDph)).toFixed(2)+ " Kč"]);
    rows+=(buildProductRows("Plotové dílce"+"\n"+`${r.delka}x${r.vyska} mm`,r.pocet, zaklad, zaklad*sazbaDph,zaklad*(1+sazbaDph)))
  }});
  ws.addRow(["Montáž dílců:",celkovyPocetDilcu,(celkovyPocetDilcu*500).toFixed(0)+ " Kč",((celkovyPocetDilcu*500)*sazbaDph).toFixed(0)+ " Kč",((celkovyPocetDilcu*500)*(1+sazbaDph)).toFixed(0)+ " Kč"]);
  rows+=(buildProductRows("Montáž dílců:",celkovyPocetDilcu, (celkovyPocetDilcu*500),((celkovyPocetDilcu*500)*sazbaDph),((celkovyPocetDilcu*500)*(1+sazbaDph))))
  rows += tableHrRow()
 }


 celkovyPocetDilcu = celkovyPocetDilcu * 2;
 if(data.typSloupku !== "vlastni"){
    ws.addRow([`Typ sloupků`, data.typSloupku]);
    rows+=(buildProductRowsString(`Typ sloupků`, data.typSloupku));
    if(data.typSloupku === "hliníkové"){
      celkem += 1300*celkovyPocetDilcu
      ws.addRow(["Cena za bm",celkovyPocetDilcu*2,1000*celkovyPocetDilcu+ " Kč" ,((1000*celkovyPocetDilcu)*sazbaDph).toFixed(0)+ " Kč", (1000*celkovyPocetDilcu*(1+sazbaDph)).toFixed(0)+ " Kč"]);
      ws.addRow(["Cena čepičky za kus",celkovyPocetDilcu,300*celkovyPocetDilcu+ " Kč", ((300*celkovyPocetDilcu)*sazbaDph).toFixed(0)+ " Kč", (300*celkovyPocetDilcu*(1+sazbaDph)).toFixed(0)+ " Kč"]);
      rows+=(buildProductRows("Cena za bm",celkovyPocetDilcu*2,1000*celkovyPocetDilcu ,((1000*celkovyPocetDilcu)*sazbaDph), 1000*celkovyPocetDilcu*(1+sazbaDph)));
      rows+=(buildProductRows("Cena čepičky za kus",celkovyPocetDilcu,300*celkovyPocetDilcu, ((300*celkovyPocetDilcu)*sazbaDph), 300*celkovyPocetDilcu*(1+sazbaDph)));
    }else{
    ws.addRow([`Povrch tvárnice`, data.povrchTvarnice]);
    ws.addRow([`Barva tvárnice`, data.barvaTvarnice]);
    rows+=(buildProductRowsString(`Povrch tvárnice`,String(data.povrchTvarnice)));
    rows+=(buildProductRowsString("Barva tvárnice", String(data.barvaTvarnice)));
  }
 }else{
  ws.addRow([`Typ sloupků`, data.typSloupku]);
  rows+=(buildProductRowsString(`Typ sloupků`, data.typSloupku));
 }
 ws.addRow([`Barva dílců`, data.barva]);
 ws.addRow([`Motiv`, data.motiv]);
 ws.addRow(["Celkem:", " ", celkem+ " Kč", (celkem * sazbaDph).toFixed(0)+ " Kč", (celkem *(1+sazbaDph)).toFixed(0)+ " Kč"])

 rows+=(buildProductRowsString(`Barva dílců`, data.barva));
 rows+=(buildProductRowsString(`Motiv`, data.motiv));
 rows+=(buildProductRows("Celkem:", " ", celkem, (celkem * sazbaDph), celkem *(1+sazbaDph)))

 ws.columns.forEach((col, index) => {
  if(index == 0){
     col.width = 40;
     col.alignment = { wrapText: true}
    }
  if(index > 0 && index < 5) col.width = 30
  if(index > 0 && index <= 3)col.alignment ={horizontal: "right"}
 })
 const fullHtml = htmlToPdf(data.fullname,data.email, data.phoneNumber, data.address, data.obec, photo1, photo2, photo3, rows, sazbaDph,data.message)
 const tmpDir = os.tmpdir();
 const filePath = path.join(tmpDir, "kalkulace.xlsx");
 const pdfFile = path.join(tmpDir, "kalkulace.pdf");
 const jsonPath = path.join(tmpDir, "data.json");
  ws.eachRow((row) => {
    const cell = row.getCell(1); // První sloupec (index 1)
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: "FFCCCCCC" } // Šedá barva pozadí
    };
    cell.font = {
      color: { argb: "FFFFFFFF" } // Černá barva textu (výchozí)
    };
    cell.border = {
      bottom: { style: 'thin', color: { argb: 'FFFFFFFF' } }, // Bílé dolní ohraničení
      right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
    };
  });

  await wb.xlsx.writeFile(filePath).then(() => {
    console.log("✅ Excel vytvořen jako kalkulace.xlsx");
  });

  await fs.writeFile(
    jsonPath,
    JSON.stringify(data, null, 2),
    (err) => {
  if (err) {
    console.error('Error writing Data.json:', err);
    return;
  }
  console.log('Data.json written successfully!');
}
  )

   await generatePdf(fullHtml, pdfFile).then(() => console.log("PDF vytvořeno!"))

  .catch(console.error);
  return {filePath, pdfFile, jsonPath}
}

export async function getWorkByCat(filter: string){
  try{
    const result: ProductPhoto[] = await sanityFetch<ProductPhoto[]>({query: PRODUCT_PHOTOS_BY_CAT, params: {filter}})
    return result;
  }catch(error){
    console.error(error);
        throw error;
  }
}

export async function getProducts(start: number, end: number){
  try{
    const result: Produkty = await sanityFetch<Produkty>({query: PRODUCTS, params: {start, end}})
    const count: number =await sanityFetch({query: COUNT_ALL_PRODUCTS})

    return { result, count };
  }catch(error){
    console.error(error);
        throw error;
  }
}

export async function sendPergConf(
  values: PergolaConfType
): Promise<ActionResponse<PergolaConfType>> {
  let revalidate = false;
  let uploadFile: SanityImageAssetDocument| null=null;
  const transporter = smtp();
  try {
    const validatedData = pergolaSchema.safeParse(values);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Některá pole jste nevyplnili dobře",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: values,
      };
    } else {
      const data = validatedData.data;
      const urls: string[]= []
      console.log(data.file)
      console.log("Data File:", data.file);
  console.log("File Count:", data.file?.length);

if (data.file && data.file.length > 0) {
  for (let i = 0; i < data.file.length; i++) {
    const file = data.file[i];
    console.log("Processing File:", file.name);

    const filename = `obrazek-${i}.jpg`;
    const arrBuffer = await file.arrayBuffer();
    console.log("ArrayBuffer Size:", arrBuffer.byteLength);

    const buffer = Buffer.from(arrBuffer);

    try {
       uploadFile = await client.assets.upload("image", buffer, {
        filename,
        contentType: "image/jpg",
      });

      console.log("Upload Response:", uploadFile);

      if (uploadFile?.url) {
        urls.push(uploadFile.url);
        console.log("Uploaded URL:", uploadFile.url);
      } else {
        console.log("Upload failed for:", filename);
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  }
}
      const pergs = await sanityFetch<ConfPhotos>({query: PERG_IMGS_QUERY})
        const mailOptions: any//eslint-disable-line @typescript-eslint/no-explicit-any
         = {
          from: process.env.FROM_EMAIL,
          to: ["adam.hitzger@icloud.com"],
          subject: `Nová poptávka z konfigurátoru - ${data.fullname}`,
          html: await render(PergMail(data, pergs))
        }
        console.log(urls)
        if(urls.length > 0) {
          mailOptions.attachments = mailOptions.attachments ?? [];
          urls.forEach((url:string,i:number) =>{
            mailOptions.attachments?.push({filename: `obrazek-${i}.jpg`, path: url})
          })
        }
      const sendMail = await transporter.sendMail(mailOptions);
      if (!sendMail.accepted) {
        revalidate = false;
        return {
          success: false,
          message: "Nepodařilo se odeslat e-mail. Zkuste to znovu",
        };
      } else {
        revalidate = true;

        return {
          success: true,
          message: "Děkujeme za záslání! Co nevidět se Vám ozveme.",
        };
      }
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Nepovedlo se odeslat Vaše údaje",
    };
  } finally {
    if (revalidate) {
      revalidatePath("/");
    }
  }
}

export async function sendConf(
  values: ConfiguratorType
): Promise<ActionResponse<ConfiguratorType>> {
  let revalidate = false
  let uploadFile: SanityImageAssetDocument| null=null;
  const transporter = smtp();
  try {
    const validatedData = confSchema.safeParse(values);
    if (!validatedData.success) {
      return {
        success: false,
        message: "Některá pole jste nevyplnili dobře",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: values,
      };
    } else {
      const photos = await sanityFetch<ConfPhotos>({query: CONF_IMGS_QUERY})

      const data = validatedData.data;
      const isCompany = data.company && data.company.length>0 ? true : false
      const filePath2 = await createXlsx(data, isCompany,photos.branka[0], photos.dvoukridla[0], photos.bioklimaticka[0]
        )
if (!filePath2) {
  console.error("Chyba: createXlsx nevrátil platnou cestu k souboru.");
  return {
    success: false,
    message: "Nepodařilo se vytvořit soubor s kalkulací.",
  };
}
      console.log(data.file?.[0])
      const urls: string[]= []
      console.log("Data File:", data.file);
console.log("File Count:", data.file?.length);

if (data.file && data.file.length > 0) {
  for (let i = 0; i < data.file.length; i++) {
    const file = data.file[i];
    console.log("Processing File:", file.name);

    const filename = `obrazek-${i}.jpg`;
    const arrBuffer = await file.arrayBuffer();
    console.log("ArrayBuffer Size:", arrBuffer.byteLength);

    const buffer = Buffer.from(arrBuffer);

    try {
      uploadFile = await client.assets.upload("image", buffer, {
        filename,
        contentType: "image/jpg",
      });

      console.log("Upload Response:", uploadFile);

      if (uploadFile?.url) {
        urls.push(uploadFile.url);
        console.log("Uploaded URL:", uploadFile.url);
      } else {
        console.log("Upload failed for:", filename);
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  }
}
const html = await render(ConfMail({userName: data.fullname,
          userEmail: data.email, tel: data.phoneNumber, address: data.address, city: data.obec, msg: data.message,zip: data.zip,  company: data.company, photos: photos, data: data}))
      const mailOptions: any //eslint-disable-line @typescript-eslint/no-explicit-any
      = {
        from: process.env.FROM_EMAIL,
     //to: "nabidky@konstantahp.cz",
      to: "adam.hitzger@icloud.com",
        subject: `Nová poptávka z konfigurátoru - ${data.fullname}`,
        html,
        attachments: [
          {
            filename: "kalkulace.xlsx",
            path: filePath2.filePath
          },
          {
            filename: "kalkulace.pdf",
            path: filePath2.pdfFile
          },
          {
            filename: "data.json",
            path: filePath2.jsonPath
          },
        ]
      };
      console.log(urls)
      if(urls.length > 0) {
        mailOptions.attachments = mailOptions.attachments ?? [];
        urls.forEach((url:string,i:number) =>{
          mailOptions.attachments?.push({filename: `obrazek-${i}.jpg`, path: url})
        })
      }


      //mailOptions.attachments?.push({filename: "kalkulace.xlsx",path: filePath2})

      const sendMail = await transporter.sendMail(mailOptions);
      await fs.unlink(filePath2.filePath, (err) => {
      if (err) throw err;
        console.log('xlsx was deleted');
      })

      await fs.unlink(filePath2.pdfFile, (err) => {
      if (err) throw err;
        console.log('pdf was deleted');
      })

      await fs.unlink(filePath2.jsonPath, (err) => {
      if (err) throw err;
        console.log('json was deleted');
      })
      console.log(sendMail.messageId)
      console.log(sendMail.response)

      if(sendMail.accepted) {
        revalidate = true;

        console.log("Odpoved z SMTP: ",sendMail.response)
        return {
          success: true,
          message: "Děkujeme za záslání! Co nevidět se Vám ozveme.",
        };
      }else {
        revalidate = false;

        return {
          success: false,
          message: "Nepodařilo se odeslat e-mail. Zkuste to znovu",
        };
      }
    }

  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Nepovedlo se odeslat Vaše údaje",
    };
  } finally {
    if (revalidate) {
      revalidatePath("/");
    }
  }
}

export async function sendContact(
    prevState: ActionResponse<Contact>,
    formData: FormData
  ): Promise<ActionResponse<Contact>> {
    let revalidate = false;
    const transporter = smtp();
    const m = contactActionMessages[getLang(formData.get("lang") as string | undefined)];
    try {
      const contact: Contact = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        tel: formData.get("tel") as string,
        company: formData.get("company") as string,
        msg: formData.get("msg") as string,
      };

      const validatedData = contactSchema.safeParse(contact);
      if (!validatedData.success) {
        return {
          success: false,
          message: m.invalid,
          errors: validatedData.error.flatten().fieldErrors,
          inputs: contact,
        };
      } else {
        const data = validatedData.data;
        const sendMail = await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          //to: "nabidky@konstantahp.cz",
          to: "adam.hitzger@icloud.com",
          subject: "Nový kontakt",
          text: `Celé jméno: ${data.name}, Email: ${data.email}, Tel. číslo: ${data.tel}, Firma: ${data.company}, Zpráva: ${data.msg}`,
        });
        if (!sendMail.accepted) {
          revalidate = false;
          return {
            success: false,
            message: m.mailFailed,
          };
        } else {

          revalidate = true;
          return {
            success: true,
            message: m.success,
          };
        }
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: m.failed,
      };
    } finally {
      if (revalidate) {
        revalidatePath("/");
      }
    }
}

export async function sendProduct(
    prevState: ActionResponse<InquireProduct>,
    formData: FormData
  ): Promise<ActionResponse<InquireProduct>> {
    let revalidate = false;
    const transporter = smtp();
    try {
      const inquire: InquireProduct = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        tel: formData.get("tel") as string,
        company: formData.get("company") as string,
        msg: formData.get("msg") as string,
        zip: formData.get("zip") as string,
        produkt: formData.get("produkt") as string,
        address: formData.get("address") as string,
        obec: formData.get("obec") as string,
        pocet: Number(formData.get("pocet")),
        delka: Number(formData.get("delka")),
        barva: formData.get("barva") as string,
      };

      const validatedData = productSchema.safeParse(inquire);
      if (!validatedData.success) {
        return {
          success: false,
          message: "Některá pole jste nevyplnili dobře",
          errors: validatedData.error.flatten().fieldErrors,
          inputs: inquire,
        };
      } else {
        const data = validatedData.data;
        const sendMail = await transporter.sendMail({
          from: process.env.FROM_EMAIL,
          to: "nabidky@konstantahp.cz",
          subject: `Nová poptávka na produkt ${data.produkt}`,
          text: `Celé jméno: ${data.name}, Email: ${data.email}, Tel. číslo: ${data.tel}, Firma: ${data.company}, Délka: ${data.delka}, Barva: ${data.barva}, Počet ks.: ${data.pocet}, Adresa: ${data.obec} ${data.address} ${data.zip}, Zpráva: ${data.msg}`,
        });
        if (!sendMail.accepted) {
          revalidate = false;
          return {
            success: false,
            message: "Nepodařilo se odeslat e-mail. Zkuste to znovu",
          };
        } else {

          revalidate = true;
          return {
            success: true,
            message: "Děkujeme za záslání! Co nevidět se Vám ozveme.",
          };
        }
      }
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Nepovedlo se odeslat Vaše údaje",
      };
    } finally {
      if (revalidate) {
        revalidatePath("/");
      }
    }
}
