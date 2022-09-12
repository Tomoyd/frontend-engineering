/*
 * 初始化之后，会调用所有插件的apply方法
 */
class BasePlugin {
  constructor() {
    console.log('111', 111);
  }
  /**
   *
   * @type {import("webpack").WebpackPluginFunction}
   */
  apply(compiler) {
    debugger;
    compiler.hooks.environment.tap('BasePlugin', () => {
      console.log('environment');
    });
    //  异步并行构子
    compiler.hooks.make.tapAsync('BasePlugin', (compilation, callback) => {
      compilation.hooks.seal.tap('BasePlugin', () => {
        console.log('compilation');
      });
      setTimeout(() => {
        console.log('make', 1);
        callback();
      }, 100);
    });

    compiler.hooks.make.tapAsync('BasePlugin', (compilation, callback) => {
      //
      setTimeout(() => {
        console.log('make', 2);
        callback();
      }, 50);
    });

    compiler.hooks.make.tapAsync('BasePlugin', (compilation, callback) => {
      //
      setTimeout(() => {
        console.log('make', 3);
        callback();
      }, 80);
    });

    // 异步并行构子 emit 打包输出前
    compiler.hooks.emit.tap('BasePlugin', (compiler) => {});
    compiler.hooks.emit.tapAsync('BasePlugin', (compilation, callback) => {
      setTimeout(() => {
        callback();
      });
    });
    compiler.hooks.emit.tapPromise('BasePlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('emit');
          resolve();
        });
      });
    });
  }
}

module.exports = BasePlugin;
