import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "c.tile.openstreetmap.org",
        port: "",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
