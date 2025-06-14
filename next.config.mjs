/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "drive.google.com",
      "lh3.googleusercontent.com",
      "example.com", // 👈 Add this
    ],
  },
};

export default nextConfig;
