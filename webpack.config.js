'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
    autocomplete: './autocomplete/index.js',
    throttle: './throttle/index.js',
    startstop: './startstop/index.js',
    microblog: './microblog/index.js',
    reject: './reject/index.js',
    takex: './takex/index.js',
    form: './form/index.js',
    wizard: './wizard/index.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },
  output: {
    path: __dirname + '/build',
    filename: '[name].bundle.js',
    publicPath: '/in-memory'
  },
  plugins: (process.env.NODE_ENV === 'production') ? [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ] : []
};
