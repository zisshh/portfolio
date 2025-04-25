// next.config.mjs

// Dynamically import CommonJS plugin
const { default: withVideos } = await import('next-videos');

/** @type {import('next').NextConfig} */
const baseConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

const nextConfig = withVideos(baseConfig);

export default nextConfig;
