const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');
const GenerateRoute = require('./plugins/react-router-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/**
 * @type { import("webpack").WebpackOptions }
 */

module.exports = {
  mode: 'production',
  entry: ['./src/index.js'],
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsWebpackPlugin({})],
    splitChunks: {
      chunks: 'all',
      minSize: 1000,
      name: false,
      automaticNameDelimiter: '~', // 分隔符
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        // 指定split的相应规则
        utils: {
          minChunks: 1,
          minSize: 0,
          test: /utils/,
        },
      },
    },
  },
  module: {
    noParse: /test.js/,
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: { loader: 'ts-loader' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /src\/scripts/,
        use: {
          loader: 'happypack/loader?id=js',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
        include: /src/,
      },
    ],
  },
  plugins: [
    new GenerateRoute(),
    new MiniCssExtractPlugin({
      // 同步加载资源名
      filename: '[name].css',
      // 	异步加载资源名
      chunkFilename: '[id].css',
    }),
    new webpack.DefinePlugin({
      // DefinePlugin 在替换环境变量时对于字符串的值是完全替换，对于字符串及包含字符串的对象都要加JSON.stringify
      ENV: JSON.stringify('策划师'),
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new HappyPack({
      id: 'js',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: [['@babel/preset-env', { modules: false }]],
          },
        },
      ],
    }),
    new HappyPack({
      id: 'ts',
      loaders: [
        {
          loader: 'ts-loader',
          options: {},
        },
      ],
    }),
    // new BundleAnalyzerPlugin(),
  ],

  devServer: {
    static: './dist',
  },
};
