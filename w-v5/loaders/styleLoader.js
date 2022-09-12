module.exports = function (content) {};
// 处理成inner-loader
module.exports.pitch = function (remainRequest) {
  // 得到配置后的inline路径
  const innerLoader = remainRequest
    .split('!')
    .map((absolutePath) => {
      return this.utils.contextify(this.context, absolutePath);
    })
    .join('!');
  console.log(innerLoader);
  return `
        import styles from '!!${innerLoader}';
        const style = document.createElement("style");
        style.innerHtml= styles;
        document.head.appendChild(style);
    `;
};
