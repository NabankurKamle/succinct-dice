import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Fix for Tailwind oxide
    return config;
  },
};

export default nextConfig;
