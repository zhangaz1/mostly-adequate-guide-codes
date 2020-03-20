import R from 'ramda';

export const trace = R.curry(<T>(tag: string, x: T): T => {
	console.log(tag, x);
	return x;
})