import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(process.cwd(), "../.."),
  experimental: {
    optimizePackageImports: ["@skillforge/shared"]
  }
};

export default nextConfig;
