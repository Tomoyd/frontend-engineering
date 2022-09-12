const BannerWebpackPlugin = require('./plugins/BannerWebpackPlugin');
const BasePlugin = require('./plugins/base');
const clearWebpackPlugin = require('./plugins/ClearWebpackPlugin');
const path = require('path');
const AnalyzeWebpackPlugin = require('./plugins/AnalyzerWebpackPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineWebpackPlugin = require('./plugins/InlineWebpackPlugin');
/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  mode: 'production',
  entry: {
    main: {
      import: './src/loader.js',
      runtime: 'common-w',
    },
  },
  plugins: [
    new clearWebpackPlugin(),
    new AnalyzeWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
    new InlineWebpackPlugin(),
  ],
  output: {
    assetModuleFilename: 'images/[hash].[ext][query]',
    clean: false,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: './loaders/babelLoader.js',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          './loaders/clearLogLoader.js',
          {
            loader: './loaders/bannerLoader.js',
            options: {
              author: 'Tomo',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          './loaders/styleLoader.js',
          { loader: 'css-loader' },
          'less-loader',
        ],
      },

      /***
       * 资源配置，webpack5 以后的配置
       *
       */
      {
        test: /\.(png|jpg|gif)$/i,
        loader: './loaders/fileLoader.js',
        type: 'javascript/auto',
        // dependency: { not: ['url'] },
        // parser: {
        //   dataUrlCondition: {
        //     maxSize: 8 * 1024,
        //   },
        // },
      },
    ],
  },
};
