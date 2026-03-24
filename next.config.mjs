/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  output: 'standalone',
  images: {
    unoptimized: false,
  },
};

export default nextConfig;
