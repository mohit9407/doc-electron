/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    config.resolve.alias.canvas = false;

    return config;
  },
};

export default nextConfig;
