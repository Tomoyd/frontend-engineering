const { Compiler } = require('webpack');

class AnalyzeWebpackPlugin {
  /**
   *
   * @param {Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.emit.tap(this.constructor.name, (compilation) => {
      let content = `|资源名称|资源大小|`;
      const rn = `|-----|-----|`;
      Object.entries(compilation.assets).forEach(([key, value]) => {
        content += `\n${rn} \n|${key}|${Math.ceil(value.size() / 1024)}kb|`;
      });
      // @ts-ignore
      compilation.assets['analyze.md'] = {
        source() {
          return content;
        },
        size() {
          return content.length;
        },
      };
    });
  }
}

module.exports = AnalyzeWebpackPlugin;
