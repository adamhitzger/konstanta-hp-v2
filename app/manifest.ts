import type { MetadataRoute } from 'next'
import { ORGANIZATION } from '@/lib/json-ld'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: ORGANIZATION.name,
    short_name: 'KONSTANTA',
    description:
      'Hliníkové ploty, brány a bioklimatické pergoly na míru. Výrobna na Vysočině, montáž po celé ČR.',
    lang: 'cs',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      { src: '/logo-konstanta.svg', type: 'image/svg+xml', sizes: 'any', purpose: 'any' },
      { src: '/icon-light-32x32.png', type: 'image/png', sizes: '32x32' },
      { src: '/apple-icon.png', type: 'image/png', sizes: '180x180' },
    ],
  }
}
