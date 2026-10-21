import { createClient } from 'next-sanity'
import type { QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from '../env'

// Token má právo zápisu (upload fotek z formulářů), takže nesmí do prohlížeče:
// proto bez `NEXT_PUBLIC_` a mimo `sanity/env.ts`. Ten importuje i Studio, které běží
// v prohlížeči — tam serverová proměnná neexistuje a `assertValue` by spadl.
// Tenhle soubor importují jen server komponenty a server actions.
const token = process.env.SANITY_API_TOKEN
if (!token) throw new Error('Missing environment variable: SANITY_API_TOKEN')

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: true,
  // V request logu ze Sanity (Manage → Usage) jsou dotazy webu vidět jako `web.<tag>`.
  requestTagPrefix: 'web',
})

export const isSanityConfigured = Boolean(projectId && projectId.length > 0)

/**
 * Data cache se obnovuje webhookem ze Sanity po publikování (app/api/revalidate/route.ts),
 * který invaliduje `tags` = `_type` změněného dokumentu. Hodina je jen pojistka pro případ,
 * že webhook selže — dřív to bylo 30 s, tedy až ~86k dotazů měsíčně na každý dotaz.
 */
const REVALIDATE_FALLBACK = 3600

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
  tag,
}: {
  query: string;
  params?: QueryParams;
  /** Typy dokumentů, ze kterých dotaz čte — podle nich webhook invaliduje cache. */
  tags: string[];
  /** Název dotazu pro request log ve Sanity (`home.reviews` → `web.home.reviews`). */
  tag: string;
}) {
  return client.fetch<QueryResponse>(query, params, {
    perspective: "published",
    // Živé API, ne API CDN: ta drží odpovědi až 60 s, takže refetch hned po webhooku
    // dostal ještě verzi před publikováním a cache si ji uložila na další hodinu.
    // Návštěvníky obsluhuje data cache Nextu, na Sanity jde dotaz jen po webhooku
    // nebo po REVALIDATE_FALLBACK.
    useCdn: false,
    tag,
    next: { revalidate: REVALIDATE_FALLBACK, tags },
  });
}
