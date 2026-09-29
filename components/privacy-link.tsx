import { PRIVACY_PATH, privacyContent } from "@/lib/privacy-content"
import { withLang, type Lang } from "@/lib/translations"

/** Odkaz na zásady ochrany osobních údajů — za souhlasem u formulářů. */
export function PrivacyLink({ lang = "cs" }: { lang?: Lang }) {
  return (
    <a
      href={withLang(PRIVACY_PATH, lang)}
      target="_blank"
      className="underline underline-offset-2 hover:text-foreground"
    >
      {privacyContent[lang].linkLabel}
    </a>
  )
}
