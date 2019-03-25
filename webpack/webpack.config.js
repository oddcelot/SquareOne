//
const path = require('path')
const merge = require('webpack-merge')

const assetConfig = require('./config/assetConfig')
const templateConfig = require('./config/templateConfig')
const styleConfig = require('./config/styleConfig')

var SRC_DIR = path.resolve(__dirname, '../src')
var BUILD_DIR = path.resolve(__dirname, '../dist')
module.exports = {
  node: {
    fs: 'empty'
  },
  entry: {
    main: './src/index.js',
    style: './src/styles/index.scss'
  },
  output: {
    path: BUILD_DIR
  },
  module: {
    rules: merge(templateConfig, styleConfig).rules
  },
  plugins: merge(assetConfig, templateConfig, styleConfig).plugins,
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : 'eval',
  devServer: {
    open: false,
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost'
  }
}
