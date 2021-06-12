var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    vendorPackages: [
      'react',
      'react-dom',
      'react-router',
      'immutable',
      'moment',
      'antd',
      'redux',
      'redux-saga',
    ]
  },
  mode: "production",
  output: {
    filename: 'vendor.bundle.js',
    path:  path.resolve(__dirname, '../dist/dll'),
    library: '[name]'
  },

  plugins: [
    new webpack.DllPlugin({
        name: '[name]',
        path: path.resolve(__dirname, '../dist/dll/vendor.manifest.json')
      })
  ]
}