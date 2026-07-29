import { defineType, defineField } from "sanity";

export const blogSchema = defineType({
    title: "Články",
    name: "article",
    type: "document",
    fields: [
        defineField({
            type: "string",
            title: "Nadpis",
            name: "heading",
        }),
        defineField({
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "heading",
            }
        }),
        defineField({
            name: "datum",
            type: "date",
            title: "Datum"
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Obrázek",
        }),
        defineField({
            name: "description",
            type: "string",
            title: "Popis",
            validation: (rule) => rule.max(150)
        }),
        defineField({
            name: "content",
            title: "Obsah",
            type: "array",
            of: [
                {type: "block"},
                {type: "image"},
            ]
        }),
        defineField({
            type: "string",
            title: "Nadpis - SK",
            name: "headingSk",
        }),
        defineField({
            name: "descriptionSk",
            type: "string",
            title: "Popis - SK",
            validation: (rule) => rule.max(150)
        }),
        defineField({
            name: "contentSk",
            title: "Obsah - SK",
            type: "array",
            of: [
                {type: "block"},
                {type: "image"},
            ]
        }),
        defineField({
            type: "string",
            title: "Nadpis - DE",
            name: "headingDe",
        }),
        defineField({
            name: "descriptionDe",
            type: "string",
            title: "Popis - DE",
            validation: (rule) => rule.max(150)
        }),
        defineField({
            name: "contentDe",
            title: "Obsah - DE",
            type: "array",
            of: [
                {type: "block"},
                {type: "image"},
            ]
        }),
    ],
})