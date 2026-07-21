import { EmailRows } from '@/types';
import ReactPDF, { Document, Page, Text, View, Image, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", fontWeight: 300 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf", fontWeight: 500 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 600 },
  ],
})

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 11,
    fontFamily: "Roboto",
    color: "#222"
  },

  header: {
    borderBottom: "2px solid #333",
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  logo: {
    width: 120,
    height: "auto"
  },

  twoColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  },

  colBox: {
    width: "48%",
    backgroundColor: "#f6f6f6",
    borderRadius: 6,
    padding: 10,
    lineHeight: 1.5
  },

  colTitle: {
    fontSize: 14,
    marginBottom: 6,
    fontWeight: "bold"
  },

  sectionTitle: {
    fontSize: 16,
    marginTop: 25,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#111"
  },

  sectionBox: {
    backgroundColor: "#f6f6f6",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    lineHeight: 1.5
  },

  photosWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  },

  photo: {
    width: "32%",
    height: 180,
    objectFit: "cover",
    borderRadius: 6
  },

  /* 🔥 UPRAVENÁ TABULKA */
  tableWrapper: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 10
  },

  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#222",
    color: "white",
    paddingVertical: 4,
    paddingHorizontal: 3,
  },

  tableRow: {
    flexDirection: "row",
    paddingVertical: 3,
    paddingHorizontal: 3,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#828181"
  },

  tableCell: {
    flex: 1,
    fontSize: 10
  },

  /* 🔥 PODMÍNKY */
  conditionsSection: {
marginTop: 25,
padding: 12,
borderRadius: 6,
justifyContent: "center",
alignItems: "center"
},


conditionsTitle: {
fontSize: 18,
fontWeight: "bold",
marginBottom: 6,
textAlign: "center"
},


conditionsSubtitle: {
fontSize: 13,
fontWeight: "black",
marginTop: 10,
marginBottom: 4,
textAlign: "center"
},


conditionsText: {
fontSize: 11,
lineHeight: 1.5,
marginBottom: 4,
textAlign: "center"
},

  footer: {
    marginTop: 25,
    borderTop: "1px solid #ddd",
    paddingTop: 10,
    textAlign: "center",
    fontSize: 10,
    color: "#777"
  },

  highlightText: {
  fontSize: 13,
  fontWeight: "bold",
  marginTop: 25,   // větší mezera nad
  marginBottom: 15,
  lineHeight: 1.6
}
});


export function PdfDocument(props: {
  userName: string,
  userEmail: string,
  tel: string,
  address: string,
  city: string,
  company: string,
  msg: string,
  photo1: string,
  photo2: string,
  photo3: string,
  productRows: Array<EmailRows>,
  sazbaDph: number,
  zip: string
}) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* HEADER */}
        <View style={styles.header}>
          <Image
            src="https://cdn.sanity.io/files/p8t70jfu/production/985e5534a8b5b73a17563b0371bc84e3834c5cfa.png"
            style={styles.logo}
          />
          <Text>Cenová nabídka</Text>
        </View>

        

        {/* FOTKY */}
        <View style={styles.photosWrap}>
          {props.photo1 && <Image src={props.photo1} style={styles.photo} />}
          {props.photo2 && <Image src={props.photo2} style={styles.photo} />}
          {props.photo3 && <Image src={props.photo3} style={styles.photo} />}
        </View>

        {/* DVĚ SLOUPOVÉ SEKCE — ZÁKAZNÍK / FIRMA */}
        <View style={styles.twoColumns}>

          {/* LEVÁ STRANA – ZÁKAZNÍK */}
          <View style={styles.colBox}>
            <Text style={styles.colTitle}>Informace o zákazníkovi</Text>
            <Text>Celé jméno: {props.userName}</Text>
            <Text>Email: {props.userEmail}</Text>
            <Text>Telefon: {props.tel}</Text>
            <Text>Adresa: {props.address}, {props.city} {props.city}</Text>
            <Text>Firma: {props.company || "—"}</Text>
            <Text>Zpráva: {props.msg}</Text>
            <Text>Datum: {new Date().toLocaleString("cs-CZ")}</Text>
          </View>

          {/* PRAVÁ STRANA – DODAVATEL */}
          <View style={styles.colBox}>
            <Text style={styles.colTitle}>Informace o prodávajícím</Text>
            <Text>Konstanta Hlíníkové ploty</Text>
            <Text>Malec 36, 582 76,  Ceská republika</Text>
            <Text>ICO: 21827150</Text>
            <Text>Telefon: +420 770 169 411</Text>
            <Text>Email: Sleekfence@seznam.cz</Text>
            <Text>Web: www.konstantahp.cz</Text>
          </View>

        </View>

        {/* TABULKA */}
        <Text style={styles.sectionTitle}>Cenová nabídka</Text>

        <View style={styles.tableHeader}>
          <Text style={styles.tableCell}>Produkt</Text>
          <Text style={styles.tableCell}>Množství</Text>
          <Text style={styles.tableCell}>Cena bez DPH</Text>
          <Text style={styles.tableCell}>DPH {props.sazbaDph * 100}%</Text>
          <Text style={styles.tableCell}>Cena s DPH</Text>
        </View>

        {props.productRows.map((row, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.name}</Text>
            <Text style={styles.tableCell}>{row.qty}</Text>
            <Text style={styles.tableCell}>{row.priceWithoutDph}</Text>
            <Text style={styles.tableCell}>{row.dph}</Text>
            <Text style={styles.tableCell}>{row.priceWithDph}</Text>
          </View>
        ))}

        {/* FOOTER */}
        <Text style={styles.footer}>
          Konstanta HP • www.konstantahp.cz • Hliníkové oplecení a pergoly
        </Text>

       {/* PODMÍNKY */}
