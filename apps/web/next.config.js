const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@finora/contracts'],
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

module.exports = nextConfig;
