import { Body, Container, Head, Html, Img, Preview, Section, Text, Hr, Row, Column , Heading} from "@react-email/components";
import { PergolaConfType } from "@/lib/schemas";
import { ConfPhotos } from "@/types";

export const PergMail = (data: PergolaConfType, photos: ConfPhotos
)=> (
  <Html>
    <Head />
    <Preview>Děkujeme za vytvoření konfigurace s Konstanta HP</Preview>
    <Body style={main}>
      <Container style={container}>

        {/* Header */}
      <Img
                  src="https://cdn.sanity.io/files/a3wdqcta/production/28aefe7de25e70f91a0f788514e80d75bfd41b40.svg"
                  width="280"
                  height="280"
                  alt="Logo Konstanta HP"
                  style={image}
                />

        {/* Thank you message */}
        <Text style={text}>Vážený/á {data.fullname},</Text>
        <Text style={text}>
          Děkujeme, že jste si vybrali Konstanta HP pro vytvoření vaší konfigurace! Jsme potěšeni, že vás můžeme přivítat mezi našimi váženými zákazníky. Vaše důvěra v naše produkty a služby pro nás znamená vše a zavazujeme se poskytnout vám zážitek nejvyšší kvality.
        </Text>
        <Text style={text}>
          Vaše konfigurace byla přijata a je zpracovávána s maximální péčí. Cenovou kalkulaci naleznete v přiloženém souboru. Vážíme si vašeho zájmu a těšíme se na další spolupráci.
        </Text>

        {/* Images Section */}
        <Section style={imageSection}>
          {data.pergola === "bioklimaticka" && photos.bioklimaticka != null &&
         <Img
                  src={photos.bioklimaticka[0]}
                  width="280"
                  height="280"
                  alt="Logo Konstanta HP"
                  style={image}
                />
        }
        {data.pergola === "zimni_zahrada" && photos.zahrada != null &&
         <Img
                  src={photos.zahrada[0]}
                  width="280"
                  height="280"
                  alt="Logo Konstanta HP"
                  style={image}
                />
        }
        {data.pergola === "pristresek" && photos.pristresek != null &&
         <Img
                  src={photos.pristresek[0]}
                  width="280"
                  height="280"
                  alt="Logo Konstanta HP"
                  style={image}
                />
        }
        </Section>

        {/* Pergola Information */}
        <Section style={pergolaContainer}>
          <Heading style={header}>Nový kontakt - Pergola</Heading>
          <Section style={content}>
            {/* User Info Table */}
            <Section style={table}>
              <Row>
                <Column style={th}>Celé jméno</Column>
                <Column style={td}>{data.fullname}</Column>
              </Row>
              <Row>
                <Column style={th}>Email</Column>
                <Column style={td}>{data.email}</Column>
              </Row>
              <Row>
                <Column style={th}>Tel. číslo</Column>
                <Column style={td}>{data.phoneNumber}</Column>
              </Row>
              <Row>
                <Column style={th}>Adresa</Column>
                <Column style={td}>{data.address}, {data.obec}, {data.zip}</Column>
              </Row>
              {data.company && (
                <Row>
                  <Column style={th}>Firma</Column>
                  <Column style={td}>{data.company}</Column>
                </Row>
              )}
              {data.message && (
                <Row>
                  <Column style={th}>Zpráva</Column>
                  <Column style={td}>{data.message}</Column>
                </Row>
              )}
            </Section>

            {/* Pergola Type */}
            <Text style={sectionTitle}>Typ pergoly</Text>
            <Section style={table}>
              <Row>
                <Column style={th}>Pergola</Column>
                <Column style={td}>{data.pergola || "Neuvedeno"}</Column>
              </Row>
            </Section>

            {/* Pergola Stojící */}
            {data.stojici && data.rozmeryStojiciP && (
              <>
                <Text style={sectionTitle}>Pergola stojící</Text>
                <Section style={table}>
                  <Row>
                    <Column style={th}>Šířka</Column>
                    <Column style={td}>{data.rozmeryStojiciP.sirka} m</Column>
                  </Row>
                  <Row>
                    <Column style={th}>Délka</Column>
                    <Column style={td}>{data.rozmeryStojiciP.delka} m</Column>
                  </Row>
                  <Row>
                    <Column style={th}>Hloubka</Column>
                    <Column style={td}>{data.rozmeryStojiciP.hloubka} m</Column>
                  </Row>
                </Section>
              </>
            )}

            {/* Pergola ke stěně */}
            {data.keStene && data.rozmeryPkStene && (
              <>
                <Text style={sectionTitle}>Pergola ke stěně</Text>
                <Section style={table}>
                  <Row>
                    <Column style={th}>Šířka</Column>
                    <Column style={td}>{data.rozmeryPkStene.sirka} m</Column>
                  </Row>
                  <Row>
                    <Column style={th}>Délka</Column>
                    <Column style={td}>{data.rozmeryPkStene.delka} m</Column>
                  </Row>
                  <Row>
                    <Column style={th}>Hloubka</Column>
                    <Column style={td}>{data.rozmeryPkStene.hloubka} m</Column>
                  </Row>
                </Section>
              </>
            )}

            {/* Pergola k rohu */}
            {data.kRohu && data.rozmeryPkRohu && (
              <>
                <Text style={sectionTitle}>Pergola k rohu</Text>
                <Section style={table}>
                  <Row>
                    <Column style={th}>A - Délka</Column>
                    <Column style={td}>{data.rozmeryPkRohu.sirka } m</Column>
                  </Row>
                  <Row>
                    <Column style={th}>B - Hloubka</Column>
                    <Column style={td}>{data.rozmeryPkRohu.hloubka} m</Column>
                  </Row>
                  <Row>
                    <Column style={th}>C - Výška</Column>
                    <Column style={td}>{data.rozmeryPkRohu.delka} m</Column>
                  </Row>
                </Section>
              </>
            )}

            {/* Další informace */}
            <Text style={sectionTitle}>Další informace</Text>
            <Section style={table}>
              {data.pergola !== "pristresek" ? (
                <>
                  <Row>
                    <Column style={th}>Stínění</Column>
                    <Column style={td}>{data.stineni || "Neuvedeno"}</Column>
                  </Row>

                    {data.a || data.b || data.c || data.d ?
                    <Row>
                     <Img
                     src="https://cdn.sanity.io/images/6goo9xhq/production/c87d1ac56142fffbe6b86ba1c7ba8a216eea23e0-720x576.png"
                  width="280"
                  height="280"
                  alt="Strany stínení"
                  style={image}
                    />
                    <Column style={th}>Strany</Column>
                    <Column style={td}>{[data.a && "A", data.b && "B", data.c && "C", data.d && "D"].filter(Boolean).join(", ") || "Neuvedeno"}</Column>
                </Row>
                    :null}
                </>
              ) : (
                <Row>
                  <Column style={th}>Materiál</Column>
                  <Column style={td}>{data.material || "Neuvedeno"}</Column>
                </Row>
              )}
              <Row>
                <Column style={th}>Barva</Column>
                <Column style={td}>{data.barva}</Column>
              </Row>
            </Section>
          </Section>
          <Text style={footerPergola}>Tento email byl automaticky vygenerován.</Text>
        </Section>

        <Hr style={hr} />

        {/* Company Information */}
        <Section style={infoSection}>
          <Heading style={h2}>Informace o společnosti</Heading>
          <Text style={infoText}>
            <strong>Konstanta HP</strong>
            <br />
            Maleč 36, 582 76 Maleč
            <br />
            Česká republika
            <br />
            IČO: 21827150
            <br />
            Telefon: +420 770 169 411
            <br />
            Email: Sleekfence@seznam.cz
            <br />
            Web: www.konstantahp.cz
          </Text>
        </Section>

        <Hr style={hr} />

        {/* User Information */}
        <Section style={infoSection}>
          <Heading style={h2}>Vaše informace</Heading>
          <Text style={infoText}>
            <strong>Celé jméno zákazníka:</strong> {data.fullname}
            <br />
            <strong>Email:</strong> {data.email}
            <br />
            <strong>Telefonní číslo:</strong> {data.phoneNumber}
            <br />
            <strong>Adresa:</strong> {data.address}, {data.obec}
            <br />
            {data.company && (
              <>
                <strong>Firma: </strong>
                {data.company}
              </>
            )}
            <br />
            {data.message && (
              <>
                <strong>Zpráva:</strong> {data.message}
              </>
            )}
            <br />
            <strong>Datum:</strong> {new Date().toLocaleDateString("cs-CZ")}
          </Text>
        </Section>

        {/* Footer */}
        <Text style={footer}>
          Pokud máte jakékoli dotazy nebo připomínky, neváhejte kontaktovat náš tým zákaznické podpory. Jsme tu, abychom vám pomohli!
        </Text>

        <Text style={footerSmall}>© {new Date().getFullYear()} Konstanta HP. Všechna práva vyhrazena.</Text>
      </Container>
    </Body>
  </Html>
);

