'use strict';

module.exports = {
  entry: {
    autocomplete: './autocomplete/index.js',
    throttle: './throttle/index.js',
    startstop: './startstop/index.js'
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
  devtool: 'inline-source-map'
};
