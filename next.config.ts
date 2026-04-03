import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** Next.js 16+ defaults to Turbopack for `next build`; acknowledge alongside custom `webpack`. */
  turbopack: {},
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.appwrite.io",
        pathname: "/v1/**",
      },
      {
        protocol: "https",
        hostname: "localhost",
      },
    ],
  },
  /** Windows: stable file watching when `.next` or sources are locked by AV / sync. */
  webpack: (config, { dev }) => {
    if (dev && process.platform === "win32") {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
};

export default nextConfig;
