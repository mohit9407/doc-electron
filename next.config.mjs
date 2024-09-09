/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/patients/login',
        permanent: true,
      },
    ]
  },
  reactStrictMode: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
