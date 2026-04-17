/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["www.saram.me", "saram.me", "www.saram.at", "saram.at"],
    },
  },
}

export default nextConfig
