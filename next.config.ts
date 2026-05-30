import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "octoshell.jp" },
    ],
  },
  async redirects() {
    return [
      { source: "/ja",      destination: "/", permanent: true },
      { source: "/ja/home", destination: "/", permanent: true },
      { source: "/zh",      destination: "/", permanent: true },
      { source: "/zh/home", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
