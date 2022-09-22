/** @type {import('next').NextConfig} */
const path = require("path");
const withPWA = require("next-pwa");
const withPlugins = require("next-compose-plugins");
const runtimeCaching = require("next-pwa/cache");
const withTM = require("next-transpile-modules")(["ui"]);

const isProduction = process.env.NODE_ENV === "production";
const productionURL = "https://www.pov.dev.factoroid.com/";

const config = {
  basePath: "",
  trailingSlash: false,
  // DESCRIBE: path isProduction일 경우 아닐경우 url 분리
  images: {
    loader: "akamai",
    path: isProduction ? productionURL : "",
    domains: ["localhost", "https://www.pov.dev.factoroid.com/", "https://s3.ap-northeast-2.amazonaws.com/"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    reactStrictMode: true,
  },
  target: "experimental-serverless-trace",
  eslint: {
    dirs: ["pages", "components", "hooks", "shared", "store", "types"],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:path*',
  //       destination: 'http://localhost:8001/:path*',
  //       basePath: false,
  //     },
  //   ]
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withPlugins(
  [
    withTM,
    withPWA,
    {
      pwa: {
        dest: "public",
        register: true,
        skipWaiting: true,
        runtimeCaching,
        disable: process.env.NODE_ENV === "development",
      },
    },
  ],
  config
);
