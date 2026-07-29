import { defineField, defineType } from "sanity";

export const stepsType = defineType({
    type: "document",
    title: "Kroky",
    name: "steps",
    fields: [
        defineField({
            name: "steps",
            title: "Zadejte fotky:",
            type: "array",
            of:[
                {type: "object",
                fields: [
                    {type: "number",
                        name: "poradi"
                    },
                    {type: "array",
                    name: "photos",
                            of: [
                                {type: "image",}
                            ]
                    },
                    {type: "string",
                            title: "Nadpis slovensky",
                        name: "skHeading"
                        },
                        {type: "string",
                            title: "Nadpis německy",
                        name: "deHeading"
                        },
                        {type: "string",
                            title: "Nadpis česky",
                        name: "cjHeading"
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