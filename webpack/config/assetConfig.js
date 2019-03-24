// Webpack
const webpack = require('webpack')

// Tools libraries
const path = require('path')

// Plugins libraries
const CopyPlugin = require('copy-webpack-plugin')

const config = {
    plugins: [
        new CopyPlugin([{ from: './src/assets', to: 'assets' }])
    ]
  }

module.exports = config;

