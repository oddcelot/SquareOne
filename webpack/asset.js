
function HelloWorldPlugin(options) {
  new CopyWebpackPlugin([{ from: './src/assets', to: 'assets' }])
}

HelloWorldPlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    console.log('Hello World!')
  })
}

module.exports = HelloWorldPlugin
