const { Compiler } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
class InlineWebpackPlugin {
  constructor() {}
  /**
   *
   * @param {Compiler} compiler
   */
  apply(compiler) {
    const name = this.constructor.name;
    compiler.hooks.compilation.tap(name, (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tap(
        name,
        (assets) => {
          assets.headTags = this.getInlineTags(assets.headTags, compilation);
          assets.bodyTags = this.getInlineTags(assets.bodyTags, compilation);
          return assets;
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).afterEmit.tap(name, (assets) => {
        Object.keys(compilation.assets).forEach((k) => {
          if (/common(.*)\.js$/g.test(k)) {
            compilation.deleteAsset(k);
          }
        });
        return assets;
      });
    });
  }
  getInlineTags(tags = [], compilation) {
    return tags.map((tag) => {
      if (tag.tagName !== 'script') {
        return tag;
      }
      const src = tag.attributes.src;

      if (!src || typeof src !== 'string') {
        return tag;
      }

      console.log('src>>>', /common(.*)\.js$/g.test(src), src);

      if (!/common(.*)\.js$/g.test(src)) return tag;
      return {
        tagName: 'script',
        innerHTML: compilation.assets[src].source(),
        closeTag: true,
      };
    });
  }
}

module.exports = InlineWebpackPlugin;
