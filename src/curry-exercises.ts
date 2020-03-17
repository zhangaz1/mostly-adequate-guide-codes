import R, { comparator } from 'ramda';


// 练习 1
//==============
// 通过局部调用（partial apply）移除所有参数

export const words = R.split(/\s/ig);

// 练习 1a
//==============
// 使用 `map` 创建一个新的 `words` 函数，使之能够操作字符串数组

export const sentences = R.map(words);


// 练习 2
//==============
// 通过局部调用（partial apply）移除所有参数

// export const filterQs = function (xs: string[]) {
// 	return R.filter(function (x) { return R.not(R.isEmpty(R.match(/q/i, x))); }, xs);
// }

const matchQ = R.match(/q/ig);
const hasQ = R.compose(R.not, R.isEmpty, matchQ);
export const filterQs = R.filter(hasQ);


// 练习 3
//==============
// 使用帮助函数 `_keepHighest` 重构 `max` 使之成为 curry 函数

// 无须改动:
// type compareEnable = number | string;
// const _keepHighest = <A>(x: A, y: A): A => x >= y ? x : y;
const _keepHighest = (x: number, y: number): number => x >= y ? x : y;
export const max = R.reduce(_keepHighest, -Infinity);

// // 重构这段代码:
// var max = function(xs) {
//   return reduce(function(acc, x){
//     return _keepHighest(acc, x);
//   }, -Infinity, xs);
// };


// 彩蛋 1:
// ============
// 包裹数组的 `slice` 函数使之成为 curry 函数
// //[1,2,3].slice(0, 2)
export const slice = R.curry((start: number, end: number, xs: any[]) => {
	return xs.slice(start, end);
});


// 彩蛋 2:
// ============
// 借助 `slice` 定义一个 `take` curry 函数，该函数调用后可以取出字符串的前 n 个字符。
export const take = slice(0);