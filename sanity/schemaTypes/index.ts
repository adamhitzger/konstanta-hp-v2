import { type SchemaTypeDefinition } from 'sanity'
import { bannerPhotosType } from './bannerPhotos'
import { productType } from './product'
import { productPhotosType } from './productPhotos'
import { emailPhotosType } from './mailPhotos'
import { confPhotosType } from './confPhotos'
import { stepsType } from './steps'
import { sectionsType } from './sections'
import { reviews } from './reviewsType'
import { igFeed } from './igFeed'
import { blogSchema } from './blog'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerPhotosType,  productType, igFeed, productPhotosType, emailPhotosType, confPhotosType, stepsType, sectionsType, reviews, blogSchema],
}
