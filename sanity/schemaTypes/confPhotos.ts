import { defineField, defineType } from "sanity";

export const confPhotosType = defineType({
    type: "document",
    title: "Fotky do konfů",
    name: "confPhotos",
    fields: [
        defineField({
            name: "jednokridla",
            title: "Jednokridla - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "dvoukridla",
            title: "Dvoukridla - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "samonosna",
            title: "Samonosna -  fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "poKolejnici",
            title: "Posuvna po kolejnici -  fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "telPoj",
            title: "Tel. Poj. - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "telSam",
            title: "Tel. Sam. - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "atypicka",
            title: "Atypická fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "sikma",
            title: "Šikmá - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "skladaci",
            title: "Skládací -  fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "sekcni",
            title: "Sekční - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "branka",
            title: "Branky - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "ploty",
            title: "Ploty - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "bioklimaticka",
            title: "Bioklimaticka - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "zahrada",
            title: "Z. zahrada - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        }),
        defineField({
            name: "pristresek",
            title: "Přístřešek - fotky:",
            type: "array",
            of:[
                {type: "image",

                }
            ]
        })
    ]
})
