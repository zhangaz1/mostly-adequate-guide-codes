import {
	Identity,
	Maybe,
	Left,
	Right,
} from '../../../src/support';

import {
	TestData,
	runTests,
} from '../../support';

import functorExcercises from '../../../src/part2/exercises/functor';

const testEx5: TestData = {
	action: 'ex5',
	expected: 'LOVE THEM FUTURES',
	params: [13],
};

testEx5.handler = (function (done: Function) {
	const result = functorExcercises.ex5(13);
	result.fork(console.log, (res: string) => {
		expect(res).toEqual(testEx5.expected);
		done();
	});
}).bind(testEx5);

describe('functor-exercises', () => {
	let testDatas: TestData[] = [{
		action: 'ex1',
		expected: Identity.of(3),
		params: [Identity.of(2)],
	}, {
		action: 'ex2',
		expected: Identity.of('do'),
		params: [Identity.of(['do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'])],
	}, {
		action: 'ex3',
		expected: Maybe.of('A'),
		params: [{ id: 2, name: 'Albert' }],
	}, {
		action: 'ex4',
		expected: Maybe.of(4),
		params: ['4'],
	}, testEx5, {
		action: 'ex6',
		expected: Left.of('Your account is not active'),
		params: [{ active: false, name: 'Gary', }],
	}, {
		action: 'ex6',
		expected: Right.of('Welcome Theresa'),
		params: [{ active: true, name: 'Theresa', }],
	}, {
		action: 'ex7',
		expected: Right.of('fpguy99'),
		params: ['fpguy99'],
	}, {
		action: 'ex7',
		expected: Left.of('You need > 3'),
		params: ['...'],
	},];

	runTests(functorExcercises, { sentence: 'toEqual' })
		(testDatas);

});