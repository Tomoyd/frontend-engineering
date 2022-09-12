module.exports = function (content, map, meta) {
  // 异步操作必须要用 async方法
  console.log('loader async');

  const callback = this.async();

  Promise.resolve(0).then(() => callback(null, content, map, meta));
};
