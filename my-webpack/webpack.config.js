const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

/**
 * @type { import("webpack").WebpackOptions }
 */

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		filename: '[name].bundle.js',
		chunkFilename: '[name].chunk.js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/',
	},
	optimization: {
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
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: { loader: 'ts-loader' },
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
						presets: [['@babel/preset-env', { modules: false }]],
					},
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
		new MiniCssExtractPlugin({
			// 同步加载资源名
			filename: '[name].css',
			// 	异步加载资源名
			chunkFilename: '[id].css',
		}),
	],

	devServer: {
		static: './dist',
	},
};
