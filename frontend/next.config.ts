import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'placehold.co' },
      { protocol: 'https', hostname: 'i.ytimg.com' },
    ],
  },
  // Ignore TypeScript errors during build for faster dev iteration
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
