const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const chalk = require('chalk');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ip = require('ip');
const webpack = require('webpack');
const { name } = require('../package.json');
const { files, folders } = require('./paths');

const { API_ENV, NODE_ENV } = process.env;
const mode = 'development';
const port = 4321;

function createUrl(domain = 'localhost') {
  return `http://${domain}:${port}`;
}

module.exports = {
  mode,
  output: {
    filename: '[name].js',
    path: folders.dist,
    pathinfo: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [folders.src],
      },
      {
        test: /\.svg$/,
        use: ['svgr/webpack'],
        include: [folders.src],
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanPlugin([folders.dist], {
      root: folders.root,
      verbose: false,
    }),
    new CopyPlugin([
      {
        from: folders.static,
        to: folders.dist,
        ignore: 'index.html',
        flatten: true,
      },
    ]),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          [
            `You can now view ${chalk.bold(name)} in the browser.\n`,
            `\t${chalk.bold('Local:')} ${createUrl()}`,
            `\t${chalk.bold('On your network:')} ${createUrl(ip.address())}`,
          ].join('\n'),
        ],
        notes: ['Note that the development build is not optimized.'],
      },
    }),
    new HtmlPlugin({
      template: files.indexHtml,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_ENV: JSON.stringify(API_ENV || mode),
        NODE_ENV: JSON.stringify(NODE_ENV || mode),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    clientLogLevel: 'none',
    compress: true,
    contentBase: folders.static,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    overlay: {
      warnings: true,
      errors: true,
    },
    port,
    proxy: {
      '/api': {
        target: 'http://localhost:9000/v2',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    publicPath: '/',
    quiet: true,
    watchContentBase: true,
  },
  devtool: 'cheap-module-source-map',
  performance: {
    hints: false,
  },
};
