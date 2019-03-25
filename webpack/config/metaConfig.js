// Webpack
const webpack = require('webpack');

// Tools libraries
const path = require('path');

// Plugins libraries
const webpackDashboard = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const ERROR = path.join(__dirname, './assets/error.png');

const config = {
  rules: [],
  plugins: [
    new ErrorOverlayPlugin(),
    new webpackDashboard(),
    new FriendlyErrorsWebpackPlugin({
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: 'Webpack error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          icon: ERROR
        });
      }
    })
    // uncomment if needed
    // new BundleAnalyzerPlugin()
  ]
};

module.exports = config;
