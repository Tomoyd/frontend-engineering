/*
定义pitch方法
pitch 先于loader执行
loader1 loader2 loader3 
在loader执行前从前到后依次执行loader loader1的pitch loader2的pitch loader3的pitch
如果有一个return一个结果，下一个就会中断，执行上一个loader，且不执行后面的loader，熔断机制
*/
module.exports = function (content) {};
module.exports.pitch = function () {};
