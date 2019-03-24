// Webpack
const webpack = require('webpack')

// Tools libraries
const path = require('path')
const glob = require('glob')

// Plugins libraries
const HTMLWebpackPlugin = require('html-webpack-plugin')


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
        //(templateVars.pageTemplate = path.basename(dir))
      )
  )

const config = {
    plugins: [
        generateHTMLPlugins
    ]
  }

module.exports = config;

