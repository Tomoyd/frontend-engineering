const { Compiler } = require('webpack');

class clearWebpackPlugin {
  constructor() {}
  /**
   *
   * @param {import("webpack").Compiler} compiler
   */
  apply(compiler) {
    const output = compiler.options.output.path || '';
    console.log('output', output);
    const name = this.constructor.name;
    const fs = compiler.outputFileSystem;

    compiler.hooks.emit.tap(name, (compilation) => {
      this.removeFiles(fs, output);
    });
  }
  /**
   *
   * @param {Compiler["outputFileSystem"]} fs
   * @param {string} filepath
   */
  removeFiles(fs, filepath) {
    fs.readdir?.(filepath, (err, dirs) => {
      console.log('err,dirs', err, dirs);
      if (err) return;

      if (!dirs?.length) {
        fs.rmdir?.(filepath, (err) => {
          console.log('err', err);
        });
        return;
      }

      dirs?.forEach((file) => {
        const realpath = `${filepath}/${file}`;

        fs.stat(realpath, (err, stats) => {
          if (err) return;
          if (stats?.isDirectory()) {
            this.removeFiles(fs, realpath);
            return;
          }
          fs.unlink?.(realpath, (err) => {
            if (err) return;
          });
        });
      });
    });
  }
}

module.exports = clearWebpackPlugin;
