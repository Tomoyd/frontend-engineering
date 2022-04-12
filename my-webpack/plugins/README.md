#### webpack 运行机制

1. webpack 初始化，合并 webpack 的 config 配置项和命令行参数，作为 options
2. 构建函数 Compiler 以 options 为入参，生成 compiler 实例，实例化 Compiler 上的 hooks
3. compiler 执行 run 方法，并且触发 beforeRun ，run，beforeCompile，compile 等 hooks
4. Compilation 构造函数创建 compilation，实例，管理模块和对应依赖
   创建完成后出发 make Hook
5. compilation.addEntry 分析入口文件，递归解析，调用 NormaModuleFactory 为每个依赖生成 Module 实例，并在过程中执行 before resolve,resolver,afterResolve,module 等关键 hooks

6. 将生成的 Module 作为入参，执行 compilation 的 addModule 和 buildModule 等方法递归创建模块对象和依赖模块对象

7. 调用 seal 方法生成代码，整理输出主文件和 chunk，最终输出

#### Tapable

核心工具库，提供了很多 hooks 的类定义 tap tapAsync tabPromise 都是这个文件进行暴露的

#### HOOK API

1. compiler
   - run 读取记录之前 异步
   - compile 同步，新的编译（compilation）创建之后
   - emit 异步，生成资源写入 output 之前
   - done 编译完成，webpack 退出之前
2. compilation
   - buildModule 同步，模块构建之前
   - finishModule 同步,所有模块构建完成后
   - optimize 同步，优化阶段开始之前
