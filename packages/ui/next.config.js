/** @type {import('next').NextConfig} */

const path = require("path");
const withPlugins = require("next-compose-plugins");

const isProduction = process.env.NODE_ENV === "production";
const productionURL = "https://frontendjjang.shop/";

const config = {
  trailingSlash: true,
  pageExtensions: ["index.ts"],
  // DESCRIBE: path isProduction일 경우 아닐경우 url 분리
  images: {
    loader: "akamai",
    path: isProduction ? productionURL : "http://localhost:3000/",
    domains: ["localhost"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    reactStrictMode: true,
  },
  distDir: "build",
  webpack(config){
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
};

module.exports = withPlugins([], config);
