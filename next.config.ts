import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
  },
};

export default nextConfig;
