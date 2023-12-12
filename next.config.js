/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapiadmin.drizlymall.com",
      },
    ],
  },
};

module.exports = nextConfig;
