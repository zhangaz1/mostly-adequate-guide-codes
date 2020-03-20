import {
	Identity,
	Maybe,
} from '../../../src/support';

import {
	TestData,
	runTests,
} from '../../support';

import functorExcercises from '../../../src/part2/exercises/functor';

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
	},];

	runTests(functorExcercises, { sentence: 'toEqual' })
		(testDatas);

});