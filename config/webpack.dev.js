/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3042,
    historyApiFallback: true,
    overlay: true,
    stats: 'errors-only',
  },
  module: {},
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
