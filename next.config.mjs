/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // la landing ahora vive en "/": la URL vieja redirige de forma permanente (308)
  async redirects() {
    return [{ source: '/landing', destination: '/', permanent: true }]
  },
}

export default nextConfig
