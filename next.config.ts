import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // these config is for imageKit --> setup
  images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"ik.imagekit.io",
        port:""
      }
    ]
  }
};

export default nextConfig;
