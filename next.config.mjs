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
    deviceSizes: [640, 828, 1080, 1920, 2048],
    imageSizes: [64, 128, 256, 384],
  },
  
  async redirects() {
    return [
      { source: '/produkty', destination: '/konf', permanent: true },
      { source: '/kontakt', destination: '/#kontakt', permanent: true },
      { source: '/pergKonf', destination: '/konf/pergoly', permanent: true },
    ]
  },
}

export default nextConfig
