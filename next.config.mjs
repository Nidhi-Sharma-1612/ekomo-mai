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
    ],
  },
};

export default nextConfig;
