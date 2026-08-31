import { Img, Section, Text } from "@react-email/components"
import type { PergolaConfType } from "@/lib/schemas"
import type { ConfPhotos } from "@/types"
import {
  type Lang,
  colorLabels,
  localeTags,
  mailContent,
  mountLabels,
  pergMailContent,
  pergolaTypeLabels,
  stineniLabels,
  stranyLabels,
  strechaMaterialLabels,
} from "@/lib/translations"
import {
  CompanyCard,
  DataRow,
  MailFooter,
  MailShell,
  Masthead,
  PhotoCard,
  SectionHead,
  mailColors,
  mailStyles,
} from "@/components/mail-theme"

/** Nákres stran pergoly (A–D) — statický obrázek ze Sanity. */
const SIDES_DIAGRAM =
  "https://cdn.sanity.io/images/6goo9xhq/production/c87d1ac56142fffbe6b86ba1c7ba8a216eea23e0-720x576.png"

/** `lang` posílá `sendPergConf` ze stejné prop, jakou dostal konfigurátor z `?lang=`. */
export const PergMail = (data: PergolaConfType, photos: ConfPhotos, lang: Lang = "cs") => {
  const t = mailContent[lang] ?? mailContent.cs
  const p = pergMailContent[lang] ?? pergMailContent.cs
  const locale = localeTags[lang] ?? localeTags.cs
  const mounts = mountLabels[lang] ?? mountLabels.cs
  const strany = stranyLabels[lang] ?? stranyLabels.cs
  const colors = colorLabels[lang] ?? colorLabels.cs

  /** Hodnoty z konfigurátoru chodí jako CS klíče — přeložit, jinak nechat tak, jak přišly. */
  const label = (dict: Record<string, string>, value?: string) =>
    (value && (dict[value] ?? value)) || p.notSpecified

  const pergolaLabel = label(pergolaTypeLabels[lang] ?? pergolaTypeLabels.cs, data.pergola)

  const heroPhoto =
    (data.pergola === "bioklimaticka" && photos?.bioklimaticka?.[0]) ||
    (data.pergola === "zimni_zahrada" && photos?.zahrada?.[0]) ||
    (data.pergola === "pristresek" && photos?.pristresek?.[0]) ||
    undefined

  const sides = [
    data.a && `A – ${strany.a}`,
    data.b && `B – ${strany.b}`,
    data.c && `C – ${strany.c}`,
    data.d && `D – ${strany.d}`,
  ].filter(Boolean) as string[]

  return (
    <MailShell lang={lang} preview={t.preview}>
      <Masthead eyebrow={t.eyebrow} headline={p.headline} logoAlt={t.logoAlt} />

      <Section className="k-pad" style={mailStyles.body}>
        <Text style={mailStyles.lead}>{`${t.salutation} ${data.fullname},`}</Text>
        <Text style={mailStyles.text}>{t.intro}</Text>
        <Text style={mailStyles.text}>{t.intro2}</Text>
      </Section>

      {heroPhoto && (
        <>
          <SectionHead num="01" label={t.productsHeading} />
          <Section className="k-pad" style={{ ...mailStyles.sectionWrap, margin: "18px 0 0" }}>
            <PhotoCard src={heroPhoto} caption={pergolaLabel} alt={pergolaLabel} />
          </Section>
        </>
      )}

      {/* Konfigurace pergoly */}
      <SectionHead num={heroPhoto ? "02" : "01"} label={p.configHeading} />
      <Section className="k-pad" style={{ ...mailStyles.sectionWrap, margin: "18px 0 0" }}>
        <Section style={mailStyles.dataTable}>
          <DataRow label={p.pergolaLabel} value={pergolaLabel} />
        </Section>

        {data.stojici && data.rozmeryStojiciP && (
          <>
            <Text style={mailStyles.subHead}>{mounts.stojici}</Text>
            <Section style={mailStyles.dataTable}>
              <DataRow label={p.width} value={`${data.rozmeryStojiciP.sirka} m`} />
              <DataRow label={p.length} value={`${data.rozmeryStojiciP.delka} m`} />
              <DataRow label={p.depth} value={`${data.rozmeryStojiciP.hloubka} m`} />
            </Section>
          </>
        )}

        {data.keStene && data.rozmeryPkStene && (
          <>
            <Text style={mailStyles.subHead}>{mounts.keStene}</Text>
            <Section style={mailStyles.dataTable}>
              <DataRow label={p.width} value={`${data.rozmeryPkStene.sirka} m`} />
              <DataRow label={p.length} value={`${data.rozmeryPkStene.delka} m`} />
              <DataRow label={p.depth} value={`${data.rozmeryPkStene.hloubka} m`} />
            </Section>
          </>
        )}

        {data.kRohu && data.rozmeryPkRohu && (
          <>
            <Text style={mailStyles.subHead}>{mounts.kRohu}</Text>
            <Section style={mailStyles.dataTable}>
              <DataRow label={p.cornerA} value={`${data.rozmeryPkRohu.sirka} m`} />
              <DataRow label={p.cornerB} value={`${data.rozmeryPkRohu.hloubka} m`} />
              <DataRow label={p.cornerC} value={`${data.rozmeryPkRohu.delka} m`} />
            </Section>
          </>
        )}

        <Text style={mailStyles.subHead}>{p.moreHeading}</Text>
        <Section style={mailStyles.dataTable}>
          {data.pergola !== "pristresek" ? (
            <>
              <DataRow
                label={p.shading}
                value={label(stineniLabels[lang] ?? stineniLabels.cs, data.stineni)}
              />
              {sides.length > 0 && <DataRow label={p.sides} value={sides.join(", ")} />}
            </>
          ) : (
            <DataRow
              label={p.material}
              value={label(strechaMaterialLabels[lang] ?? strechaMaterialLabels.cs, data.material)}
            />
          )}
          {/* LED se nabízí jen u bioklimatické pergoly — u ostatních typů řádek vynecháme. */}
          {data.pergola === "bioklimaticka" && (
            <>
              <DataRow label={p.led} value={data.ledSvetla ? p.ledYes : p.ledNo} />
              {data.ledSvetla && Number(data.ledPocet) > 0 && (
                <DataRow label={p.ledCount} value={`${data.ledPocet} ${p.pieces}`} />
              )}
            </>
          )}
          <DataRow label={p.color} value={label(colors, data.barva)} />
        </Section>

        {/* Nákres stran patří pod tabulku, ne doprostřed řádku — jinak rozbije sloupce. */}
        {sides.length > 0 && data.pergola !== "pristresek" && (
          <>
            <div style={{ ...mailStyles.photoFrame, margin: "18px 0 6px" }}>
              <Img src={SIDES_DIAGRAM} width="518" alt={p.sidesAlt} style={mailStyles.photo} />
            </div>
            <Text style={mailStyles.photoCaption}>{p.sidesAlt}</Text>
          </>
        )}

        <Text style={{ ...mailStyles.footerSmall, color: mailColors.mutedSoft, margin: "8px 0 0" }}>
          {p.autoGenerated}
        </Text>
      </Section>

      {/* Údaje zákazníka */}
      <SectionHead num={heroPhoto ? "03" : "02"} label={t.yourInfoHeading} />
      <Section className="k-pad" style={{ ...mailStyles.sectionWrap, margin: "18px 0 0" }}>
        <Section style={mailStyles.dataTable}>
          <DataRow label={t.fullName} value={data.fullname} />
          <DataRow label={t.emailLabel} value={data.email} />
          <DataRow label={t.phoneLabel} value={data.phoneNumber} />
          <DataRow label={t.addressLabel} value={`${data.address}, ${data.obec}, ${data.zip}`} />
          {data.company && <DataRow label={t.companyLabel} value={data.company} />}
          {data.message && <DataRow label={t.messageLabel} value={data.message} />}
          <DataRow label={t.dateLabel} value={new Date().toLocaleDateString(locale)} />
        </Section>
      </Section>

      <SectionHead num={heroPhoto ? "04" : "03"} label={t.companyHeading} />
      <CompanyCard t={t} />

      <MailFooter t={t} />
    </MailShell>
  )
}

export default PergMail
