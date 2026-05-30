import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "octoshell.jp" },
    ],
  },
  async redirects() {
    return [
      { source: "/ja",               destination: "/", permanent: true },
      { source: "/ja/home",          destination: "/", permanent: true },
      { source: "/zh",               destination: "/", permanent: true },
      { source: "/zh/home",          destination: "/", permanent: true },
      { source: "/wp-admin/:path*",  destination: "/", permanent: true },
      { source: "/wp-content/:path*",destination: "/", permanent: true },
      { source: "/wp-login.php",     destination: "/", permanent: true },
      { source: "/xmlrpc.php",       destination: "/", permanent: true },
      { source: "/comments/feed",    destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
