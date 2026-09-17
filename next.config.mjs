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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
  },
}

export default nextConfig
