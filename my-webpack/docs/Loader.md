#### Loader

Webpack 在构建时，解析模块调用 acorn 将文本传换为 AST 对象，进而分析模块依赖
，代码结构
但这只对 JavaScript 起作用
需要一套逻辑对 图片 css 等 webpack 不能直接解析的内容进行转译成 JavaScript 文本格式

##### loader 签名

```JavaScript

module.exports=function(source,sourceMap?,data?){
    // source 是必须的，上一个loader处理结果或者直接文本内容
    // sourceMap 是信息sourceMap结果信息
    // data 是一些在loader 链中传递的信息，比如一些已经处理的ast，没必要每个loader再处理
    return source;
}

```

#### 返回值

既可以是 return 的方式也可以调用 this.callback(error,content,sourceMap,data)
的方式

loader 也可以是异步的
callback=this.async 这种方式进行

```JavaScript
async function lessLoader(source) {
  // 1. 异步回调函数
  const callback = this.async();
  // ...

  let result;

  try {
    result = await (options.implementation || less).render(data, lessOptions);
  } catch (error) {
    // ...
  }

  const { css, imports } = result;

  callback(null, css, map);
}

export default lessLoader;
```

#### 缓存 默认缓存开启

因为文件解析转译操作一般是 CPU 密集型的，

所以考量性能问题默认开启缓存可以
可以手动调
this.cacheable(false)

#### 上下文信息

```
{
    getOptions(schema) 获取当前的配置信息
    emitWarning(warning)：添加警告
    emitError( error)：添加错误
    emitFile (name, content, sourceMap, assetInfo)：直接提交文件输出到 fs，不会经过后续的 chunk module 处理
    addDependency(dep)：添加额外依赖 在 watch 模式下，会触发资源重新编译
    resolve(context, request, callback)：解析路径
}

```

#### loader 与 loader.pitch 执行的属性

先按照 loader 顺序从前到后执行 loader.pitch
再从后到前执行 loader
只有 loader 的话，无法进行中断，且如果不关心 source 的话也必须要等待 source

pitch 可以中断，且与具体内容无关时可以执行

当 pitch 执行返回内容时，之后的 loader.pitch 都会被中断，
webpack 在根据返回的内容做具体的操作

```JavaScript
    function pitch(
    // 当前loader 之后(指声明位置)的loader列表及资源路径
    remainingRequest: string,
    // 当前loader 之后(指声明位置)的loader列表
    previousRequest: string,
    //与loader data参数一致
    data = {}
): void {
}
```

webpack 的 loader-utils 与 schema-utils
获取参数和校验参数

如：

```JavaScript
// css-loader/src/index.js
import { getOptions } from "loader-utils";
import { validate } from "schema-utils";
import schema from "./options.json";


export default async function loader(content, map, meta) {
  const rawOptions = getOptions(this);

  validate(schema, rawOptions, {
    name: "CSS Loader",
    baseDataPath: "options",
  });
  // ...
}

```

拼接文件名
loader-utils 中的 interpolateName

测试 Jest
Jest · 🃏 Delightful JavaScript Testing

https://link.segmentfault.com/?enc=VOiDaJ0uwsbw8PnI5BCcSw%3D%3D.9x%2BTZBAxK6DUXvwd3YKG6MR%2Bu%2BOGAbGmYfBrGBJHyTc%3D

调试
ndb 工具实现断点调试 https://link.segmentfault.com/?enc=ovEq7%2BUZaAcsuSqHDe%2BnSA%3D%3D.Wx7Qj3X%2BssLfa2LmrAMAX6e%2Fy7fb%2FYLgkrI9V%2FOGX47XoK4%2FIYeH2CQHQERzg3Jm
npm link 将 Loader 模块链接到测试项目
resolveLoader 配置项将 Loader 所在的目录加入到测试项目中，如：

[编写一个loader](https://webpack.docschina.org/contribute/writing-a-loader/)