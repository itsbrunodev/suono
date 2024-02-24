/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "catamphetamine.gitlab.io",
        port: "",
        pathname: "/country-flag-icons/3x2/**",
      },
    ],
  },
};

export default nextConfig;
