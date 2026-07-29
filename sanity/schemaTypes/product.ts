import { defineField, defineType } from "sanity";

export const productType = defineType({
    type: "document",
    title: "Produkt",
    name: "product",
    fields: [
        defineField({
            title: "Název",
            name: "nameCs",
            type: "string"
        }),
        defineField({
            title: "Název - německy",
            name: "nameDe",
            type: "string"
        }),
        defineField({
            title: "Název - slovensky",
            name: "nameSk",
            type: "string"
        }),
        defineField({
            title: "Popis",
            name: "popisCs",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            title: "Popis - slovensky",
            name: "popissk",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            title: "Popis - německy",
            name: "popisDe",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name: "photos",
            title: "Zadejte fotky:",
            type: "array",
            of:[
                {type: "image",
                    
                }
            ]
        })
    ]
})