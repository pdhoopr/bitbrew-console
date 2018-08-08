const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const paths = require('./paths');

const mode = 'production';

module.exports = {
  mode,
  output: {
    chunkFilename: 'js/[name].[chunkhash:8].js',
    devtoolModuleFilenameTemplate(info) {
      return path
        .relative(paths.srcFolder, info.absoluteResourcePath)
        .replace(/\\/g, '/');
    },
    filename: 'js/[name].[chunkhash:8].js',
    path: paths.distFolder,
    pathinfo: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['thread-loader', 'babel-loader'],
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
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ],
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
    new HtmlPlugin({
      template: paths.htmlFile,
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || mode),
    }),
  ],
  devtool: 'source-map',
  bail: true,
};
