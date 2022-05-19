#### webpack 运行时原理

webpack 运行时，原理是立即执行函数，将 modules 引入 入参，

函数内部声明了 缓存模块的变量 installModules

模块引入核心\_\_webpack_require\_\_(moduleId) 这个函数

这个函数首先判断缓存是否已经有 moduleId 有的话直接返回该模块的 exports

否则创建一个 module 属性 moduleId,l,exports

加载模块，运算模块，赋值到 exports 中
将 l 置为 true
将模块的 exports 返回,

```JavaScript
/**\*\***/ function **webpack_require**(moduleId) {
/**\*\***/
/**\*\***/ // Check if module is in cache
/**\*\***/ if(installedModules[moduleId]) {
/**\*\***/ return installedModules[moduleId].exports;
/**\*\***/ }
/**\*\***/ // Create a new module (and put it into the cache)
/**\*\***/ var module = installedModules[moduleId] = {
/**\*\***/ i: moduleId,
/**\*\***/ l: false,
/**\*\***/ exports: {}
/**\*\***/ };
/**\*\***/
/**\*\***/ // Execute the module function
/**\*\***/ modules[moduleId].call(module.exports, module, module.exports, **webpack_require**);
/**\*\***/
/**\*\***/ // Flag the module as loaded
/**\*\***/ module.l = true;
/**\*\***/
/**\*\***/ // Return the exports of the module
/**\*\***/ return module.exports;
/**\*\***/ }

```

其他的一些工具函数和数据记录 都是`__webpack_require__`的属性挂载上面
如 d 定义一些 object 的 getter
o 属性判断是否属于自己的属性
c cache 指向 installModules
m 指向 modules
n 默认导出的 getter
r 在 exports 上定义\_esModule =true
t 定义一个命名空间 会对已存在等各种 mode 做判断返回
