const loaderUtils = require('loader-utils');
// 因为是二进制数据
module.exports = function (content) {
  /*
    1.根据文件内容生成hash值文件名 用webpack  需要用loaderUtils
    2.将文件输出
    3. 返回输出 `module.exports=文件路径+文件名`
   */
  const hasName = loaderUtils.interpolateName(this, '[hash].[ext][query]', {
    content,
  });
  this.emitFile(hasName, content);
  //   return `module.exports="${hash}"`;
  return `module.exports="${hasName}"`;
};

module.exports.raw = true;
