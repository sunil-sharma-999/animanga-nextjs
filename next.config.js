module.exports = {
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
};
