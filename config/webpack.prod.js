/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge')
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const common = require('./webpack.common')

const enableBundleAnalyzer = process.env.ENABLE_ANALYZER === 'true'

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  devServer: {
    port: 3043,
    historyApiFallback: true,
    overlay: true,
    open: true,
    stats: 'errors-only',
  },
  module: {},
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: false,
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: process.cwd(),
      verbose: true,
      dry: false,
    }),
    new OptimizeCssAssetsPlugin(),
    new ManifestPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: enableBundleAnalyzer === true ? 'static' : 'disabled',
      openAnalyzer: true,
    }),
  ],
})
