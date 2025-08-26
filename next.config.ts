/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "export", // enables static HTML export
  images: {
    unoptimized: true, // needed for static export
  },
  basePath: "/orderease",      // 
  assetPrefix: "/orderease/",  // 
};

module.exports = nextConfig;
