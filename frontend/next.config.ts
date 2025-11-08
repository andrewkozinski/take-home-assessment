import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  //Add the TMDB url as an allowed image source
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
    ],
  },

};

export default nextConfig;
