/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
    serverActions: {
      bodySizeLimit: '2mb'
    }
  },
  i18n: {
    locales: ['ru', 'kk', 'en'],
    defaultLocale: 'ru'
  }
};

export default nextConfig;

