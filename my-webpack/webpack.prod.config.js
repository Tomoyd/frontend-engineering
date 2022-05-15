const path = require('path');

/**
 * 开启mode production 自动去除
 * optimization.minimize 为true
 * usedExports 为true
 */

/**
 *  @type {import("webpack").Configuration}
 */
module.exports = {
  mode: 'production',
  entry: './tree-shaking/index.js',
  output: {
    path: path.join(__dirname, 'tree-shaking'),
  },
  devtool: false,
  optimization: {
    usedExports: true,
    minimize: true,
    splitChunks: {
      chunks: 'all',
      minSize: 1,
      cacheGroups: {
        utils: {
          minChunks: 1,
          minSize: 1,
        },
      },
    },
  },
};

/**
 * tree-shaking是静态分析导入导出，确定哪些是没有被其他使用的，
 * 并将其删除（死代码去除的技术）
 * 最早由rollup中率先实现
 */

/**
 * CommonJS AMD,CMD等模块化方案都是，高度动态的，难以预测
 * ESM，所有的导入导出在编译时静态分析，并规范模块名只能是常量
 * ESM依赖关系在编译阶段即可确定，编译工具可以对这种模块化方案做
 * 静态分析，从字符串字面量就可以推断出那些是未被其他模块使用的
 * 从而实现Tree shaking
 */

/**
 * 实现原理
 * 1. 标记出已使用的，
 * 2. 使用terser删除调没有被用到的导出语句
 *
 * 标记功能需要开启optimization.usedExported
 * 标记过程：
 * Make阶段收集所有导出变量记录到依赖图，
 * Seal阶段：遍历ModuleGraph 标记模块导出变量有没有被使用
 *
 * 生成产物时，被没有被标记使用的变量，生成相关代码
 * Teser执行 删除相关导出语句
 *
 */

/**
 * 最佳实践
 * 生产环境使用
 * 1. mode="production",
 * 2. sideEffects 声明某些具有副作用防止被摇调
 * 3. Babel 使用时转译成 保留ESM模块化方案 导入导出
 * 4. 避免不必要无意义的模块赋值，虽然默认还是会摇调
 * 5. 纯函数标注可以去掉无意义的函数执行
 */
