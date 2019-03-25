// Webpack
const webpack = require('webpack');

// Tools libraries
const path = require('path');

// Plugins libraries
const CopyPlugin = require('copy-webpack-plugin');
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const config = {
  rules: [],
  plugins: [
    new SVGSpritemapPlugin('src/assets/svg-sprite/**/*.svg', {
      output: {
        filename: 'assets/spritemap.svg',
        svgo: true
      },
      styles: './src/styles/_sprites.scss'
    }),
    new CopyPlugin([{ from: './src/assets', to: 'assets' }])
  ]
};

module.exports = config;
