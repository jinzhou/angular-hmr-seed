var path = require('path');
var webpack = require('webpack');
var packageFile = require('./package.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ReloadHtmlWebpackPlugin = require('reload-html-webpack-plugin');
var port = '3000';

module.exports = {
   devtool: 'eval',

   entry: {
      app: './src/entry.js',
      vendor: Object.keys(packageFile.dependencies)
   },

   output: {
      filename: '[name].bundle.js',
      path: './dist/',

      // https://webpack.js.org/configuration/output/#output-publicpath
      publicPath: ''
   },

   module: {
      loaders: [
         {
            test: /\.html$/,
            loader: 'html'
         },
         {
            test: /\.css$/,
            loader: 'style!css'
         },
         {
            test: /\.less$/,
            loader: 'style!css!less'
         },
         {
            test: /\.scss$/,
            loader: 'style!css!sass'
         },
         {
            test: /\.jpe?g|.png|.gif$/i,
            loader: 'file?name=images/[name].[ext]'
         },
         {
            test: /\.ttf|eot|svg|otf|woff(2)?$/,
            loader: 'file?name=fonts/[md5:hash].[ext]'
         }
      ]
   },

   plugins: [
      new HtmlWebpackPlugin({
         template: './src/app/index.html',
         filename: 'index.html',
         inject: 'head'
      }),
      new webpack.ProvidePlugin({
         $: 'jquery',
         jQuery: 'jquery'
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new ReloadHtmlWebpackPlugin(),
      new webpack.NamedModulesPlugin()
   ],

   devServer: {
      port: port,
      contentBase: './dist/',
      quiet: true
   }
};
