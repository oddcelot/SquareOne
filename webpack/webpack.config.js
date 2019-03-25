//
const path = require('path');
const merge = require('webpack-merge');

const assetConfig = require('./config/assetConfig');
const templateConfig = require('./config/templateConfig');
const styleConfig = require('./config/styleConfig');
const metaConfig = require('./config/metaConfig');

var SRC_DIR = path.resolve(__dirname, '../src');
var BUILD_DIR = path.resolve(__dirname, '../dist');

module.exports = {
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
  plugins: merge(metaConfig, assetConfig, templateConfig, styleConfig).plugins,
  devtool: 'source-map',

  devServer: {
    bonjour: true,
    hot: true,
    overlay: true,
    contentBase: '.',
    disableHostCheck: true,
    stats: {
      all: false
    },

    open: false,
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost'
  }
};
