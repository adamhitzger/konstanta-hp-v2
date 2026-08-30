import { defineField, defineType } from "sanity";

export const productPhotosType = defineType({
    type: "document",
    title: "Fotky produktových variant",
    name: "productPhotos",
    fields: [
        defineField({
            name: "photo",
            type: "image",
            title: "Úvodní fotka"
        }),
        defineField({
            title: "Název",
            name: "nameCs",
            type: "string"
        }),
        defineField({
            title: "Název - DE",
            name: "nameDe",
            type: "string"
        }),
        defineField({
            title: "Název - Sk",
            name: "nameSk",
            type: "string"
        }),
        defineField({
            name: "popisCs",
            title: "Popis - česky",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name: "popisSk",
            title: "Popis - slovensky",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            name: "popisDe",
            title: "Popis - německy",
            type: "array",
            of: [
                {type: "block"}
            ]
        }),
        defineField({
            title: "Kategorie",
            name: "cat",
            type: "string",
            options: {
                list: ["brany", "pergoly", "ploty", "branky", "zabradli"],
                layout:"radio", 
            }
        }),
        defineField({
            title: "Fotky okenice standard",
            name: "okS",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky okenice kapky",
            name: "okK",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky okenice kapky mini",
            name: "okKM",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky plaňky 60",
            name: "p60",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky plaňky 90",
            name: "p90",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky plaňky 120",
            name: "p120",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky plaňky 150",
            name: "p150",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky tyček",
            name: "tycka",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky vlastních kombinací",
            name: "vlKom",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
        defineField({
            title: "Fotky dřevodekoru",
            name: "drevodekor",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
          defineField({
            title: "Fotky tahokovu",
            name: "tahokov",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
          defineField({
            title: "Fotky Lamely",
            name: "lamela",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
          defineField({
            title: "Fotky Vypalovaní",
            name: "vypalovani",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
          defineField({
            title: "Fotky skla",
            name: "sklo",
            type: "array",
            of: [
                {type: "image"}
            ]
        }),
    ]
})