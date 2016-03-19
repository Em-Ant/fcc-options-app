var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry:
    path.join(__dirname,'client','src','index.jsx'),
  output: {
    path: path.join( __dirname,'client','public','static'),
    filename: 'bundle.js',
    publicPath: '/static/'},
  target: "web",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react']
        }
      }, {
       test: /\.css$/,
       loaders: ['style','css']
      }, {
        test: /\.scss$/,
        loaders: ['style','css','sass']
      }, {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'file-loader?name=[name].[ext]'
      }
    ]
  }
};
