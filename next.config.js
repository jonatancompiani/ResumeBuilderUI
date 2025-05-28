/**
 * @type {import('next').NextConfig}
 */
export default {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Ensure proper handling of Open Graph images
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, stale-while-revalidate=86400",
          },
        ],
      },
      {
        // Apply specifically to OG images
        source: "/:path*/opengraph-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
          {
            key: "Content-Type",
            value: "image/png",
          },
        ],
      },
      {
        // Apply specifically to Twitter images
        source: "/:path*/twitter-image",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
          {
            key: "Content-Type",
            value: "image/png",
          },
        ],
      },
    ]
  },
}
