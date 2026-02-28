import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true, // Ini akan membuat build sukses meskipun ada error TS
  },
  output: "standalone",
};

export default nextConfig;
