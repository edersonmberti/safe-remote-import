module.exports = {
  webpack: {
    alias: require("./webpack/webpack.alias"),
  },
  plugins: [
    {
      plugin: require("./webpack/module-federation/module-federation.craco"),
    },
  ],
};
