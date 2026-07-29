import { defineField, defineType } from "sanity";

export const igFeed = defineType({
    type: "document",
    title: "IG Feed",
    name: "igFeed",
    fields: [
        defineField({
            type: "string",
            title: "Odkaz na hodnocení",
            name: "url",
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