import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "factionskis.com",
      },
      {
        protocol: "https",
        hostname: "www.petzl.com",
      },
    ],
  },
};

export default nextConfig;
