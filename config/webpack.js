const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const chalk = require('chalk');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ip = require('ip');
const path = require('path');
const webpack = require('webpack');
const { name } = require('../package.json');

const mode = 'development';
const rootFolder = path.resolve(__dirname, '..');
const distFolder = path.resolve(rootFolder, 'dist');
const srcFolder = path.resolve(rootFolder, 'src');
const staticFolder = path.resolve(rootFolder, 'static');
const htmlFile = path.resolve(staticFolder, 'index.html');
const port = 4321;
const localUrl = `http://localhost:${port}`;
const networkUrl = `http://${ip.address()}:${port}`;

module.exports = {
  mode,
  output: {
    filename: '[name].js',
    path: distFolder,
    pathinfo: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [srcFolder],
      },
      {
        test: /\.svg$/,
        use: ['svgr/webpack'],
        include: [srcFolder],
      },
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanPlugin([distFolder], {
      root: rootFolder,
      verbose: false,
    }),
    new CopyPlugin([
      {
        from: staticFolder,
        to: distFolder,
        ignore: 'index.html',
        flatten: true,
      },
    ]),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          [
            `You can now view ${chalk.bold(name)} in the browser.\n`,
            `\t${chalk.bold('Local:')} ${localUrl}`,
            `\t${chalk.bold('On your network:')} ${networkUrl}`,
          ].join('\n'),
        ],
        notes: ['Note that the development build is not optimized.'],
      },
    }),
    new HtmlPlugin({
      template: htmlFile,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_ENV: JSON.stringify(process.env.API_ENV || mode),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || mode),
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    clientLogLevel: 'none',
    compress: true,
    contentBase: staticFolder,
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
