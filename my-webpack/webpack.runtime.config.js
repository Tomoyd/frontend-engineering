const path = require('path');

/**
 * @type {import("webpack").Configuration}
 */
module.exports = {
  mode: 'development',
  devtool: false,
  entry: './test/runtime/index',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './test/runtime/dist'),
  },
};
