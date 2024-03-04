const withNextIntl = require("next-intl/plugin")();
const webpack = require("webpack");

module.exports = withNextIntl({
  webpack: (config) => {
    config.resolve.fallback = {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      ...config.resolve.fallback,
      fs: false,
      path: false,
      http: false,
      https: false,
      zlib: false,
      net: false,
      dns: false,
      child_process: false,
      os: false,
      tls: false,
        querystring: false,
      vm: false,
    };
    config.plugins.push(
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
    );
    return config;
  },
});
