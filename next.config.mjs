/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  async redirects() {
    return [
      {
        source: "/problem/:slug",
        destination: "/assessment/:slug/",
        permanent: true
      },
      {
        source: "/product/9-9-posture-plan",
        destination: "/product/9-9-plan/",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
