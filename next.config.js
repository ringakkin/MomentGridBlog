/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // GitHub Pages 静态导出配置
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  
  // 图片优化配置（GitHub Pages需要禁用优化）
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // 压缩配置
  compress: true,
}

module.exports = nextConfig
