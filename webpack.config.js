//
const path = require('path')
const merge = require('webpack-merge')

const assetConfig = require('./webpack/config/assetConfig')
const templateConfig = require('./webpack/config/templateConfig')

var SRC_DIR = path.resolve(__dirname, './src')
var BUILD_DIR = path.resolve(__dirname, './dist')

module.exports = {
  node: {
    fs: 'empty'
  },
  entry: [SRC_DIR + '/dummy.js'],
  output: {
    path: BUILD_DIR,
    filename: 'main.bundle.js'
  },
  module: {
    rules: templateConfig.rules,
    },
    plugins: merge(
        assetConfig,
        templateConfig
    ).plugins,
  devtool: 'source-map',
  devServer: {
    open: false,
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost'
  }
}
