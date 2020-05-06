import {
	Maybe,
} from '../../../src/support';

import {
	TestData,
	runTests,
} from '../../support';

import applicativeExcercises from '../../../src/part2/exercises/applicative';

describe("Monad Exercises", function () {

	let testDatas: TestData[] = [{
		action: 'ex1',
		expected: Maybe.of(5),
		params: [2, 3],
	}, {
		action: 'ex1',
		expected: Maybe.of(null),
		params: [null, undefined],
	}, {
		action: 'ex2',
		expected: Maybe.of(5),
		params: [Maybe.of(3), Maybe.of(2)],
	}, {
		action: 'ex2',
		expected: Maybe.of(null),
		params: [Maybe.of(null), Maybe.of(undefined)]
	},];

	runTests(applicativeExcercises, { sentence: 'toEqual' })
		(testDatas);

	test('ex3', function (done) {
		applicativeExcercises.ex3.fork(console.log, (html: string) => {
			expect(html).toBe('<div>Love them tasks</div><li>This book should be illegal</li><li>Monads are like space burritos</li>');
			done();
		});
	});
	test('ex31', function (done) {
		applicativeExcercises.ex31.fork(console.log, (html: string) => {
			expect(html).toBe('<div>Love them tasks</div><li>This book should be illegal</li><li>Monads are like space burritos</li>');
			done();
		});
	});

	test('ex4', (done) => {
		expect(applicativeExcercises.ex4.unsafePerformIO()).toBe('toby vs sally');
		done();
	});
});
