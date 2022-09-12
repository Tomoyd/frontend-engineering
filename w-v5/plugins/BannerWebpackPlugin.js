class BannerWebpackPlugin {
  /**
   *
   * @param {{author:string}} options
   */
  constructor(options) {
    this.options = options;
  }

  /**
   *
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    const name = this.constructor.name;
    compiler.hooks.emit.tapAsync(name, (compilation, callback) => {
      const extensions = ['css', 'js'];
      const validPaths = Object.keys(compilation.assets).filter((assetPath) => {
        const splited = assetPath.split('.');
        const ext = splited[splited.length - 1];
        return extensions.includes(ext);
      });
      const prefix = `
        /* Author ${this.options.author} */
      `;

      validPaths.forEach((assetKey) => {
        const source = compilation.assets[assetKey].source();
        const newContent = prefix + source;
        // @ts-ignore
        compilation.assets[assetKey] = {
          source: function () {
            return newContent;
          },
          size: function () {
            return newContent.length;
          },
        };
      });
      callback();
    });
  }
}

module.exports = BannerWebpackPlugin;
