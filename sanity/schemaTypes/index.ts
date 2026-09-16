import { type SchemaTypeDefinition } from 'sanity'
import { bannerPhotosType } from './bannerPhotos'
import { productType } from './product'
import { productPhotosType } from './productPhotos'
import { confPhotosType } from './confPhotos'
import { reviews } from './reviewsType'
import { igFeed } from './igFeed'
import { blogSchema } from './blog'
import { customer } from './customer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [bannerPhotosType,  productType, igFeed, productPhotosType, confPhotosType,reviews, blogSchema, customer],
}
