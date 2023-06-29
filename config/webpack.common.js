/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

const cwd = process.cwd()
let dotenv 
const {NODE_ENV} = process.env 
if (NODE_ENV === 'production') { 
  dotenv = require('dotenv').config({path: `${cwd}/.env.prod`}) 
} else if (NODE_ENV === 'remote') { 
  dotenv = require('dotenv').config({path: `${cwd}/.env.remote.prod`}) 
} else { 
  dotenv = require('dotenv').config({path: `${cwd}/.env`}) 
}


function absolutePath(...args) {
  // const args = Array.prototype.slice.call(arguments) // eslint-disable-line prefer-rest-params
  args.unshift(__dirname)
  return path.resolve(path.join.apply(null, args))
}

const ENTRY_PATH =
  (NODE_ENV === 'production' || NODE_ENV === 'remote')
    ? absolutePath('../src/static/index.js')
    : [absolutePath('../src/static/index.js'), 'webpack-hot-middleware/client']

const HTML_TEMPLATE_PATH = absolutePath('../public/index.html')
const OUTPUT_PATH = absolutePath('../dist')
const PUBLIC_PATH = '/'

// const CSS_INCLUDE_PATH = absolutePath('../node_modules')
const JS_WATCHER_PATH = absolutePath('../src/static')
const JS_EXCLUDE_PATH = absolutePath('../node_modules')

module.exports = {
  entry: {
    main: ENTRY_PATH,
  },
  output: {
    filename: '[name].[hash].js',
    path: OUTPUT_PATH,
    publicPath: PUBLIC_PATH,
    pathinfo: true,
  },
  module: {
    rules: [
      {
        test: /\.js?/,
        include: JS_WATCHER_PATH,
        exclude: JS_EXCLUDE_PATH,
        loader:  process.env.NODE_ENV === 'development' ? ['babel-loader', 'eslint-loader']: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [{loader: MiniCssExtractPlugin.loader}, {loader: 'css-loader'}],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: ['file-loader'],
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: HTML_TEMPLATE_PATH,
      favicon: "./public/favicon.ico"
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash:8].css',
      chunkFilename: '[id].[hash:8].css',
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}
