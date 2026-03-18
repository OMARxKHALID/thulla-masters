/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,


  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400,
  },


  cacheComponents: true,


  async headers() {
    return [
      {
        source: "/ui/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
