import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cdn.pixabay.com",
      },
      
    ],
  },
};

export default nextConfig;