// Webpack
const webpack = require('webpack')

// Tools libraries
const path = require('path')
const glob = require('glob')

// Plugins libraries
const HTMLWebpackPlugin = require('html-webpack-plugin')
const templateVars = require('../../src/templateVars.js')

const generateHTMLPlugins = () =>
  glob.sync('./src/pages/**/*.twig').map(
    dir =>
      new HTMLWebpackPlugin(
        {
          template: dir, // Input
          filename: path.basename(dir).replace('.twig', '.html'), // Output
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
          },
        },
        // add vars for templates
        templateVars.pageTemplate = path.basename(dir)
      )
    )
  
templateVars.env = process.env.NODE_ENV;

const config = {
  rules: [
    {
      test: /\.twig$/,
      use: [
        'raw-loader',
        {
          loader: 'twig-html-loader',
          options: {
            namespaces: {
              pages:'./src/pages',
              layouts: './src/layouts',
              partials: './src/partials',
              components: './src/components'
            },
            data: templateVars
          }
        }
      ]
    }
  ],
  plugins: [...generateHTMLPlugins()]
}

module.exports = config
