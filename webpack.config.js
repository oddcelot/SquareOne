const path = require('path');
const glob = require('glob');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const templateVars = require('./src/templateVars.js');


const generateHTMLPlugins = () =>
  glob.sync('./src/pages/**/*.twig').map(
    dir =>
      new HTMLWebpackPlugin({
        template: dir, // Input
        filename: path.basename(dir).replace('.twig', '.html'), // Output
        
      }, templateVars.heading = path.basename(dir)),
      
  );

module.exports = {
  node: {
    fs: 'empty',
  },
  entry: ['./src/dummy.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
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
                'pages': 'src/pages',
                'layouts': 'src/layouts',
                'partials': 'src/partials',
                'components': './src/components',
              },
              data: templateVars,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...generateHTMLPlugins(),
  ],
  devtool: 'source-map',
  devServer: {
    open: false,
    port: process.env.PORT || 9000,
    host: process.env.HOST || 'localhost'
  },
};