export default PergMail;

// Styles (přidány nové styly pro pergolu)
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "20px 0 10px",
};

const text = {
  color: "#484848",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "16px 0",
  padding: "0 40px",
};

const imageSection = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center" as const,
  margin: "32px 0",
  padding: "0 40px",
  gap: "20px",
};

const image = {
  borderRadius: "8px",
  border: "1px solid #e6e6e6",
  display: "block",
  margin: "20px auto",
  maxWidth: "100%",
};

const infoSection = {
  padding: "0 40px",
  margin: "20px 0",
};

const infoText = {
  color: "#484848",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "32px 40px",
};

const footer = {
  color: "#898989",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "32px 0 16px",
  padding: "0 40px",
  textAlign: "center" as const,
};

const footerSmall = {
  color: "#b3b3b3",
  fontSize: "12px",
  lineHeight: "18px",
  margin: "0",
  padding: "0 40px",
  textAlign: "center" as const,
};

const pergolaContainer = {
  maxWidth: "600px",
  margin: "0 auto",
};

const header = {
  backgroundColor: "#f8f9fa",
  padding: "20px",
  textAlign: "center" as const,
  borderBottom: "3px solid #007bff",
};

const content = {
  padding: "20px",
};

const table = {
  width: "100%",
  borderCollapse: "collapse" as const,
  marginBottom: "20px",
  border: "1px solid #ddd",
};

const th = {
  backgroundColor: "#f8f9fa",
  textAlign: "left" as const,
  padding: "10px",
  border: "1px solid #ddd",
};

const td = {
  padding: "10px",
  border: "1px solid #ddd",
};

const sectionTitle = {
  backgroundColor: "#e9ecef",
  fontWeight: "bold",
  padding: "10px",
  marginTop: "20px",
  marginBottom: "10px",
};

const footerPergola = {
  backgroundColor: "#f8f9fa",
  padding: "10px",
  textAlign: "center" as const,
  fontSize: "12px",
  color: "#6c757d",
};
