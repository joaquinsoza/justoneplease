import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('_http_common');
    }
    return config;
  },
  // Exclude prisma directory from build
  serverComponentsExternalPackages: ['@prisma/client', 'prisma']
};

export default nextConfig;
