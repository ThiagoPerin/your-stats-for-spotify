import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/spotify/:path*',
        destination: 'http://localhost:3000/spotify/:path*',
      }
    ];
  },
};

export default nextConfig;