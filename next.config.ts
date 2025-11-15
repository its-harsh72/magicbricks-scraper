/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  compiler: {
    removeConsole: false
  }
};

module.exports = nextConfig;
