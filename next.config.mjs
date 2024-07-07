/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "**",
      }
    ],
  },
  env: {
    NEXT_PRIVATE_WEBSITE_ID: process.env.NEXT_PRIVATE_WEBSITE_ID,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  ...nextConfig
});