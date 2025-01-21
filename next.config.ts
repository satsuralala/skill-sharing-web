import type { NextConfig } from "next";

const nextConfig = {
  
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  
};


export default nextConfig;
