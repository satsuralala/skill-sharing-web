import type { NextConfig } from "next";

const nextConfig = {
  nx: {
    svgr: false,
  },
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
