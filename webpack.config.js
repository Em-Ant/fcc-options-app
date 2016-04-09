var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    app: path.join(__dirname,'client','src','index.jsx'),
    vendors: [
      'react', 'redux', 'react-redux', 'react-router'
    ]
  },
  output: {
    path: path.join( __dirname,'client','public','static'),
    filename: 'bundle.js',
    publicPath: '/static/'},
  target: "web",
  plugins: [
   new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
 ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
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
