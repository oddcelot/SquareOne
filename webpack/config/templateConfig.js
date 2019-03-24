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
          options: { minimize: true }
        },
        // add vars for templates
        templateVars.pageTemplate = path.basename(dir)
      )
  )

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
