/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // 在生产构建时忽略 ESLint 错误
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! 警告 !!
    // 危险区域，仅在你清楚风险的情况下使用
    ignoreBuildErrors: true,
  },
  experimental: {
    // 启用服务器组件
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 