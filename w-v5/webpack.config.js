/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  entry: {
    main: {
      import: './src/index.js',
      runtime: 'common-w',
    },
  },
  output: {
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', { loader: 'css-loader' }, 'less-loader'],
      },

      /***
       * 资源配置，webpack5 以后的配置
       *
       */
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset',
        dependency: { not: ['url'] },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
};
