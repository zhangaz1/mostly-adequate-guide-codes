import R from 'ramda';

const liftA2 = R.curry(function (f: any, a1: any, a2: any) {
	return a1.map(f).ap(a2);
});

const liftA3 = R.curry(function (f: any, a1: any, a2: any, a3: any) {
	return a1.map(f).ap(a2).ap(a3);
});

export {
	liftA2,
	liftA3,
};