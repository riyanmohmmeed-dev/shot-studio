/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "replicate.delivery", pathname: "/**" },
      { protocol: "https", hostname: "pb.replicate.delivery", pathname: "/**" },
    ],
  },
};

export default nextConfig;
