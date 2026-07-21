export interface ActionResponse<T> {
  success: boolean
  message: string;
  errors?: {
      [K in keyof T]?: string[];
    };
  inputs?: T 
}

export interface Contact {
      name: string;
      email: string;
      tel: string;
      company: string;
      msg: string;

}

export interface InquireProduct extends Contact {
  produkt: string
  address: string;
  pocet: number;
  delka: number;
  barva: string;
  obec: string;
  zip: string;
}

export interface ConfPhotos {
  jednokridla: string[];
  dvoukridla: string[];
  samonosna: string[];
  poKolejnici: string[];
  telPoj: string[];
  telSam: string[];
  atypicka: string[];
  sikma: string[];
  skladaci: string[];
  sekcni: string[];
  branka: string[];
  ploty: string[];
  pristresek: string[];
  bioklimaticka: string[];
  zahrada: string[];
}

export interface ProductPhoto {
  banner: string;
  nameCs: string;
  nameDe: string;
  nameSk: string;
  popisCs: any;
  popisDe: any;
  popisSk: any;
  cat: string;
  okSUrl: string[];
  okKUrl: string[];
  okKMUrl: string[];
  p60Url: string[];
  p90Url: string[];
  p120Url: string[];
  p150Url: string[];
  tyckaUrl: string[];
  vlKomUrl: string[];
  drevodekor: string[];
  tahokov: string[];
  [key: string]: string[] | string | any;
}

export interface EmailRows {
  name: string;
  qty: number | string;
  priceWithoutDph: number | null;
  dph: number | null;
  priceWithDph: number | null;
}

export type Parametr = {
  pCs: string;
  pDe: string;
  csValue: string;
  deValue: string;
}

export type Product = {
  nameCs: string;
  nameDe: string;
  popisCs: any;
  popisDe: any;
  parametry: Parametr[];
  photosUrl: string[];
  cat: string;
}

export type Produkty = Product[]

export interface Sections {
  oploceni: string;
  pergola: string;
  ploty: string;
  pergoly: string;
}
