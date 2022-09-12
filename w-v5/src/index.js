// import '!style-loader!css-loader!less-loader!./styles/test.less';
/**
 * 内联方式
 * ! 分割各个loader和资源
 * 每个loader后面可以加? 进行参数配置
 * 前缀为!会屏蔽配置的loader 比如当前示例，会屏蔽配置里面的loader
 * 前缀为!!屏蔽loader preloader和postLoader
 * 前缀为-!屏蔽配置中所有的loader和preLoader
 *
 * 从右到左执行
 *
 * loader的实现入参接受三个参数，content sourcemap data
 *
 * loader可以异步执行也可以同步执行， async获取 callback
 *
 * loader也可以产生副作用 this可以去获取一些emit 等API
 *
 * 使用 内联方式和配置方式
 * 内联就是
 * 1. 通过! 进行模块的分割，
 * 2. ?可以为每个loader配置query参数
 * 3. 预置前缀可以对配置进行排除
 *
 * 配置：
 * use
 * 1. 可以直接是字符串
 * 2. 也可以是对象，来配置额外的loader配置参数
 *
 */

// import image from './test.jpg';
// const name = 'hello';
// console.log('image', image);
// console.log('name', name);
