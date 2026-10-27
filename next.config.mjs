// Admin-panel media (logo, hero/section images) is served from the CMS host.
// Allowing it here lets next/image resize and re-encode those uploads instead
// of shipping the full-size originals to every visitor.
const cmsUrl = process.env.ADMIN_PANEL_API_URL ? new URL(process.env.ADMIN_PANEL_API_URL) : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hostaway-platform.s3.us-west-2.amazonaws.com",
        pathname: "/listing/**",
      },
      {
        protocol: "https",
        hostname: "bookingenginecdn.hostaway.com",
        pathname: "/**",
      },
      ...(cmsUrl
        ? [
            {
              protocol: cmsUrl.protocol.replace(":", ""),
              hostname: cmsUrl.hostname,
              pathname: "/api/media/**",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
