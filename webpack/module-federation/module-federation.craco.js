const webpack = require('webpack')
const paths = require('react-scripts/config/paths')

const getModuleFederationConfigPath = () => {
  const fs = require('fs')
  const path = require('path')
  const appDirectory = fs.realpathSync(process.cwd())

  const WEBPACK_PATH = 'webpack'
  const MODULE_FEDERATION_CONFIG_PATH = 'module-federation'
  const MODULE_FEDERATION_CONFIG_FILE = 'module-federation.config.js'

  return path.resolve(appDirectory, WEBPACK_PATH, MODULE_FEDERATION_CONFIG_PATH, MODULE_FEDERATION_CONFIG_FILE)
}

module.exports = {
  overrideWebpackConfig: ({ webpackConfig }) => {
    const moduleFederationConfigPath = getModuleFederationConfigPath()
    const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
      ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin',
    )

    if (moduleFederationConfigPath) {
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1)
      webpackConfig.output.publicPath = 'auto'

      const htmlWebpackPlugin = webpackConfig.plugins.find((plugin) => plugin.constructor.name === 'HtmlWebpackPlugin')

      htmlWebpackPlugin.userOptions = {
        ...htmlWebpackPlugin.userOptions,
        publicPath: paths.publicUrlOrPath,
        excludeChunks: [require(moduleFederationConfigPath).name],
      }

      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.container.ModuleFederationPlugin(require(moduleFederationConfigPath)),
      ]
    }
    return webpackConfig
  },
  overrideDevServerConfig: ({ devServerConfig }) => {
    devServerConfig.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': '*',
    }

    return devServerConfig
  },
}
