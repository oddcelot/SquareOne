// Webpack
const webpack = require('webpack')

// Tools libraries

// Plugins libraries
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Fiber = require('fibers')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')

const config = {
  rules: [
    {
      test: /\.(sa|sc|c)ss$/,
      exclude: /node_modules/,
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
            importLoaders: 1
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: process.env.NODE_ENV !== 'production',
            config: {
              path: `${__dirname}/postcss.config.js`
            }
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
      assetNameRegExp: process.env.NODE_ENV !== 'production' ? /\.cs$/ : /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }]
      },
      canPrint: true
    }),
    new FixStyleOnlyEntriesPlugin()
  ]
}

module.exports = config
