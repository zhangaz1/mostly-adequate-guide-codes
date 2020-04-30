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

	// it('Exercise 3', function (done) {
	// 	monadExcercises.ex3(13).fork(console.log, function (res: any) {
	// 		assert.deepEqual(res.map(R.prop('post_id')), [13, 13]);
	// 		done();
	// 	});
	// });

	// it('Exercise 4', function () {
	// 	var getResult = either(R.identity, unsafePerformIO);
	// 	assert.equal(getResult(monadExcercises.ex4('notanemail')), 'invalid email');
	// 	assert.equal(getResult(monadExcercises.ex4('sleepy@grandpa.net')), 'emailed: sleepy@grandpa.net');
	// });

});
