// import { r } from './test.js';
import { add, plus, pure } from './tools.js';
import { name } from './test'; // 副作用声明中有该文件因此不会被tree-shaking
let a = plus; // mode=production时,仍然会被摇调 会被tree-shaking掉
/*#__PURE__*/ pure(); // 纯函数时，这样的执行是无意义的，将被摇调删除
console.log('add(1,2)', add(1, 2));
