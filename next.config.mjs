/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '30mb'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        hostname: "lh3.googleusercontent.com",
        protocol: "https"
      },
      {
        hostname: "images.unsplash.com",
        protocol: "https"
      }
    ],
    formats: ['image/avif', 'image/webp'],
    // Fotky z realizací jsou v public/ do 2 000 px; optimalizátor z nich
    // dělá AVIF/WebP ve správné šířce. Sanity si šířku hlídá přes ?w= v URL
    // (viz lib/banner-photos.ts), tady se jen převede formát.
    //
    // Každá šířka navíc = jedna položka v `srcSet` u každého <img>. Homepage
    // vykresluje přes sto obrázků (marquee sekce prvky opakují), takže se
    // seznam šířek drží co nejkratší: 750 a 1200 se od 828/1080 v praxi
    // neliší a drobné šířky pod 64 px nepotřebuje žádný obrázek na webu.
    deviceSizes: [640, 828, 1080, 1920, 2048],
    imageSizes: [64, 128, 256, 384],
  },
}

export default nextConfig
