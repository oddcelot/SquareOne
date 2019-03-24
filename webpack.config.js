//
const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const templateVars = require('./src/templateVars.js')
const assetConfig = require('./webpack/config/assetConfig')
const templateConfig = require('./webpack/config/templateConfig')

var SRC_DIR = path.resolve(__dirname, './src')
var BUILD_DIR = path.resolve(__dirname, './dist')

const generateHTMLPlugins = () =>
  glob.sync(SRC_DIR + '/pages/**/*.twig').map(
    dir =>
      new HTMLWebpackPlugin(
        {
          template: dir, // Input
          filename: path.basename(dir).replace('.twig', '.html'), // Output
          options: { minimize: true }
        },
        // add vars for templates
        (templateVars.pageTemplate = path.basename(dir))
      )
  )

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
    rules: [
      {
        test: /\.twig$/,
        use: [
          'raw-loader',
          {
            loader: 'twig-html-loader',
            options: {
              namespaces: {
                pages: SRC_DIR + '/pages',
                layouts: SRC_DIR + '/layouts',
                partials: SRC_DIR + '/partials',
                components: SRC_DIR + '/components'
              },
              data: templateVars
            }
          }
        ]
      }
    ]
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
