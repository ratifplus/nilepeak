/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: '/station', destination: '/platform', permanent: true },
      { source: '/core', destination: '/technology', permanent: true },
      { source: '/autonomy', destination: '/technology', permanent: true },
      { source: '/careers', destination: '/company', permanent: true },
    ];
  },
};

export default nextConfig;
