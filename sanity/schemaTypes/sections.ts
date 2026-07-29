import { defineType, defineField } from 'sanity';

export const sectionsType = defineType({
  name: 'sections',
  title: 'Sekce',
  type: 'document',
  fields: [
    defineField({
      name: 'oploceni',
      title: 'Oplocení',
      type: 'image',
    }),
    defineField({
      name: 'pergola',
      title: 'Pergola',
      type: 'image',
    }),
    defineField({
      name: 'ploty',
      title: 'Ploty',
      type: 'image',
    }),
    defineField({
      name: 'pergoly',
      title: 'Pergoly',
      type: 'image',
    }),
  ],
});
