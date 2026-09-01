import { type SchemaTypeDefinition } from 'sanity'
import { bannerPhotosType } from './bannerPhotos'
import { productType } from './product'
import { productPhotosType } from './productPhotos'
import { confPhotosType } from './confPhotos'
import { stepsType } from './steps'
import { sectionsType } from './sections'
import { reviews } from './reviewsType'
import { igFeed } from './igFeed'
import { blogSchema } from './blog'
import { certificate } from './certificates'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [certificate ,bannerPhotosType,  productType, igFeed, productPhotosType, confPhotosType, stepsType, sectionsType, reviews, blogSchema],
}
