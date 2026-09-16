import { defineField, defineType } from "sanity";

/**
 * Jeden zákazník / partner, se kterým Konstanta spolupracuje — logo a odkaz na jeho web.
 * Zatím se na webu nikde nefetchuje; dokumenty doplní pan Kurta ve Studiu a pak se
 * sekce napojí (query + komponenta). Logo je `image`, aby šlo použít Sanity image CDN
 * (`?w=…&auto=format`) — u SVG loga CDN vrátí soubor beze změny.
 */
export const customer = defineType({
    type: "document",
    title: "Zákazník",
    name: "customer",
    fields: [
        defineField({
            type: "string",
            title: "Název",
            name: "name",
            description: "Název firmy. Použije se i jako alt text loga.",
            validation: (rule) => rule.required(),
        }),
        defineField({
            type: "image",
            title: "Logo",
            name: "logo",
            description: "Ideálně SVG nebo PNG s průhledným pozadím.",
            validation: (rule) => rule.required(),
        }),
        defineField({
            type: "url",
            title: "Web",
            name: "url",
            description: "Odkaz na web zákazníka včetně https://.",
            validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
        }),
        defineField({
            type: "number",
            title: "Pořadí",
            name: "poradi",
            description: "Menší číslo = dřív. Nevyplněné jde na konec.",
        }),
    ],
    preview: {
        select: { title: "name", subtitle: "url", media: "logo" },
    },
})
