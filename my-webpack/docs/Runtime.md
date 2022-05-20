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

#### 异步加载模块

jsonp 与动态添加脚本

重写初始化 window[webpackJsonp] 数组，并对 webpackJsonp 的 push 重写 webpackJsonpCallback
执行`__webpack_require__` 加载入口文件

\_\_webpack_require\_\_.e 进行异步脚本的加载 ，
异步脚本执行加载完，会执行 window[webpackJsonp].push 将模块 push 进去，执行 push 就是执行 webpackJsonpCallback

\_\_webpack_require\_\_.e 内部采用 promise.all 处理异步加载

加载完后 then 进行`__webpack_require__` 加载模块 moduleId 经 exports 输出

\_\_webpack_require\_\_.e 将声明一个 promise 并将该 promise 的[resolve,reject] 赋值给 installedChunks[moduleId]

且令 installedChunks[id][2]=promise，动态添加 script 标签 将 promise 返回

脚本加载，执行时触发 webpackJsonpCallback 的执行，
这里·会注册模块到 modules，
找到 installedChunks 中的 resolve，push 到 resolves 列表中，并将 installedChunks[moduleId]置为 0
最后会执行 installedChunks 中的 resolve，加载完成

#### 实现原理

1. 收集依赖，根据依赖，生成相应的 webpack 工具函数

2. 生成 bundle

流程

1. 初始化

2. 构建阶段
   模块路径解析->内容解析->AST 遍历处理->依赖解析 构建依赖图
3. 打包阶段
   entry chunk 生成，异步模块 chunk 生成，选项 chunk 的生成，构建 chunk 图
   补充 runtime 的 module
4. 生成
   触发 done
