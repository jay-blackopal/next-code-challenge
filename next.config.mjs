/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'is1-ssl.mzstatic.com',
      'is2-ssl.mzstatic.com',
      'is3-ssl.mzstatic.com',
      'is4-ssl.mzstatic.com',
      'is5-ssl.mzstatic.com',
    ],
  },
  rewrites() {
    return [
      {
        source: '/api/search',
        destination: 'https://itunes.apple.com/search',
      },
    ];
  },
};

export default nextConfig;
