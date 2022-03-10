const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  async redirects() {
    return [
      {
        source: '/',
        destination: '/manga/1',
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['cdn.myanimelist.net'],
  },
});
