const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const webpack = require('webpack');
// const crypto = require('crypto-browserify');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill', './client/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  devServer: {
    publicPath: '/build/',
    contentBase: './client',
    inline: true,
    hot: true,
    proxy: {
      '/': 'http://localhost:3000',
      '/data': 'http://localhost:3000',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [{ loader: 'file-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css'],
  },
};
