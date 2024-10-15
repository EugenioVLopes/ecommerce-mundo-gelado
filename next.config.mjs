/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
  images: {
    domains: ["cdn.neemo.com.br"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
  transpilePackages: ["tailwindcss"],
};

export default nextConfig;
