// import type {NextConfig} from 'next';

// const nextConfig: NextConfig = {
//   /* config options here */
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'placehold.co',
//         port: '',
//         pathname: '/**',
//       },
//     ],
//   },
// };

// export default nextConfig;

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
  basePath: "/<your-repo-name>", // repo name
  assetPrefix: "/<your-repo-name>/", // repo name
};

module.exports = nextConfig;