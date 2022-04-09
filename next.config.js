/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    URL: process.env.URL,
  },
};

module.exports = nextConfig;
