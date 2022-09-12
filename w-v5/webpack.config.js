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
  output: {
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
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
