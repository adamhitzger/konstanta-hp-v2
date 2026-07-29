import { defineField, defineType } from "sanity";

export const reviews = defineType({
    type: "document",
    title: "Recenze",
    name: "reviews",
    fields: [
        defineField({
            type: "string",
            title: "Autorovo jméno",
            name: "author_name",
        }),
        defineField({
            type: "string",
            title: "Odkaz na hodnocení",
            name: "author_url",
        }),
        defineField({
            type: "string",
            title: "Hodnocení česky",
            name: "text",
        }),
        defineField({
            type: "string",
            title: "Hodnocení slovensky",
            name: "skText",
        }),
        defineField({
            type: "string",
            title: "Hodnocení německy",
            name: "njText",
        }),
        defineField({
            type: "number",
            title: "Hodnocení",
            name: "rating",
        }),
        defineField({
            type: "image",
            title: "Obrázek",
            name: "img",
            options: {
                hotspot: true
            }
        }),
    ]
})