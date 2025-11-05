/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // If deploying to a subdirectory (e.g., username.github.io/repo-name)
  // Uncomment and set basePath and assetPrefix:
  // basePath: '/portfolio-5',
  // assetPrefix: '/portfolio-5/',
  trailingSlash: true,
};

export default nextConfig;
