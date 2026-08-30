import { defineField, defineType } from "sanity";

/**
 * Jeden nahraný doklad (certifikát, patent, ocenění) v sekci „Certifikáty a patenty"
 * na /o-nas. Titulek je nepovinný — bez něj se na webu vypíše původní název souboru,
 * což u dodavatelských PDF (`22505379-BVR-ALUMINIOS CORTIZO…`) není čitelné, takže
 * se vyplatí ho vyplnit.
 */
export const certificate = defineType({
    type: "document",
    title: "Certifikát",
    name: "certificate",
    fields: [
        defineField({
            type: "file",
            title: "Vlože certifikát",
            name: "cert",
        }),
        defineField({
            type: "string",
            title: "Název",
            name: "titleCs",
            description: "Jak se doklad pojmenuje na webu. Nevyplněno = název nahraného souboru.",
        }),
        defineField({
            type: "string",
            title: "Název – slovensky",
            name: "titleSk",
        }),
        defineField({
            type: "string",
            title: "Název – německy",
            name: "titleDe",
        }),
        defineField({
            type: "string",
            title: "Popisek pod názvem",
            name: "noteCs",
            description: "Krátká poznámka, např. „Ověřený španělský dodavatel“.",
        }),
        defineField({
            type: "string",
            title: "Popisek pod názvem – slovensky",
            name: "noteSk",
        }),
        defineField({
            type: "string",
            title: "Popisek pod názvem – německy",
            name: "noteDe",
        }),
        defineField({
            type: "number",
            title: "Pořadí",
            name: "poradi",
            description: "Menší číslo = dřív. Nevyplněné jde na konec.",
        }),
    ],
    preview: {
        select: { title: "titleCs", subtitle: "cert.asset.originalFilename" },
        prepare: ({ title, subtitle }) => ({ title: title || subtitle || "Certifikát", subtitle }),
    },
})
