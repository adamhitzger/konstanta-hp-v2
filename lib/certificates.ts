import type { CertificateDoc, CertificateItem } from "@/types"
import type { Lang } from "@/lib/translations"

/**
 * Vezme syrové `certificate` dokumenty (CERTIFICATES_QUERY) a připraví je pro
 * <Certifikaty />. Dokument bez souboru se zahazuje — karta bez odkazu ke stažení
 * nemá smysl. Název padá zpátky na češtinu a dál na `originalFilename`: dodavatelská
 * PDF od Cortiza mají v Sanity jen ošklivý strojový název, ale radši ten než prázdno.
 */
export function buildCertificates(
  docs: CertificateDoc[] | null | undefined,
  lang: Lang,
): CertificateItem[] {
  return (docs ?? [])
    .filter((doc): doc is CertificateDoc & { url: string } => Boolean(doc.url))
    .map((doc) => ({
      id: doc._id,
      title: pick(doc.titleCs, doc.titleSk, doc.titleDe, lang) ?? stripExtension(doc.fileName) ?? "",
      note: pick(doc.noteCs, doc.noteSk, doc.noteDe, lang) ?? formatMeta(doc),
      url: doc.url,
      ext: (doc.ext ?? "").toUpperCase(),
    }))
    .filter((item) => item.title.length > 0)
}

function pick(cs: string | undefined, sk: string | undefined, de: string | undefined, lang: Lang) {
  const preferred = lang === "sk" ? sk : lang === "de" ? de : cs
  return (preferred ?? cs)?.trim() || undefined
}

function stripExtension(fileName: string | undefined): string | undefined {
  if (!fileName) return undefined
  return fileName.replace(/\.[^.]+$/, "").trim() || undefined
}

/** Záložní popisek, když v Sanity není vyplněná poznámka: „PDF · 1,2 MB“. */
function formatMeta(doc: CertificateDoc): string {
  const parts = [(doc.ext ?? "").toUpperCase(), formatSize(doc.size)].filter(Boolean)
  return parts.join(" · ")
}

function formatSize(bytes: number | undefined): string {
  if (!bytes) return ""
  const mb = bytes / (1024 * 1024)
  if (mb >= 1) return `${mb.toFixed(1).replace(".", ",")} MB`
  return `${Math.max(1, Math.round(bytes / 1024))} kB`
}
