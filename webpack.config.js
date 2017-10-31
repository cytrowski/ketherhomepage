var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: 'js/build.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      },
      {
        // Disable the hot-reloader
        test: path.resolve(__dirname, 'node_modules/webpack-dev-server/client'),
        loader: "null-loader"
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    contentBase: 'build/'
  },
  performance: {
    hints: false
  },
  devtool: '#source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'The Thousand Ether Homepage &middot; Own a piece of blockchain history!',
      filename: 'index.html',
      template: 'src/templates/index.ejs',
      inject: false
    }),
    new HtmlWebpackPlugin({
      title: 'Press &middot; The Thousand Ether Homepage',
      filename: 'press/index.html',
      template: 'src/templates/press.ejs',
      inject: false
    }),
    new HtmlWebpackPlugin({
      title: 'FAQ &middot; The Thousand Ether Homepage',
      filename: 'faq/index.html',
      template: 'src/templates/faq.ejs',
      inject: false
    })
  ]
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
