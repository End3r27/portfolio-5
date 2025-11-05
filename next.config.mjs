/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/portfolio-5',
  assetPrefix: 'https://end3r27.github.io/portfolio-5',
  trailingSlash: true,
};

export default nextConfig;
