module.exports = {
	input: './src/testRollup.js',
	output: {
		file: 'dist/rollup.bundle.js',
		format: 'cjs', // amd esm cjs iife,umd
	},
};
