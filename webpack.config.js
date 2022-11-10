const { resolve } = require('path')

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {        
        test: /\.(woff(2)?|eot|ttf|otf|png|jpe?g|gif)(\?.*)?$/,
        loader: 'file-loader',
        exclude: resolve('../node_modules'),
        options: {
          limit: 10000
        }
      }
    ],
  },
  devServer: {
    open: true,
    hot: true,
  },
  externals: {
    'Vue': 'Vue',
    'element-ui': 'ElementUI'
  }
}