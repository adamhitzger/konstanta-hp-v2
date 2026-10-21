import { revalidateTag } from "next/cache"
import { type NextRequest, NextResponse } from "next/server"
import { parseBody } from "next-sanity/webhook"

/**
 * Cíl webhooku ze Sanity (Manage → API → Webhooks): po publikování / smazání dokumentu
 * zneplatní data cache všech dotazů, které z daného `_type` čtou (`tags` v `sanityFetch`).
 * Díky tomu se dotazy na Sanity neopakují po pár sekundách, ale jen po změně obsahu.
 *
 * Webhook: projekce `{_type}`, metoda POST, secret = `SANITY_REVALIDATE_SECRET`.
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET
    if (!secret) {
      return new NextResponse("Missing environment variable: SANITY_REVALIDATE_SECRET", { status: 500 })
    }

    // Třetí argument: počkat, než se změna propíše do Content Lake, ať další dotaz
    // nevrátí ještě starou verzi a tu si cache neuloží na další hodinu.
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(req, secret, true)

    if (!isValidSignature) {
      return new NextResponse("Invalid signature", { status: 401 })
    }
    if (!body?._type) {
      return new NextResponse("Missing _type", { status: 400 })
    }

    // `expire: 0` = okamžitě, ne stale-while-revalidate — po publikování ve Studiu má
    // hned další návštěva vidět novou verzi.
    revalidateTag(body._type, { expire: 0 })
    return NextResponse.json({ revalidated: body._type })
  } catch (error) {
    console.error("Revalidace ze Sanity webhooku selhala:", error)
    return new NextResponse("Error", { status: 500 })
  }
}
