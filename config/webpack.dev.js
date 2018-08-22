const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const chalk = require('chalk');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const ip = require('ip');
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const app = require('../package.json');
const { API_URL } = require('./env');
const paths = require('./paths');

const mode = 'development';
const protocol = 'https';
const port = 4321;
const localUrl = `${protocol}://localhost:${port}`;
const networkUrl = `${protocol}://${ip.address()}:${port}`;

module.exports = {
  mode,
  output: {
    chunkFilename: 'js/[name].js',
    devtoolModuleFilenameTemplate(info) {
      return path.resolve(info.absoluteResourcePath).replace(/\\/g, '/');
    },
    filename: 'js/[name].js',
    path: paths.distFolder,
    pathinfo: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              poolTimeout: Infinity,
            },
          },
          'babel-loader',
        ],
        include: [paths.envFile, paths.srcFolder],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
        include: [paths.srcFolder],
      },
    ],
    strictExportPresence: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors',
    },
    runtimeChunk: 'single',
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanPlugin([paths.distFolder], {
      root: paths.rootFolder,
      verbose: false,
    }),
    new CopyPlugin([
      {
        from: paths.staticFolder,
        to: paths.distFolder,
        ignore: 'index.html',
        flatten: true,
      },
    ]),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [
          [
            `You can now view ${chalk.bold(app.name)} in the browser.\n`,
            `\t${chalk.bold('Local:')} ${localUrl}`,
            `\t${chalk.bold('On your network:')} ${networkUrl}`,
          ].join('\n'),
        ],
        notes: [
          [
            'Note that the development build is not optimized.',
            `    To create a production build, use ${chalk.cyan(
              'yarn build',
            )}.`,
          ].join('\n'),
        ],
      },
    }),
    new HtmlPlugin({
      template: paths.htmlFile,
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || mode),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    clientLogLevel: 'none',
    compress: true,
    contentBase: paths.staticFolder,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    https: protocol === 'https',
    overlay: {
      warnings: true,
      errors: true,
    },
    port,
    proxy: {
      '/api': {
        target: API_URL,
        changeOrigin: true,
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
};
