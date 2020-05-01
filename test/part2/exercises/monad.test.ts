import {
	Maybe,
	either,
	IO,
	unsafePerformIO,
} from '../../../src/support';

import {
	TestData,
	runTests,
} from '../../support';

import monadExcercises from '../../../src/part2/exercises/monad';

import R from 'ramda';

describe("Monad Exercises", function () {

	let testDatas: TestData[] = [{
		action: 'ex1',
		expected: Maybe.of(monadExcercises.user.address.street.name),
		params: [monadExcercises.user],
		// }, {
		// 	action: 'ex2',
		// 	expected: 'logged /Users/zhangaz1/workspace/demos/mostly-adequate-guide-codes/src/part2/exercises/monad.ts',
		// 	params: [undefined],
	},];

	runTests(monadExcercises, { sentence: 'toEqual' })
		(testDatas);

	test('Exercise 2', function () {
		expect(unsafePerformIO(monadExcercises.ex2() as any as IO<() => string, string>))
			.toBe('logged monad.ts');
	});

	test('Exercise 3', function (done) {
		monadExcercises.ex3(13).fork(console.log, (res: any) => {
			expect(res.map(R.prop('post_id'))).toEqual([13, 13]);
			done();
		});
	});

	test('Exercise 4', function (done) {
		// @ts-ignore
		const getResult = either(R.identity, unsafePerformIO);
		// @ts-ignore
		expect(getResult(monadExcercises.ex4('not an email'))).toBe('invalid email');
		// @ts-ignore
		expect(getResult(monadExcercises.ex4('sleepy@grandpa.net'))).toBe('emailed: sleepy@grandpa.net');
		done();
	});

});
