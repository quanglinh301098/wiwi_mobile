import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/wiwi_mobile" : "",
  assetPrefix: isProd ? "/wiwi_mobile/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
