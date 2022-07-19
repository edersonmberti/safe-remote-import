const { dependencies } = require('../../package.json')

module.exports = {
  name: 'safe_remote_import',
  remotes: {
    remote: 'remote@http://localhost:3001/remoteEntry.js'
  },
  exposes: {},
  filename: 'remoteEntry.js',
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies.react,
    },
    'react-dom': {
      singleton: true,
      requiredVersion: dependencies['react-dom'],
    },
  },
}
