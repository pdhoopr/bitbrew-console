const autoprefixer = require("autoprefixer");
const CaseSensitivePathsPlugin = require("case-sensitive-paths-webpack-plugin");
const CleanPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const cssnano = require("cssnano");
const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");
const postcss = require("postcss");
const TerserPlugin = require("terser-webpack-plugin");
const paths = require("./paths");

module.exports = {
  mode: "production",
  output: {
    devtoolModuleFilenameTemplate(info) {
      return path
        .relative(paths.srcFolder, info.absoluteResourcePath)
        .replace(/\\/g, "/");
    },
    filename: "js/[name].[contenthash].js",
    path: paths.distFolder,
    pathinfo: true,
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["thread-loader", "babel-loader"],
        include: [paths.srcFolder],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
        include: [paths.srcFolder],
      },
    ],
    strictExportPresence: true,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        terserOptions: {
          compress: {
            comparisons: false,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ascii_only: true,
          },
        },
      }),
    ],
  },
  plugins: [
    new CaseSensitivePathsPlugin(),
    new CleanPlugin(),
    new CopyPlugin([
      {
        from: paths.staticFolder,
        to: paths.distFolder,
        ignore: ["index.html", "css/web-login.css"],
      },
      {
        from: paths.webLoginCssFile,
        to: paths.distCssFolder,
        async transform(css) {
          const result = await postcss([autoprefixer, cssnano]).process(css, {
            from: undefined,
          });
          return result.css;
        },
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
  ],
  devtool: "source-map",
  bail: true,
};
