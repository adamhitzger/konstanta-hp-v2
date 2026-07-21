"server-only"

import { groq } from "next-sanity";

export const IG_FEED = groq`*[_type == 'igFeed']{
    url,
    "img":img.asset->url,
}`

export const BANNER_PHOTOS = groq`*[_type == 'bannerPhotos'][0]{
    "photosUrl": photos[]{
        "src": photo.asset->url,
        alt,
        cjText,
        deText,
        skText
    }
}`

export const EMPLOYEES = groq`*[_type == 'employee']{
    name,
    pos,
    email,
    tel,
    "img": image.asset->url
}`

export const FINISHED_WORK = groq`*[_type == 'finishedWork']{
        _id,
        place,
        "photosUrl": photos[].asset->url
    }`
    export const COUNT_ALL_PRODUCTS = groq`count(*[_type == 'product'])`;
    export const COUNT_FILTERED_PRODUCTS = groq`count(*[_type == 'product' && cat == $filter])`;
    export const PRODUCTS_MAIN_PAGE = groq`*[_type == 'product'][0..7]{
        nameCs,
        nameDe,
        nameSk,
        popisCs,
        popisDe,
        popisSk,
        parametry[]{
            pCs,
            pDe,
            pSk,
            csValue,
            deValue,
            skValue
        },
        "photosUrl": photos[].asset->url
    }`

    export const PRODUCT_PHOTOS_BY_CAT = groq`*[_type == 'productPhotos' && cat == $filter]{
    "banner": photo.asset->url,
    nameCs,
        nameDe,
        nameSk,
        popisCs,
    popisDe,
    popisSk,
    "okSUrl":okS[].asset->url,
    "okKUrl":okK[].asset->url,
    "okKMUrl":okKM[].asset->url,
    "p60Url":p60[].asset->url,
    "p90Url":p90[].asset->url,
    "p120Url":p120[].asset->url,
    "p150Url":p150[].asset->url,
  "tyckaUrl":tycka[].asset->url,
  "vlKomUrl":vlKom[].asset->url,
  "drevodekor": drevodekor[].asset->url,
  "tahokov": tahokov[].asset->url

    }`


    export const GET_ARTICLE_SLUG = groq`*[_type == "article" && slug.current == $slug][0] {
    _id,
    heading,
    headingSk,
    headingDe,
    slug,
    datum,
    image,
    description,
    descriptionSk,
    descriptionDe,
    content,
    contentSk,
    contentDe
  }`
    export const GET_ARTICLES = groq`*[_type == 'article'] | order(datum desc) [$start..$end] {
      _id,
      heading,
      headingSk,
      headingDe,
      slug,
      datum,
      image,
      description,
      descriptionSk,
      descriptionDe

    }`;

   export const  TOTAL_ARTICLES = groq`count(*[_type == "article"])`

    export const PRODUCTS = groq`*[_type == 'product'][$start..$end]{
        nameCs,
        nameDe,
        popisCs,
        popisDe,
        parametry[]{
            pCs,
            pDe,
            csValue,
            deValue
        },
        "photosUrl": photos[].asset->url,
        cat
    }`

    export const FILTERED_PRODUCTS = groq`*[_type == 'product'][$start..$end]{
        nameCs,
        nameDe,
        popisCs,
        popisDe,
        parametry[]{
            pCs,
            pDe,
            csValue,
            deValue
        },
        "photosUrl": photos[].asset->url,
    }`

    export const CONF_IMGS_QUERY = groq`*[_type == "confPhotos"][0]{
  "jednokridla": jednokridla[].asset->url,
  "dvoukridla": dvoukridla[].asset->url,
  "samonosna": samonosna[].asset->url,
  "poKolejnici": poKolejnici[].asset->url,
  "telPoj": telPoj[].asset->url,
  "telSam": telSam[].asset->url,
  "atypicka": atypicka[].asset->url,
  "sikma": sikma[].asset->url,
  "skladaci": skladaci[].asset->url,
  "sekcni": sekcni[].asset->url,
  "branka": branka[].asset->url,
  "ploty": ploty[].asset->url,
  "bioklimaticka": bioklimaticka[].asset->url
}`;

   export const PERG_IMGS_QUERY = groq`*[_type == "confPhotos"][0]{
  "bioklimaticka": bioklimaticka[].asset->url,
  "zahrada": zahrada[].asset->url,
  "pristresek": pristresek[].asset->url,
}`;

   export const STEPS_QUERY = groq`*[_type == "steps"][0]{
  steps[]{
    "photos": photos[].asset->url,
    skHeading,
    skText,
    njHeading,
    njText,
    cjHeading,
    cjText,
  }| order(poradi asc)
}`;

 export const SECTION_QUERY = groq`*[_type == "sections"][0]{
    "oploceni": oploceni.asset->url,
     "pergola": pergola.asset->url,
      "ploty": ploty.asset->url,
       "pergoly": pergoly.asset->url,
}`;

export const REVIEWS_QUERY = groq`*[_type == "reviews"]{
    author_name,
    author_url,
    text,
    skText,
    njText,
    rating,
    "image": img.asset->url,
}`
