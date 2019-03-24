// Webpack
const webpack = require('webpack')

// Tools libraries

// Plugins libraries
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Fiber = require('fibers')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const config = {
  rules: [
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            sourceMap: process.env.NODE_ENV !== 'production'
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
          }
        },

        {
          loader: 'sass-loader',
          options: {
            implementation: require('node-sass'),
            fiber: Fiber,
            sourceMap: process.env.NODE_ENV !== 'production'
          }
        }
      ]
    }
  ],
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true
      })
  ]
}

module.exports = config
