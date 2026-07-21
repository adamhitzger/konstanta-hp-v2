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
    unoptimized: true,
  },
}

export default nextConfig
