/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  poweredByHeader: false,

  // Serve modern image formats via next/image
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86400, // 1 day
  },

  // Enable "use cache" directive (Next.js 15+ experimental/stable)
  cacheComponents: true,

  // Long-lived cache headers for static UI assets
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
