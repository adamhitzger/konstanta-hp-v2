import { defineField, defineType } from "sanity";

export const bannerPhotosType = defineType({
    type: "document",
    title: "Fotky v hlavní sekci",
    name: "bannerPhotos",
    fields: [
        defineField({
            name: "photos",
            title: "Zadejte fotky:",
            type: "array",
            of:[
                {type: "object",
                fields: [
                    {type: "image",
                    name: "photo",
                    options: {
                            hotspot: true
                        },
                    },
                    {type: "image",
                    name: "mobilePhoto",
                    options: {
                            hotspot: true
                        },
                    },
                    {type: "string",
                        name: "alt"
                        },
                        {type: "string",
                            title: "Text slovensky",
                        name: "skText"
                        },
                        {type: "string",
                            title: "Text německy",
                        name: "deText"
                        },
                        {type: "string",
                            title: "Text česky",
                        name: "cjText"
                        },
                ]
                },
            ]
        })
    ]
})