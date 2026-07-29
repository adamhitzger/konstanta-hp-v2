import { defineField, defineType } from "sanity";

export const emailPhotosType = defineType({
    type: "document",
    title: "Fotky do emailů",
    name: "emailPhotos",
    fields: [
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