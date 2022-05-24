#### plugins

webpack plugin

核心 Tapable

触发各种初始化 make emit done 过程 执行以订阅的参数
将 compilation 上下文传递给注册的 函数中

webpack 中 apply 方法的 对象 将 compiler 传递给 apply

run
thisCompilation
emit
done


具有apply 方法的对象，在执行时会将compiler 实例传递给 apply方法

node API的表示

new SomePlugin().apply(compiler);