<View style={styles.conditionsSection}>
<Text style={styles.conditionsTitle}>Obchodní podmínky</Text>
<Text style={styles.conditionsSubtitle}>Pro fyzické osoby</Text>
<Text style={styles.conditionsText}>• Záruka na materiál: 10 let</Text>
<Text style={styles.conditionsText}>• Záruka na pohon: 3 roky</Text>
<Text style={styles.conditionsText}>• Záruka na montážní práce: 2 roky</Text>
<Text style={styles.conditionsText}>Záruka se vztahuje na vady materiálu, funkcnost pohonu a kvalitu provedených montážních prací. Oprava nebo výmena bude provedena bezplatne v co nejkratším možném termínu. Nevztahuje se na mechanické poškození, neodborný zásah, bežné opotrebení nebo nesprávné užívání.</Text>
<Text style={styles.conditionsSubtitle}>Termín realizace</Text>
<Text style={styles.conditionsText}>Realizace zakázky probehne v rozmezí 8–14 týdnu od podpisu smlouvy a úhrady zálohy.</Text>
<Text style={styles.conditionsSubtitle}>Záloha</Text>
<Text style={styles.conditionsText}>Pred zahájením realizace je požadována záloha 70 %. Doplatek je uhrazen v den montáže po predání díla.</Text>
<Text style={styles.conditionsSubtitle}>Pro firmy</Text>
<Text style={styles.conditionsText}>• Splatnost faktur: 30 dní</Text>
<Text style={styles.conditionsText}>• Pozastávky: 10% / 8% / 2%</Text>
<Text style={styles.conditionsText}>• Zarízení staveniste: 0%</Text>
<Text style={styles.conditionsText}>• Vícepráce v cene / v case: 0% / 0%</Text>
<Text style={styles.conditionsText}>• Záruka na naše výrobky: 55 mesícu</Text>
<Text style={styles.conditionsText}>• Záruka na pohony: 36 mesícu</Text>
<Text style={styles.conditionsText}>• Záruka na montážní práce: 24 mesícu</Text>
<Text style={styles.conditionsText}>Záruka se vztahuje na vady materiálu, funkcnost pohonu a kvalitu montážních prací. Oprava nebo výmena bude provedena bezplatne. Neplatí pri neodborném zásahu, poškození či nesprávném užívání.</Text>
<Text style={styles.conditionsText}>Realizace zakázky probehne v dohodnutém termínu s objednatelem.</Text>
</View>


<Text style={styles.highlightText}>Každý z techto speciálne vyrobených profilu slouží jako základní stavební prvky pro výrobu bran, branek a plotových dílcu.</Text>
      </Page>
    </Document>
  );
}


export async function createTemplate(props: {
  userName: string,
  userEmail: string,
  tel: string,
  address: string,
  city: string,
  company: string,
  msg: string,
  photo1: string,
  photo2: string,
  photo3: string,
  productRows: Array<EmailRows>,
  sazbaDph: number
  path: string,
  brana: boolean,
  branka: boolean,
  sloupky: boolean
  dilce: boolean,
  zip: string
}) {
  return (await ReactPDF.renderToFile(<PdfDocument {...props} />, props.path));
}
