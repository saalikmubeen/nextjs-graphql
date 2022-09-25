/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack: (config) => {
      if (!config.experiments) {
        config.experiments = {};
      }
      config.experiments.topLevelAwait = true;
      return config;
    },
  }
  
  module.exports = nextConfig
  